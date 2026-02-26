import * as THREE from "three";

export class InteractionSystem {
  constructor(scene, camera, domElement) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.interactiveObjects = [];
  }

  register(object) {
    this.interactiveObjects.push(object);
  }

  init() {
    this.domElement.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

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
