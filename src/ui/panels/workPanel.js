export function createWorkPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
        <h2>Work History</h2>

        <div class="tiles">

          <div class="tile">
            <h3>Software Engineer — Alignerr</h3>
            <span class="duration">Dec 2025 — Present</span>
            <p>
              Evaluate AI-generated backend and full-stack solutions against real-world
              engineering standards including correctness, safety, and scalability.
              Review Python APIs, error handling, and system behavior to identify
              failure modes and improve trust-critical AI systems.
            </p>
          </div>

          <div class="tile">
            <h3>Programmer Analyst (Full-Stack Engineer) — Cognizant</h3>
            <span class="duration">Aug 2022 — Oct 2025</span>
            <p>
              Built distributed backend services using Java and Spring Boot and
              developed React-based interfaces for high-traffic internal platforms.
              Focused on reliability, API design, and debugging production issues
              using observability tools such as logs, metrics, and tracing.
            </p>
          </div>

          <div class="tile">
            <h3>Programmer Analyst Trainee — Cognizant</h3>
            <span class="duration">Jan 2022 — Jul 2022</span>
            <p>
              Completed intensive training in Java, data structures, and distributed
              systems while building full-stack applications using Spring Boot and
              React with a focus on correctness, validation, and maintainability.
            </p>
          </div>

        </div>
      `;

      container.appendChild(panel);
    },
  };
}
