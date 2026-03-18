import { createProjectsPanel } from "./panels/projectsPanel.js";
import { createWorkPanel } from "./panels/workPanel.js";
import { createFootballGamePanel } from "./panels/footballGamePanel.js";
import { createAIChatPanel } from "./panels/aiChatPanel.js";
import { createPhonePanel } from "./panels/phonePanel.js";
import { createPersonalProjectsPanel } from "./panels/personalProjectsPanel.js";
import { createCertificationsPanel } from "./panels/certificationsPanel.js";
import { createEngineeringStrengthsPanel } from "./panels/engineeringStrengthsPanel.js";
import { createTechStackPanel } from "./panels/techStackPanel.js";
import { createAboutPanel } from "./panels/aboutPanel.js";
import { createNotesPanel } from "./panels/notesPanel.js";
import { createArchitecturePanel } from "./panels/architecturePanel.js";

export function registerAllPanels(ui) {
  ui.register("projects", createProjectsPanel(), "side");

  ui.register("work", createWorkPanel(), "side");

  ui.register("phone", createPhonePanel(), "side");

  ui.register("footballGame", createFootballGamePanel(), "modal");

  ui.register("aiChat", createAIChatPanel(), "modal");

  ui.register("personalProjects", createPersonalProjectsPanel(), "modal");

  ui.register("certifications", createCertificationsPanel(), "modal");

  ui.register(
    "engineeringStrengths",
    createEngineeringStrengthsPanel(),
    "modal",
  );
  ui.register("techStack", createTechStackPanel(), "modal");
  ui.register("about", createAboutPanel(), "modal");
  ui.register("notes", createNotesPanel(), "modal");
  ui.register("architecture", createArchitecturePanel(), "modal");
}
