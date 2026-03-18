import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import chatRoute from "./chatRoute.js";

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("AI server running on port", PORT);

  if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI_API_KEY NOT LOADED");
  } else {
    console.log("OPENAI_API_KEY loaded");
  }
});
