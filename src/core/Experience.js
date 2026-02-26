import * as THREE from "three";
import { Renderer } from "./Renderer.js";
import { Camera } from "./Camera.js";
import { Controls } from "./Controls.js";
import { Lighting } from "../world/Lighting.js";
import { PortfolioRoom } from "../world/PortfolioRoom.js";
import { InteractionSystem } from "../systems/InteractionSystem.js";

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

    this.lighting = new Lighting(this.scene);
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
    this.room.init();
    this.interaction.init();
    this.animate();
  }

  onResize() {
    this.camera.onResize();
    this.renderer.onResize();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera.instance);
  }
}
