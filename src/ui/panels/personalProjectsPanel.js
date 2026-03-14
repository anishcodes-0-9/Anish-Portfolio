export function createPersonalProjectsPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
        <h2>Personal Projects</h2>

        <div class="project">
          <h3>3D Interactive Portfolio</h3>
          <p>
            A Three.js powered interactive portfolio room with AI assistant,
            mini games, and dynamic environment.
          </p>

          <a href="https://github.com/anishcodes-0-9/3d-portfolio"
             target="_blank">
            View on GitHub
          </a>
        </div>

        <div class="project">
          <h3>AI Resume Assistant</h3>
          <p>
            Resume-grounded AI chatbot using OpenAI API and Node backend.
          </p>

          <a href="https://github.com/anishcodes-0-9/ai-resume-assistant"
             target="_blank">
            View on GitHub
          </a>
        </div>

        <div class="project">
          <h3>Football Mini Game</h3>
          <p>
            A small interactive football game inside the 3D portfolio room.
          </p>

          <a href="https://github.com/anishcodes-0-9/football-mini-game"
             target="_blank">
            View on GitHub
          </a>
        </div>
      `;

      container.appendChild(panel);
    },
  };
}
