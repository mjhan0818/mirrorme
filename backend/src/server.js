import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" })); // allow large text uploads

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const defaultAnalysis = {
  style: [
    { label: "단정형", value: 40 },
    { label: "질문형", value: 30 },
    { label: "제안형", value: 20 },
    { label: "공감형", value: 10 },
  ],
  sentiment: { pos: 60, neg: 15, neu: 25 },
  empathy: { expression: 4, check: 2, sufficiency: 40 },
  howWhat: {
    howType: "직설형",
    howNote: "전형적이지만 빠름",
    whatType: "사실 중심형",
    whatNote: "명확하고 직접적",
    tip: "전달 속도를 조금 조절하면 더 부드럽게 들릴 수 있어요",
  },
  insights: [],
  styleFeedback: { summary: "", suggestion: "" },
};

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages 배열이 필요합니다" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const answer = response.choices[0]?.message?.content || "";

    res.json({ answer });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "OpenAI API 오류" });
  }
});

app.post("/analysis", async (req, res) => {
  try {
    const { text, userName } = req.body || {};
    if (!text || !userName) {
      return res.status(400).json({ error: "text와 userName이 필요합니다" });
    }

    const prompt = `
당신은 대화 분석가입니다. 아래 채팅 기록을 바탕으로 JSON을 만드세요.
사용자 이름: ${userName}
채팅 기록: """${text.slice(0, 12000)}"""

JSON 스키마:
{
  "style": [{"label": "단정형", "value": number}, ...],
  "sentiment": { "pos": number, "neg": number, "neu": number },
  "empathy": { "expression": number, "check": number, "sufficiency": number },
  "howWhat": { "howType": string, "howNote": string, "whatType": string, "whatNote": string, "tip": string },
  "insights": [string, ...],
  "styleFeedback": { "summary": string, "suggestion": string }
}
값은 0~100 범위, 텍스트는 한국어로 간결하게 작성하세요.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "반드시 유효한 JSON만 반환하세요." },
        { role: "user", content: prompt },
      ],
    });

    const content = response.choices?.[0]?.message?.content;
    const parsed = content ? JSON.parse(content) : {};

    return res.json({
      style: parsed.style || defaultAnalysis.style,
      sentiment: parsed.sentiment || defaultAnalysis.sentiment,
      empathy: parsed.empathy || defaultAnalysis.empathy,
      howWhat: parsed.howWhat || defaultAnalysis.howWhat,
      insights: parsed.insights || defaultAnalysis.insights,
      styleFeedback: parsed.styleFeedback || defaultAnalysis.styleFeedback,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "분석 요청 실패",
      ...defaultAnalysis,
    });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
