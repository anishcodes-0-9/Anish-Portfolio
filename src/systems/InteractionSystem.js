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
    this.guideHighlighted = null;

    this.originalScales = new Map();
    this.originalPositions = new Map();

    this.hoverScale = 1.06;

    this.wallTypes = [
      "monitor_left",
      "monitor_right",
      "window",
      "batman",
      "about",
      "phone",
      "random_fact",
      "random_thought",
    ];

    this.highlightTypes = ["keyboard", "mouse", "Dumbell_L", "Dumbell_R"];
  }

  register(object) {
    this.interactiveObjects.push(object);
  }

  init() {
    // 🔥 unified input (mouse + touch)
    this.domElement.addEventListener("pointerdown", this.onClick.bind(this));
    this.domElement.addEventListener(
      "pointermove",
      this.onMouseMove.bind(this),
    );
  }

  onMouseMove(event) {
    if (window.innerWidth < 768) return;
    const rect = this.domElement.getBoundingClientRect();

    //  unified pointer support (mouse + touch)
    const clientX = event.clientX ?? event.touches?.[0]?.clientX;
    const clientY = event.clientY ?? event.touches?.[0]?.clientY;

    this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.interactiveObjects,
      true,
    );

    if (intersects.length === 0) {
      this.clearHover();
      return;
    }

    const hit = this.getRootInteractive(intersects[0].object);

    if (this.hovered !== hit) {
      this.clearHover();
      this.setHover(hit);
    }

    if (this.hovered && window.app.tooltip) {
      window.app.tooltip.show(
        this.hovered.userData.type,
        event.clientX,
        event.clientY,
      );
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

    if (
      (this.wallTypes.includes(object.userData.type) ||
        this.highlightTypes.includes(object.userData.type)) &&
      object.material &&
      object.material.emissive
    ) {
      object.material.emissive.set(0xffa64d);
      object.material.emissiveIntensity = 0.9;

      if (
        object.userData.type === "Dumbell_L" ||
        object.userData.type === "Dumbell_R"
      ) {
        object.material.emissiveIntensity = 1.2;
      }
    }

    this.domElement.style.cursor = "pointer";
  }

  clearHover() {
    if (!this.hovered) return;

    const originalPos = this.originalPositions.get(this.hovered);
    if (originalPos) this.hovered.position.copy(originalPos);

    const originalScale = this.originalScales.get(this.hovered);
    if (originalScale) this.hovered.scale.copy(originalScale);

    if (this.hovered.material && this.hovered.material.emissive) {
      if (this.hovered.userData.type === "lamp") {
        const lamp = window.portfolioObjects?.lampLight;
        this.hovered.material.emissiveIntensity = lamp?.visible ? 1.2 : 0;
      } else {
        this.hovered.material.emissiveIntensity = 0;
        this.hovered.material.emissive.set(0x000000);
      }
    }

    if (window.app.tooltip) {
      window.app.tooltip.hide();
    }

    this.hovered = null;
    this.domElement.style.cursor = "default";
  }

  update() {
    if (!this.hovered) return;

    const type = this.hovered.userData.type;

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

    const originalScale = this.originalScales.get(this.hovered);
    if (!originalScale) return;

    const targetScale = originalScale.clone().multiplyScalar(this.hoverScale);
    this.hovered.scale.lerp(targetScale, 0.1);
  }

  onClick(event) {
    this.clearHover();
    this.clearGuideHighlight();
    const rect = this.domElement.getBoundingClientRect();
    //
    const clientX = event.clientX ?? event.touches?.[0]?.clientX;
    const clientY = event.clientY ?? event.touches?.[0]?.clientY;

    this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.interactiveObjects,
      true,
    );

    if (intersects.length === 0) return;

    let clicked = null;

    for (const hit of intersects) {
      const candidate = this.getRootInteractive(hit.object);
      if (!candidate) continue;

      if (candidate.userData.type) {
        clicked = candidate;
        break;
      }
    }

    if (!clicked) return;

    const type = clicked.userData.type;
    //  hide guide on mobile when interacting in 3D
    if (window.innerWidth < 768) {
      const guide = document.getElementById("interactionGuide");
      const helpBtn = document.getElementById("guide-help");

      if (guide && helpBtn) {
        guide.style.display = "none";
        helpBtn.style.display = "block";
      }
    }

    if (type === "chair") window.app.enterWorkMode();
    if (type === "batman") window.app.gameManager.activateBatmanMode();
    if (type === "monitor_left") window.app.ui.open("projects");
    if (type === "monitor_right") window.app.ui.open("work");

    if (type === "window") {
      if (window.app.gameManager.batmanMode) return;
      window.app.environmentSystem.cycleTimeOfDay();
    }

    if (type === "football") window.app.ui.open("footballGame");
    if (type === "alexa") window.app.ui.open("aiChat");
    if (type === "phone") window.app.ui.open("phone");
    if (type === "keyboard") window.app.ui.open("personalProjects");
    if (type === "mouse") window.open("/Anish_Krishnan_Resume.html", "_blank");
    if (type === "about") window.app.ui.open("about");
    if (type === "Dumbell_L") window.app.ui.open("certifications");
    if (type === "Dumbell_R") window.app.ui.open("engineeringStrengths");
    if (type === "cpu") window.app.ui.open("techStack");
    if (type === "random_fact") window.app.ui.open("randomFact");
    if (type === "random_thought") window.app.ui.open("randomThought");

    if (type === "lamp") {
      const lamp = window.portfolioObjects?.lampLight;
      const shade = window.portfolioObjects?.lampShade;

      if (!lamp) return;

      lamp.visible = !lamp.visible;

      if (shade && shade.material) {
        shade.material.emissiveIntensity = lamp.visible ? 1.2 : 0;
      }
    }
  }

  getRootInteractive(object) {
    let current = object;
    while (current && !current.userData.type) {
      current = current.parent;
    }
    return current || object;
  }

  /* ✅ FIXED GUIDE HIGHLIGHT */
  highlightByType(type) {
    const candidates = this.interactiveObjects.filter(
      (o) => o.userData.type === type,
    );

    const obj = candidates.find((o) => o.material && o.material.emissive);

    if (!obj) return;

    if (this.hovered) this.clearHover();
    if (this.guideHighlighted) this.clearGuideHighlight();

    this.guideHighlighted = obj;

    obj.material.emissive.set(0xffa64d);
    obj.material.emissiveIntensity = 1.2;
  }

  clearGuideHighlight() {
    const obj = this.guideHighlighted;
    if (!obj || !obj.material || !obj.material.emissive) return;

    obj.material.emissive.set(0x000000);
    obj.material.emissiveIntensity = 0;

    this.guideHighlighted = null;
  }
}
