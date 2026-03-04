export function createProjectsPanel() {
  return {
    render(container) {
      console.log("Projects panel rendering", container);

      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
        <h2>Projects</h2>
        <p>My 3D Portfolio</p>
      `;

      container.appendChild(panel);
    },
  };
}
