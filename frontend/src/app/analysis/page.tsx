"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AnalysisData = {
  style: { label: string; value: number }[];
  sentiment: { pos: number; neg: number; neu: number };
  empathy: { expression: number; check: number; sufficiency: number };
  howWhat: { howType: string; howNote: string; whatType: string; whatNote: string; tip: string };
  insights: string[];
  styleFeedback?: { summary?: string; suggestion?: string };
};

const defaultData: AnalysisData = {
  style: [
    { label: "단정형", value: 40 },
    { label: "질문형", value: 30 },
    { label: "제안형", value: 20 },
    { label: "공감형", value: 10 },
  ],
  sentiment: { pos: 60, neg: 15, neu: 25 },
  empathy: { expression: 4, check: 2, sufficiency: 40 },
  howWhat: {
    howType: "직설형",
    howNote: "전형적이지만 빠름",
    whatType: "사실 중심형",
    whatNote: "명확하고 직접적",
    tip: "전달 속도를 조금 조절하면 더 부드럽게 들릴 수 있어요",
  },
  insights: [],
  styleFeedback: { summary: "", suggestion: "" },
};

const SENTIMENT_COLORS = {
  pos: "#34c759",
  neg: "#ff3b30",
  neu: "#9b9b9b",
};

type TabKey = "emotion" | "tone" | "style" | "relation" | "ai";

export default function AnalysisPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("style");

  useEffect(() => {
    const text = sessionStorage.getItem("analysis_chat");
    const userName = sessionStorage.getItem("username") || "";
    if (!text || !userName) {
      router.push("/analysis/upload");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, userName }),
        });
        if (!res.ok) throw new Error("분석 요청에 실패했습니다.");
        const json = await res.json();
        setData({
          style: json.style || defaultData.style,
          sentiment: json.sentiment || defaultData.sentiment,
          empathy: json.empathy || defaultData.empathy,
          howWhat: json.howWhat || defaultData.howWhat,
          insights: json.insights || [],
          styleFeedback: json.styleFeedback || defaultData.styleFeedback,
        });
      } catch (e: any) {
        console.error(e);
        setError(e.message || "분석 처리 중 오류가 발생했습니다.");
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const sentimentChartData = [
    { name: "긍정", value: data.sentiment.pos, key: "pos" },
    { name: "부정", value: data.sentiment.neg, key: "neg" },
    { name: "중립", value: data.sentiment.neu, key: "neu" },
  ];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "emotion", label: "감정 분석" },
    { key: "tone", label: "톤·어조" },
    { key: "style", label: "스타일" },
    { key: "relation", label: "관계 분석" },
    { key: "ai", label: "AI 미러링" },
  ];

  const StyleFeedbackCard = () => {
    const summary = data.styleFeedback?.summary?.trim();
    const suggestion = data.styleFeedback?.suggestion?.trim();
    if (!summary && !suggestion) return null;
    return (
      <div className="bg-orange-50 text-orange-700 text-xs rounded-lg p-3 border border-orange-100 space-y-1">
        {summary && <div className="font-semibold">{summary}</div>}
        {suggestion && <div className="text-[11px] text-orange-800">{suggestion}</div>}
      </div>
    );
  };

  const ComingSoon = ({ label }: { label: string }) => (
    <section className="bg-white rounded-2xl shadow p-4 text-sm text-gray-700 text-center">
      {label} 리포트는 준비 중입니다. 업데이트 후 확인할 수 있어요.
    </section>
  );

  const renderContent = () => {
    if (activeTab === "tone") {
      return <ComingSoon label="톤·어조" />;
    }

    if (activeTab === "style") {
      return (
        <>
          <section className="bg-white rounded-2xl shadow p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">문장 스타일 분석</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.style}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#816BFF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <StyleFeedbackCard />
          </section>

          <section className="bg-white rounded-2xl shadow p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">공감 표현 빈도</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-pink-50 text-pink-700 rounded-lg p-3">
                공감 표현 <span className="font-semibold">{data.empathy.expression}회</span>
              </div>
              <div className="bg-blue-50 text-blue-700 rounded-lg p-3">
                감정 확인 말 <span className="font-semibold">{data.empathy.check}회</span>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              공감 표현 충분도 <span className="font-semibold">{data.empathy.sufficiency}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#816BFF]"
                style={{ width: `${Math.min(100, data.empathy.sufficiency)}%` }}
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">긍정·중립·부정 표현 분석</h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sentimentChartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}>
                    {sentimentChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={SENTIMENT_COLORS[entry.key as keyof typeof SENTIMENT_COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: SENTIMENT_COLORS.pos }} />
                긍정 {data.sentiment.pos}%
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: SENTIMENT_COLORS.neg }} />
                부정 {data.sentiment.neg}%
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: SENTIMENT_COLORS.neu }} />
                중립 {data.sentiment.neu}%
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">"HOW vs WHAT" 분석</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-purple-50 text-purple-700 rounded-lg p-3">
                <p className="font-semibold">전달 방식 (How)</p>
                <p className="text-xs mt-1 text-purple-700">{data.howWhat.howType}</p>
                <p className="text-[11px] mt-1 text-purple-700">{data.howWhat.howNote}</p>
              </div>
              <div className="bg-blue-50 text-blue-700 rounded-lg p-3">
                <p className="font-semibold">내용 (What)</p>
                <p className="text-xs mt-1 text-blue-700">{data.howWhat.whatType}</p>
                <p className="text-[11px] mt-1 text-blue-700">{data.howWhat.whatNote}</p>
              </div>
              <div className="bg-yellow-50 text-yellow-800 rounded-lg p-3 text-xs">
                TIP {data.howWhat.tip}
              </div>
            </div>
          </section>
        </>
      );
    }

    if (activeTab === "emotion") {
      return <ComingSoon label="감정 분석" />;
    }

    if (activeTab === "relation") {
      return <ComingSoon label="관계 분석" />;
    }

    if (activeTab === "ai") {
      return <ComingSoon label="AI 미러링" />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#d9dff9] px-4 py-6 pb-32">
      <div className="max-w-md mx-auto space-y-4">
        <header className="flex flex-col items-center gap-2">
          <img src="/logos/logo_main.png" alt="MirrorMe" className="h-8 object-contain" />
          <div className="text-gray-700 flex gap-3 text-sm">
            <span className="font-semibold">기록</span>
            <span className="font-semibold text-gray-900 border-b-2 border-gray-900 pb-1">피드백</span>
            <span className="font-semibold text-gray-400">성찰</span>
          </div>
        </header>

        <section className="bg-white rounded-2xl shadow p-4 space-y-1">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <span className="text-xl">MSG</span>
            <span>MirrorMe AI 피드백 대시보드</span>
          </div>
          <p className="text-xs text-gray-500">AI 기반 음성·감정·톤 종합 분석 리포트</p>
        </section>

        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1 rounded-full text-sm border ${
                activeTab === t.key
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="bg-white rounded-2xl shadow p-4 text-center text-sm text-gray-600">분석 중...</div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl shadow p-4">
            {error}
          </div>
        )}

        {!loading && renderContent()}
      </div>
    </div>
  );
}
