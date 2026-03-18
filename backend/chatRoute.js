import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { loadResume } from "./resumeLoader.js";
import { portfolioKnowledge } from "./portfolioKnowledge.js";

dotenv.config();

const router = express.Router();

let conversationHistory = [];

/* Check API key */
if (!process.env.OPENAI_API_KEY) {
  console.error(" OPENAI_API_KEY is missing. Check your .env file.");
}

/* Initialize OpenAI */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* Resume text cache */
let resumeText = "";

/* Load resume once on server start */
(async () => {
  try {
    resumeText = await loadResume();

    console.log("===== RESUME TEXT =====");
    console.log("===== PORTFOLIO KNOWLEDGE =====");
    console.log(portfolioKnowledge);
    console.log("===============================");
    console.log(resumeText);
    console.log("=======================");

    console.log(" Resume loaded successfully");
  } catch (err) {
    console.error(" Failed to load resume:", err);
  }
})();

/* Chat endpoint */
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const SYSTEM_PROMPT = `
You are Alexa, the AI assistant inside Anish's interactive 3D portfolio.

You speak like a mid-level software engineer explaining their own project in an interview.

You have access to:
1. Portfolio knowledge (projects, architecture, systems)
2. Resume content (experience, skills)

---

BEHAVIOR RULES:

- Answer like a HUMAN, not documentation
- Keep answers natural, slightly conversational
- Explain WHY and HOW, not just WHAT
- Prefer clarity over listing points
- Avoid robotic phrases like "the system works as follows"
- Do NOT sound like a textbook

---

PRIORITY:

- Use portfolio knowledge for:
  architecture, systems, project decisions

- Use resume for:
  experience, skills

---

STYLE:

- If question is technical → explain like you're in an interview
- If question is general → keep it simple and clear
- Add reasoning where helpful (why something was done)

---

CONSTRAINTS:

- Do NOT invent anything
- If not present → say it's not mentioned

---

PORTFOLIO KNOWLEDGE:
${portfolioKnowledge}

---

RESUME:
${resumeText}
`;

    /* Add user message to memory */
    conversationHistory.push({
      role: "user",
      content: message,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory,
      ],
    });

    const reply = completion.choices[0].message.content;

    /* Save AI reply to memory */
    conversationHistory.push({
      role: "assistant",
      content: reply,
    });

    /* Limit conversation history */
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    res.json({
      reply,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      error: "AI request failed",
    });
  }
});

export default router;
