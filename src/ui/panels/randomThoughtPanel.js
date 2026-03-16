export function createRandomThoughtPanel() {
  return {
    render(container) {
      container.innerHTML = `

<div class="notebook-page">

<h2>Developer Notebook</h2>

<h3>System Architecture Overview</h3>

<p>
This portfolio is built as a modular 3D application where each system has a clear responsibility.
The goal was to separate rendering, interaction, environment logic and UI so the project
remains easy to extend and maintain.
</p>


<h3>High Level Interaction Flow</h3>

<pre class="diagram">

User
 │
 │ Mouse / Cursor
 ▼
InteractionSystem.js
 (Raycasting Engine)
 │
 ▼
Detect Object
(userData.type)
 │
 ├── monitor_left  → UIManager.open("projects")
 ├── keyboard      → UIManager.open("personalProjects")
 ├── mouse         → Open Resume
 ├── cpu           → UIManager.open("techStack")
 ├── phone         → UIManager.open("contact")
 ├── alexa         → UIManager.open("AI Chat")
 ├── football      → Start Mini Game
 ├── window        → EnvironmentSystem.cycleTimeOfDay()
 └── batman        → GameManager.activateBatmanMode()

</pre>


<h3>Application Architecture</h3>

<pre class="diagram">

                Experience.js
          (Main Application Controller)
                       │
     ┌─────────────────┼─────────────────┐
     │                 │                 │

 Renderer.js       Camera.js        Controls.js
 WebGL Setup       Scene Camera     Orbit Controls

                       │
                       ▼

              PortfolioRoom.js
        (Loads GLB Scene + Materials)

                       │
                       ▼

            InteractionSystem.js
          Hover Detection / Click Logic

                       │
                       ▼

                 Feature Systems

      EnvironmentSystem.js → Day/Night Cycle
      GameManager.js       → Batman Mode
      AudioManager.js      → Sound System
      LightManager.js      → Scene Lighting

                       │
                       ▼

                   UI Layer

           UIManager.js
           registerPanels.js

                       │
                       ▼

                   UI Panels

     Projects | Work | Tech Stack | AI Chat
     Contact | Certifications | Games

</pre>


<h3>Project Folder Structure</h3>

<pre class="diagram">

src

core
  Camera.js
  Controls.js
  Renderer.js

systems
  InteractionSystem.js
  LightManager.js
  EnvironmentSystem.js
  GameManager.js
  AudioManager.js
  TimeManager.js

world
  PortfolioRoom.js
  Lighting.js

ui
  UIManager.js
  registerPanels.js
  panels/

assets
  models
  textures
  audio

</pre>

</div>

      `;
    },
  };
}
