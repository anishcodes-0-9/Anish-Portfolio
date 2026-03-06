import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

/* Load environment variables */
dotenv.config();

const router = express.Router();

/* Debug check */
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing. Check your .env file.");
}

/* Initialize OpenAI */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Alexa inside Anish's interactive portfolio.

Only answer questions about:
- skills
- projects
- work experience
- tech stack
- certifications
- contact links

If the question is unrelated say:
"I can only answer questions about Anish's professional portfolio."
`;

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      error: "AI request failed",
    });
  }
});

export default router;
