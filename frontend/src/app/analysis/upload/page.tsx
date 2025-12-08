"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type UFile = {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "completed" | "error" | "canceled";
};

// 대화 분석용 업로드 팝업 (기존 업로드 페이지와 동일 UI, 저장 키만 분리)
export default function AnalysisUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<UFile[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // 업로드 진행 애니메이션 (가짜 진행률)
  useEffect(() => {
    const timers: Record<string, number> = {};
    files.forEach((f) => {
      if (f.status === "uploading" && f.progress < 100 && !timers[f.id]) {
        timers[f.id] = window.setInterval(() => {
          setFiles((prev) =>
            prev.map((p) => {
              if (p.id !== f.id) return p;
              const next = Math.min(100, p.progress + Math.floor(Math.random() * 20) + 10);
              return { ...p, progress: next, status: next >= 100 ? "completed" : "uploading" };
            })
          );
        }, 500);
      }
    });
    return () => Object.values(timers).forEach((t) => clearInterval(t));
  }, [files]);

  async function handleFileList(list: FileList | null) {
    if (!list) return;
    const maxBytes = 500 * 1024; // 500KB
    const toAdd: UFile[] = [];

    for (const f of Array.from(list)) {
      if (!f.name.toLowerCase().endsWith(".txt")) {
        setMessage("txt 파일만 업로드가 가능합니다.");
        continue;
      }
      if (f.size > maxBytes) {
        setMessage("500KB 이하의 txt 파일만 등록할 수 있습니다.");
        continue;
      }

      try {
        const text = await f.text();
        // 분석용 스토리지 키
        sessionStorage.setItem("analysis_chat", text);
        sessionStorage.setItem("analysis_uploaded_file_name", f.name);

        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        toAdd.push({ id, name: f.name, size: f.size, progress: 100, status: "completed" });
        setMessage("파일 업로드가 완료되었습니다.");
      } catch (err) {
        setMessage("파일을 읽는 중 오류가 발생했습니다.");
      }
    }

    if (toAdd.length) {
      setFiles((prev) => [...toAdd, ...prev]);
    }
  }

  function onSelectFile() {
    inputRef.current?.click();
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((p) => p.id !== id));
  }

  function cancelUpload(id: string) {
    setFiles((prev) => prev.map((p) => (p.id === id ? { ...p, status: "canceled" } : p)));
  }

  return (
    <div className="min-h-screen bg-[#F7F7F9] flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📄</div>
            <div>
              <div className="font-medium">대화 파일 업로드</div>
              <div className="text-xs text-gray-500">분석에 사용할 txt 대화 파일을 올려주세요</div>
            </div>
          </div>
          <div className="text-gray-400">⋯</div>
        </div>

        <div className="p-4">
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="mb-3 text-gray-500">500KB 이하 txt 파일만 등록할 수 있습니다.</div>
            <div className="mb-4">
              <button
                onClick={onSelectFile}
                className="bg-white border px-4 py-2 rounded shadow text-sm"
              >
                파일 선택
              </button>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".txt"
              className="hidden"
              onChange={(e) => handleFileList(e.target.files)}
            />
          </div>

          {message && <div className="mt-3 text-sm text-red-600">{message}</div>}

          <div className="mt-4 space-y-3">
            {files.map((f) => (
              <div key={f.id} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium">{f.name}</div>
                  <div className="text-xs text-gray-500">{Math.ceil(f.size / 1024)} KB</div>
                  <div className="w-48 bg-gray-200 h-2 rounded-full mt-2">
                    <div
                      className="h-2 bg-violet-400 rounded-full"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {f.status === "uploading" && (
                    <button className="text-xs text-gray-500" onClick={() => cancelUpload(f.id)}>
                      취소
                    </button>
                  )}
                  {f.status === "completed" && <div className="text-xs text-green-600">완료</div>}
                  {f.status === "canceled" && <div className="text-xs text-gray-400">취소됨</div>}

                  <button className="text-xs text-red-500" onClick={() => removeFile(f.id)}>
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 px-2">
            <button
              onClick={() => {
                if (!sessionStorage.getItem("analysis_chat")) {
                  setMessage("업로드한 파일이 없습니다. 먼저 파일을 올려주세요.");
                  return;
                }
                router.push("/analysis"); // TODO: 분석 페이지 경로에 맞게 수정하세요.
              }}
              className="block w-full bg-gradient-to-r from-violet-500 to-violet-400 text-white py-4 rounded-full text-base md:text-lg font-semibold shadow-md text-center active:scale-95 transition"
            >
              다음으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
