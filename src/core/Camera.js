import * as THREE from "three";

export class Camera {
  constructor() {
    this.instance = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000, // increased from 100 → 1000
    );

    /* initial position */

    this.instance.position.set(0, 5, 12);

    console.log("Camera initialized", this.instance);
  }

  onResize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;

    this.instance.updateProjectionMatrix();
  }
}
