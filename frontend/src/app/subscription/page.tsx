"use client";

const features = [
  { label: "픽셀 트윈 생성", free: "✓", freeColor: "text-gray-400", plus: "✔︎" },
  { label: "비즈니스 모드 사용", free: "—", plus: "✔︎" },
  { label: "더 많은 상황 기반 트윈 생성", free: "—", plus: "✔︎" },
  { label: "트윈 통화 시간 제한", free: "30분", plus: "무제한" },
  { label: "트윈 채팅 횟수 제한", free: "50회", plus: "무제한" },
  { label: "AI 피드백 리포트", free: "—", plus: "✔︎" },
  { label: "트윈 테마 기능", free: "—", plus: "✔︎" },
];

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2f4ff] via-[#f7f3ff] to-[#f2f4ff] flex flex-col items-center px-4 pt-8 pb-28">
      <header className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-3xl p-6 text-center space-y-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <img src="/logos/logo_main.png" alt="MirrorMe" className="h-8 object-contain" />
            <img src="/logos/pro.png" alt="PRO" className="h-6 object-contain" />
          </div>
          <p className="text-base font-semibold text-gray-800">나만의 트윈을 고품질로 만나보세요</p>
        </div>
      </header>

      <main className="w-full max-w-md mt-6">
        <section className="bg-white shadow-md rounded-3xl overflow-hidden">
          <div className="flex text-sm font-semibold text-gray-700 border-b">
            <div className="flex-1 px-4 py-3 text-left">기능</div>
            <div className="w-20 px-4 py-3 text-center text-gray-400">Free</div>
            <div className="w-20 px-4 py-3 text-center text-violet-600">Plus</div>
          </div>
          <div className="divide-y">
            {features.map((f) => (
              <div key={f.label} className="flex items-center text-sm">
                <div className="flex-1 px-4 py-3 text-gray-800">{f.label}</div>
                <div className={`w-20 px-4 py-3 text-center ${f.freeColor ?? "text-gray-500"}`}>{f.free}</div>
                <div className="w-20 px-4 py-3 text-center text-violet-600 font-semibold">{f.plus}</div>
              </div>
            ))}
          </div>
        </section>

        <button className="mt-6 w-full bg-[#7b5bff] hover:bg-[#6a4fe6] text-white font-semibold text-base py-4 rounded-full shadow-md transition-colors">
          ₩12,900원에 업그레이드
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          월간 자동 갱신됩니다. 언제든 취소할 수 있습니다.
        </p>
      </main>
    </div>
  );
}
