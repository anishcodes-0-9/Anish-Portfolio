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
  I build systems with failure in mind. From handling inconsistent state in
  transaction flows to validating edge cases before release, I focus on making
  systems behave predictably under real-world conditions rather than ideal ones.
  </p>
</div>

<div class="project-item">
  <h3>Debugging & Incident Response</h3>
  <p>
  I'm experienced in diagnosing production issues across distributed systems using
  logs, metrics, and tracing. I’ve worked on high-impact incidents, tracing
  failures across services and identifying root causes quickly to restore system stability.
  </p>
</div>

<div class="project-item">
  <h3>System Thinking</h3>
  <p>
  I approach problems from a system-level perspective — understanding how APIs,
  services, and data flows interact. This helps prevent issues like data
  inconsistencies, race conditions, and hidden integration failures.
  </p>
</div>

<div class="project-item">
  <h3>End-to-End Ownership</h3>
  <p>
  I'm comfortable owning features across the full stack — from UI behavior to backend
  logic and deployment. I ensure changes are validated across environments and
  behave correctly in production.
  </p>
</div>

<div class="project-item">
  <h3>Working with Ambiguity</h3>
  <p>
  I’m used to working in situations where requirements are unclear or evolving.
  Whether debugging undefined behavior or evaluating AI-generated systems, I
  break down ambiguity into concrete, testable scenarios.
  </p>
</div>
      `;

      container.appendChild(panel);
    },
  };
}
