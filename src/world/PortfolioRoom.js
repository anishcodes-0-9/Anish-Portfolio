import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class PortfolioRoom {
  constructor(scene, camera, controls, interaction) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.interaction = interaction; // ✅ added
    this.loader = new GLTFLoader();
  }

  init(onLoaded) {
    this.loader.load("/src/assets/models/portfolio-room.glb", (gltf) => {
      const model = gltf.scene;

      model.traverse((child) => {
        if (!child.isMesh) return;
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === "Window") {
          this.windowMesh = child;

          if (child.name === "Window") {
            this.windowMesh = child;

            const frameGeo = new THREE.BoxGeometry(1.2, 2.2, 0.1);
            const frameMat = new THREE.MeshStandardMaterial({
              color: 0x1a1a1a,
              roughness: 0.6,
              metalness: 0.2,
            });

            const frame = new THREE.Mesh(frameGeo, frameMat);
            frame.position.copy(child.position);
            frame.position.z += 0.05; // slightly outward
            frame.scale.copy(child.scale);

            this.scene.add(frame);
          }
        }

        child.material = child.material.clone();
        child.material.side = THREE.DoubleSide;
        child.material.roughness = 0.7;
        child.material.metalness = 0.1;

        this.applyMaterialLogic(child);
        this.tagInteractiveObjects(child);
      });

      this.scene.add(model);

      this.camera.position.set(0, 2.2, -6);
      this.controls.target.set(0, 1.5, 0);
      this.controls.update();

      if (onLoaded) onLoaded();
    });
  }

  applyMaterialLogic(child) {
    switch (child.name) {
      case "Room_Floor":
        child.material.roughness = 0.5;
        child.material.metalness = 0.05;
        child.material.color.set(0x444444);
        break;

      case "Room_BackWall":
        child.material.color.set(0xaaaaaa);
        break;

      case "Room_LeftWall":
        child.material.color.set(0x1e3a5f);
        break;

      case "Room_RightWall":
        child.material.color.set(0x5f1e1e);
        break;

      case "Desk":
        child.material.color.set(0x8b5a2b);
        break;

      case "Chair":
        child.material.color.set(0x222222);
        break;

      case "CPU":
        child.material.color.set(0x111111);
        break;

      case "Monitor_Left":
      case "Monitor_Right":
        child.material.color.set(0x101010);
        break;

      case "Keyboard":
        child.material.color.set(0x111111);
        break;

      case "Mouse":
        child.material.color.set(0x333333);
        break;

      case "BatmanLogo":
        child.material.color.set(0x000000);
        break;

      case "Photo_Frame":
        child.material.color.set(0x00ff00);
        break;

      case "Window":
        child.material.color.set(0x88ccff);
        child.material.emissive = new THREE.Color(0x2244ff);
        child.material.emissiveIntensity = 0.8;
        break;

      case "Football":
        child.material.color.set(0xffffff);
        break;

      case "Dumbell_L":
      case "Dumbell_R":
        child.material.color.set(0x2b2b2b);
        break;

      case "Alexa_Base":
        child.material.color.set(0x1e1e1e);
        break;

      case "Alexa_Ring":
        child.material.color.set(0x00aaff);
        child.material.emissive = new THREE.Color(0x00aaff);
        child.material.emissiveIntensity = 0.5;
        break;
    }
  }

  tagInteractiveObjects(child) {
    switch (child.name) {
      case "Window":
        child.userData.type = "window";
        break;

      case "Football":
        child.userData.type = "football";
        break;

      case "Chair":
        child.userData.type = "chair";
        break;

      case "CPU":
        child.userData.type = "cpu";
        break;

      case "Keyboard":
        child.userData.type = "keyboard";
        break;

      case "Mouse":
        child.userData.type = "mouse";
        break;

      case "Monitor_Left":
        child.userData.type = "monitor_left";
        break;

      case "Monitor_Right":
        child.userData.type = "monitor_right";
        break;

      case "BatmanLogo":
        child.userData.type = "batman";
        break;

      case "Dumbell_L":
        child.userData.type = "certifications";
        break;

      case "Dumbell_R":
        child.userData.type = "hobbies";
        break;

      case "Photo_Frame":
        child.userData.type = "about";
        break;

      case "Alexa_Base":
        child.userData.type = "alexa";
        break;

      case "Diary_LP":
        child.userData.type = "random_fact";
        break;

      case "Diary_RP":
        child.userData.type = "random_thought";
        break;

      default:
        return;
    }

    // ✅ register only interactive meshes
    this.interaction.register(child);
  }
}
