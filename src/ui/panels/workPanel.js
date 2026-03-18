export function createWorkPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
  <h2>Work History</h2>

  <div class="work-cards">

    <!-- ALIGNERR -->
    <div class="work-card">
      <div class="work-header">
        <img src="/logos/alignerr.png" class="work-logo" />
        <div>
          <h3>Alignerr</h3>
          <span class="role">Software Engineer - Freelance</span>
          <span class="duration">Dec 2025 — Present</span>
        </div>
      </div>

      <p>
  AI system evaluation and code quality improvement for Claude (Anthropic).
</p>

<ul>
  <li>Evaluated AI-generated code across real-world repositories for correctness and production readiness</li>
  <li>Identified logical bugs, edge-case failures, and poor abstractions in model outputs</li>
  <li>Guided model behavior toward real engineering workflows including code review, testing, and iteration</li>
  <li>Worked with Claude Code CLI (claude-hfi) to simulate PR-level development cycles</li>
</ul>
    </div>

    <!-- COGNIZANT FULL TIME -->
    <div class="work-card">
      <div class="work-header">
        <img src="/logos/cognizant.png" class="work-logo" />
        <div>
          <h3>Cognizant</h3>
          <span class="role">Programmer Analyst (Full-Stack Engineer)</span>
          <span class="duration">Aug 2022 — Oct 2025</span>
        </div>
      </div>

      <p>
  Full-stack engineering across large-scale enterprise systems (Retail POS + Media platforms).
</p>

<ul>
  <li>Built and operated backend services using Spring Boot and frontend applications using React</li>
  <li>Worked on systems impacting millions of users across payments, authentication, and retail flows</li>
  <li>Debugged complex production issues using logs, metrics, and distributed tracing (Dynatrace)</li>
  <li>Improved system reliability and performance through architecture and code optimizations</li>
  <li>Validated releases across dev, test, performance, and production environments</li>
</ul>
    </div>

    <!-- COGNIZANT TRAINEE -->
    <div class="work-card">
      <div class="work-header">
        <img src="/logos/cognizant.png" class="work-logo" />
        <div>
          <h3>Cognizant</h3>
          <span class="role">Programmer Analyst Trainee</span>
          <span class="duration">Jan 2022 — Jul 2022</span>
        </div>
      </div>
<p>
  Full-stack training with focus on backend systems and clean code practices.
</p>

<ul>
  <li>Built full-stack applications using Spring Boot and React</li>
  <li>Strengthened fundamentals in data structures, system design, and API development</li>
  <li>Focused on validation, error handling, and maintainable code practices</li>
</ul>
    </div>

  </div>
`;

      container.appendChild(panel);
    },
  };
}
