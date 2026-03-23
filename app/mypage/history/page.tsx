'use client';

import { History } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-gray-900 mb-4 flex items-center gap-2">
        <History className="w-6 h-6 text-gray-400" />
        視聴履歴
      </h1>
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="text-4xl mb-3">📺</div>
        <p className="text-[15px] text-gray-500">まだ視聴履歴がありません</p>
        <p className="text-[13px] text-gray-400 mt-1">レッスンを視聴すると、ここに履歴が表示されます</p>
      </div>
    </div>
  );
}
