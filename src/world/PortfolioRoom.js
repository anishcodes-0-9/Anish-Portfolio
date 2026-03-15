import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const textureLoader = new THREE.TextureLoader();
const batTexture = textureLoader.load("/textures/batman-logo.png");
batTexture.colorSpace = THREE.SRGBColorSpace;

const photoTexture = textureLoader.load("/textures/anish-photo.png");
photoTexture.colorSpace = THREE.SRGBColorSpace;
photoTexture.wrapS = THREE.ClampToEdgeWrapping;
photoTexture.wrapT = THREE.ClampToEdgeWrapping;
photoTexture.anisotropy = 8;

export class PortfolioRoom {
  constructor(scene, camera, controls, interaction) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.interaction = interaction;
    this.loader = new GLTFLoader();
  }

  init(onLoaded) {
    this.loader.load(
      "/src/assets/models/updated-portfolio-room.glb",
      (gltf) => {
        const model = gltf.scene;

        /* STORE FULL MODEL GLOBALLY */
        window.roomModel = model;

        model.traverse((child) => {
          if (!child.isMesh) return;

          console.log(child.name);

          child.castShadow = true;
          child.receiveShadow = true;

          if (child.material) {
            child.material = child.material.clone();
            child.material.side = THREE.DoubleSide;
          }

          this.applyMaterialLogic(child);

          window.portfolioObjects = window.portfolioObjects || {};

          if (child.name === "BatmanLogo") {
            window.portfolioObjects.batmanLogo = child;
          }

          if (child.name === "Window") {
            window.portfolioObjects.window = child;
            child.userData.type = "window";
          }

          if (child.name === "Lamp_Shade") {
            window.portfolioObjects.lampShade = child;
          }

          this.tagInteractiveObjects(child);
        });

        this.scene.add(model);

        /* LAMP LIGHT */

        const lampShade = model.getObjectByName("Lamp_Shade");

        if (lampShade) {
          const lampLight = new THREE.PointLight(0xffd9a6, 8, 25, 1.2);

          lampLight.position.set(0, 0.45, 0);
          lampLight.visible = false;

          lampShade.add(lampLight);

          window.portfolioObjects = window.portfolioObjects || {};
          window.portfolioObjects.lampLight = lampLight;
        }
        this.camera.position.set(0, 2.2, -6);

        this.controls.target.set(0, 1.3, 0.5);

        this.camera.lookAt(0, 1.3, 0.5);

        this.controls.update();

        if (onLoaded) onLoaded();
      },
    );
  }

  applyMaterialLogic(child) {
    switch (child.name) {
      case "Room_Floor":
        child.material.roughness = 0.5;
        child.material.metalness = 0.05;
        child.material.color.set(0x444444);
        break;

      case "Room_BackWall":
        child.material.color.set(0xcccccc);
        child.material.roughness = 0.7;
        child.material.metalness = 0.05;
        break;

      case "Room_LeftWall":
        child.material.color.set(0x2f5fa8);
        child.material.roughness = 0.7;
        child.material.metalness = 0.05;
        break;

      case "Room_RightWall":
        child.material.color.set(0xa83832);
        child.material.roughness = 0.7;
        child.material.metalness = 0.05;
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
        child.material.color.set(0x777777);
        child.material.roughness = 0.4;
        child.material.metalness = 0.2;
        break;

      case "Mouse":
        child.material.color.set(0x999999);
        child.material.roughness = 0.4;
        child.material.metalness = 0.2;
        break;

      case "BatmanLogo":
        child.material = new THREE.MeshStandardMaterial({
          map: batTexture,
          transparent: true,
          roughness: 0.4,
          metalness: 0.2,
          emissive: new THREE.Color(0xffff00),
          emissiveIntensity: 0.25,
        });
        break;

      case "Photo_Frame":
        child.material = new THREE.MeshStandardMaterial({
          color: 0x5a3a1e,
          roughness: 0.7,
          metalness: 0.1,
        });
        break;

      case "Photo_Image":
        photoTexture.center.set(0.5, 0.5);
        photoTexture.rotation = Math.PI / 2;

        child.material = new THREE.MeshStandardMaterial({
          map: photoTexture,
          roughness: 0.9,
          metalness: 0,
          side: THREE.DoubleSide,
        });
        break;

      case "Photo_Glass":
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transmission: 1,
          opacity: 0.25,
          transparent: true,
          roughness: 0,
          metalness: 0,
          clearcoat: 1,
          depthWrite: false,
        });
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

      case "Lamp_Shade":
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffe2a8,
          emissive: new THREE.Color(0xffcc88),
          emissiveIntensity: 0,
          roughness: 0.6,
          metalness: 0.1,
        });
        break;
    }
  }

  tagInteractiveObjects(child) {
    switch (child.name) {
      case "Phone":
        child.userData.type = "phone";
        break;

      case "Monitor_Left":
        child.userData.type = "monitor_left";
        break;

      case "Monitor_Right":
        child.userData.type = "monitor_right";
        break;

      case "Football":
        child.userData.type = "football";
        break;

      case "_Dumbell_L":
      case "Dumbell_L":
        child.userData.type = "Dumbell_L";
        break;

      case "Dumbell_R":
        child.userData.type = "Dumbell_R";
        break;

      case "Window":
        child.userData.type = "window";
        break;

      case "BatmanLogo":
        child.userData.type = "batman";
        break;

      case "Keyboard":
        child.userData.type = "keyboard";

        const keyboardHitbox = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 0.08, 0.18),
          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
          }),
        );

        keyboardHitbox.position.copy(child.position);
        keyboardHitbox.userData.type = "keyboard";

        this.scene.add(keyboardHitbox);
        this.interaction.register(keyboardHitbox);
        break;

      case "Mouse":
        child.userData.type = "mouse";

        const mouseHitbox = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.08, 0.12),
          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
          }),
        );

        mouseHitbox.position.copy(child.position);
        mouseHitbox.userData.type = "mouse";

        this.scene.add(mouseHitbox);
        this.interaction.register(mouseHitbox);
        break;

      case "CPU":
        child.userData.type = "cpu";
        break;

      case "Chair":
        child.userData.type = "chair";
        break;

      case "Photo_Frame":
      case "Photo_Image":
      case "Photo_Glass":
        child.userData.type = "about";
        break;

      case "Diary_LP":
        child.userData.type = "random_fact";
        break;

      case "Diary_RP":
        child.userData.type = "random_thought";
        break;

      case "Lamp_Base":
      case "Lamp_Stand":
      case "Lamp_Shade":
        child.userData.type = "lamp";
        break;

      case "Alexa_Base":
        child.userData.type = "alexa";

        const hitbox = new THREE.Mesh(
          new THREE.BoxGeometry(0.09, 0.09, 0.09),
          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
          }),
        );

        hitbox.position.copy(child.position);
        hitbox.position.y += 0.45;

        hitbox.userData.type = "alexa";

        this.scene.add(hitbox);
        this.interaction.register(hitbox);
        break;

      default:
        return;
    }

    this.interaction.register(child);
  }
}
