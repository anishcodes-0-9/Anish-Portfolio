import * as THREE from "three";

export class LightManager {
  constructor(renderer, lighting) {
    this.renderer = renderer;
    this.lighting = lighting; // reference to Lighting class
    this.windowMesh = null;
    this.currentMode = null;
    this.overrideMode = null;
  }

  setWindowMesh(mesh) {
    this.windowMesh = mesh;
  }

  setOverride(mode) {
    this.overrideMode = mode;
    this.applyMode(mode);
  }

  clearOverride() {
    this.overrideMode = null;
  }

  applyMode(mode) {
    if (!this.windowMesh) return;

    this.currentMode = mode;

    switch (mode) {
      case "morning":
        this._applyWindow(0xffcc88, 0.8);
        this._applyLighting(1.2, 0xffe0b2);
        this.renderer.toneMappingExposure = 1.1;
        break;

      case "noon":
        this._applyWindow(0xffffff, 1.2);
        this._applyLighting(1.4, 0xffffff);
        this.renderer.toneMappingExposure = 1.3;
        break;

      case "evening":
        this._applyWindow(0xff8844, 0.9);
        this._applyLighting(1.0, 0xffb366);
        this.renderer.toneMappingExposure = 1.0;
        break;

      case "night":
        this._applyWindow(0x2244ff, 0.6);
        this._applyLighting(0.6, 0x88aaff);
        this.renderer.toneMappingExposure = 0.7;
        break;
    }

    console.log("Theme applied:", mode);
  }

  _applyWindow(color, intensity) {
    this.windowMesh.material.emissive.set(color);
    this.windowMesh.material.emissiveIntensity = intensity;
  }

  _applyLighting(ambientIntensity, keyColor) {
    if (!this.lighting) return;

    this.lighting.ambient.intensity = ambientIntensity;
    this.lighting.keyLight.color.set(keyColor);
  }
}
