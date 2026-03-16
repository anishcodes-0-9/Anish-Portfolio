export function createRandomFactPanel() {
  const facts = [
    "Built this entire portfolio using Three.js and Blender.",
    "Enjoys solving complex engineering problems.",
    "Interested in full stack development and product thinking.",
    "Loves designing clean system architectures.",
    "Believes great UX makes software memorable.",
    "Always experimenting with new technologies.",
  ];

  function getFacts() {
    return facts
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((f) => `<li>${f}</li>`)
      .join("");
  }

  return {
    render(container) {
      container.innerHTML = `
        <div class="notebook-page">

          <h2>Anish's Notebook</h2>

          <h3>About This Project</h3>

          <h2>Developer Notebook</h2>

<h3>Project Idea</h3>

<ul class="notebook-list">
<li>This portfolio is designed as an interactive 3D developer workspace.</li>
<li>Instead of scrolling through a traditional website, visitors explore a room and interact with objects.</li>
<li>Every desk object represents a section of the portfolio.</li>
<li>The goal was to create a memorable portfolio that demonstrates both creativity and engineering skill.</li>
</ul>


<h3>Tech Stack</h3>

<ul class="notebook-list">
<li>Three.js – 3D rendering and scene management</li>
<li>Blender – modeling the entire portfolio room</li>
<li>JavaScript – interaction systems and logic</li>
<li>Vite – development server and bundling</li>
</ul>


<h3>Key Design Principles</h3>

<ul class="notebook-list">
<li>Make the portfolio feel like a real developer workspace.</li>
<li>Use physical objects to represent sections of the portfolio.</li>
<li>Focus on exploration rather than scrolling.</li>
<li>Keep systems modular so features can be extended easily.</li>
</ul>


<h3>Execution Approach</h3>

<ul class="notebook-list">
<li>The room was modeled in Blender and exported as a GLB scene.</li>
<li>Three.js loads the scene and assigns materials dynamically.</li>
<li>Each mesh is tagged and registered with an interaction system.</li>
<li>A raycasting system detects hover and click events.</li>
<li>UI panels open when objects are interacted with.</li>
</ul>


<h3>Challenges Faced</h3>

<ul class="notebook-list">
<li>Managing interaction detection across many meshes.</li>
<li>Ensuring small objects like the keyboard and mouse were easy to click.</li>
<li>Balancing lighting between different times of day.</li>
<li>Preventing overlapping interactions between nearby objects.</li>
</ul>


<h3>Tradeoffs Made</h3>

<ul class="notebook-list">
<li>Prioritized usability over ultra-realistic lighting.</li>
<li>Used modular UI panels instead of embedding text directly in the 3D world.</li>
<li>Added invisible hitboxes for small objects to improve interaction reliability.</li>
</ul>

          <ul class="notebook-list">
            ${getFacts()}
          </ul>

        </div>
      `;
    },
  };
}
