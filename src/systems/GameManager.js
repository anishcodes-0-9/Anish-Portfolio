import * as THREE from "three";

export class GameManager {
  constructor(lightManager) {
    this.lightManager = lightManager;

    this.active = false;
    this.batmanMode = false;

    this.batLight = null;
    this.batSignal = null;
    this.batLogo = null;

    this.textureLoader = new THREE.TextureLoader();
    this.previousLampState = null;
  }

  start() {
    this.active = true;
    console.log("Game started");
  }

  stop() {
    this.active = false;
    console.log("Game stopped");
  }

  activateBatmanMode() {
    if (this.batmanMode) {
      this.disableBatmanMode();
      return;
    }

    this.batmanMode = true;

    console.log("Batman mode state:", this.batmanMode);
    console.log("Env exists?", !!window.app?.environmentSystem);

    //  force environment to update immediately
    if (window.app?.environmentSystem) {
      const env = window.app.environmentSystem;
      env.applyState(env.states[env.index]);
    }

    console.log("Batman mode activated");
    /* 🎥 camera punch */
    const camera = window.app?.camera?.instance;
    if (camera) {
      const originalZ = camera.position.z;

      let progress = 0;

      const punch = () => {
        progress += 0.15;

        // forward hit then settle back
        const offset =
          progress < 0.5
            ? -0.4 * (progress * 2)
            : -0.4 * (1 - (progress - 0.5) * 2);

        camera.position.z = originalZ + offset;

        if (progress < 1) {
          requestAnimationFrame(punch);
        } else {
          camera.position.z = originalZ;
        }
      };

      punch();
    }
    /*  UI IMPACT (flash + vignette) */
    const overlay = document.getElementById("batman-overlay");

    if (overlay) {
      overlay.classList.add("active");
      overlay.classList.add("flash");

      setTimeout(() => {
        overlay.classList.remove("flash");
      }, 600);
    }

    if (window.app && window.app.audio) {
      window.app.audio.play("batman");
    }

    const objects = window.portfolioObjects || {};
    const batLogo = objects.batmanLogo;

    this.batLogo = batLogo;

    /* ignite logo */

    if (batLogo && batLogo.material) {
      batLogo.material.color.set(0xffcc33);
      batLogo.material.emissive = new THREE.Color(0xff2200);
      batLogo.material.emissiveIntensity = 1.2;
    }

    /* override lighting */

    if (this.lightManager) {
      try {
        this.lightManager.setOverride("batman");
      } catch (e) {
        console.error("Batman lighting failed:", e);
      }
    }
    /*  turn OFF lamp for cinematic effect */
    const lamp = window.portfolioObjects?.lampLight;

    if (lamp) {
      this.previousLampState = lamp.visible;
      lamp.visible = false;
    }

    /* dim lamp shade glow */
    const shade = window.portfolioObjects?.lampShade;
    if (shade && shade.material) {
      shade.material.emissiveIntensity = 0;
    }

    /* fire light */

    if (batLogo && !this.batLight) {
      const batLight = new THREE.PointLight(0xff3300, 2.2, 10);

      batLight.position.set(
        batLogo.position.x,
        batLogo.position.y + 1.5,
        batLogo.position.z + 0.3,
      );

      batLogo.parent.add(batLight);

      this.batLight = batLight;
    }

    /* bat signal */

    if (batLogo && !this.batSignal) {
      const texture = this.textureLoader.load("/textures/bat-signal.png");

      const signal = new THREE.SpotLight(
        0xffffff,
        10,
        40,
        Math.PI / 12,
        0.05,
        1,
      );

      signal.castShadow = false;
      signal.decay = 1.5;

      signal.map = texture;
      texture.anisotropy = 16;

      signal.position.set(0, 3.5, -3);

      signal.target.position.set(0, 2, 4);
      batLogo.parent.add(signal.target);

      batLogo.parent.add(signal);

      this.batSignal = signal;
    }
  }

  disableBatmanMode() {
    console.log("Batman mode disabled");
    /* remove vignette */
    const overlay = document.getElementById("batman-overlay");

    if (overlay) {
      overlay.classList.remove("active");
    }

    this.batmanMode = false;

    /* restore lighting */

    if (this.lightManager) {
      try {
        this.lightManager.clearOverride();
      } catch (e) {
        console.error("Restore lighting failed:", e);
      }
    }

    /* restore environment state */

    if (window.app && window.app.environmentSystem) {
      const env = window.app.environmentSystem;
      const state = env.states[env.index];
      env.applyState(state);
    }

    /* remove fire light */

    if (this.batLight) {
      this.batLight.parent.remove(this.batLight);
      this.batLight = null;
    }

    /* remove bat signal */

    if (this.batSignal) {
      this.batSignal.parent.remove(this.batSignal.target);
      this.batSignal.parent.remove(this.batSignal);
      this.batSignal = null;
    }

    /* stop audio */

    if (window.app && window.app.audio) {
      window.app.audio.stop("batman");
    }

    /* restore logo */
    /*  restore lamp state */
    const lamp = window.portfolioObjects?.lampLight;
    const shade = window.portfolioObjects?.lampShade;

    if (lamp && this.previousLampState !== null) {
      lamp.visible = this.previousLampState;
    }

    if (shade && shade.material) {
      shade.material.emissiveIntensity = lamp?.visible ? 1.2 : 0;
    }
    if (this.batLogo && this.batLogo.material) {
      this.batLogo.material.color.set(0xffffff);
      this.batLogo.material.emissive = new THREE.Color(0x000000);
      this.batLogo.material.emissiveIntensity = 0.25;
    }
  }

  update(time) {
    if (this.batLight) {
      //  cinematic flicker (more chaotic, less robotic)
      const flicker =
        Math.sin(time * 12) * 0.25 +
        Math.sin(time * 27) * 0.15 +
        (Math.random() - 0.5) * 0.2;

      this.batLight.intensity = 2.4 + flicker;
    }

    if (this.batLogo && this.batLogo.material && this.batmanMode) {
      this.batLogo.material.emissiveIntensity =
        1.15 + Math.sin(time * 6) * 0.15;
    }
  }
}
