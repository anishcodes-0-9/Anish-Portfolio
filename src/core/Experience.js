import * as THREE from "three";
import { Renderer } from "./Renderer.js";
import { Camera } from "./Camera.js";
import { Controls } from "./Controls.js";
import { Lighting } from "../world/Lighting.js";
import { PortfolioRoom } from "../world/PortfolioRoom.js";
import { InteractionSystem } from "../systems/InteractionSystem.js";
import { registerAllPanels } from "../ui/registerPanels.js";
import { UIManager } from "../ui/UIManager.js";
import { AudioManager } from "../systems/AudioManager.js";
import { TimeManager } from "../systems/TimeManager.js";
import { LightManager } from "../systems/LightManager.js";
import { GameManager } from "../systems/GameManager.js";
import { EnvironmentSystem } from "../systems/EnvironmentSystem.js";
import { TooltipManager } from "../ui/TooltipManager.js";

export class Experience {
  constructor() {
    this.scene = new THREE.Scene();

    this.scene.fog = new THREE.FogExp2(0x050510, 0.045);
    this.scene.background = new THREE.Color(0x111111);

    this.workMode = false;

    this.camera = new Camera();
    this.renderer = new Renderer();

    this.controls = new Controls(
      this.camera.instance,
      this.renderer.instance.domElement,
    );

    this.interaction = new InteractionSystem(
      this.scene,
      this.camera.instance,
      this.renderer.instance.domElement,
    );

    this.gameManager = new GameManager(this.lightManager);

    this.ui = new UIManager();
    registerAllPanels(this.ui);
    this.tooltip = new TooltipManager();

    this.audio = new AudioManager();
    this.audio.register("batman", "/audio/batman-theme.mp3", true);

    this.time = new TimeManager();

    this.lighting = new Lighting(this.scene, this.renderer.instance);
    this.lightManager = new LightManager(this.lighting, this.renderer.instance);

    this.environmentSystem = new EnvironmentSystem(
      this.scene,
      this.gameManager,
    );

    this.room = new PortfolioRoom(
      this.scene,
      this.camera.instance,
      this.controls.instance,
      this.interaction,
    );

    window.addEventListener("resize", this.onResize.bind(this));

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.exitWorkMode();
      }
    });
  }

  init() {
    this.renderer.init();
    this.lighting.init();

    this.room.init(() => {
      this.lightManager.applyMode(this.time.getMode());
    });

    this.interaction.init();

    document.getElementById("work-close").onclick = () => {
      this.exitWorkMode();
    };

    window.app = {
      ui: this.ui,
      audio: this.audio,
      gameManager: this.gameManager,
      lightManager: this.lightManager,
      environmentSystem: this.environmentSystem,
      tooltip: this.tooltip,
      enterWorkMode: this.enterWorkMode.bind(this),
    };

    this.animate();
  }

  enterWorkMode() {
    if (this.workMode) return;

    this.workMode = true;

    const camera = this.camera.instance;
    const controls = this.controls.instance;

    const chair = window.roomModel?.getObjectByName("Chair");

    if (chair) {
      chair.traverse((child) => {
        if (child.isMesh) {
          child.visible = false;
          child.layers.disable(0); // disable raycasting safely
        }
      });
    }

    controls.enabled = false;

    const start = camera.position.clone();

    const targetPosition = new THREE.Vector3(0, 1.25, -0.15);
    const lookTarget = new THREE.Vector3(0, 1.25, 0.8);

    let progress = 0;

    const animate = () => {
      progress += 0.04;

      camera.position.lerpVectors(start, targetPosition, progress);
      camera.lookAt(lookTarget);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    const ui = document.getElementById("work-mode-ui");
    if (ui) ui.style.display = "flex";
  }
  exitWorkMode() {
    if (!this.workMode) return;

    this.workMode = false;

    const camera = this.camera.instance;
    const controls = this.controls.instance;

    const chair = window.roomModel?.getObjectByName("Chair");

    if (chair) {
      chair.traverse((child) => {
        if (child.isMesh) {
          child.visible = true;
          child.layers.enable(0); // restore raycasting
        }
      });
    }

    const start = camera.position.clone();
    const target = new THREE.Vector3(0, 2.2, -6);
    const lookTarget = new THREE.Vector3(0, 1.3, 0.5);

    let progress = 0;

    const animate = () => {
      progress += 0.04;

      camera.position.lerpVectors(start, target, progress);
      camera.lookAt(lookTarget);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        controls.enabled = true;
        controls.target.set(0, 1.3, 0.5);
        controls.update();
      }
    };

    animate();

    const ui = document.getElementById("work-mode-ui");
    if (ui) ui.style.display = "none";
  }

  onResize() {
    this.camera.onResize();
    this.renderer.onResize();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = 0.016;

    this.lightManager.update(delta);

    this.gameManager.update(performance.now() * 0.001);

    this.environmentSystem.update(performance.now() * 0.001);

    this.interaction.update();

    this.controls.update();

    this.renderer.render(this.scene, this.camera.instance);
  }
}
