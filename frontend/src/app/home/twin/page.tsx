"use client";

import { useEffect, useState } from "react";

export default function TwinHome() {
  const [username, setUsername] = useState("");
  const [roleModel, setRoleModel] = useState("");
  const [mbti, setMbti] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedName = sessionStorage.getItem("username");
    const storedRole = sessionStorage.getItem("roleModel");
    const storedMbti = sessionStorage.getItem("mbti");
    if (storedName) setUsername(storedName);
    if (storedRole) setRoleModel(storedRole);
    if (storedMbti) setMbti(storedMbti);
  }, []);

  const displayName = username || "사용자";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f1ff] via-white to-[#f0eaff] px-4 pt-4 pb-28">
      <header className="flex justify-center mb-4">
        <img src="/images/MirrorMe_icon.png" alt="MirrorMe" className="h-8 object-contain" />
      </header>

      <section className="bg-white/80 backdrop-blur-sm rounded-[28px] shadow-md p-5 space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div className="flex gap-4">
            <span className="font-semibold">기록</span>
            <span className="text-gray-400">피드백</span>
            <span className="text-gray-400">성찰</span>
          </div>
          <span className="text-xs text-gray-500">대표 트윈 설정</span>
        </div>

        <div className="flex justify-center">
          <img
            src="/images/human.png"
            alt="내 트윈 캐릭터"
            className="w-36 h-72 object-contain drop-shadow-[0_10px_30px_rgba(120,85,248,0.2)]"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-violet-100 p-4 space-y-3">
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
                    #{roleModel ? "롤모델:" + roleModel : "롤모델 없음"}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500">오늘의 대화 진행률</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>진행률</span>
              <span>100%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full w-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">대화 시간</p>
            <p className="text-lg font-semibold text-gray-900">23분</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">채팅 미러링</p>
            <p className="text-lg font-semibold text-gray-900">10건</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">음성 미러링</p>
            <p className="text-lg font-semibold text-gray-900">46건</p>
          </div>
        </div>

        <button className="w-full flex items-center justify-between bg-white rounded-full shadow-sm border border-gray-200 px-4 py-3 text-sm">
          <span>오늘의 대화 어때?</span>
          <span className="text-violet-600 font-semibold">AI 피드백</span>
        </button>
      </section>
    </div>
  );
}
