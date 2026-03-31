'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { createClient as createSSRClient } from '@/lib/supabase-client';
import { useAuth } from '@/components/AuthProvider';
import type { LiveArchive, Creator } from '@/types';
import {
  ArrowLeft, Video, Play, Lock, Star, Sparkles, Calendar,
  Radio, Crown, ChevronRight, Clock,
} from 'lucide-react';

type ArchiveWithCreator = LiveArchive & { creators: Creator };

// ===== Mock Live Schedule =====
const LIVE_SCHEDULE = [
  { id: 1, date: '2026-04-05', time: '19:00', creator: '平田茉莉花', title: 'SF短編の続編制作 — キャラデザインからスタート', tags: ['SF', 'キャラクター'], duration: '約120分' },
  { id: 2, date: '2026-04-12', time: '20:00', creator: 'くりえみ', title: 'AI×SNSマーケティング実践 — バズるコンテンツの作り方', tags: ['SNS', 'マーケティング'], duration: '約90分' },
  { id: 3, date: '2026-04-19', time: '19:00', creator: '箱庭', title: '幻想的な背景美術ワークショップ — Stable Diffusion XL活用', tags: ['背景美術', 'SD XL'], duration: '約90分' },
  { id: 4, date: '2026-04-26', time: '20:00', creator: 'yachimata', title: 'ComfyUI新ノード徹底解説 — 最新アップデート対応', tags: ['ComfyUI', 'ワークフロー'], duration: '約60分' },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return { full: `${month}/${day}（${weekdays[d.getDay()]}）`, month, day, weekday: weekdays[d.getDay()] };
}

export default function LivePage() {
  const { user, profile } = useAuth();
  const [archives, setArchives] = useState<ArchiveWithCreator[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data } = await supabase
          .from('live_archives')
          .select('*, creators(*)')
          .eq('is_published', true)
          .order('streamed_at', { ascending: false });
        setArchives((data as ArchiveWithCreator[]) || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return;
    const checkSub = async () => {
      const supabase = createSSRClient();
      const { data } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .limit(1);
      setIsSubscribed((data?.length ?? 0) > 0);
    };
    checkSub();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-gray-900 to-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <span className="text-[13px] text-teal-300 font-medium tracking-wide">CREATOR LIVE</span>
          </div>
          <h1 className="text-[26px] sm:text-[34px] font-extrabold leading-tight m-0">
            トップクリエイターの<span className="text-teal-400">制作現場</span>
          </h1>
          <p className="text-[14px] text-gray-300 mt-3 max-w-[480px] mx-auto leading-relaxed">
            WAIFFファイナリスト級のクリエイターが、制作プロセスをライブ配信。アーカイブでいつでも復習できます。
          </p>
        </div>
      </section>

      {/* ===== Live Schedule ===== */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-violet-600" />
          <h2 className="text-[20px] font-bold text-gray-900 m-0">配信予定</h2>
          <span className="text-[12px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 font-bold">{LIVE_SCHEDULE.length}件</span>
        </div>

        <div className="space-y-3">
          {LIVE_SCHEDULE.map(item => {
            const { day, weekday } = formatDate(item.date);
            const month = new Date(item.date).getMonth() + 1;

            return (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-200 hover:border-violet-200 hover:shadow-md transition-all overflow-hidden">
                <div className="flex items-stretch">
                  {/* Date block */}
                  <div className="w-20 sm:w-24 bg-gradient-to-b from-violet-50 to-white flex flex-col items-center justify-center py-4 shrink-0 border-r border-gray-100">
                    <span className="text-[11px] text-violet-400 font-medium">{month}月</span>
                    <span className="text-[28px] font-extrabold text-violet-600 leading-none">{day}</span>
                    <span className="text-[11px] text-gray-400 mt-0.5">{weekday}曜日</span>
                    <span className="text-[12px] font-bold text-gray-500 mt-1">{item.time}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-gray-900 m-0">{item.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[13px] text-gray-500">{item.creator}</span>
                        <div className="flex gap-1.5">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 font-medium">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5 text-[11px] text-gray-400">
                        <Clock className="w-3 h-3" />{item.duration}
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-[12px] font-bold shadow-sm">
                        <Radio className="w-3.5 h-3.5" />配信予定
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isSubscribed && (
          <div className="mt-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100 p-4 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-bold text-gray-800 m-0">ライブ配信でQ&Aに参加するには</p>
              <p className="text-[12px] text-gray-500 mt-0.5 m-0">Pro以上のプランでリアルタイム質問が可能です。</p>
            </div>
            <Link href="/subscription" className="px-4 py-2 bg-violet-600 text-white text-[12px] font-bold rounded-lg hover:bg-violet-700 transition no-underline shrink-0">
              プランを見る →
            </Link>
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4"><div className="border-t border-gray-200" /></div>

      {/* ===== Archive List ===== */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Video className="w-5 h-5 text-teal-600" />
          <h2 className="text-[20px] font-bold text-gray-900 m-0">アーカイブ</h2>
          <span className="text-[12px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 font-bold">{archives.length}本</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="bg-gray-100 rounded-2xl h-52 animate-pulse" />)}
          </div>
        ) : archives.length === 0 ? (
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <Video className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-[14px] text-gray-500 m-0">まだアーカイブがありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {archives.map(archive => {
              const creator = archive.creators;
              const canWatch = isSubscribed || archive.is_free;

              return (
                <div
                  key={archive.id}
                  className={`group bg-white rounded-2xl border border-gray-200 hover:border-teal-200 hover:shadow-lg transition-all overflow-hidden ${!canWatch ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="relative aspect-video bg-gray-900">
                    {archive.thumbnail_url ? (
                      <img src={archive.thumbnail_url} alt={archive.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-900 to-gray-900 flex items-center justify-center">
                        <Video className="w-10 h-10 text-teal-400 opacity-50" />
                      </div>
                    )}
                    {!canWatch && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-6 h-6 text-white/80 mx-auto mb-1" />
                          <span className="text-[11px] text-white/70">有料会員限定</span>
                        </div>
                      </div>
                    )}
                    {canWatch && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                        </div>
                      </div>
                    )}
                    {archive.is_free && (
                      <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-teal-500 text-white font-bold">FREE</span>
                    )}
                    {archive.duration_min && (
                      <span className="absolute bottom-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-white">{archive.duration_min}分</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-[14px] font-bold text-gray-900 line-clamp-2 m-0">{archive.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {creator?.name?.[0] || '?'}
                      </div>
                      <span className="text-[12px] text-gray-500">{creator?.name || '不明'}</span>
                      {creator?.tier === 1 && (
                        <span className="flex items-center gap-0.5 text-[10px] text-amber-600"><Star className="w-3 h-3" />Top</span>
                      )}
                    </div>
                    {archive.tags && archive.tags.length > 0 && (
                      <div className="flex gap-1.5 mt-2">
                        {archive.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isSubscribed && (
          <div className="mt-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100 p-4 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-bold text-gray-800 m-0">すべてのアーカイブを視聴するには</p>
              <p className="text-[12px] text-gray-500 mt-0.5 m-0">有料会員になると全アーカイブが見放題。初月無料でお試しいただけます。</p>
            </div>
            <Link href="/subscription" className="px-4 py-2 bg-teal-600 text-white text-[12px] font-bold rounded-lg hover:bg-teal-700 transition no-underline shrink-0">
              プランを見る →
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 px-4 mt-4">
        <div className="max-w-6xl mx-auto text-center text-[13px] text-gray-400">
          &copy; 2026 Creators&apos; Wonderland (AiHUB Inc.) — CW Academy
        </div>
      </footer>
    </div>
  );
}
