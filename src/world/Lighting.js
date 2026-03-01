import * as THREE from "three";

export class Lighting {
  constructor(scene) {
    this.scene = scene;

    // We declare them here so they are public properties
    this.ambient = null;
    this.keyLight = null;
    this.fillLight = null;
  }

  init() {
    this.ambient = new THREE.AmbientLight(0xffffff, 1.1);
    this.scene.add(this.ambient);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.keyLight.position.set(5, 8, 5);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.fillLight.position.set(-5, 5, -5);
    this.scene.add(this.fillLight);
  }
}
