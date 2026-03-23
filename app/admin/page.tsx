'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Users, BookOpen, Play, Eye, TrendingUp, Clock } from 'lucide-react';
import { CATEGORIES, getTotalLessons } from '@/lib/categoryDefinitions';

interface Stats {
  totalUsers: number;
  todayUsers: number;
  totalWatched: number;
  totalBookmarks: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, todayUsers: 0, totalWatched: 0, totalBookmarks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      const [profilesRes, watchRes, bookmarksRes] = await Promise.all([
        supabase.from('profiles').select('user_id, created_at'),
        supabase.from('watch_history').select('id', { count: 'exact', head: true }),
        supabase.from('bookmarks').select('id', { count: 'exact', head: true }),
      ]);

      const profiles = profilesRes.data || [];
      const today = new Date().toISOString().split('T')[0];
      const todayUsers = profiles.filter(p => p.created_at?.startsWith(today)).length;

      setStats({
        totalUsers: profiles.length,
        todayUsers,
        totalWatched: watchRes.count || 0,
        totalBookmarks: bookmarksRes.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const totalLessons = CATEGORIES.reduce((sum, c) => sum + getTotalLessons(c), 0);
  const totalCourses = CATEGORIES.reduce((sum, c) => sum + c.courses.length, 0);

  return (
    <div>
      <h1 className="text-[24px] font-bold text-gray-900 mb-6">ダッシュボード</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2">
            <Users className="w-4 h-4 text-blue-500" /> 総ユーザー数
          </div>
          <div className="text-[28px] font-bold text-gray-900">{loading ? '...' : stats.totalUsers}</div>
          <div className="text-[12px] text-green-600 mt-1">今日 +{stats.todayUsers}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2">
            <Eye className="w-4 h-4 text-purple-500" /> 総視聴回数
          </div>
          <div className="text-[28px] font-bold text-gray-900">{loading ? '...' : stats.totalWatched}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2">
            <BookOpen className="w-4 h-4 text-orange-500" /> コンテンツ
          </div>
          <div className="text-[28px] font-bold text-gray-900">{totalCourses}</div>
          <div className="text-[12px] text-gray-400 mt-1">{totalLessons} レッスン / {CATEGORIES.length} カテゴリ</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> ブックマーク
          </div>
          <div className="text-[28px] font-bold text-gray-900">{loading ? '...' : stats.totalBookmarks}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-[16px] font-bold text-gray-800 mb-4">カテゴリ別コンテンツ数</h2>
          <div className="space-y-3">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                <span className="text-[14px] text-gray-700 flex-1">{cat.name}</span>
                <span className="text-[13px] text-gray-500">{cat.courses.length}コース / {getTotalLessons(cat)}レッスン</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-[16px] font-bold text-gray-800 mb-4">クイックアクション</h2>
          <div className="space-y-2">
            <a href="/admin/content" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition no-underline text-gray-700">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-[14px] font-medium">コンテンツを追加・編集</div>
                <div className="text-[12px] text-gray-400">カテゴリ・講座・レッスンの管理</div>
              </div>
            </a>
            <a href="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition no-underline text-gray-700">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-[14px] font-medium">ユーザーを確認</div>
                <div className="text-[12px] text-gray-400">登録者一覧・アクティビティ</div>
              </div>
            </a>
            <a href="/admin/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition no-underline text-gray-700">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-[14px] font-medium">アナリティクスを見る</div>
                <div className="text-[12px] text-gray-400">視聴数・登録推移</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
