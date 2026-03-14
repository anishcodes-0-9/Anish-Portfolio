export function createPhonePanel() {
  return {
    render(container) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.innerHTML = `
        <h2>Contact Anish</h2>

        <div class="contact-item">
          📧 Email
          <div class="contact-row">
            <span>anishkrishnan72@gmail.com</span>
            <button class="copy-btn" data-copy="anishkrishnan72@gmail.com">
              ${copyIcon()}
            </button>
          </div>
        </div>

        <div class="contact-item">
          📱 Phone
          <div class="contact-row">
            <span>+91 7986402875</span>
            <button class="copy-btn" data-copy="+917986402875">
              ${copyIcon()}
            </button>
          </div>
        </div>

        <div class="contact-item">
          💼 LinkedIn
          <div class="contact-row">
            <span>linkedin.com/in/anishkrishnan09</span>
            <button class="copy-btn" data-copy="https://linkedin.com/in/anishkrishnan09">
              ${copyIcon()}
            </button>
          </div>
        </div>

        <div class="contact-item">
          💻 GitHub
          <div class="contact-row">
            <span>github.com/anishcodes</span>
            <button class="copy-btn" data-copy="https://github.com/anishcodes-0-9">
              ${copyIcon()}
            </button>
          </div>
        </div>
      `;

      function copyIcon() {
        return `
          <svg xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4
            a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;
      }

      container.appendChild(panel);

      /* COPY LOGIC */

      panel.querySelectorAll(".copy-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const text = btn.dataset.copy;

          try {
            await navigator.clipboard.writeText(text);

            showCopyToast("Copied to clipboard");

            btn.classList.add("copied");

            setTimeout(() => {
              btn.classList.remove("copied");
            }, 1000);
          } catch (err) {
            console.error("Clipboard failed", err);
            showCopyToast("Copy failed");
          }
        });
      });

      function showCopyToast(text) {
        const toast = document.createElement("div");

        toast.className = "copy-toast";
        toast.innerText = text;

        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 10);

        setTimeout(() => {
          toast.classList.remove("show");

          setTimeout(() => toast.remove(), 300);
        }, 1500);
      }
    },
  };
}
