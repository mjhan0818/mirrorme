"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const quickActions = [
  { label: "최근 대화 분석 보기", href: "/chatlist", icon: "Chart.png" },
  { label: "상세 피드백 보기", href: "/settings", icon: "Book_check.png" },
  { label: "상황별 대화 표현 보기", href: "/chat", icon: "Chat_alt_2.png" },
];

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [roleModel, setRoleModel] = useState("");
  const progress = 0;
  const handleUnsupported = () => {
    alert("해당 기능은 아직 지원되지 않습니다.");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedName = sessionStorage.getItem("username");
    const storedRoleModel = sessionStorage.getItem("roleModel");
    if (storedName) setUsername(storedName);
    if (storedRoleModel) setRoleModel(storedRoleModel);
  }, []);

  const displayName = `${username || "사용자"}_내 트윈`;
  const displayUser = username || "사용자";
  const displayRoleModel = roleModel || "김연아";

  return (
    <div className="min-h-screen bg-[#f5f6fb] px-4 pt-6 pb-28">
      <header className="flex justify-center mb-4">
        <img src="/images/MirrorMe_icon.png" alt="MirrorMe" className="h-8 object-contain" />
      </header>

      <section className="bg-white rounded-[28px] shadow-md p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/images/Profile.png"
              alt="프로필"
              className="w-12 h-12 rounded-full bg-gray-100 object-cover"
            />
            <div>
              <p className="text-sm text-gray-500">{displayName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] px-2 py-1 rounded-full bg-violet-100 text-violet-600">
                  #신규가입
                </span>
                <span className="text-[11px] px-2 py-1 rounded-full bg-pink-100 text-pink-600">
                  #정보없음
                </span>
              </div>
            </div>
          </div>
          <button className="text-xs text-gray-500">대표 트윈 설정</button>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>오늘의 대화 진행률</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-violet-400 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push("/chatlist")}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-violet-100"
          >
            <img src="/images/Chat_mirroring.png" alt="채팅 미러링 모드" className="w-full h-full object-cover" />
          </button>
          <button
            onClick={handleUnsupported}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-pink-100"
          >
            <img src="/images/Voice_mirroring.png" alt="음성 미러링 모드" className="w-full h-full object-cover" />
          </button>
        </div>
      </section>

      <section className="mt-4 space-y-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={handleUnsupported}
            className="w-full flex items-center justify-between bg-white rounded-2xl shadow-sm px-4 py-3 border border-violet-100"
          >
            <div className="flex items-center gap-3">
              <img src={`/icons/${encodeURIComponent(action.icon)}`} alt="" className="w-6 h-6" />
              <span className="text-sm text-gray-800">{action.label}</span>
            </div>
            <span className="text-lg text-gray-300">›</span>
          </button>
        ))}
      </section>

      <section className="mt-4">
        <div className="w-full rounded-2xl shadow-md border border-violet-100 bg-[#f0eaff] text-gray-900 px-4 py-3 space-y-1">
          <div className="text-sm flex items-center gap-2">
            <span className="text-lg leading-none">💬</span>
            <span>오늘의 미션</span>
          </div>
          <p className="text-base font-semibold">침착한 톤 유지하며 말하기</p>
          <p className="text-sm text-gray-700">
            {`${displayUser}님의 롤모델 ‘${displayRoleModel}’ 말하기 영상 보러가기`}
          </p>
        </div>
      </section>
    </div>
  );
}
