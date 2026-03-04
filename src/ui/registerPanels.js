import { createProjectsPanel } from "./panels/projectsPanel.js";
import { createWorkPanel } from "./panels/workPanel.js";
import { createFootballGamePanel } from "./panels/footballGamePanel.js";

export function registerAllPanels(ui) {
  ui.register("projects", createProjectsPanel(), "side");

  ui.register("work", createWorkPanel(), "side");

  /* ⚽ football game modal */
  ui.register("footballGame", createFootballGamePanel(), "modal");
}
