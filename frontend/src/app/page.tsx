"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // 10초 뒤 자동 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/main");
    }, 10000); // 10초

    return () => clearTimeout(timer);
  }, [router]);

  const dots = 6;
  const radius = 24;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      
      {/* 중앙 이미지 */}
      <img
        src="/images/MirrorMe_icon.png"
        alt="MirrorMe Logo"
        className="w-[70vw] max-w-[350px] h-auto object-contain mb-10"
      />

      {/* 완벽한 원형 로딩 스피너 */}
      <div className="relative w-16 h-16 animate-spin">
        {[...Array(dots)].map((_, i) => {
          const angle = (i / dots) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <span
              key={i}
              className="absolute w-3 h-3 bg-violet-400 rounded-full"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
