'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { CATEGORIES, getTotalLessons } from '@/lib/categoryDefinitions';
import {
  Play, BookOpen, Bookmark, History, ChevronRight, Trophy,
} from 'lucide-react';

export default function MypageDashboard() {
  const { profile } = useAuth();
  const totalLessons = CATEGORIES.reduce((sum, c) => sum + getTotalLessons(c), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900 m-0">
          おかえりなさい、{profile?.display_name || 'ユーザー'}さん
        </h1>
        <p className="text-[14px] text-gray-500 mt-1 m-0">学習の進捗を確認しましょう</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-4 h-4 text-red-500" />
            <span className="text-[12px] text-gray-500">総レッスン数</span>
          </div>
          <div className="text-[24px] font-bold text-gray-900">{totalLessons}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-emerald-500" />
            <span className="text-[12px] text-gray-500">完了済み</span>
          </div>
          <div className="text-[24px] font-bold text-gray-900">0</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="text-[12px] text-gray-500">カテゴリ</span>
          </div>
          <div className="text-[24px] font-bold text-gray-900">{CATEGORIES.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="w-4 h-4 text-orange-500" />
            <span className="text-[12px] text-gray-500">ブックマーク</span>
          </div>
          <div className="text-[24px] font-bold text-gray-900">0</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <h2 className="text-[16px] font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-400" />
          カテゴリ別進捗
        </h2>
        <div className="space-y-3">
          {CATEGORIES.map(cat => {
            const total = getTotalLessons(cat);
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition no-underline"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cat.color}15` }}>
                  <BookOpen className="w-4 h-4" style={{ color: cat.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-gray-800">{cat.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '0%', background: cat.color }} />
                    </div>
                    <span className="text-[12px] text-gray-400 shrink-0">0/{total}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/mypage/history" className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition no-underline">
          <History className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-[14px] font-semibold text-gray-800">視聴履歴</div>
            <div className="text-[12px] text-gray-400">最近見た動画を確認</div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
        </Link>
        <Link href="/mypage/bookmarks" className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition no-underline">
          <Bookmark className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-[14px] font-semibold text-gray-800">ブックマーク</div>
            <div className="text-[12px] text-gray-400">保存したレッスンを確認</div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
        </Link>
      </div>
    </div>
  );
}
