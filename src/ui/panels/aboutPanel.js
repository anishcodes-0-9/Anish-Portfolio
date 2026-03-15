export function createAboutPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
<h2 style="text-align:center">About Me</h2>

<div class="about-photo">
  <img src="/textures/anish-photo.png" />
</div>

<div class="about-content">

<p>
I'm a Software Engineer with experience building backend systems,
distributed services and full stack applications. I enjoy solving
complex engineering problems and designing systems that are reliable,
observable and scalable.
</p>

<p>
My work spans backend engineering, cloud infrastructure,
debugging distributed systems and leveraging AI tools
to improve developer productivity.
</p>

<h3>Beyond Work</h3>

<ul>
  <li>⚽ Football</li>
  <li>💪 Fitness</li>
  <li>🤝 Collaboration</li>
  <li>🚀 Continuous Learning</li>
</ul>

</div>
`;

      container.appendChild(panel);
    },
  };
}
