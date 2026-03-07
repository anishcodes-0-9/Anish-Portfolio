import { createProjectsPanel } from "./panels/projectsPanel.js";
import { createWorkPanel } from "./panels/workPanel.js";
import { createFootballGamePanel } from "./panels/footballGamePanel.js";
import { createAIChatPanel } from "./panels/aiChatPanel.js";

export function registerAllPanels(ui) {
  ui.register("projects", createProjectsPanel(), "side");

  ui.register("work", createWorkPanel(), "side");

  ui.register("footballGame", createFootballGamePanel(), "modal");

  /* Alexa AI Chat */
  ui.register("aiChat", createAIChatPanel(), "modal");
}
