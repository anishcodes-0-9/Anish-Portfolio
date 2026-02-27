import { testPanel } from "./panels/testPanel.js";
import { gamePanel } from "./panels/gamePanel.js";

export function registerAllPanels(ui) {
  const panels = [testPanel, gamePanel];

  panels.forEach((panel) => {
    ui.register(panel.name, panel.render, panel.type);
  });
}
