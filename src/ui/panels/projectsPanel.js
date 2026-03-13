export function createProjectsPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
        <h2>Enterprise Projects</h2>

        <div class="tiles">

          <div class="tile project">
            <div class="project-header">
              <img src="/logos/macys.png" class="project-logo" />
              <div>
                <h3>Macys POS Platform</h3>
                <span class="duration">Jul 2025 — Oct 2025</span>
              </div>
            </div>

            <p>
              Built production UI components for large-scale point-of-sale systems
              used across retail locations. Investigated transactional data mismatches
              and optimized SQL queries to reduce latency and improve reliability.
            </p>

            <div class="tech">
              <span>React</span>
              <span>Java</span>
              <span>SQL</span>
            </div>
          </div>


          <div class="tile project">
            <div class="project-header">
              <img src="/logos/directv.png" class="project-logo" />
              <div>
                <h3>DIRECTV</h3>
                <span class="duration">Nov 2023 — Jun 2025</span>
              </div>
            </div>

            <p>
              Designed and operated high-availability Spring Boot + React services
              consumed by multiple internal teams. Debugged distributed production
              issues using logs, metrics, and tracing.
            </p>

            <div class="tech">
              <span>Spring Boot</span>
              <span>React</span>
              <span>Microservices</span>
            </div>
          </div>


          <div class="tile project">
            <div class="project-header">
              <img src="/logos/payments.png" class="project-logo" />
              <div>
                <h3>LN Payments Platform</h3>
                <span class="duration">Aug 2022 — Oct 2023</span>
              </div>
            </div>

            <p>
              Developed backend services and UI features for a payments platform
              requiring strict data consistency. Implemented asynchronous workflows,
              background jobs, and transactional safeguards.
            </p>

            <div class="tech">
              <span>Spring Boot</span>
              <span>React</span>
              <span>PostgreSQL</span>
            </div>
          </div>

        </div>
      `;

      container.appendChild(panel);
    },
  };
}
