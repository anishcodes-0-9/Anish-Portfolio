export class LightManager {
  constructor(renderer) {
    this.renderer = renderer;
    this.windowMesh = null;
  }

  setWindowMesh(mesh) {
    this.windowMesh = mesh;
  }

  applyMode(mode) {
    if (!this.windowMesh) return;

    switch (mode) {
      case "morning":
        this.windowMesh.material.emissive.set(0xffcc88);
        this.windowMesh.material.emissiveIntensity = 0.8;
        this.renderer.toneMappingExposure = 1.1;
        break;

      case "noon":
        this.windowMesh.material.emissive.set(0xffffff);
        this.windowMesh.material.emissiveIntensity = 1.2;
        this.renderer.toneMappingExposure = 1.3;
        break;

      case "evening":
        this.windowMesh.material.emissive.set(0xff8844);
        this.windowMesh.material.emissiveIntensity = 0.9;
        this.renderer.toneMappingExposure = 1.0;
        break;

      case "night":
        this.windowMesh.material.emissive.set(0x2244ff);
        this.windowMesh.material.emissiveIntensity = 0.6;
        this.renderer.toneMappingExposure = 0.7;
        break;
    }

    console.log("Theme applied:", mode);
  }
}
