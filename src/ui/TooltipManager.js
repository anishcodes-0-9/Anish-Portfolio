export class TooltipManager {
  constructor() {
    this.tooltip = document.getElementById("tooltip");

    this.labels = {
      monitor_left: "Projects",
      monitor_right: "Work Experience",

      keyboard: "Personal Projects",
      mouse: "Open Resume",

      cpu: "Tech Stack",
      phone: "Contact",

      alexa: "Ask AI about me",

      football: "Mini Game",

      window: "Change Time of Day",
      batman: "Batman Mode",

      chair: "Work Mode",

      lamp: "Toggle Desk Light",

      about: "About Me",

      Dumbell_L: "Certifications",
      Dumbell_R: "Engineering Strengths",

      random_fact: "Project Notebook",
      random_thought: "System Architecture",
    };
  }

  show(type, x, y) {
    const label = this.labels[type];
    if (!label) return;

    this.tooltip.textContent = label;

    this.tooltip.style.left = x + 14 + "px";
    this.tooltip.style.top = y - 10 + "px";

    this.tooltip.style.opacity = 1;
  }

  hide() {
    this.tooltip.style.opacity = 0;
  }
}
