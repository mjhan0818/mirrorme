"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F7F9] flex flex-col items-center pt-10 px-6">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between px-2 mb-8">
        <div className="flex items-center gap-2 text-xl font-bold">
          🐱 <span>개인/친묵</span>
        </div>
        <div className="flex gap-4 text-gray-600 text-xl">
          <span>⚙️</span>
          <span>💬</span>
        </div>
      </div>

      {/* Center Avatar */}
      <div className="text-center mt-6">
        <div className="text-7xl">🐱</div>

        <h2 className="mt-6 text-center text-xl font-semibold leading-relaxed">
          미오에게 트윈 학습용<br />
          데이터를 제공해 주세요 🐾
        </h2>
      </div>

      {/* Menu Buttons */}
      <div className="w-full max-w-md flex flex-col gap-4 mt-12">

        {/* 1) 최근 메시지 가져오기 모드 */}
        <Link
          href="/chat"
          className="w-full bg-[#816BFF] text-white py-3 rounded-xl text-center text-sm font-medium shadow-sm"
        >
          [채팅 입력 모드] : 최근 메신저 대화 가져오기
        </Link>

        {/* 2) 채팅 모드 */}
        <Link
          href="/chat"
          className="w-full bg-[#816BFF] text-white py-3 rounded-xl text-center text-sm font-medium shadow-sm"
        >
          [채팅 입력 모드] : 미오와 채팅하기
        </Link>

        {/* 3) 유료 플랜 */}
        <div className="text-center text-gray-500 text-sm mt-2">
          유료 플랜
        </div>

        {/* 4) 음성 입력 모드 */}
        <Link
          href="/chat"
          className="w-full bg-[#816BFF] text-white py-3 rounded-xl text-center text-sm font-medium shadow-sm"
        >
          [음성 입력 모드] : 미오와 음성 통화하기
        </Link>
      </div>
    </div>
  );
}


frontend/public/images/phone_image.png