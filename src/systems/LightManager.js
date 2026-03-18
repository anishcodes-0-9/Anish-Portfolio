import * as THREE from "three";

export class LightManager {
  constructor(lighting, renderer) {
    this.lighting = lighting;
    this.renderer = renderer;

    this.current = {
      pos: new THREE.Vector3(),
      color: new THREE.Color(),
      intensity: 1,
      ambient: 0.6,
      exposure: 1,
    };

    this.target = null;

    this.progress = 1;
    this.duration = 3.0; // cinematic duration
  }

  applyMode(mode) {
    this.currentMode = mode;
    const configs = {
      morning: {
        pos: new THREE.Vector3(15, 4, 0),
        color: 0xffc27f,
        ambient: 0.65,
        intensity: 1.6,
        exposure: 1.65,
        shadowBias: -0.0002,
        skyTop: "#ffcc99",
        skyBottom: "#ffe6cc",
      },

      noon: {
        pos: new THREE.Vector3(15, 10, 0),
        color: 0xffffff,
        intensity: 1.8,
        ambient: 0.85,
        exposure: 1.2,
        skyTop: "#75c3ff",
        skyBottom: "#ffffff",
      },

      evening: {
        pos: new THREE.Vector3(15, 4, -5),
        color: 0xff8c42,
        intensity: 1.0,
        ambient: 0.4,
        exposure: 0.85,
        skyTop: "#ff9966",
        skyBottom: "#4b2e83",
      },

      night: {
        pos: new THREE.Vector3(3, 5, -3),
        color: 0x334466,
        intensity: 0.7,
        ambient: 0.3,
        exposure: 0.75,
        skyTop: "#13233f",
        skyBottom: "#0b1220",
      },

      batman: {
        pos: new THREE.Vector3(3, 5, -2),
        color: 0xff3300,
        intensity: 0.9,
        ambient: 0.35,
        exposure: 0.85,
        skyTop: "#0a0a12",
        skyBottom: "#000000",
      },
    };

    const config = configs[mode];
    if (!config) return;

    // Set sky instantly (sky doesn't need interpolation)
    this.lighting.setSkyColor(config.skyTop, config.skyBottom);

    //  SAFE GUARD to ensure lights exist before using
    if (!this.lighting || !this.lighting.sun || !this.lighting.ambient) {
      console.warn("LightManager: lighting not ready yet");
      return;
    }

    // Store current state before transition
    this.current.pos.copy(this.lighting.sun.position);
    this.current.color.copy(this.lighting.sun.color);
    this.current.intensity = this.lighting.sun.intensity;
    this.current.ambient = this.lighting.ambient.intensity;
    this.current.exposure = this.renderer.toneMappingExposure;

    this.target = config;
    this.progress = 0;

    console.log("Theme applied:", mode);
  }

  update(delta) {
    if (!this.target || this.progress >= 1) return;

    this.progress += delta / this.duration;
    this.lighting.sun.shadow.bias = this.target.shadowBias;
    const t = Math.min(this.progress, 1);

    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    if (!this.lighting || !this.lighting.sun || !this.lighting.ambient) return;
    const sun = this.lighting.sun;
    const ambient = this.lighting.ambient;

    sun.position.lerpVectors(this.current.pos, this.target.pos, eased);

    const targetColor = new THREE.Color(this.target.color);
    sun.color.copy(this.current.color.clone().lerp(targetColor, eased));

    sun.intensity = THREE.MathUtils.lerp(
      this.current.intensity,
      this.target.intensity,
      eased,
    );

    ambient.intensity = THREE.MathUtils.lerp(
      this.current.ambient,
      this.target.ambient,
      eased,
    );

    this.renderer.toneMappingExposure = THREE.MathUtils.lerp(
      this.current.exposure,
      this.target.exposure,
      eased,
    );
  }

  /*  ADD THESE METHODS RIGHT HERE */

  setOverride(mode) {
    this.previousMode = this.currentMode;
    this.applyMode(mode);
    this.isOverride = true;
  }

  clearOverride() {
    if (!this.previousMode) return;
    this.applyMode(this.previousMode);
    this.isOverride = false;
  }

  /*  THEN THIS LAST BRACE CLOSES THE CLASS */
}
