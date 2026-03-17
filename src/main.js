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

    item.addEventListener("mouseenter", () => {
      window.app?.interaction?.highlightByType(type);
    });

    item.addEventListener("mouseleave", () => {
      window.app?.interaction?.clearGuideHighlight();
    });
  });
});
