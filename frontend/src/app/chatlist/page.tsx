"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    if (showWarning) {
      t = setTimeout(() => setShowWarning(false), 3000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [showWarning]);

  const onVoiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowWarning(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] flex flex-col items-center pt-10 px-6">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between px-2 mb-8">
        <div className="flex items-center gap-2 text-xl font-bold">
          🐱 <span>개인/친목</span>
        </div>
        <div className="flex gap-4 text-gray-600 text-xl">
          <span>⚙️</span>
          <span>💬</span>
        </div>
      </div>

      {/* Center Avatar */}
      <div className="text-center mt-6">
        <img src="/images/MirrorMe_icon.png" alt="MirrorMe" className="w-40 h-40 mx-auto" />

        <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold leading-relaxed">
          미오에게 트윈 학습용<br />
          데이터를 제공해 주세요 🐾
        </h2>
      </div>

      {/* Menu Buttons */}
      <div className="w-full max-w-md flex flex-col gap-4 mt-12">

        {/* 1) 최근 메시지 가져오기 모드 */}
        <Link
          href="/chatlist/upload"
          className="w-full bg-gradient-to-r from-violet-500 to-violet-400 text-white py-4 rounded-full text-base md:text-lg font-semibold shadow-md text-center active:scale-95 transition"
        >
          [채팅 입력 모드] : 카카오톡 대화기록 가져오기
        </Link>

        {/* 2) 채팅 모드 */}
        <Link
          href="/chat"
          className="w-full bg-gradient-to-r from-violet-500 to-violet-400 text-white py-4 rounded-full text-base md:text-lg font-semibold shadow-md text-center active:scale-95 transition"
        >
          [채팅 입력 모드] : 미오와 채팅하기
        </Link>

        {/* 3) 유료 플랜 */}
        <hr className="my-6 border-t border-gray-200 w-4/5 mx-auto" />
        <div className="text-center text-gray-500 text-sm mt-2">유료 플랜</div>

        {/* 4) 음성 입력 모드 */}
        <button
          onClick={onVoiceClick}
          className="w-full bg-gradient-to-r from-violet-500 to-violet-400 text-white py-4 rounded-full text-base md:text-lg font-semibold shadow-md text-center active:scale-95 transition"
        >
          [음성 입력 모드] : 미오와 음성 통화하기
        </button>
        {showWarning && (
          <div className="fixed inset-0 flex items-end sm:items-center justify-center p-6 pointer-events-none">
            <div className="pointer-events-auto bg-white border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg">
              아직 음성 채팅 기능은 활성화되지 않았습니다!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

