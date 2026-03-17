import * as THREE from "three";

export class Renderer {
  constructor() {
    this.instance = new THREE.WebGLRenderer({ antialias: true });
  }

  init() {
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.2;

    /* enable realistic shadows */
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    this.instance.domElement.style.position = "fixed";
    this.instance.domElement.style.top = "0";
    this.instance.domElement.style.left = "0";
    this.instance.domElement.style.zIndex = "0";

    document.body.appendChild(this.instance.domElement);
  }

  render(scene, camera) {
    this.instance.render(scene, camera);
  }

  onResize() {
    this.instance.setSize(window.innerWidth, window.innerHeight);
  }
}
