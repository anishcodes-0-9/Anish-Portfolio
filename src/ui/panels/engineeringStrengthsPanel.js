export function createEngineeringStrengthsPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");

      panel.className = "panel";

      panel.innerHTML = `
      <h2>My Strengths</h2>

      <div class="project-item">
        <h3>Reliability First</h3>
        <p>
        I focus on building systems that behave predictably in production. 
        Designing for failure, monitoring behavior, and preventing user impact 
        are key parts of my engineering mindset.
        </p>
      </div>

      <div class="project-item">
        <h3>Debugging & Incident Response</h3>
        <p>
        Comfortable diagnosing complex distributed system issues using logs,
        metrics, and tracing. I enjoy breaking down production incidents and
        identifying root causes.
        </p>
      </div>

      <div class="project-item">
        <h3>System Thinking</h3>
        <p>
        I think about how services interact, fail, and recover rather than
        focusing only on individual components. This helps build resilient
        systems at scale.
        </p>
      </div>

      <div class="project-item">
        <h3>Ownership</h3>
        <p>
        I take responsibility for systems end-to-end — from design and
        implementation to production stability and continuous improvement.
        </p>
      </div>

      <div class="project-item">
        <h3>Collaboration</h3>
        <p>
        I enjoy working across product, QA, and operations teams to ship
        reliable features and resolve complex issues together.
        </p>
      </div>
      `;

      container.appendChild(panel);
    },
  };
}
