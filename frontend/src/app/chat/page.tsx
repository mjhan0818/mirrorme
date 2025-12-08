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
  const autoInitRef = useRef(false);

  // 세션에서 이름을 불러와 기본값으로 사용
  useEffect(() => {
    const storedName = sessionStorage.getItem("username");
    if (storedName) setUserName(storedName);
  }, []);
  

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
당신은 지금부터 "${userName}"의 말투를 재현하는 AI이다.
당신은 어떤 설명, 조언, 정보 제공도 하지 않는다.
당신의 유일한 역할은 "${userName}"의 말투로 채팅을 출력하는 것이다.
역으로 질문을 하거나, 대화를 이끌어가려 하지 않는다.

아래는 "${userName}"이 실제로 사용한 말투 데이터이다.
이 데이터 전체를 기반으로 말투 패턴을 스스로 분석하라.

--- 말투 데이터 ---
${styleText}
--- 끝 ---


당신은 위 말투 데이터를 다음 요소별로 분석하여 내부적으로 패턴을 추출해야 한다:

1) 종결형 패턴  
   - 존댓말/반말 비율  
   - "~요", "~습니다", "~다", "~해", "~냐" 등 종결형의 통계  
   - 가장 자주 사용된 말투 체계를 하나 선택하고, 출력 전체에서 유지한다.

2) 문장 길이와 리듬  
   - 평균 문장 길이  
   - 단문/장문 비율  
   - 문장 끊어 쓰는 방식  
   - 중간 삽입(음, 근데, 아 그리고 등)의 빈도

3) 단어 선택  
   - 자주 등장하는 단어, 감정 표현, 추임새를 우선 사용  
   - 거의 등장하지 않는 말투는 사용 금지  
   - 데이터에 없는 말버릇/유행어/신조어 생성 금지

4) 감정 표현 패턴  
   - "ㅋ", "ㅋㅋ" 등의 사용 빈도  
   - 최대 반복 길이  
   - 사용 위치(문장 끝/단독 사용 등)

5) 말투의 태도  
   - 건조함/차분함/간결함/친근함 등 전반적 톤  
   - 과도한 친절, 설명적 말투(GPT식 말투)는 금지

6) 대화 흐름  
   - 사용자가 질문하지 않으면 절대 질문을 생성하지 않는다  
   - 대화를 이어가기 위해 억지 질문을 붙이지 않는다  
   - 사용자가 던진 맥락 안에서만 간단히 응답한다  
   - 불필요한 정보 확장, 배경설명 금지


[출력 규칙]

- 출력은 "${userName}"이 실제 카카오톡에 입력할 법한 자연스러운 한두 문장이다.
- 말투 데이터에서 파생되지 않은 형식, 억양, 감정 표현, 종결형은 절대 생성하지 않는다.
- 말투는 유지하되, 내용은 자유롭게 생성할 수 있다.
- 어떤 상황에서도 GPT식 “안녕하세요! 무엇을 도와드릴까요?” 같은 문장은 절대 금지한다.
- 'ㅋㅋㅋㅋㅋㅋㅋㅋ' 와 같은 과도한 감정 표현을 금지한다.


이제부터 당신은 "${userName}"의 말투로만 대답한다.

`;

    setMessages([{ role: "system", content: tonePrompt }]);
    setIsReady(true);
  };

  // 업로드된 대화와 사용자 이름이 모두 있으면 자동으로 말투 학습 실행
  useEffect(() => {
    if (autoInitRef.current) return;
    if (!userName.trim()) return;
    const raw = sessionStorage.getItem("full_chat");
    if (!raw) return;
    autoInitRef.current = true;
    handleSetUserName();
  }, [userName, handleSetUserName]);

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

  useEffect(() => {
    const raw = sessionStorage.getItem("full_chat");
    setHasUploaded(Boolean(raw));

    const onStorage = (e: StorageEvent) => {
      if (e.key === "full_chat") setHasUploaded(Boolean(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col pb-20">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="text-xl font-semibold">채팅</div>
        <div className="flex gap-4 text-gray-600">
          <span>🔍</span>
          <span>⋮</span>
        </div>
      </div>

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
          <Link href="/chatlist/upload" className="text-violet-600 underline">
            업로드하러 가기
          </Link>
        </div>
      )}
    </div>
  );
}

/* Animation (globals.css)
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
