import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

export class Controls {
  constructor(camera, renderer) {
    this.instance = new OrbitControls(camera, renderer);
    //  TOUCH SUPPORT
    this.instance.enableZoom = true;
    // smoother mobile feel
    this.instance.dampingFactor = 0.08;

    if (window.innerWidth < 768) {
      this.instance.rotateSpeed = 0.6;
      this.instance.zoomSpeed = 0.8;
    }

    this.instance.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    this.instance.enableDamping = true;
    this.instance.enablePan = false;
    if (window.innerWidth < 768) {
      this.instance.minDistance = 4;
      this.instance.maxDistance = 10;
    } else {
      this.instance.minDistance = 3;
      this.instance.maxDistance = 12;
    }
    this.instance.minPolarAngle = 0.5;
    this.instance.maxPolarAngle = Math.PI / 2 - 0.1;
  }

  update() {
    this.instance.update();
  }
}
