"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "나의 대화를 비추는 거울,\nMirrorMe",
    description: "대화를 모으고 분석해 나만의 트윈을 만드는 여정을 시작해요.",
    image: "/images/main1.png",
  },
  {
    title: "나와 닮은 트윈을 생성해요",
    description: "캐릭터와 보이스를 선택하고 트윈을 만들어요.",
    image: "/images/main2.png",
  },
  {
    title: "트윈이 당신의 말투와 언어습관을 미러링해요",
    description: "실제 대화 기록을 기반으로 말투를 학습해요.",
    image: "/images/main3.png",
  },
  {
    title: "내 대화 습관을 한눈에 보여주고 피드백 해줘요",
    description: "표현 습관을 정리해 인사이트와 미션을 제공해요.",
    image: "/images/main4.png",
  },
  {
    title: "친구와 트윈을 공유해요",
    description: "완성된 트윈을 초대/공유하며 함께 즐겨요.",
    image: "/images/main5.png",
  },
];

export default function HomeContent() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.max(0, Math.min(slides.length - 1, index)));
  };

  const goLogin = () => router.push("/login");

  return (
    <>
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
        <div className="w-full px-5 py-4 flex justify-center items-center">
          <img
            src="/logos/logo_main.png"
            alt="MirrorMe Logo"
            className="h-8 object-contain"
          />
        </div>

        <div className="flex-1 relative pb-28">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scroll-container flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {slides.map((slide) => (
              <section
                key={slide.title}
                className="min-w-full snap-center px-5 pb-12 pt-4 flex"
              >
                <div className="bg-white rounded-[32px] shadow-lg w-full flex flex-col justify-between px-6 py-8 gap-6">
                  <div className="space-y-3">
                    <h1 className="text-2xl font-bold leading-snug whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full max-w-[360px] object-contain drop-shadow-[0_10px_25px_rgba(120,85,248,0.18)]"
                    />
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex
                    ? "w-6 bg-[#7b5bff]"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 w-full bg-[#f3f3f3] px-5 pb-8 pt-4">
          <button
            onClick={goLogin}
            className="w-full bg-[#7b5bff] hover:bg-[#6a4fe6] text-white text-base font-semibold py-3 rounded-full transition-colors"
          >
            바로 시작하기
          </button>
        </div>
      </div>

      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
