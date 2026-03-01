import { testPanel } from "./panels/testPanel.js";
import { gamePanel } from "./panels/gamePanel.js";
import { demoModal } from "./panels/demoModal.js";

export function registerAllPanels(ui) {
  const panels = [testPanel, gamePanel, demoModal];

  panels.forEach((panel) => {
    ui.register(panel.name, panel.render, panel.type);
  });
}
