"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SessionLogin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // 에러 메시지 상태 추가

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("이름이 입력되지 않았습니다!");
      return;
    }

    setError(""); // 정상 입력 시 에러 제거
    sessionStorage.setItem("username", name);
    router.push("/home");
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-white px-6 py-6">

      {/* 뒤로가기 */}
      <button
        onClick={() => router.back()}
        className="text-2xl"
      >
        ←
      </button>

      {/* 정확히 상단에서 35% 위치에 콘텐츠 배치 */}
      <div className="absolute top-[35vh] left-0 w-full px-6 flex flex-col items-center">

        {/* 안내 문구 */}
        <h1 className="text-xl text-gray-800 font-semibold mb-6 text-center">
          사용자의 이름을 입력해주세요
        </h1>

        {/* 입력 필드 */}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(""); // 입력하면 에러 자동 제거
          }}
          placeholder="이름을 입력하세요"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                     focus:outline-none focus:ring-2 focus:ring-violet-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />

        {/* 에러 메시지 */}
        {error && (
          <p className="text-red-500 text-sm mt-2 mb-4">
            {error}
          </p>
        )}

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-violet-500 text-white py-4 rounded-full text-lg font-medium
                     shadow-md active:scale-95 transition mt-4"
        >
          계속하기
        </button>
      </div>

    </div>
  );
}
