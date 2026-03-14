export function createPersonalProjectsPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
        <h2>Personal Projects</h2>

        <p class="projects-subtitle">
          Some things I've built while experimenting with systems, AI, and interactive interfaces.
        </p>

        <div class="project">
          <h3>3D Interactive Portfolio</h3>
          <p>
            A Three.js powered interactive portfolio room with AI assistant,
            mini games, and dynamic environment.
          </p>

          <a href="https://github.com/anishcodes-0-9/Anish-Portfolio"
             target="_blank">
            View on GitHub
          </a>
        </div>

        <div class="project">
          <h3>AI Support System</h3>
          <p>
            It simulates an e-commerce support assistant capable of handling.
          </p>
          <p>The system is built with clean layered architecture and designed to avoid hallucinations by grounding responses in real database data.</p>
          <a href="https://github.com/anishcodes-0-9/ai-support-system"
             target="_blank">
            View on GitHub
          </a>
        </div>

        <div class="project">
          <h3>GitHub Issue Analyzer with Local Caching + LLM Processing</h3>
          <p>
            Backend service that fetches and caches GitHub issues from a repository, then analyzes them using an LLM to extract insights through natural-language prompts.
          </p>

          <a href="https://github.com/anishcodes-0-9/github-issue-analyzer"
             target="_blank">
            View on GitHub
          </a>
        </div>

        <div class="project">
            <h3>File Watcher Daemon</h3>
            <p>
            This project is a local TypeScript daemon that watches file changes, learns rules written in plain English, and notifies you when those rules are triggered.
            </p>
            <a href="https://github.com/anishcodes-0-9/heyamara-daemon"
             target="_blank">
            View on GitHub
          </a>
            </div>
      `;

      container.appendChild(panel);
    },
  };
}
