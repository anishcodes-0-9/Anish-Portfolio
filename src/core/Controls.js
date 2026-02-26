import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Controls {
  constructor(camera, renderer) {
    this.instance = new OrbitControls(camera, renderer);

    this.instance.enableDamping = true;
    this.instance.enablePan = false;
    this.instance.minDistance = 3;
    this.instance.maxDistance = 12;
    this.instance.minPolarAngle = 0.5;
    this.instance.maxPolarAngle = Math.PI / 2 - 0.1;
  }

  update() {
    this.instance.update();
  }
}
