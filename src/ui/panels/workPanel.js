export function createWorkPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
        <button class="closeBtn">✕</button>
        <h2>Work History</h2>

        <div class="tiles">

          <div class="tile">
            <h3>Software Engineer</h3>
            <p>Built full-stack web apps and automation systems.</p>
          </div>

          <div class="tile">
            <h3>QA Automation</h3>
            <p>Created Cypress + Playwright testing frameworks.</p>
          </div>

          <div class="tile">
            <h3>Support Engineering</h3>
            <p>Handled product debugging and customer issues.</p>
          </div>

        </div>
      `;

      container.appendChild(panel);

      panel.querySelector(".closeBtn").onclick = () => {
        container.innerHTML = "";
        document.body.classList.remove("ui-open");
      };
    },
  };
}
