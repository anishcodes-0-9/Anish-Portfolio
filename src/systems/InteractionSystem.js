import * as THREE from "three";

export class InteractionSystem {
  constructor(scene, camera, domElement) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.interactiveObjects = [];

    this.hovered = null;

    this.originalScales = new Map();
    this.originalPositions = new Map();

    this.hoverScale = 1.06;

    // FIXED: removed comma inside "phone"
    this.wallTypes = [
      "monitor_left",
      "monitor_right",
      "window",
      "batman",
      "about",
      "phone",
    ];
  }

  register(object) {
    this.interactiveObjects.push(object);
  }

  init() {
    this.domElement.addEventListener("click", this.onClick.bind(this));
    this.domElement.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onMouseMove(event) {
    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.interactiveObjects,
      true,
    );

    if (intersects.length === 0) {
      this.clearHover();
      return;
    }

    // FIXED: always resolve to root interactive object
    const hit = this.getRootInteractive(intersects[0].object);

    if (this.hovered !== hit) {
      this.clearHover();
      this.setHover(hit);
    }
  }

  setHover(object) {
    this.hovered = object;

    if (!this.originalScales.has(object)) {
      this.originalScales.set(object, object.scale.clone());
    }

    if (!this.originalPositions.has(object)) {
      this.originalPositions.set(object, object.position.clone());
    }

    // Subtle glow for wall objects
    if (
      this.wallTypes.includes(object.userData.type) &&
      object.material &&
      object.material.emissive
    ) {
      object.material.emissiveIntensity = 0.4;
    }

    this.domElement.style.cursor = "pointer";
  }

  clearHover() {
    if (!this.hovered) return;

    const originalPos = this.originalPositions.get(this.hovered);
    if (originalPos) {
      this.hovered.position.copy(originalPos);
    }

    const originalScale = this.originalScales.get(this.hovered);
    if (originalScale) {
      this.hovered.scale.copy(originalScale);
    }

    if (this.hovered.material && this.hovered.material.emissive) {
      this.hovered.material.emissiveIntensity = 0;
    }

    this.hovered = null;
    this.domElement.style.cursor = "default";
  }

  update() {
    if (!this.hovered) return;

    const type = this.hovered.userData.type;

    // WALL OBJECTS → move toward camera slightly
    if (this.wallTypes.includes(type)) {
      const original = this.originalPositions.get(this.hovered);
      if (!original) return;

      const worldPos = new THREE.Vector3();
      this.hovered.getWorldPosition(worldPos);

      const dirToCamera = new THREE.Vector3()
        .subVectors(this.camera.position, worldPos)
        .normalize();

      const offset = dirToCamera.multiplyScalar(0.05);

      const target = original.clone().add(offset);

      this.hovered.position.lerp(target, 0.15);
      return;
    }

    // OTHER OBJECTS → scale pop
    const originalScale = this.originalScales.get(this.hovered);
    if (!originalScale) return;

    const targetScale = originalScale.clone().multiplyScalar(this.hoverScale);
    this.hovered.scale.lerp(targetScale, 0.1);
  }

  onClick(event) {
    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.interactiveObjects,
      true,
    );

    if (intersects.length === 0) return;

    const clicked = this.getRootInteractive(intersects[0].object);

    if (clicked.userData.type) {
      console.log("Clicked:", clicked.userData.type);

      if (clicked.userData.type === "batman") {
        if (window.app && window.app.gameManager) {
          window.app.gameManager.activateBatmanMode();
        }
      }

      if (clicked.userData.type === "monitor_left") {
        if (window.app && window.app.ui) {
          window.app.ui.open("projects");
        }
      }

      if (clicked.userData.type === "monitor_right") {
        if (window.app && window.app.ui) {
          window.app.ui.open("work");
        }
      }
      /*Window*/
      if (clicked.userData.type === "window") {
        if (window.app.gameManager.batmanMode) return;

        window.app.environmentSystem.cycleTimeOfDay();
      }
      /* ⚽ FOOTBALL GAME */
      if (clicked.userData.type === "football") {
        if (window.app && window.app.ui) {
          window.app.ui.open("footballGame");
        }
      }
      /* 🤖 ALEXA AI CHAT */
      if (clicked.userData.type === "alexa") {
        if (window.app && window.app.ui) {
          window.app.ui.open("aiChat");
        }
      }
    }
  } // FIXED: Properly placed inside class (not inside onClick)
  getRootInteractive(object) {
    let current = object;

    while (current && !current.userData.type) {
      current = current.parent;
    }

    return current || object;
  }
}
