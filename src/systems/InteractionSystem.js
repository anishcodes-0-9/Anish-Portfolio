import * as THREE from "three";

export class InteractionSystem {
  constructor(scene, camera, domElement) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.interactiveObjects = [];

    this.hovered = null;
    this.originalScales = new Map();
    this.hoverScale = 1.08;
  }

  register(object) {
    this.interactiveObjects.push(object);
  }

  init() {
    this.domElement.addEventListener("click", this.onClick.bind(this));
    this.domElement.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onMouseMove(event) {
    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.interactiveObjects,
      true,
    );

    if (intersects.length === 0) {
      this.clearHover();
      return;
    }

    const hit = intersects[0].object;

    if (this.hovered !== hit) {
      this.clearHover();
      this.setHover(hit);
    }
  }

  setHover(object) {
    this.hovered = object;

    if (!this.originalScales.has(object)) {
      this.originalScales.set(object, object.scale.clone());
    }
  }

  clearHover() {
    if (!this.hovered) return;

    const type = this.hovered.userData.type;

    const wallTypes = [
      "monitor_left",
      "monitor_right",
      "window",
      "batman",
      "about",
    ];

    if (wallTypes.includes(type)) {
      this.hovered.position.z = 0;
    } else {
      const original = this.originalScales.get(this.hovered);
      if (original) {
        this.hovered.scale.copy(original);
      }
    }

    this.hovered = null;
  }

  update() {
    if (!this.hovered) return;

    const type = this.hovered.userData.type;

    // Wall mounted objects → move forward slightly
    const wallTypes = [
      "monitor_left",
      "monitor_right",
      "window",
      "batman",
      "about",
    ];

    if (wallTypes.includes(type)) {
      this.hovered.position.z += 0.01;
      return;
    }

    // Everything else → scale pop
    const original = this.originalScales.get(this.hovered);
    if (!original) return;

    const target = original.clone().multiplyScalar(this.hoverScale);
    this.hovered.scale.lerp(target, 0.1);
  }

  onClick(event) {
    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.interactiveObjects,
      true,
    );

    if (intersects.length === 0) return;

    const clicked = intersects[0].object;

    if (clicked.userData.type) {
      console.log("Clicked:", clicked.userData.type);
    }
  }
}
