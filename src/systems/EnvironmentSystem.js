import * as THREE from "three";

export class EnvironmentSystem {
  constructor(scene, gameManager) {
    this.scene = scene;
    this.gameManager = gameManager;

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

    this.sun.castShadow = true;
    this.sun.shadow.mapSize.width = 2048;
    this.sun.shadow.mapSize.height = 2048;
    this.sun.shadow.camera.near = 0.5;
    this.sun.shadow.camera.far = 200;

    /* control shadow area */
    this.sun.shadow.camera.left = -30;
    this.sun.shadow.camera.right = 30;
    this.sun.shadow.camera.top = 30;
    this.sun.shadow.camera.bottom = -30;

    this.sun.position.set(5, 10, 5);
    this.environmentGroup.add(this.sun);

    /* sun mesh */
    const sunGeometry = new THREE.SphereGeometry(8, 32, 32);

    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffcc66,
    });

    this.sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    this.environmentGroup.add(this.sunMesh);

    /* sun halo */

    const sunHaloGeometry = new THREE.SphereGeometry(14, 32, 32);
    const sunHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb27a,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.sunHalo = new THREE.Mesh(sunHaloGeometry, sunHaloMaterial);
    this.environmentGroup.add(this.sunHalo);

    /* =========================
SUN RAYS
========================= */

    const rayGeometry = new THREE.ConeGeometry(40, 120, 32, 1, true);

    const rayMaterial = new THREE.MeshBasicMaterial({
      color: 0xffc58f,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.sunRays = new THREE.Mesh(rayGeometry, rayMaterial);

    this.sunRays.rotation.x = Math.PI / 2;
    this.sunRays.visible = false;

    this.environmentGroup.add(this.sunRays);
    /* =========================
MOON
========================= */

    const moonGeometry = new THREE.SphereGeometry(1.4, 32, 32);

    const moonMaterial = new THREE.MeshBasicMaterial({
      color: 0xdfefff,
      toneMapped: false,
      fog: false,
      depthWrite: false,
    });

    //  FORCE BRIGHTNESS BOOST
    moonMaterial.color.multiplyScalar(1.5);

    this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    this.environmentGroup.add(this.moonMesh);
    this.moonMesh.renderOrder = 10;
    console.log("Moon created:", this.moonMesh);

    this.moonMesh.scale.set(1.6, 1.6, 1.6);

    this.moonMesh.visible = false;

    /* moon glow */

    const moonHaloGeometry = new THREE.SphereGeometry(3.5, 32, 32);

    const moonHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0xbcd4ff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.moonHalo = new THREE.Mesh(moonHaloGeometry, moonHaloMaterial);
    this.moonHalo.material.opacity = 5;
    this.moonHalo.material.depthWrite = false;
    this.moonHalo.material.blending = THREE.AdditiveBlending;
    this.environmentGroup.add(this.moonHalo);
    this.moonHalo.renderOrder = 9;

    this.moonHalo.scale.set(4, 4, 4);

    this.moonHalo.visible = false;

    const moonCoreGlowGeometry = new THREE.SphereGeometry(1.6, 32, 32);

    const moonCoreGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.moonCoreGlow = new THREE.Mesh(
      moonCoreGlowGeometry,
      moonCoreGlowMaterial,
    );

    this.environmentGroup.add(this.moonCoreGlow);

    this.moonCoreGlow.scale.set(1.8, 1.8, 1.8);
    this.moonCoreGlow.visible = false;

    /* =========================
STARS (PARTICLE SYSTEM)
========================= */

    const starCount = 1000;
    const starGeometry = new THREE.BufferGeometry();

    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = Math.random() * 60 + 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xbcd4ff,
      size: 2,
      sizeAttenuation: true,
      depthWrite: false,
      transparent: true,
      opacity: 0.9,
    });

    this.stars = new THREE.Points(starGeometry, starMaterial);
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
    console.log("applyState called, batmanMode:", this.gameManager?.batmanMode);
    // 🔥 BATMAN MODE OVERRIDE (GLOBAL CONTROL)
    if (this.gameManager?.batmanMode) {
      this.sun.visible = false;
      this.sunMesh.visible = false;
      this.sunHalo.visible = false;
      this.sunRays.visible = false;

      this.moonMesh.visible = false;
      this.moonHalo.visible = false;
      this.moonCoreGlow.visible = false;

      this.stars.visible = false;

      this.scene.background = new THREE.Color("#000000");

      return; // 🚨 STOP everything else
    }
    let targetColor;
    let targetIntensity;
    let targetPosition;
    let targetBackground;

    switch (state) {
      case "morning":
        targetColor = new THREE.Color("#ffd8a8");
        targetIntensity = 1.05;
        targetPosition = new THREE.Vector3(220, 120, 400);
        targetBackground = new THREE.Color("#ffe8cc");

        this.sun.visible = true;
        this.sunRays.visible = true;
        this.sunMesh.visible = true;
        this.sunHalo.visible = true;

        this.moonMesh.visible = false;
        this.moonHalo.visible = false;
        this.stars.visible = false;

        break;

      case "noon":
        targetColor = new THREE.Color("#ffffff");
        targetIntensity = 1.2;
        targetPosition = new THREE.Vector3(0, 120, 350);
        targetBackground = new THREE.Color("#dbefff");

        this.sun.visible = true;
        this.sunRays.visible = false;
        this.sunMesh.visible = true;
        this.sunHalo.visible = true;

        this.moonMesh.visible = false;
        this.moonHalo.visible = false;
        this.stars.visible = false;

        break;

      case "evening":
        /* sunset lighting */

        targetColor = new THREE.Color("#ff9e6d"); // warm sunset orange
        targetIntensity = 1.0;

        targetPosition = new THREE.Vector3(-220, 120, 400);

        /* pink sunset sky */

        targetBackground = new THREE.Color("#ffc9a9");

        this.sun.visible = true;
        this.sunRays.visible = true;
        this.sunMesh.visible = true;
        this.sunHalo.visible = true;

        this.moonMesh.visible = false;
        this.moonHalo.visible = false;
        this.stars.visible = false;

        break;

      case "night":
        console.log("🌙 NIGHT MODE ACTIVE");

        targetColor = new THREE.Color("#9bbcff");
        targetIntensity = 0.12;
        targetPosition = new THREE.Vector3(0, -6, 20);
        targetBackground = new THREE.Color("#01030b");

        this.sun.visible = false;
        this.sunRays.visible = false;
        this.sunMesh.visible = false;
        this.sunHalo.visible = false;

        // 🌙 Moon visible
        this.moonMesh.visible = true;
        this.moonHalo.visible = true;
        this.moonCoreGlow.visible = true;

        // ✅ FIXED POSITION (sky, not room)
        this.moonMesh.position.set(0, 14, 35);

        // sync all layers
        this.moonHalo.position.copy(this.moonMesh.position);
        this.moonCoreGlow.position.copy(this.moonMesh.position);

        // ⭐ Stars (leave as is)
        this.stars.visible = true;

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

      this.sunHalo.position.copy(this.sun.position);
      this.sunRays.lookAt(0, 1.5, 0);
      this.sunRays.rotation.z = 0.25;
      this.sunMesh.position.copy(this.sun.position);

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
