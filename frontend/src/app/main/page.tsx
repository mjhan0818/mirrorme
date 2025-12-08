"use client";

import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white px-6 pt-10 pb-6">

      {/* 상단 페이지 인디케이터 */}
      <div className="flex space-x-3 mb-8">
        <span className="w-2 h-2 rounded-full bg-violet-500" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
      </div>

      {/* 타이틀 */}
      <h1 className="text-xl text-gray-800 font-semibold text-center leading-relaxed mb-8 drop-shadow-sm">
        나의 대화를 비추는 거울,<br />MirrorMe
      </h1>

      {/* 휴대폰 이미지 */}
      <div className="w-full flex justify-center mb-12">
        <img
          src="/images/phone_image.png"
          alt="Phone Preview"
          className="w-[75%] max-w-[320px] h-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* 버튼 */}
      <button
        onClick={() => router.push("/login")}
        className="w-full max-w-sm bg-violet-500 text-white py-4 rounded-full text-lg font-medium shadow-md active:scale-95 transition"
      >
        바로 시작하기
      </button>
    </div>
  );
}
