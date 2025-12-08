"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  selectedIcon?: string;
};

const items: NavItem[] = [
  { label: "내 트윈", href: "/home/twin", icon: "User_icon.png", selectedIcon: "selected_me.png" },
  { label: "소셜", href: "/social", icon: "Profile_icon.png", selectedIcon: "selected_social.png" },
  { label: "홈", href: "/home", icon: "home_icon.png", selectedIcon: "selected_home.png" },
  { label: "구독", href: "/subscription", icon: "Ticket Star.png", selectedIcon: "selected_ticket.png" },
  { label: "설정", href: "/settings", icon: "settings_icon.png", selectedIcon: "selected_setting.png" },
];

export default function BottomNav() {
  const pathname = usePathname() || "/";
  const router = useRouter();

  // 온보딩/로딩/로그인에서는 하단 내비를 숨긴다.
  const hiddenRoutes = ["/", "/main", "/login"];
  if (hiddenRoutes.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/home") {
      return pathname === "/home";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner py-3 flex justify-around text-center">
      {items.map((it) => {
        const active = isActive(it.href);
        const filename = active && it.selectedIcon ? it.selectedIcon : it.icon;
        const src = `/icons/${encodeURIComponent(filename)}`;

        return (
          <button
            key={it.href}
            onClick={() => router.push(it.href)}
            className="flex flex-col items-center"
            aria-current={active ? "page" : undefined}
          >
            <img src={src} className={`${active ? "w-7 h-7" : "w-6 h-6"} mb-1`} alt={it.label} />
            <span className={`${active ? "text-xs text-violet-500 font-semibold" : "text-xs text-gray-400"}`}>
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
