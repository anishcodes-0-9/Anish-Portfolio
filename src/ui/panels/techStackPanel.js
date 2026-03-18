export function createTechStackPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
      <h2>Tech Stack</h2>

      <!-- FRONTEND -->
      <h3>Frontend</h3>

      <div class="skill">
        <span>Frontend & User Experience Systems</span>
        <div class="skill-bar"><div class="skill-fill" style="width:88%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-javascript-plain colored"></i> JavaScript</span>
        <div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-react-original colored"></i> React / Next.js</span>
        <div class="skill-bar"><div class="skill-fill" style="width:88%"></div></div>
      </div>

      <div class="skill">
        <span>🧊 Three.js (3D Interaction)</span>
        <div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
      </div>


      <!-- BACKEND -->
      <h3>Backend</h3>

      <div class="skill">
        <span>Backend Systems</span>
        <div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-java-plain colored"></i> Java</span>
        <div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-spring-plain colored"></i> Spring Boot</span>
        <div class="skill-bar"><div class="skill-fill" style="width:88%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-nodejs-plain colored"></i> Node.js</span>
        <div class="skill-bar"><div class="skill-fill" style="width:82%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-express-original colored"></i> Express.js</span>
        <div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-python-plain colored"></i> Python</span>
        <div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
      </div>

      <div class="skill">
        <span>📊 SQL & Transactions</span>
        <div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
      </div>


      <!-- AI -->
      <h3>AI & LLM Systems</h3>

      <div class="skill">
        <span>AI Systems</span>
        <div class="skill-bar"><div class="skill-fill" style="width:82%"></div></div>
      </div>

      <div class="skill">
        <span>🤖 LLM Evaluation (Claude)</span>
        <div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
      </div>

      <div class="skill">
        <span>🧠 Prompt Engineering</span>
        <div class="skill-bar"><div class="skill-fill" style="width:82%"></div></div>
      </div>

      <div class="skill">
        <span>🧪 AI Testing & Validation</span>
        <div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
      </div>


      <!-- DEVOPS -->
      <h3>Cloud & DevOps</h3>

      <div class="skill">
        <span>Cloud & Infrastructure</span>
        <div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-amazonwebservices-original colored"></i> AWS</span>
        <div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-docker-plain colored"></i> Docker</span>
        <div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-kubernetes-plain colored"></i> Kubernetes</span>
        <div class="skill-bar"><div class="skill-fill" style="width:75%"></div></div>
      </div>

      <div class="skill">
        <span>⚙️ CI/CD (Jenkins, GitHub Actions)</span>
        <div class="skill-bar"><div class="skill-fill" style="width:78%"></div></div>
      </div>


      <!-- OBSERVABILITY -->
      <h3>Observability & Reliability</h3>

      <div class="skill">
        <span>📈 Monitoring & Tracing (Dynatrace)</span>
        <div class="skill-bar"><div class="skill-fill" style="width:88%"></div></div>
      </div>

      <div class="skill">
        <span>🛠 Production Debugging</span>
        <div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div>
      </div>
      `;

      container.appendChild(panel);

      const bars = panel.querySelectorAll(".skill-fill");

      bars.forEach((bar) => {
        const baseWidth = parseFloat(bar.style.width);

        bar.style.width = "0%";

        setTimeout(() => {
          bar.style.width = baseWidth + "%";
        }, 150);

        setInterval(() => {
          const growth = baseWidth + Math.random() * 3;
          bar.style.width = growth + "%";

          setTimeout(() => {
            bar.style.width = baseWidth + "%";
          }, 2000);
        }, 4000);
      });
    },
  };
}
