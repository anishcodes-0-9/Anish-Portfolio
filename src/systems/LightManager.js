export class LightManager {
  constructor(scene) {
    this.scene = scene;
    this.rgbEnabled = false;
  }

  toggleRGB() {
    this.rgbEnabled = !this.rgbEnabled;
    console.log("RGB Mode:", this.rgbEnabled);
  }

  setBatmanMode() {
    console.log("Batman mode activated");
  }

  reset() {
    console.log("Lights reset");
  }
}
