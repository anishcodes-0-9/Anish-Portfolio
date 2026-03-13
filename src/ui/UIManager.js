export class UIManager {
  constructor() {
    this.activePanel = null;
    this.activeType = null;

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

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });

    this.panels = {};
  }

  /* OPEN PANEL */
  open(panelName) {
    const panelData = this.panels[panelName];

    if (!panelData) {
      console.warn("Panel not registered:", panelName);
      return;
    }

    this.activePanel = panelName;
    this.activeType = panelData.type;

    /* SIDE PANEL */
    if (panelData.type === "side") {
      this.content.innerHTML = "";

      panelData.panel.render(this.content);

      this.panel.classList.add("active");
    }

    /* MODAL PANEL */
    if (panelData.type === "modal") {
      this.modalContent.innerHTML = "";

      panelData.panel.render(this.modalContent);

      this.modal.classList.add("active");
    }

    const root = document.getElementById("ui-root");
    root.classList.add("panel-open");
  }

  /* CLOSE UI */
  close() {
    // Stop Alexa speech immediately
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const root = document.getElementById("ui-root");
    root.classList.remove("panel-open");

    if (this.panel) {
      this.panel.classList.remove("active");
    }

    if (this.modal) {
      this.modal.classList.remove("active");
    }

    this.activePanel = null;
    this.activeType = null;
  }

  /* REGISTER PANELS */
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
