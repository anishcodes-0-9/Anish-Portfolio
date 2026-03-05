import * as THREE from "three";

export class EnvironmentSystem {
  constructor(scene) {
    this.scene = scene;

    this.states = ["morning", "noon", "evening", "night"];

    this.index = this.getInitialTimeIndex();

    /* =========================
ENVIRONMENT GROUP
========================= */

    this.environmentGroup = new THREE.Group();
    this.scene.add(this.environmentGroup);

    /* =========================
SUN
========================= */

    this.sun = new THREE.DirectionalLight(0xffffff, 1);
    this.sun.position.set(5, 10, 5);
    this.environmentGroup.add(this.sun);

    /* sun mesh */

    const sunGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffdd88 });

    this.sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    this.environmentGroup.add(this.sunMesh);

    /* sun halo */

    const sunHaloGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0xffdd88,
      transparent: true,
      opacity: 0.2,
    });

    this.sunHalo = new THREE.Mesh(sunHaloGeometry, sunHaloMaterial);
    this.environmentGroup.add(this.sunHalo);

    /* =========================
MOON
========================= */

    const moonGeometry = new THREE.SphereGeometry(1.4, 32, 32);

    const moonMaterial = new THREE.MeshBasicMaterial({
      color: 0xf2f2f2,
    });

    this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    this.environmentGroup.add(this.moonMesh);

    this.moonMesh.visible = false;

    /* moon glow */

    const moonHaloGeometry = new THREE.SphereGeometry(3.5, 32, 32);

    const moonHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0x9fbfff,
      transparent: true,
      opacity: 0.45,
    });

    this.moonHalo = new THREE.Mesh(moonHaloGeometry, moonHaloMaterial);
    this.environmentGroup.add(this.moonHalo);

    this.moonHalo.visible = false;

    /* =========================
STAR SKY DOME
========================= */

    const starGeometry = new THREE.SphereGeometry(500, 32, 32);

    const starTexture = new THREE.TextureLoader().load(
      "/textures/starfield.jpg",
      (texture) => {
        console.log("Star texture loaded");

        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
      },
      undefined,
      () => console.error("Star texture failed to load"),
    );

    const starMaterial = new THREE.MeshBasicMaterial({
      map: starTexture,
      side: THREE.BackSide,
      fog: false,
    });

    this.stars = new THREE.Mesh(starGeometry, starMaterial);
    this.stars.rotation.y = Math.PI;

    this.environmentGroup.add(this.stars);

    this.stars.visible = false;

    /* =========================
INITIAL STATE
========================= */

    const initialState = this.states[this.index];

    console.log("Initial time detected:", initialState);

    this.applyState(initialState);
  }

  /* =========================
REAL TIME DETECTION
========================= */

  getInitialTimeIndex() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 11) return 0;
    if (hour >= 11 && hour < 16) return 1;
    if (hour >= 16 && hour < 19) return 2;

    return 3;
  }

  /* =========================
WINDOW CLICK CYCLE
========================= */

  cycleTimeOfDay() {
    this.index = (this.index + 1) % this.states.length;

    const state = this.states[this.index];

    console.log("Time of day:", state);

    this.applyState(state);
  }

  /* =========================
BATMAN MODE
========================= */

  hideSun() {
    this.sun.visible = false;
    this.sunMesh.visible = false;
    this.sunHalo.visible = false;

    /* darken sky for batman mode */

    this.scene.background = new THREE.Color("#000000");

    if (this.stars) this.stars.material.opacity = 1;
  }

  showSun() {
    this.sun.visible = true;
    this.sunMesh.visible = true;
    this.sunHalo.visible = true;

    /* restore sky */

    const state = this.states[this.index];

    if (state === "night") {
      this.scene.background = new THREE.Color("#01030b");
    } else {
      this.scene.background = new THREE.Color("#dbefff");
    }
  }

  /* =========================
STATE APPLICATION
========================= */

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

        this.sun.visible = true;
        this.sunMesh.visible = true;
        this.sunHalo.visible = true;

        this.moonMesh.visible = false;
        this.moonHalo.visible = false;
        this.stars.visible = false;

        break;

      case "noon":
        targetColor = new THREE.Color("#ffffff");
        targetIntensity = 1.2;
        targetPosition = new THREE.Vector3(0, 14, 22);
        targetBackground = new THREE.Color("#dbefff");

        this.sun.visible = true;
        this.sunMesh.visible = true;
        this.sunHalo.visible = true;

        this.moonMesh.visible = false;
        this.moonHalo.visible = false;
        this.stars.visible = false;

        break;

      case "evening":
        targetColor = new THREE.Color("#ffb347");
        targetIntensity = 0.7;
        targetPosition = new THREE.Vector3(-10, 10, 20);
        targetBackground = new THREE.Color("#ffd6a5");

        this.sun.visible = true;
        this.sunMesh.visible = true;
        this.sunHalo.visible = true;

        this.moonMesh.visible = false;
        this.moonHalo.visible = false;
        this.stars.visible = false;

        break;

      case "night":
        targetColor = new THREE.Color("#9bbcff");
        targetIntensity = 0.25;
        targetPosition = new THREE.Vector3(0, -6, 20);
        targetBackground = new THREE.Color("#01030b");

        this.sun.visible = false;
        this.sunMesh.visible = false;
        this.sunHalo.visible = false;

        this.moonMesh.visible = true;
        this.moonHalo.visible = true;

        this.stars.visible = true;
        this.stars.position.y = 15;

        this.moonMesh.position.set(-8, 14, 25);
        this.moonHalo.position.copy(this.moonMesh.position);

        break;
    }

    /* background animation */

    let startBackground;

    if (this.scene.background && this.scene.background.isColor) {
      startBackground = this.scene.background.clone();
    } else {
      startBackground = new THREE.Color("#ffffff");
    }

    const startColor = this.sun.color.clone();
    const startIntensity = this.sun.intensity;
    const startPosition = this.sun.position.clone();

    let progress = 0;

    const animate = () => {
      progress += 0.03;

      this.sun.color.lerpColors(startColor, targetColor, progress);

      this.sun.intensity = THREE.MathUtils.lerp(
        startIntensity,
        targetIntensity,
        progress,
      );

      this.sun.position.lerpVectors(startPosition, targetPosition, progress);

      this.sunMesh.position.copy(this.sun.position);
      this.sunHalo.position.copy(this.sun.position);

      const blended = startBackground.clone().lerp(targetBackground, progress);

      this.scene.background = blended;

      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
  }

  /* =========================
UPDATE
========================= */

  update(time) {
    /* slow sky movement */

    if (this.stars && this.stars.visible) {
      this.stars.rotation.y += 0.00002;
    }
  }
}
