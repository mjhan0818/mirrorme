import express from "express";
import multer from "multer";
import { parseKakaoTxt } from "./parseKakao.js";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const router = express.Router();
const upload = multer({ dest: "uploads/" });

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 1. txt 업로드 → 사용자 이름 리스트 반환
router.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const messages = parseKakaoTxt(filePath);

  const names = [...new Set(messages.map((m) => m.name))];

  res.json({ names });
});

// 2. 특정 이름 말투 학습용 프롬프트 생성
router.post("/prepare-style", async (req, res) => {
  const { selectedName, filePath } = req.body;

  const messages = parseKakaoTxt(filePath);

  const personMessages = messages
    .filter((m) => m.name === selectedName)
    .map((m) => m.text)
    .slice(-200) // 최근 200문장만 사용
    .join("\n");

  const prompt = `
너는 이제 "${selectedName}"의 말투를 따라해야 한다.
다음은 이 사람이 실제로 말한 문장들이다:

"${personMessages}"

위 문장들을 분석해서 앞으로 너는 "${selectedName}" 말투로 대답해라.
문장의 길이, 띄어쓰기 습관, 감정 표현 방식 등을 최대한 비슷하게 따라라.
`;

  res.json({ prompt });
});

// 3. 실제 채팅 요청
router.post("/chat", async (req, res) => {
  const { userInput, stylePrompt } = req.body;

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `${stylePrompt}\n\n사용자: ${userInput}\n\n${"답변:"}`,
  });

  res.json({
    answer: completion.output_text,
  });
});

export default router;
