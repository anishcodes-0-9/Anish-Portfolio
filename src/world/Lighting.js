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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ---------------------------
    // Ambient Light
    // ---------------------------
    this.ambient = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(this.ambient);

    // ---------------------------

    // ---------------------------
    // Fog Ground (environment base)
    // ---------------------------
    const fogGround = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({
        color: 0x050510,
        roughness: 1,
        metalness: 0,
      }),
    );

    fogGround.rotation.x = -Math.PI / 2;
    fogGround.position.y = -0.02;

    this.scene.add(fogGround);
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
