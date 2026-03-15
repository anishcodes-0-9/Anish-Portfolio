export function createTechStackPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
      <h2>Tech Stack</h2>

      <div class="skill">
        <span><i class="devicon-java-plain colored"></i> Java</span>
        <div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-python-plain colored"></i> Python</span>
        <div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-javascript-plain colored"></i> JavaScript</span>
        <div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-spring-plain colored"></i> Spring Boot</span>
        <div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-react-original colored"></i> React</span>
        <div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-amazonwebservices-original colored"></i> AWS</span>
        <div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-docker-plain colored"></i> Docker</span>
        <div class="skill-bar"><div class="skill-fill" style="width:75%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-kubernetes-plain colored"></i> Kubernetes</span>
        <div class="skill-bar"><div class="skill-fill" style="width:70%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-postgresql-plain colored"></i> PostgreSQL</span>
        <div class="skill-bar"><div class="skill-fill" style="width:75%"></div></div>
      </div>

      <div class="skill">
        <span><i class="devicon-github-original colored"></i> Observability & Debugging</span>
        <div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
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

        // subtle growth animation
        setInterval(() => {
          const growth = baseWidth + Math.random() * 4;
          bar.style.width = growth + "%";

          setTimeout(() => {
            bar.style.width = baseWidth + "%";
          }, 2000);
        }, 4000);
      });
    },
  };
}
