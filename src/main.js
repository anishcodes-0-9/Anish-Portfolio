import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/* ---------------- Scene ---------------- */

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

/* ---------------- Camera ---------------- */

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

/* ---------------- Renderer ---------------- */

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

document.body.appendChild(renderer.domElement);

/* ---------------- Controls ---------------- */

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 12;
controls.maxPolarAngle = Math.PI / 2;

/* ---------------- Lighting ---------------- */

// Ambient
const ambient = new THREE.AmbientLight(0xffffff, 1.1);
scene.add(ambient);

// Key light
const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
keyLight.position.set(5, 8, 5);
scene.add(keyLight);

// Fill light
const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
fillLight.position.set(-5, 5, -5);
scene.add(fillLight);

/* ---------------- GLTF Loader ---------------- */

const loader = new GLTFLoader();

loader.load("/src/assets/models/portfolio-room.glb", (gltf) => {
  const model = gltf.scene;

  model.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0x888888,
        side: THREE.DoubleSide,
        roughness: 0.7,
        metalness: 0.1,
      });

      switch (child.name) {
        case "Room_BackWall":
          child.material.color.set(0x8a8a8a); // lighter for clarity
          break;

        case "Room_LeftWall":
          child.material.color.set(0x2c3e50);
          break;

        case "Room_RightWall":
          child.material.color.set(0x4a2f2f);
          break;

        case "Room_Floor":
          child.material.color.set(0x555555);
          break;

        case "Window":
          child.material.color.set(0x88ccff);
          child.material.emissive = new THREE.Color(0x2244ff);
          child.material.emissiveIntensity = 0.8;
          break;

        case "BatmanLogo":
          child.material.color.set(0x000000);
          break;

        case "Photo_Frame":
          child.material.color.set(0xffffff);
          break;

        case "Photo_Layer":
          child.material.color.set(0xffcc00);
          break;

        case "Desk":
          child.material.color.set(0x8b5a2b);
          break;

        case "Chair":
          child.material.color.set(0x222222);
          break;

        case "Keyboard":
          child.material.color.set(0x111111);
          break;

        case "Mouse":
          child.material.color.set(0x444444);
          break;

        case "CPU":
          child.material.color.set(0x000000);
          break;

        case "Monitor_Left":
        case "Monitor_Right":
          child.material.color.set(0x101010);
          break;

        case "Diary_Group":
          child.material.color.set(0x6b3f1d);
          break;

        case "Football":
          child.material.color.set(0xffffff);
          break;

        case "Dumbell_L":
        case "Dumbell_R":
          child.material.color.set(0x333333);
          break;

        case "Pen":
          child.material.color.set(0x0000ff);
          break;
      }
    }
  });

  scene.add(model);

  // ✅ Correct initial view (front facing desk)
  camera.position.set(0, 2.2, -6);
  controls.target.set(0, 1.5, 0);
  controls.update();
});

/* ---------------- Resize ---------------- */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ---------------- Animation Loop ---------------- */

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
