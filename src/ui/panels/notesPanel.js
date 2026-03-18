export function createNotesPanel() {
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

  <h2>My Notebook</h2>

  <h3>What This Project Is</h3>

  <ul class="notebook-list">
    <li>This portfolio is built as an interactive 3D workspace instead of a traditional website.</li>
    <li>The goal was to create something that reflects how engineers explore systems, not just scroll through pages.</li>
    <li>Each object in the room represents a part of my work, making the experience more intuitive and memorable.</li>
  </ul>


  <h3>Why I Built It This Way</h3>

  <ul class="notebook-list">
    <li>Traditional portfolios don’t demonstrate engineering depth beyond UI.</li>
    <li>I wanted to showcase system thinking, interaction design, and real problem-solving.</li>
    <li>The 3D environment forces better thinking around state, interaction, and user flow.</li>
  </ul>


  <h3>Key Engineering Decisions</h3>

  <ul class="notebook-list">
    <li>Used object-based navigation instead of routing to create a more natural interaction model.</li>
    <li>Introduced invisible hitboxes to improve usability for small objects.</li>
    <li>Separated interaction logic from UI to keep the system modular.</li>
    <li>Ensured only one UI state is active at a time to prevent overlapping panels.</li>
  </ul>


  <h3>Challenges & How I Solved Them</h3>

  <ul class="notebook-list">
    <li>Precision issues in 3D interactions → solved using hitboxes and controlled raycasting.</li>
    <li>Overlapping UI panels → solved with centralized UI state management.</li>
    <li>Balancing realism vs usability → prioritized interaction clarity over visual complexity.</li>
    <li>Handling multiple systems together → designed loosely coupled modules for stability.</li>
  </ul>


  <h3>Tradeoffs</h3>

  <ul class="notebook-list">
    <li>Chose performance and usability over ultra-realistic graphics.</li>
    <li>Avoided embedding UI directly in 3D to keep updates simple and scalable.</li>
    <li>Limited heavy animations to maintain smooth performance across devices.</li>
  </ul>

  <ul class="notebook-list">
    ${getFacts()}
  </ul>

  <h3>Known Limitations & Improvements</h3>

<ul class="notebook-list">
  <li>Speech synthesis behavior is inconsistent across browsers (notably Chrome vs Safari).</li>
  <li>Raycasting precision can vary slightly on smaller interactive objects, requiring hitbox tuning.</li>
  <li>Mobile interaction UX is functional but can be further optimized for smaller screens.</li>
  <li>Lighting and shadow balance can be refined further for improved visual realism.</li>
</ul>

</div>
      `;
    },
  };
}
