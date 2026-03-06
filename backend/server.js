import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

/* Resolve current directory */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Explicitly load .env file */
dotenv.config({ path: path.join(__dirname, ".env") });

import chatRoute from "./chatRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);

const PORT = 3001;

app.listen(PORT, () => {
  console.log("AI server running on port", PORT);

  if (!process.env.OPENAI_API_KEY) {
    console.log("⚠️ OPENAI_API_KEY NOT LOADED");
  } else {
    console.log("✅ OPENAI_API_KEY loaded");
  }
});
