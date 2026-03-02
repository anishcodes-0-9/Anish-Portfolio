import * as THREE from "three";

export class Lighting {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
  }

  init() {
    // ---------------------------
    // Enable shadow system
    // ---------------------------
    //this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ---------------------------
    // Ambient Light
    // ---------------------------
    this.ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambient);

    // ---------------------------
    // Directional Sun Light
    // ---------------------------
    this.sun = new THREE.DirectionalLight(0xffffff, 1.2);

    // Initial position (will be overridden by LightManager)
    this.sun.position.set(10, 8, -2);

    this.sun.castShadow = true;

    // Shadow quality
    this.sun.shadow.mapSize.width = 2048;
    this.sun.shadow.mapSize.height = 2048;

    this.sun.shadow.camera.near = 0.5;
    this.sun.shadow.camera.far = 50;

    this.sun.shadow.camera.left = -8;
    this.sun.shadow.camera.right = 8;
    this.sun.shadow.camera.top = 8;
    this.sun.shadow.camera.bottom = -8;

    // Soften shadow edges
    this.sun.shadow.bias = -0.0005;
    this.sun.shadow.radius = 2;

    // Make sun aim toward center of room
    this.sun.target.position.set(0, 2, 0);
    this.scene.add(this.sun.target);

    this.scene.add(this.sun);
  }

  setSkyColor(topColor, bottomColor) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);

    gradient.addColorStop(0, topColor);
    gradient.addColorStop(1, bottomColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    this.scene.background = texture;
  }
}
