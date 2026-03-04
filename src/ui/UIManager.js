export class UIManager {
  constructor() {
    this.activePanel = null;
    this.activeType = null; // "side" or "modal"

    // ===== Side Panel =====
    this.panel = document.getElementById("side-panel");
    this.content = document.getElementById("panel-content");
    this.closeBtn = document.getElementById("close-panel");

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // ===== Modal =====
    this.modal = document.getElementById("modal");
    this.modalContent = document.getElementById("modal-content");
    this.modalClose = document.getElementById("modal-close");

    if (this.modalClose) {
      this.modalClose.addEventListener("click", () => this.close());
    }

    // ESC support for both
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });

    // ===== EMPTY PANEL REGISTRY (IMPORTANT CHANGE) =====
    this.panels = {};
  }

  open(panelName) {
    console.log("Opening panel:", panelName);

    const panelData = this.panels[panelName];

    console.log("Panel data:", panelData);

    if (!panelData) {
      console.warn("Panel not registered:", panelName);
      return;
    }

    console.log("Render function:", panelData.panel.render);

    this.activePanel = panelName;
    this.activeType = panelData.type;

    this.content.innerHTML = "";

    panelData.panel.render(this.content);

    console.log("Content after render:", this.content);

    this.panel.classList.add("active");
  }
  close() {
    if (!this.activePanel) return;

    const root = document.getElementById("ui-root");
    root.classList.remove("panel-open");

    this.panel.classList.remove("active");
    this.modal.classList.remove("active");

    this.activePanel = null;
    this.activeType = null;

    console.log("UI Closed");
  }

  register(name, panelObject, type = "side") {
    this.panels[name] = {
      type,
      panel: panelObject,
    };
  }

  getActivePanel() {
    return this.activePanel;
  }
}
