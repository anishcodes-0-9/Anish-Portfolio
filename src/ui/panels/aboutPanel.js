export function createAboutPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
<h2 style="text-align:center">About Me</h2>

<div class="about-photo">
  <img src="/textures/anish-photo.png" alt="Anish Krishnan" />
</div>

<div class="about-content">

<p>
Hi, I'm <strong>Anish Krishnan</strong> a Software Engineer with 4+ years of experience
building distributed systems, full-stack applications, and reliability-critical platforms.
</p>

<p>
I focus on systems that behave correctly under real-world conditions - from designing
APIs and UI flows to debugging production issues across services. My work spans backend,
frontend, and improving system reliability through observability and careful engineering.
</p>

<p>
Recently, I’ve been working on evaluating AI-generated systems — identifying failure
modes, testing edge cases, and improving robustness in ambiguous scenarios.
</p>

<h3>Beyond Work</h3>

<ul>
  <li>⚽ Football</li>
  <li>💪 Fitness</li>
  <li>🧠 Systems thinking</li>
  <li>🚀 Continuous learning</li>
</ul>

<h3>Inspiration</h3>

<p>
This portfolio is inspired by the idea of making developer workspaces interactive which
reflects on how I think in systems, not pages.
</p>

</div>
`;

      container.appendChild(panel);
    },
  };
}
