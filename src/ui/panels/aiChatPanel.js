export function createAIChatPanel() {
  return {
    render(container) {
      container.innerHTML = `
        <div class="ai-chat">

          <h2>Alexa AI Assistant</h2>

          <div id="ai-chat-messages" class="ai-chat-messages"></div>

          <div class="ai-chat-input">
            <input 
              id="ai-chat-input"
              type="text"
              placeholder="Ask about Anish's skills, projects, or experience..."
            />

            <button id="ai-chat-send">
              Send
            </button>
          </div>

        </div>
      `;

      const messages = container.querySelector("#ai-chat-messages");
      const input = container.querySelector("#ai-chat-input");
      const sendBtn = container.querySelector("#ai-chat-send");

      function addMessage(role, text) {
        const msg = document.createElement("div");

        msg.className = `ai-msg ${role}`;

        msg.innerText = text;

        messages.appendChild(msg);

        messages.scrollTop = messages.scrollHeight;
      }

      async function sendMessage() {
        const message = input.value.trim();

        if (!message) return;

        addMessage("user", message);

        input.value = "";

        try {
          const res = await fetch("http://localhost:3001/api/chat", {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              message,
            }),
          });

          const data = await res.json();

          addMessage("ai", data.reply);
        } catch (err) {
          addMessage("ai", "Error contacting AI server.");

          console.error(err);
        }
      }

      sendBtn.addEventListener("click", sendMessage);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      });

      addMessage(
        "ai",
        "Hi. I'm Alexa. Ask me about Anish's skills, projects, or experience.",
      );
    },
  };
}
