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

export class Experience {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);

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

    // UI
    this.ui = new UIManager();
    registerAllPanels(this.ui);

    // Systems
    this.audio = new AudioManager();
    this.time = new TimeManager();
    this.game = new GameManager();

    // World
    this.lighting = new Lighting(this.scene, this.renderer.instance);

    // IMPORTANT: create LightManager AFTER lighting
    this.lightManager = new LightManager(this.lighting, this.renderer.instance);

    this.room = new PortfolioRoom(
      this.scene,
      this.camera.instance,
      this.controls.instance,
      this.interaction,
    );

    window.addEventListener("resize", this.onResize.bind(this));
  }

  init() {
    this.renderer.init();
    this.lighting.init();

    this.room.init(() => {
      this.lightManager.applyMode(this.time.getMode());
    });

    this.interaction.init();
    this.animate();
  }

  onResize() {
    this.camera.onResize();
    this.renderer.onResize();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = 0.016; // simple fixed delta (60fps approx)
    this.lightManager.update(delta);
    this.interaction.update();
    this.controls.update();

    this.renderer.render(this.scene, this.camera.instance);
  }
}
