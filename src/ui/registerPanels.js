import { createProjectsPanel } from "./panels/projectsPanel.js";
import { createWorkPanel } from "./panels/workPanel.js";

export function registerAllPanels(ui) {
  ui.register("projects", createProjectsPanel());
  ui.register("work", createWorkPanel());
}
