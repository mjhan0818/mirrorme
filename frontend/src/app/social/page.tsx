"use client";

export default function SocialPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center space-y-3">
        <h1 className="text-lg font-semibold text-gray-900">소셜 기능 안내</h1>
        <p className="text-sm text-gray-600">
          로그인한 사용자만 소셜 기능을 이용할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
