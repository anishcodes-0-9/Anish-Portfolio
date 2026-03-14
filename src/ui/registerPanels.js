import { createProjectsPanel } from "./panels/projectsPanel.js";
import { createWorkPanel } from "./panels/workPanel.js";
import { createFootballGamePanel } from "./panels/footballGamePanel.js";
import { createAIChatPanel } from "./panels/aiChatPanel.js";
import { createPhonePanel } from "./panels/phonePanel.js";

export function registerAllPanels(ui) {
  /* Projects */
  ui.register("projects", createProjectsPanel(), "side");
  /* Work */
  ui.register("work", createWorkPanel(), "side");
  /* Phone */
  ui.register("phone", createPhonePanel(), "side");
  /* Football Game */
  ui.register("footballGame", createFootballGamePanel(), "modal");
  /* Alexa AI Chat */
  ui.register("aiChat", createAIChatPanel(), "modal");
}
