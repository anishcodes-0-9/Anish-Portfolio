import {
  startAlexaThinking,
  stopAlexaThinking,
} from "../../systems/AlexaAnimation.js";

export function createAIChatPanel() {
  return {
    render(container) {
      container.innerHTML = `
        <div class="ai-chat">

          <h2>Alexa AI Assistant</h2>

          <div id="ai-chat-messages" class="ai-chat-messages"></div>

          <div class="chat-suggestions">

            <button class="chat-btn">What projects has Anish built?</button>

            <button class="chat-btn">Tell me about Anish's tech stack</button>

            <button class="chat-btn">What skills does Anish have?</button>

            <button class="chat-btn">How can I contact Anish?</button>

          </div>

          <div class="ai-chat-input">

            <input 
              id="ai-chat-input"
              type="text"
              placeholder="Ask about Anish's projects, skills, or experience..."
            />

            <button id="ai-chat-send">Send</button>

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

      function speak(text) {
        /* Stop any speech currently playing */
        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(text);

        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
      }

      async function sendMessage() {
        const message = input.value.trim();

        if (!message) return;

        addMessage("user", message);

        input.value = "";

        /* Show typing indicator */
        const typingMsg = document.createElement("div");
        typingMsg.className = "ai-msg ai typing";
        typingMsg.innerText = "Alexa is thinking...";
        messages.appendChild(typingMsg);
        messages.scrollTop = messages.scrollHeight;

        try {
          startAlexaThinking();

          const res = await fetch("http://localhost:3001/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
          });

          const data = await res.json();

          stopAlexaThinking();

          /* Replace typing message with actual reply */
          typingMsg.innerText = data.reply;

          speak(data.reply);
        } catch (error) {
          stopAlexaThinking();

          console.error(error);

          typingMsg.innerText = "Error contacting AI server.";
        }
      }
      sendBtn.addEventListener("click", sendMessage);

      input.addEventListener("keydown", (e) => {
        e.stopPropagation();

        if (e.key === "Enter") {
          e.preventDefault();

          sendMessage();
        }
      });

      input.addEventListener("focus", () => {
        document.body.classList.add("typing");

        if (window.app?.controls) {
          window.app.controls.enabled = false;
        }
      });

      input.addEventListener("blur", () => {
        document.body.classList.remove("typing");

        if (window.app?.controls) {
          window.app.controls.enabled = true;
        }
      });

      container.querySelectorAll(".chat-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          input.value = btn.innerText;

          sendMessage();
        });
      });

      addMessage(
        "ai",
        "Hi! I'm Alexa. I can tell you about Anish's projects, skills, tech stack, and work experience. Try asking something below or type your own question.",
      );
    },
  };
}
