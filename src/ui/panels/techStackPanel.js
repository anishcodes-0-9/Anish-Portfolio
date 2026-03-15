export function createTechStackPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
      <h2>Tech Stack</h2>

      <div class="project-item">
        <h3>Languages</h3>
        <p>Java, Python, JavaScript</p>
      </div>

      <div class="project-item">
        <h3>Backend & Distributed Systems</h3>
        <p>Spring Boot, REST APIs, Microservices, JWT, Data Pipelines</p>
      </div>

      <div class="project-item">
        <h3>Frontend</h3>
        <p>React, Next.js, Angular, HTML, CSS, Tailwind</p>
      </div>

      <div class="project-item">
        <h3>Databases</h3>
        <p>PostgreSQL, MySQL, MongoDB, SQL Performance Tuning</p>
      </div>

      <div class="project-item">
        <h3>Cloud & DevOps</h3>
        <p>AWS, Docker, Kubernetes, GitHub Actions, Jenkins, Terraform</p>
      </div>

      <div class="project-item">
        <h3>Observability & Reliability</h3>
        <p>Logs, Metrics, Distributed Tracing, Dynatrace, Incident Debugging</p>
      </div>

      <div class="project-item">
        <h3>AI & Tooling</h3>
        <p>LLM Evaluation, Prompt Design, Claude, GitHub Copilot</p>
      </div>
      `;

      container.appendChild(panel);
    },
  };
}
