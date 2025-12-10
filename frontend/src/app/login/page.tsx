"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleSocialClick = () => {
    alert("해당 기능은 아직 지원되지 않습니다.");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white px-6 py-6">

      {/* 상단 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="text-2xl mb-4"
      >
        ←
      </button>

      {/* 중앙 이미지 */}
      <div className="flex justify-center mt-4 mb-10">
        <img
          src="/images/MirrorMe_icon.png"
          alt="MirrorMe Logo"
          className="w-[70vw] max-w-[300px] h-auto object-contain"
        />
      </div>

      {/* 로그인 버튼 영역 */}
      <div className="w-full space-y-4">

        {/* 카카오 로그인 */}
        <button
          onClick={handleSocialClick}
          className="w-full flex items-center justify-center border border-gray-200 py-3 rounded-full text-gray-700 text-base shadow-sm"
        >
          <img src="/icons/kakao.png" className="w-5 h-5 mr-2" alt="Kakao Logo" />
          카카오로 로그인
        </button>

        {/* 네이버 로그인 */}
        <button
          onClick={handleSocialClick}
          className="w-full flex items-center justify-center border border-gray-200 py-3 rounded-full text-gray-700 text-base shadow-sm"
        >
          <img src="/icons/naver.png" className="w-5 h-5 mr-2" alt="Naver Logo" />
          네이버로 로그인
        </button>

        {/* Apple 로그인 */}
        <button
          onClick={handleSocialClick}
          className="w-full flex items-center justify-center border border-gray-200 py-3 rounded-full text-gray-700 text-base shadow-sm"
        >
          <img src="/icons/apple.png" className="w-5 h-5 mr-2" alt="Apple Logo" />
          Apple로 로그인
        </button>
      </div>

      {/* 구분선 */}
      <div className="flex items-center my-8 w-full">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* 세션 로그인 버튼 */}
      <button
        onClick={() => router.push("/login/SessionLogin")}
        className="w-full bg-violet-500 text-white py-4 rounded-full text-lg font-medium shadow-md active:scale-95 transition"
      >
        세션 로그인
      </button>

    </div>
  );
}
