import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" })); // 대화 길이 때문에 확장

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages 배열이 필요합니다." });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages
    });

    const answer = response.choices[0].message.content;

    res.json({ answer });

  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "OpenAI API 오류" });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
