import {
  startAlexaThinking,
  stopAlexaThinking,
} from "../../systems/AlexaAnimation.js";

export function createAIChatPanel() {
  return {
    render(container) {
      container.innerHTML = `
        <div class="ai-chat">

          <div class="ai-header">
  <h2>Alexa AI Assistant</h2>
  <label class="voice-toggle">
    <input type="checkbox" id="voice-toggle" />
    🔊 Voice
  </label>
</div>

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
      const voiceToggle = container.querySelector("#voice-toggle");

      let voiceEnabled = false;
      let lastReply = "";
      voiceToggle.addEventListener("change", () => {
        voiceEnabled = voiceToggle.checked;

        if (!("speechSynthesis" in window)) return;

        if (!voiceEnabled) {
          // 🔴 STOP current speech
          window.speechSynthesis.cancel();
        } else {
          // 🟢 REPLAY last AI response
          if (lastReply) {
            speak(lastReply);
          }
        }
      });

      // disable by default on Chrome
      if (!isChrome()) {
        voiceEnabled = true;
        voiceToggle.checked = true;
      } else {
        voiceEnabled = false;
        voiceToggle.checked = false;
        voiceToggle.disabled = true;

        voiceToggle.parentElement.title =
          "Voice not supported reliably on Chrome";
      }

      function addMessage(role, text) {
        const msg = document.createElement("div");

        msg.className = `ai-msg ${role}`;

        msg.innerText = text;

        messages.appendChild(msg);

        messages.scrollTop = messages.scrollHeight;
      }

      function isChrome() {
        return (
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor)
        );
      }
      function speak(text) {
        if (!("speechSynthesis" in window)) return;

        const synth = window.speechSynthesis;

        // 🔥 stop ONLY if currently speaking
        if (synth.speaking) {
          synth.cancel();
        }

        const speech = new SpeechSynthesisUtterance(text);

        let voices = synth.getVoices();

        if (!voices.length) {
          synth.onvoiceschanged = () => {
            voices = synth.getVoices();
          };
        }

        // 🔥 pick stable voice
        speech.voice =
          voices.find((v) => v.name.includes("Google")) ||
          voices.find((v) => v.lang === "en-US") ||
          voices[0];

        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        // 🔥 debug logs (keep for now)
        speech.onstart = () => console.log("🔊 speaking...");
        speech.onend = () => console.log("✅ done speaking");
        speech.onerror = (e) => console.error("❌ speech error", e);

        synth.speak(speech);
      }

      async function sendMessage() {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        const message = input.value.trim();
        if (!message) return;

        addMessage("user", message);
        input.value = "";

        /* typing UI */
        const typingMsg = document.createElement("div");
        typingMsg.className = "ai-msg ai typing";
        typingMsg.innerText = "Alexa is thinking...";
        messages.appendChild(typingMsg);
        messages.scrollTop = messages.scrollHeight;

        try {
          startAlexaThinking();

          const API_URL = import.meta.env.VITE_API_URL;

          const res = await fetch(`${API_URL}/api/chat`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
          });

          const data = await res.json();

          stopAlexaThinking();

          typingMsg.innerText = data.reply;
          lastReply = data.reply;

          //  NOW speech will work
          if (voiceEnabled && !isChrome() && data.reply) {
            speak(data.reply);
          }
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
