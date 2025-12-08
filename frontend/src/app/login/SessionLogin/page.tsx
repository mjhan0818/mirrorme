"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SessionLogin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState("");
  const [roleModel, setRoleModel] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("이름을 입력해 주세요.");
      return;
    }
    if (!mbti.trim()) {
      setError("MBTI를 입력해 주세요.");
      return;
    }
    if (!roleModel.trim()) {
      setError("존경하는 롤모델을 입력해 주세요.");
      return;
    }

    setError("");
    sessionStorage.setItem("username", name.trim());
    sessionStorage.setItem("mbti", mbti.trim());
    sessionStorage.setItem("roleModel", roleModel.trim());
    router.push("/home");
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-white px-6 py-6">
      <button onClick={() => router.back()} className="text-2xl">
        ←
      </button>

      <div className="absolute top-[20vh] left-0 w-full px-6 flex flex-col items-center gap-4">
        <h1 className="text-xl text-gray-800 font-semibold mb-2 text-center">
          사용자의 정보를 입력해 주세요
        </h1>

        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          placeholder="이름을 입력하세요"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-violet-400"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <input
          type="text"
          value={mbti}
          onChange={(e) => {
            setMbti(e.target.value);
            if (error) setError("");
          }}
          placeholder="MBTI를 입력하세요 (예: ENFP)"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-violet-400"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <input
          type="text"
          value={roleModel}
          onChange={(e) => {
            setRoleModel(e.target.value);
            if (error) setError("");
          }}
          placeholder="존경하는 롤모델을 입력하세요"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-violet-400"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {error && (
          <p className="text-red-500 text-sm mt-1 w-full text-left">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-violet-500 text-white py-4 rounded-full text-lg font-medium shadow-md active:scale-95 transition mt-2"
        >
          계속하기
        </button>
      </div>
    </div>
  );
}
