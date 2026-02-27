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

    // Panel registry
    this.panels = {
      test: {
        type: "side",
        render: () => `
          <h2>Test Panel</h2>
          <p>This is Phase 2 working.</p>
        `,
      },
    };
  }

  open(panelName) {
    const panelData = this.panels[panelName];
    if (!panelData) {
      console.warn(`Panel "${panelName}" not registered.`);
      return;
    }

    if (this.activePanel === panelName) return;

    this.close(); // close any open panel

    this.activePanel = panelName;
    this.activeType = panelData.type;

    const root = document.getElementById("ui-root");
    root.classList.add("panel-open");

    if (panelData.type === "modal") {
      this.modalContent.innerHTML = panelData.render();
      this.modal.classList.add("active");
    } else {
      this.content.innerHTML = panelData.render();
      this.panel.classList.add("initialized");
      this.panel.classList.add("active");
    }

    console.log("UI Open:", panelName);
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

  register(name, renderFn, type = "side") {
    this.panels[name] = {
      type,
      render: renderFn,
    };
  }
}
