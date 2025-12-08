"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const n = sessionStorage.getItem("username");
    if (n) setUsername(n);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F7F7F7] flex flex-col pb-24">

      {/* Header 영역 */}
      <div className="w-full px-5 py-3 bg-white shadow-sm flex justify-center items-center">
        <img
          src="/logos/logo_main.png"
          alt="MirrorMe Logo"
          className="h-8 object-contain"
        />
      </div>

      {/* 사용자 프로필 영역 */}
      <div className="flex items-center justify-between px-5 py-4 bg-white mt-2 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <img
            src="/images/Profile.png"
            className="w-14 h-14 rounded-full"
            alt="Profile"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {username ? `${username}_내 트윈` : "내 트윈"}
            </h2>

            <div className="flex space-x-2 mt-1">
              <span className="text-xs bg-violet-200 text-violet-700 px-2 py-1 rounded-full">
                #초기사용중
              </span>
              <span className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full">
                # goal: 긍정백배
              </span>
            </div>
          </div>
        </div>

        <button className="text-sm text-gray-500">대표 트윈 설정</button>
      </div>

      {/* 학습 진행률 */}
      <div className="px-5 mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">학습 진행률</span>
          <span className="text-sm font-medium text-gray-700">0%</span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-violet-400 h-2 rounded-full w-[0%]" />
        </div>
      </div>

      {/* 모드 선택 — 이미지 버튼 */}
      <div className="flex w-full px-5 mt-6 space-x-4">
        <button className="flex-1">
          <img
            src="/images/Chat_mirroring.png"
            className="w-full rounded-xl shadow object-cover"
            alt="Chat Mirroring Mode"
          />
        </button>

        <button className="flex-1">
          <img
            src="/images/Voice_mirroring.png"
            className="w-full rounded-xl shadow object-cover"
            alt="Voice Mirroring Mode"
          />
        </button>
      </div>

      {/* 트윈 모드 리스트 */}
      <div className="mt-6 px-5 space-y-3">

        <div className="w-full bg-white px-4 py-3 rounded-lg shadow flex items-center space-x-2">
          <span>🐻</span>
          <span>프렌들리 트윈 모드</span>
        </div>

        <div className="w-full bg-white px-4 py-3 rounded-lg shadow flex items-center space-x-2">
          <span>🐶</span>
          <span>비즈니스 모드</span>
        </div>

      </div>

      {/* 오늘의 미션 */}
      <div className="mt-6 mx-5">
        <img
          src="/images/mission.png"
          alt="Today Mission"
          className="w-full rounded-xl shadow object-cover"
        />
      </div>

      {/* 프리미엄 배너 */}
      <div className="mt-4 mx-5">
        <img
          src="/images/Premium.png"
          alt="MirrorMe Premium"
          className="w-full rounded-xl shadow object-cover"
        />
      </div>

      {/* 하단 네비게이션 — 선택된 아이콘 방식 */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner py-3 flex justify-around text-center">

        {/* 내 트윈 */}
        <button className="flex flex-col items-center">
          <img
            src="/icons/User_icon.png"
            className="w-6 h-6 mb-1"
            alt="Twin"
          />
          <span className="text-xs text-gray-400">내 트윈</span>
        </button>

        {/* 소셜 */}
        <button className="flex flex-col items-center">
          <img
            src="/icons/Profile_icon.png"
            className="w-6 h-6 mb-1"
            alt="Social"
          />
          <span className="text-xs text-gray-400">소셜</span>
        </button>

        {/* 홈 — 선택됨 */}
        <button className="flex flex-col items-center">
          <img
            src="/icons/selected_home.png"
            className="w-7 h-7 mb-1"
            alt="Home Selected"
          />
          <span className="text-xs text-violet-500 font-semibold">홈</span>
        </button>

        {/* 구독 */}
        <button className="flex flex-col items-center">
          <img
            src="/icons/Ticket Star.png"
            className="w-6 h-6 mb-1"
            alt="Ticket"
          />
          <span className="text-xs text-gray-400">구독</span>
        </button>

        {/* 설정 */}
        <button className="flex flex-col items-center">
          <img
            src="/icons/settings_icon.png"
            className="w-6 h-6 mb-1"
            alt="Settings"
          />
          <span className="text-xs text-gray-400">설정</span>
        </button>

      </div>

    </div>
  );
}
