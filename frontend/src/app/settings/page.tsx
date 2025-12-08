import React from "react";

export default function SettingsPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-violet-50 to-white flex flex-col items-center pb-40">

      <div className="w-full px-5 pt-6 flex justify-center items-center">
        <img src="/logos/logo_main.png" alt="MirrorMe" className="h-8 object-contain" />
      </div>

      <div className="w-full flex flex-col items-center mt-6">
        <div className="w-28 h-28 bg-white rounded-full shadow-sm flex items-center justify-center">
          <img src="/images/Profile.png" alt="profile" className="w-20 h-20 rounded-full" />
        </div>

        <div className="flex space-x-4 mt-4">
          <button className="px-6 py-2 bg-white rounded-lg shadow">내 계정</button>
          <button className="px-6 py-2 bg-white rounded-lg shadow">트윈 관리</button>
        </div>
      </div>

      <div className="w-full px-5 mt-6">
        <h3 className="text-sm font-semibold mb-3">일반 설정</h3>

        <div className="space-y-3">
          <div className="w-full bg-white px-4 py-3 rounded-lg shadow flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl">⚙️</span>
              <span>앱 환경</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>

          <div className="w-full bg-white px-4 py-3 rounded-lg shadow flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📁</span>
              <span>데이터 관리</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>

          <div className="w-full bg-white px-4 py-3 rounded-lg shadow flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🌐</span>
              <span>고객 지원</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </div>
      </div>

      <div className="w-full px-5 mt-6">
        <img
          src="/images/Premium.png"
          alt="MirrorMe Premium"
          className="w-full rounded-xl shadow object-cover"
        />
      </div>

    </div>
  );
}
