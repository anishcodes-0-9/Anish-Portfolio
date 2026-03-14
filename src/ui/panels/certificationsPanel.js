export function createCertificationsPanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
      <h2>Certifications</h2>

      <!-- AWS Cloud Practitioner -->
      <div class="project-item">
        <h3>☁️ AWS Cloud Practitioner – Foundational</h3>
        <p><strong>Issuing Organization:</strong> Amazon Web Services</p>
        <p><strong>Credential ID:</strong> E9M0RKJKWM4E1DK3 </p>

        <div class="cert-links">
          <a href="/certificates/aws-cloud-practitioner.pdf" target="_blank">
            View Certificate
          </a>

          <a href="https://aws.amazon.com/verification" target="_blank">
            Verify Credential
          </a>
        </div>
      </div>


      <!-- AWS Developer Associate -->
      <div class="project-item">
        <h3>☁️ AWS Certified Developer – Associate</h3>
        <p><strong>Issuing Organization:</strong> Amazon Web Services</p>
        <p><strong>Credential ID:</strong> 0dc9259e497a4306afb539cb6d2cd9fd </p>

        <div class="cert-links">
          <a href="/certificates/aws-developer-associate.pdf" target="_blank">
            View Certificate
          </a>

          <a href="https://aws.amazon.com/verification" target="_blank">
            Verify Credential
          </a>
        </div>
      </div>


      <!-- AWS AI Practitioner -->
      <div class="project-item">
        <h3>🤖 AWS Certified AI Practitioner</h3>
        <p><strong>Issuing Organization:</strong> Amazon Web Services</p>
        <p><strong>Credential ID:</strong> 3760f0aef37341198dd4f7f39e0dfe71 </p>

        <div class="cert-links">
          <a href="/certificates/aws-ai-practitioner.pdf" target="_blank">
            View Certificate
          </a>

          <a href="https://aws.amazon.com/verification" target="_blank">
            Verify Credential
          </a>
        </div>
      </div>


      <!-- GitHub Copilot Certification -->
      <div class="project-item">
        <h3>⚡ GitHub Copilot Certification</h3>
        <p><strong>Issuing Organization:</strong> GitHub</p>
        <p><strong>Credential ID:</strong> xkNgR7ca </p>

        <div class="cert-links">
          <a href="/certificates/github-copilot-cert.pdf" target="_blank">
            View Certificate
          </a>

          <a href="https://www.credly.com/go/xkNgR7ca" target="_blank">
            Verify Credential
          </a>
        </div>
      </div>
      `;

      container.appendChild(panel);
    },
  };
}
