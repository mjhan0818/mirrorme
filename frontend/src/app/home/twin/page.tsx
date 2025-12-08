"use client";

import { useEffect, useState } from "react";

export default function TwinHome() {
  const [username, setUsername] = useState("");
  const [roleModel, setRoleModel] = useState("");
  const [mbti, setMbti] = useState("");
  const [chatCount, setChatCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"record" | "feedback" | "reflect">("record");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedName = sessionStorage.getItem("username");
    const storedRole = sessionStorage.getItem("roleModel");
    const storedMbti = sessionStorage.getItem("mbti");
    const storedChat = sessionStorage.getItem("chat_send_count");
    if (storedName) setUsername(storedName);
    if (storedRole) setRoleModel(storedRole);
    if (storedMbti) setMbti(storedMbti);
    if (storedChat) setChatCount(Number(storedChat) || 0);
  }, []);

  const displayName = (username || "사용자") + "_내 트윈";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f1ff] via-white to-[#f0eaff] px-4 pt-4 pb-28">
      <header className="flex justify-center mb-4">
        <img src="/images/MirrorMe_icon.png" alt="MirrorMe" className="h-8 object-contain" />
      </header>

      <section className="bg-white/80 backdrop-blur-sm rounded-[28px] shadow-md p-5 space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("record")}
              className={`font-semibold transition-colors ${activeTab === "record" ? "text-gray-900" : "text-gray-400"}`}
            >
              기록
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`font-semibold transition-colors ${activeTab === "feedback" ? "text-gray-900" : "text-gray-400"}`}
            >
              피드백
            </button>
            <button
              onClick={() => setActiveTab("reflect")}
              className={`font-semibold transition-colors ${activeTab === "reflect" ? "text-gray-900" : "text-gray-400"}`}
            >
              성찰
            </button>
          </div>
          <span className="text-xs text-gray-500">대표 트윈 설정</span>
        </div>

        {activeTab === "record" && (
          <>
            <div className="flex justify-center">
              <div className="relative w-full flex justify-center">
                <img
                  src="/images/human.png"
                  alt="내 트윈 캐릭터"
                  className="w-40 h-80 object-contain drop-shadow-[0_10px_30px_rgba(120,85,248,0.2)]"
                />
              </div>
            </div>

            <div className="-mt-10 bg-white rounded-2xl shadow-sm border border-violet-100 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <img
                    src="/images/Profile.png"
                    alt="프로필"
                    className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">{displayName}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-[11px] px-2 py-1 rounded-full bg-violet-100 text-violet-600">
                        #{mbti || "MBTI"}
                      </span>
                      <span className="text-[11px] px-2 py-1 rounded-full bg-pink-100 text-pink-600">
                        #{roleModel ? `롤모델:${roleModel}` : "롤모델 없음"}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">오늘의 대화 진행률</span>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>진행률</span>
                  <span>0%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: "0%" }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center space-y-1">
                <img src="/icons/clock.png" alt="대화 시간" className="w-6 h-6 mx-auto" />
                <p className="text-xs text-gray-500">대화 시간</p>
                <p className="text-lg font-semibold text-gray-900">0분</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center space-y-1">
                <img src="/icons/chatting.png" alt="채팅 미러링" className="w-6 h-6 mx-auto" />
                <p className="text-xs text-gray-500">채팅 미러링</p>
                <p className="text-lg font-semibold text-gray-900">{chatCount}건</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center space-y-1">
                <img src="/icons/mic.png" alt="음성 미러링" className="w-6 h-6 mx-auto" />
                <p className="text-xs text-gray-500">음성 미러링</p>
                <p className="text-lg font-semibold text-gray-900">0건</p>
              </div>
            </div>

            <button className="w-full flex items-center justify-between bg-white rounded-full shadow-sm border border-gray-200 px-4 py-3 text-sm">
              <span>오늘의 대화 어때?</span>
              <span className="text-violet-600 font-semibold">AI 피드백</span>
            </button>
          </>
        )}

        {activeTab === "feedback" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-4 text-left space-y-1">
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <span className="text-xl">💬</span>
                <span>MirrorMe AI 피드백 대시보드</span>
              </div>
              <p className="text-xs text-gray-500">AI 기반 음성·감정·톤 종합 분석 리포트</p>
            </div>

            <div className="space-y-3">
              {[
                { title: "트윙과의 대화 피드백", desc: "오늘 주고받은 대화를 바탕으로 피드백 리포트를 생성해요." },
                { title: "친목 모드 채팅/음성 피드백", desc: "채팅 기록/음성 피드를 바탕으로 리포트를 생성해요." },
                { title: "비즈니스 모드 채팅/음성 피드백", desc: "채팅 기록/음성 피드를 바탕으로 리포트를 생성해요." },
                { title: "비즈니스 모드 프레젠테이션 피드백", desc: "발표 음성 피드를 바탕으로 리포트를 생성해요." },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => (window.location.href = "/analysis/upload")}
                  className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2 hover:border-violet-200 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>데이터 업로드/입력 완료 시 자동으로 리포트가 생성돼요</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
