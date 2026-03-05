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

export class Experience {
  constructor() {
    this.scene = new THREE.Scene();

    /* Gotham style fog */

    this.scene.fog = new THREE.FogExp2(0x050510, 0.045);
    this.scene.background = new THREE.Color(0x111111);

    /* core systems */

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

    /* environment system */

    this.environmentSystem = new EnvironmentSystem(this.scene);

    /* UI */

    this.ui = new UIManager();
    registerAllPanels(this.ui);

    /* audio */

    this.audio = new AudioManager();
    this.audio.register("batman", "/audio/batman-theme.mp3", true);

    /* time manager */

    this.time = new TimeManager();

    /* world lighting */

    this.lighting = new Lighting(this.scene, this.renderer.instance);

    /* light manager */

    this.lightManager = new LightManager(this.lighting, this.renderer.instance);

    /* game manager */

    this.gameManager = new GameManager(this.lightManager);

    /* world */

    this.room = new PortfolioRoom(
      this.scene,
      this.camera.instance,
      this.controls.instance,
      this.interaction,
    );

    window.addEventListener("resize", this.onResize.bind(this));
  }

  /* initialize experience */

  init() {
    this.renderer.init();

    this.lighting.init();

    this.room.init(() => {
      this.lightManager.applyMode(this.time.getMode());
    });

    this.interaction.init();

    /* expose global systems */

    window.app = {
      ui: this.ui,

      audio: this.audio,

      gameManager: this.gameManager,

      lightManager: this.lightManager,

      environmentSystem: this.environmentSystem,
    };

    this.animate();
  }

  /* resize handler */

  onResize() {
    this.camera.onResize();
    this.renderer.onResize();
  }

  /* render loop */

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = 0.016;

    this.lightManager.update(delta);

    /* bat light flicker */

    this.gameManager.update(performance.now() * 0.001);

    this.interaction.update();

    this.controls.update();

    this.renderer.render(this.scene, this.camera.instance);
  }
}
