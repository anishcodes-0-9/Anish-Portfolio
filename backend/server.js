import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import chatRoute from "./chatRoute.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-url.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.use(express.json());

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("AI server running on port", PORT);

  if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI_API_KEY NOT LOADED");
  } else {
    console.log("OPENAI_API_KEY loaded");
  }
});
