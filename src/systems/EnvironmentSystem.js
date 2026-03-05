import * as THREE from "three";

export class EnvironmentSystem {
  constructor(scene) {
    this.scene = scene;

    this.states = ["morning", "noon", "evening", "night"];

    /* detect user local time */

    this.index = this.getInitialTimeIndex();

    /* environment container */

    this.environmentGroup = new THREE.Group();
    this.scene.add(this.environmentGroup);

    /* main directional sun light */

    this.sun = new THREE.DirectionalLight(0xffffff, 1);
    this.sun.position.set(5, 10, 5);

    this.environmentGroup.add(this.sun);

    /* visible sun mesh */

    const sunGeometry = new THREE.SphereGeometry(0.6, 32, 32);

    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffdd88,
    });

    this.sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);

    this.environmentGroup.add(this.sunMesh);

    /* apply correct starting state */

    const initialState = this.states[this.index];

    console.log("Initial time detected:", initialState);

    this.applyState(initialState);
  }

  /* detect real world time */

  getInitialTimeIndex() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 11) return 0; // morning
    if (hour >= 11 && hour < 16) return 1; // noon
    if (hour >= 16 && hour < 19) return 2; // evening

    return 3; // night
  }

  /* window click cycles states */

  cycleTimeOfDay() {
    this.index = (this.index + 1) % this.states.length;

    const state = this.states[this.index];

    console.log("Time of day:", state);

    this.applyState(state);
  }

  /* hide sun for cinematic modes */

  hideSun() {
    this.sun.visible = false;
    this.sunMesh.visible = false;
  }

  /* restore sun */

  showSun() {
    this.sun.visible = true;
    this.sunMesh.visible = true;
  }

  applyState(state) {
    let targetColor;
    let targetIntensity;
    let targetPosition;
    let targetBackground;

    switch (state) {
      case "morning":
        targetColor = new THREE.Color("#ffd8a8");
        targetIntensity = 0.8;
        targetPosition = new THREE.Vector3(10, 10, 20);
        targetBackground = new THREE.Color("#ffe8cc");

        break;

      case "noon":
        targetColor = new THREE.Color("#ffffff");
        targetIntensity = 1.2;
        targetPosition = new THREE.Vector3(0, 14, 22);
        targetBackground = new THREE.Color("#dbefff");

        break;

      case "evening":
        targetColor = new THREE.Color("#ffb347");
        targetIntensity = 0.7;
        targetPosition = new THREE.Vector3(-10, 10, 20);
        targetBackground = new THREE.Color("#ffd6a5");

        break;

      case "night":
        targetColor = new THREE.Color("#a3c9ff");
        targetIntensity = 0.25;
        targetPosition = new THREE.Vector3(0, -6, 20);
        targetBackground = new THREE.Color("#0b1d3a");

        break;
    }

    /* ensure starting background exists */

    let startBackground;

    if (this.scene.background && this.scene.background.isColor) {
      startBackground = this.scene.background.clone();
    } else {
      startBackground = new THREE.Color("#ffffff");
    }

    const startColor = this.sun.color.clone();
    const startIntensity = this.sun.intensity;
    const startPosition = this.sun.position.clone();

    /* animation */

    let progress = 0;

    const animate = () => {
      progress += 0.03;

      /* sun color transition */

      this.sun.color.lerpColors(startColor, targetColor, progress);

      /* intensity transition */

      this.sun.intensity = THREE.MathUtils.lerp(
        startIntensity,
        targetIntensity,
        progress,
      );

      /* sun movement */

      this.sun.position.lerpVectors(startPosition, targetPosition, progress);

      /* sync mesh with light */

      this.sunMesh.position.copy(this.sun.position);

      /* sky color transition */

      const blended = startBackground.clone().lerp(targetBackground, progress);

      this.scene.background = blended;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }
}
