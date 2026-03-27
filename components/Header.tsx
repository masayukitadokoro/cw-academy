"use client";

import Link from "next/link";
import { BookOpen, User, Crown } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[16px] text-gray-900">CW Academy</span>
          <span className="text-[12px] text-gray-400 hidden sm:inline">by AiHUB</span>
        </Link>
        <div className="flex items-center gap-3">
          <a href="/pricing" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-[13px] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <Crown className="w-3.5 h-3.5" /> プラン
          </a>
          <Link href="/mypage"
            className="inline-flex items-center gap-1.5 text-[13px] text-gray-600 hover:text-gray-900 transition-colors">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline">マイページ</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
