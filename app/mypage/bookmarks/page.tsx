'use client';

import { Bookmark } from 'lucide-react';

export default function BookmarksPage() {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Bookmark className="w-6 h-6 text-gray-400" />
        ブックマーク
      </h1>
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="text-4xl mb-3">🔖</div>
        <p className="text-[15px] text-gray-500">まだブックマークがありません</p>
        <p className="text-[13px] text-gray-400 mt-1">レッスン視聴中にブックマークすると、ここに保存されます</p>
      </div>
    </div>
  );
}
