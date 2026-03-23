'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { BarChart3, Users, Eye, TrendingUp, Calendar } from 'lucide-react';

interface DailyCount {
  date: string;
  count: number;
}

export default function AdminAnalyticsPage() {
  const [usersByDay, setUsersByDay] = useState<DailyCount[]>([]);
  const [watchesByDay, setWatchesByDay] = useState<DailyCount[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWatches, setTotalWatches] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      const supabase = createClient();

      const [profilesRes, watchRes] = await Promise.all([
        supabase.from('profiles').select('created_at'),
        supabase.from('watch_history').select('watched_at'),
      ]);

      const profiles = profilesRes.data || [];
      const watches = watchRes.data || [];

      setTotalUsers(profiles.length);
      setTotalWatches(watches.length);

      const last14Days: string[] = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last14Days.push(d.toISOString().split('T')[0]);
      }

      const userCounts = last14Days.map(date => ({
        date,
        count: profiles.filter(p => p.created_at?.startsWith(date)).length,
      }));

      const watchCounts = last14Days.map(date => ({
        date,
        count: watches.filter(w => w.watched_at?.startsWith(date)).length,
      }));

      setUsersByDay(userCounts);
      setWatchesByDay(watchCounts);
      setLoading(false);
    }
    fetchAnalytics();
  }, []);

  const maxUsers = Math.max(...usersByDay.map(d => d.count), 1);
  const maxWatches = Math.max(...watchesByDay.map(d => d.count), 1);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return `${date.getMonth()+1}/${date.getDate()}`;
  };

  return (
    <div>
      <h1 className="text-[24px] font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-gray-400" /> アナリティクス
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2">
            <Users className="w-4 h-4 text-blue-500" /> 累計ユーザー
          </div>
          <div className="text-[32px] font-bold text-gray-900">{loading ? '...' : totalUsers}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2">
            <Eye className="w-4 h-4 text-purple-500" /> 累計視聴回数
          </div>
          <div className="text-[32px] font-bold text-gray-900">{loading ? '...' : totalWatches}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-[16px] font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" /> 新規登録（過去14日間）
          </h2>
          {loading ? (
            <div className="h-[200px] flex items-center justify-center text-gray-400">読み込み中...</div>
          ) : (
            <div className="flex items-end gap-[3px] h-[160px]">
              {usersByDay.map(d => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: 130 }}>
                    <div
                      className="w-full bg-blue-500 rounded-t-sm transition-all"
                      style={{ height: `${Math.max((d.count / maxUsers) * 100, d.count > 0 ? 8 : 0)}%` }}
                      title={`${d.date}: ${d.count}人`}
                    />
                  </div>
                  <span className="text-[9px] text-gray-400">{formatDate(d.date)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-[16px] font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-500" /> 視聴回数（過去14日間）
          </h2>
          {loading ? (
            <div className="h-[200px] flex items-center justify-center text-gray-400">読み込み中...</div>
          ) : (
            <div className="flex items-end gap-[3px] h-[160px]">
              {watchesByDay.map(d => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: 130 }}>
                    <div
                      className="w-full bg-purple-500 rounded-t-sm transition-all"
                      style={{ height: `${Math.max((d.count / maxWatches) * 100, d.count > 0 ? 8 : 0)}%` }}
                      title={`${d.date}: ${d.count}回`}
                    />
                  </div>
                  <span className="text-[9px] text-gray-400">{formatDate(d.date)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
