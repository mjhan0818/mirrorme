"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");
  const [userName, setUserName] = useState("");
  const [isReady, setIsReady] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");

  // -------------------------
  // 1) 파일 업로드
  // -------------------------
  const handleFileUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const text = await file.text();
    sessionStorage.setItem("full_chat", text);

    alert("대화 파일을 업로드했습니다. 이제 이름을 입력하세요.");
  };

  // -------------------------
  // 2) 이름 입력 → 말투 분석 프롬프트 생성
  // -------------------------
  const handleSetUserName = () => {
    const raw = sessionStorage.getItem("full_chat") || "";

    if (!raw) {
      alert("먼저 대화 파일을 업로드하세요.");
      return;
    }

    if (!userName.trim()) {
      alert("이름을 입력하세요.");
      return;
    }

    const lines = raw.split("\n");
    const userLines = lines.filter((line) =>
      line.startsWith(`[${userName}]`)
    );

    if (userLines.length === 0) {
      alert("이 이름으로 된 대사가 없습니다. 다시 확인하세요.");
      return;
    }

    const styleText = userLines.join("\n");

    const tonePrompt = `
당신은 지금부터 "${userName}"의 말투를 완벽하게 모방하는 AI입니다.

아래는 "${userName}"이 실제로 카카오톡에서 작성한 대화 데이터입니다.
이 사람의 말투, 문장 길이, 감정 표현, 말버릇, 자주 쓰는 단어, 띄어쓰기 습관, 구어체 패턴을 매우 정밀하게 분석하십시오.

--- 대화 데이터 ---
${styleText}
--- 끝 ---

=
다음 기준을 반드시 지키면서 답변하십시오:

1) **문장 길이**
- 평균 문장 길이를 그대로 유지하십시오.  
- 이 사람이 짧게 말하면 짧게, 길게 말하면 길게 말하십시오.

2) **문체**
- 말투, 말버릇, 감탄사, 완곡한 표현, 반말/존댓말 여부, 장난스러운 표현까지 완전히 유지하십시오.
- 문장 끝맺음 패턴까지 동일하게 하십시오.

3) **단어 사용**
- 이 사람이 자주 쓰는 단어/어구/감정표현을 우선적으로 사용하십시오.
- 이 사람이 거의 쓰지 않는 단어는 사용하지 마십시오.

4) **이모티콘**
- 이 사람이 실제로 자주 쓰는 이모티콘만 사용하십시오.
- 사용하지 않는다면 절대 쓰지 마십시오.  

5) **논리 구성**
- 대화 흐름이 이 사람의 스타일과 최대한 유사하도록 구성하십시오.
- 문맥이 바뀌더라도 말투는 절대 변경하지 않습니다.

6) **절대 금지**
- 설명하거나 장황한 메타 발언을 하지 않는다.  
- “나는 AI인데~” 같은 말 금지  
- “~할게요”, “~입니다” 형태의 GPT 기본 말투 금지  
- 분석 과정 설명 금지  
- 절대 다른 사람의 말투를 섞지 마십시오.
- 채팅의 마지막에 역질문 형식의 말을 하지 마시오.
- 웃긴 상황이 아닌데 'ㅋㅋㅋㅋ' 같은 웃음 표지를 굳이 넣지 마시오.
- 웃을 만한 상황이면 'ㅋㅋㅋ' 같은 표현을 조금 써도 좋아요.
- 말끝에 '너는 뭐 먹었어? 너는 뭐 할거야?' 같은 역질문을 절대 하지 마시오.


`;

    setMessages([{ role: "system", content: tonePrompt }]);
    setIsReady(true);
  };

  // -------------------------
  // 3) 메시지 전송
  // -------------------------
  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!isReady) {
      alert("아직 말투 분석이 완료되지 않았습니다.");
      return;
    }

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setInput("");

    const response = await fetch("http://localhost:4000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.answer },
    ]);
  };

  const handleKey = (e: any) => {
    if (e.key === "Enter") sendMessage();
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="text-xl font-semibold">채팅</div>
        <div className="flex gap-4 text-gray-600">
          <span>🔍</span>
          <span>⋮</span>
        </div>
      </div>

      {/* File Upload & Name Setting */}
      <div className="px-4 py-4 border-b space-y-3">
        <input
          type="file"
          accept=".txt"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="block text-sm text-gray-600"
        />
        {fileName && <p className="text-sm">업로드됨: {fileName}</p>}

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="당신의 이름"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />
          <button
            onClick={handleSetUserName}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            말투 학습
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white">
        {messages
          .filter((m) => m.role !== "system")
          .map((msg, idx) => (
            <div
              key={idx}
              className={`flex w-full ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  px-4 py-2 rounded-2xl max-w-[75%] text-sm animate-[fadeInUp_.35s_ease]
                  ${
                    msg.role === "user"
                      ? "bg-[#816BFF] text-white rounded-br-none"
                      : "bg-[#F5F5F7] text-black rounded-bl-none"
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}
      </div>

      {/* Input box */}
      <div className="px-4 py-3 border-t bg-white flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="메시지를 입력하세요…"
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
        />

        <button
          onClick={sendMessage}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#816BFF] text-white"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

/* Animation (globals.css에 추가해도 됨)
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
*/
