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
    <img src="/logos/claude.png" class="project-logo" />
    <div>
      <h3>Claude AI Evaluation (Anthropic via Alignerr)</h3>
      <span class="duration">Dec 2025 — Present</span>
    </div>
  </div>

  <p>
    Working as a contractor contributing to the evaluation and improvement of
    AI-generated code using the Claude Code CLI (claude-hfi). Iteratively refined
    model outputs across real-world codebases, ensuring solutions met production-
    level engineering standards including correctness, edge-case handling, and
    maintainability while guiding the model to behave like a real software engineer.
  </p>

  <ul>
    <li>Evaluated AI-generated code across real Git-based codebases for correctness and production readiness</li>
    <li>Identified failure modes in model outputs including logical bugs, poor abstractions, and missing edge-case handling</li>
    <li>Improved model workflows by enforcing practices like self-review, testing, and iterative refinement</li>
    <li>Worked with the Claude Code CLI (claude-hfi) to simulate real PR-style engineering workflows</li>
  </ul>

  <div class="tech">
    <span>Claude (Anthropic)</span>
    <span>LLM Evaluation</span>
    <span>Prompt Engineering</span>
    <span>Code Review</span>
    <span>Git</span>
    <span>CLI Tools</span>
    <span>JavaScript</span>
    <span>Python</span>
    <span>Software Engineering Standards</span>
  </div>
</div>

          <div class="tile project">
            <div class="project-header">
              <img src="/logos/macys.png" class="project-logo" />
              <div>
                <h3>Macys POS Platform</h3>
                <span class="duration">Jul 2025 — Oct 2025</span>
              </div>
            </div>

            <p>
  Built and maintained production UI flows for a large-scale POS system used
  across retail stores, covering complete checkout journeys including card,
  cash, and Macy’s card payments. Designed flow diagrams to map end-to-end
  transaction lifecycles and worked across frontend, backend, and database
  layers to debug inconsistencies and ensure reliable high-volume operations.
</p>

<ul>
  <li>Designed detailed transaction flow diagrams to trace and debug complex POS workflows end-to-end</li>
  <li>Resolved critical data mismatches between UI and backend, improving checkout reliability</li>
  <li>Optimized SQL queries to reduce latency in high-throughput transaction scenarios</li>
  <li>Handled multi-payment modes (cash, bank card, Macy’s card) ensuring consistency across flows</li>
</ul>

            <div class="tech">
  <span>Spring Boot</span>
  <span>React</span>
  <span>Next.js</span>
  <span>Enactor POS</span>
  <span>AWS</span>
  <span>Kubernetes</span>
  <span>REST APIs</span>
  <span>SQL</span>
  <span>XML Workflows</span>
  <span>Transaction Systems</span>
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
  Worked on high-scale distributed systems supporting millions of users,
  contributing to backend services for profile, payments, and authentication.
  Rapidly ramped up on Dynatrace to monitor system behavior and worked across
  both frontend and backend, validating changes across dev, test, performance,
  and production environments while maintaining CI/CD pipelines.
</p>

<ul>
  <li>Built Dynatrace dashboards monitoring 13+ microservices under active ownership</li>
  <li>Improved observability and reduced debugging time by leveraging logs, metrics, and traces</li>
  <li>Diagnosed and fixed production issues impacting large-scale user flows (10M+ users)</li>
  <li>Contributed to system optimization and architecture improvements across services</li>
  <li>Maintained Jenkins pipelines and ensured release safety via SAST/SCA and multi-env validation</li>
</ul>

            <div class="tech">
  <span>Spring Boot</span>
  <span>Node.js</span>
  <span>React</span>
  <span>Next.js</span>
  <span>Angular</span>
  <span>Microservices</span>
  <span>Dynatrace</span>
  <span>Jenkins</span>
  <span>AWS</span>
  <span>Kubernetes</span>
  <span>Distributed Systems</span>
  <span>Observability</span>
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
  Developed backend services and supporting UI components for a payments platform
  requiring strong data consistency and fault tolerance. Worked with asynchronous
  processing, database transactions, and API integrations to ensure reliable
  financial workflows under concurrent usage.
</p>

<ul>
  <li>Implemented asynchronous workflows and background jobs for payment processing</li>
  <li>Handled transactional integrity using database-level safeguards and validations</li>
  <li>Debugged edge-case failures in payment flows to ensure consistency and correctness</li>
  <li>Collaborated across frontend and backend to maintain end-to-end reliability</li>
</ul>

            <div class="tech">
  <span>Spring Boot</span>
  <span>React</span>
  <span>PostgreSQL</span>
  <span>REST APIs</span>
  <span>Async Processing</span>
  <span>Transactions</span>
  <span>Database Design</span>
  <span>Backend Systems</span>
</div>
          </div>

        </div>
      `;

      container.appendChild(panel);
    },
  };
}
