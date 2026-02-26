export class UIManager {
  constructor() {
    this.activePanel = null;
  }

  open(panelName) {
    this.activePanel = panelName;
    console.log("UI Open:", panelName);
  }

  close() {
    console.log("UI Close:", this.activePanel);
    this.activePanel = null;
  }

  getActivePanel() {
    return this.activePanel;
  }
}
