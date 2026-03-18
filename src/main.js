import { Experience } from "./core/Experience.js";
import "./styles/ui.css";

const app = new Experience();
app.init();

window.app = app;

window.addEventListener("DOMContentLoaded", () => {
  const guide = document.getElementById("interactionGuide");
  const closeBtn = document.getElementById("guide-close");
  const helpBtn = document.getElementById("guide-help");

  if (!guide || !closeBtn || !helpBtn) return;

  guide.style.opacity = "1";
  helpBtn.style.display = "none";

  /* GUIDE TOGGLE */

  closeBtn.addEventListener("click", () => {
    guide.style.display = "none";
    helpBtn.style.display = "block";
  });

  helpBtn.addEventListener("click", () => {
    guide.style.display = "block";
    helpBtn.style.display = "none";
  });

  /* ✅ GUIDE HOVER FIX (THIS WAS THE BUG) */

  const guideItems = document.querySelectorAll(
    "#interactionGuide li[data-type]",
  );
  guideItems.forEach((item) => {
    const type = item.dataset.type;

    /* hover (already working) */
    item.addEventListener("mouseenter", () => {
      window.app?.interaction?.highlightByType(type);
    });

    item.addEventListener("mouseleave", () => {
      window.app?.interaction?.clearGuideHighlight();
    });

    /* ✅ NEW: click = trigger same behavior */
    item.addEventListener("click", () => {
      handleGuideClick(type);
    });
  });

  /* =========================
 GUIDE CLICK HANDLER
========================= */

  function handleGuideClick(type) {
    // 🚫 BLOCK NON-UI ACTIONS WHEN PANEL IS OPEN
    const allowedWhileOpen = [
      "monitor_left",
      "monitor_right",
      "keyboard",
      "mouse",
      "phone",
      "cpu",
      "Dumbell_L",
      "Dumbell_R",
      "about",
      "notes",
      "architecture",
      "alexa",
      "football",
    ];

    if (window.app?.ui?.isUIOpen() && !allowedWhileOpen.includes(type)) {
      return;
    }
    if (!window.app) return;
    const guide = document.getElementById("interactionGuide");
    const helpBtn = document.getElementById("guide-help");

    //  hide guide on mobile before opening any panel
    if (window.innerWidth < 768 && guide && helpBtn) {
      guide.style.display = "none";
      helpBtn.style.display = "block";
    }

    switch (type) {
      case "monitor_left":
        window.app.ui.open("projects");
        break;

      case "monitor_right":
        window.app.ui.open("work");
        break;

      case "keyboard":
        window.app.ui.open("personalProjects");
        break;

      case "mouse":
        window.open("/Anish_Krishnan_Resume.html", "_blank");
        break;

      case "phone":
        window.app.ui.open("phone");
        break;

      case "notes":
        window.app.ui.open("notes");
        break;

      case "architecture":
        window.app.ui.open("architecture");
        break;

      case "alexa":
        window.app.ui.open("aiChat");
        break;

      case "cpu":
        window.app.ui.open("techStack");
        break;

      case "Dumbell_L":
        window.app.ui.open("certifications");
        break;

      case "Dumbell_R":
        window.app.ui.open("engineeringStrengths");
        break;

      case "about":
        window.app.ui.open("about");
        break;

      case "batman":
        window.app.gameManager.activateBatmanMode();
        break;

      case "window":
        if (!window.app.gameManager.batmanMode) {
          window.app.environmentSystem.cycleTimeOfDay();
        }
        break;

      case "football":
        window.app.ui.open("footballGame");
        break;

      case "chair":
        window.app.enterWorkMode();
        break;

      case "lamp":
        const lamp = window.portfolioObjects?.lampLight;
        const shade = window.portfolioObjects?.lampShade;

        if (lamp) {
          lamp.visible = !lamp.visible;

          if (shade && shade.material) {
            shade.material.emissiveIntensity = lamp.visible ? 1.2 : 0;
          }
        }
        break;
    }
  }
});
