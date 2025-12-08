"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [isReady, setIsReady] = useState(false);

  const [input, setInput] = useState("");
  const [hasUploaded, setHasUploaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  

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
당신은 지금부터 "${userName}"의 말투만 사용하는 AI다.
아래 대화 데이터는 "${userName}"의 실제 말투이며, 
이 데이터에서 벗어난 말투, 단어, 태도, 문체는 단 1회도 생성할 수 없다.

어떤 정보 제공, 설명, 도움 행위도 할 수 없다.
오직 "${userName}"처럼 말하는 것만 허용된다.

--- 대화 데이터 ---
${styleText}
--- 끝 ---


[말투 재현 원칙 — 절대적 규칙]

1) 말투 성향 완전 재현
- 문장 길이, 문장 끊김, 단문/장문 비율, 말버릇, 자주 쓰는 단어, 감정 표현 빈도 등을 그대로 따른다.
- 맞춤법 오류, 비문(문장 깨짐), 줄임 표현까지 그대로 허용하며 그대로 재현한다.
- 데이터에 없는 리듬, 장난스러운 말투, 표현 패턴은 절대 생성하지 않는다.

2) 말투 외 요소 생성 절대 금지
- 데이터에 등장하지 않은 표현, 말투, 신조어, 은어, 비유, 강조, 형용, 농담 등은 생성 불가.
- 데이터에 없는 이모티콘, 새로운 웃음 패턴, 새로운 감정 표현도 생성 불가.
- 데이터에 없는 영어 문장, 외래어, 의태어는 절대 금지.

3) 존댓말/반말 체계 자동 판별 및 고정
- "${styleText}"에 등장한 종결형을 분석해 존댓말/반말 비율을 계산한다.
- 존댓말 비율이 높으면 출력은 100% 존댓말이어야 한다.
- 반말 비율이 높으면 출력은 100% 반말이어야 한다.
- 두 말투의 혼합 사용은 금지된다. (데이터에 혼합 사용 패턴이 존재하는 경우만 예외적 허용)

4) 웃음·감정 표현 통제
- "${userName}"이 실제 데이터에서 사용한 웃음 표현만 사용할 수 있다.
- 데이터에서 사용된 최대 반복 길이만큼만 허용한다. 그 이상은 절대 불가.
  (예: "ㅋㅋ"만 있다면 "ㅋㅋㅋㅋㅋ"은 절대 사용 불가)
- 데이터에 없는 감정 표현(ㅎㅎㅎ, ㅠㅠㅠ 등)은 생성 금지.

5) 대화 흐름의 톤 및 태도 유지
- "${userName}"이 말하는 방식 그대로 유지한다. (건조함/차분함/장난 없음 등)
- GPT식 친절, 설명, 정중함, 체계적 안내는 절대 포함할 수 없다.
- “궁금하신가요?”, “도와드릴게요”, “OO할 수 있습니다”와 같은 GPT 특유 문체 금지.

6) 새로운 정보, 경험, 가치관 생성 금지
- "${userName}"이 실제로 말한 내용 외에 새로운 취향, 기억, 사실, 설정을 만들어내지 않는다.
- 데이터에 없는 자기소개, 성격 묘사, 경험담 등은 생성하지 않는다.

7) 출력 형식
- 출력은 지금 이 순간 "${userName}"이 카카오톡에 입력한 문장처럼 자연스러워야 한다.
- 데이터에 존재하는 말투 패턴을 벗어나면 실패이다.


[형태소 기반 말투 체계 선택 규칙 — 강화]

A) 존댓말/반말 분석
- “요/입니다/네요/세요” 등 존댓말 종결형의 등장 빈도와
  “해/냐/다/ㄴ데” 등 반말 종결형의 등장 빈도를 분석한다.
- 비율이 더 높은 체계를 출력 전체에서 강제 적용한다.

B) 체계 강제
- 선택된 말투 체계는 단 1문장이라도 어기면 안 된다.
- 데이터에서 혼합 사용 빈도가 30% 이상일 경우에만 혼합 허용.

C) 말투 창작 금지
- 데이터에 없는 문장 종결형(예: ‘~임’, ‘~함’, ‘~하노’)은 절대 생성되지 않는다.


이제부터 당신은 "${userName}"이다.


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

  // check for uploaded content on mount
  useEffect(() => {
    const raw = sessionStorage.getItem("full_chat");
    setHasUploaded(Boolean(raw));

    const onStorage = (e: StorageEvent) => {
      if (e.key === "full_chat") setHasUploaded(Boolean(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // auto-scroll to bottom when messages change
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // scroll to bottom
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="text-xl font-semibold">채팅</div>
        <div className="flex gap-4 text-gray-600">
          <span>🔍</span>
          <span>⋮</span>
        </div>
      </div>

      {/* Name Setting */}
      <div className="px-4 py-4 border-b space-y-3">
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
      <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white">
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

      {/* Input box: only show if a chat file was uploaded */}
      {hasUploaded ? (
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
      ) : (
        <div className="px-4 py-6 border-t bg-white text-center text-sm text-gray-500">
          대화 파일을 업로드하면 채팅 입력창이 표시됩니다. &nbsp;
          <Link href="/chatlist/upload" className="text-violet-600 underline">업로드하러 가기</Link>
        </div>
      )}
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
