import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { loadResume } from "./resumeLoader.js";

dotenv.config();

const router = express.Router();

let conversationHistory = [];

/* Check API key */
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing. Check your .env file.");
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
    console.log(resumeText);
    console.log("=======================");

    console.log("✅ Resume loaded successfully");
  } catch (err) {
    console.error("❌ Failed to load resume:", err);
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
You are Alexa, an AI assistant inside Anish's interactive 3D portfolio.

Your job is to answer questions about Anish ONLY using the resume text provided below.

STRICT RULES:
- Only use the information in the resume.
- Do NOT invent skills, technologies, companies, or projects.
- If the resume does not contain the answer, say:
  "I don't see that information in Anish's resume."
- Keep answers short and clear.
- When listing skills or experience, quote or summarize directly from the resume.

Resume:
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
