export class UIManager {
  constructor() {
    this.activePanel = null;

    this.panel = document.getElementById("side-panel");
    this.content = document.getElementById("panel-content");
    this.closeBtn = document.getElementById("close-panel");

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    this.panels = {
      test: () => `
        <h2>Test Panel</h2>
        <p>This is Phase 2 working.</p>
      `,
    };
  }

  open(panelName) {
    if (!this.panels[panelName]) {
      console.warn(`Panel "${panelName}" not registered.`);
      return;
    }

    if (this.activePanel === panelName) return;

    this.activePanel = panelName;

    this.content.innerHTML = this.panels[panelName]();

    const root = document.getElementById("ui-root");

    root.classList.add("panel-open");
    // enable animation after first interaction
    this.panel.classList.add("initialized");
    this.panel.classList.add("active");

    console.log("UI Open:", panelName);
  }

  close() {
    if (!this.activePanel) return;

    const root = document.getElementById("ui-root");

    this.panel.classList.remove("active");
    root.classList.remove("panel-open");

    this.activePanel = null;

    console.log("UI Closed");
  }
}
