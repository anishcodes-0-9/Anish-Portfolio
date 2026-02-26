import * as THREE from "three";

export class Lighting {
  constructor(scene) {
    this.scene = scene;
  }

  init() {
    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    this.scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 8, 5);
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
  }
}
