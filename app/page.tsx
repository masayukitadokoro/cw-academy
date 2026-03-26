'use client';

import Link from 'next/link';
import {
  Video, Image as ImageIcon, Scissors, GitBranch, Clapperboard, Briefcase,
  BookOpen, ChevronRight, Play, Users, Lock, Star, Sparkles, Crown,
} from 'lucide-react';
import { CATEGORIES, getTotalLessons } from '@/lib/categoryDefinitions';
import { useAuth } from '@/components/AuthProvider';
import { useEffect, useState } from 'react';
import { createClient as createSSRClient } from '@/lib/supabase-client';
import { createClient } from '@supabase/supabase-js';
import type { LiveArchive, Creator } from '@/types';

const ICON_MAP: Record<string, any> = {
  Video, Image: ImageIcon, Scissors, GitBranch, Clapperboard, Briefcase,
};

type ArchiveWithCreator = LiveArchive & { creators: Creator };

// ===== Category Card =====
function CategoryCard({ category }: { category: typeof CATEGORIES[0] }) {
  const Icon = ICON_MAP[category.icon] || BookOpen;
  const totalLessons = getTotalLessons(category);
  const totalCourses = category.courses.length;

  return (
    <Link
      href={`/category/${category.slug}`}
      target="_blank"
      className="group block bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden no-underline"
    >
      <div className="h-1.5" style={{ background: category.color }} />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${category.color}15` }}>
            <Icon className="w-5 h-5" style={{ color: category.color }} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[16px] font-bold text-gray-900 group-hover:text-gray-700 transition-colors m-0">{category.name}</h3>
            <p className="text-[13px] text-gray-500 mt-0.5 line-clamp-2 m-0">{category.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-gray-400 mt-3">
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{totalCourses} コース</span>
          <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5" />{totalLessons} レッスン</span>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          {category.courses.slice(0, 3).map(course => (
            <div key={course.id} className="flex items-center gap-2 py-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              <span className="text-[13px] text-gray-600 truncate">{course.title}</span>
              {course.tierTarget === 'tier4-5' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-medium shrink-0">初心者OK</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

// ===== Archive Card =====
function ArchiveCard({ archive, isSubscribed }: { archive: ArchiveWithCreator; isSubscribed: boolean }) {
  const creator = archive.creators;
  const canWatch = isSubscribed || archive.is_free;

  return (
    <div className={`group bg-white rounded-2xl border border-gray-200 hover:border-teal-200 hover:shadow-lg transition-all overflow-hidden ${!canWatch ? 'cursor-default' : 'cursor-pointer'}`}>
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
      </div>
    </div>
  );
}

// ===== Main Page =====
export default function AcademyHome() {
  const { user, profile } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [archives, setArchives] = useState<ArchiveWithCreator[]>([]);
  const [loading, setLoading] = useState(true);

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
          .order('streamed_at', { ascending: false })
          .limit(3);
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-[15px] text-gray-900">CW Academy</span>
              <span className="text-[11px] text-gray-400 ml-1.5">by AiHUB</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/subscription" className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-[12px] font-bold text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition no-underline">
              <Crown className="w-3.5 h-3.5" />プラン
            </Link>
            {user ? (
              <Link href="/mypage" className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition no-underline">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                  {profile?.display_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-[14px] font-medium text-gray-700 hidden sm:block">{profile?.display_name || 'マイページ'}</span>
              </Link>
            ) : (
              <Link href="/auth/login" className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition no-underline">
                ログイン
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[28px] sm:text-[36px] font-extrabold leading-tight m-0">
            AIクリエイティブを、<span className="text-red-400">体系的に</span>学ぶ
          </h1>
          <p className="text-[15px] text-gray-300 mt-3 max-w-[520px] mx-auto leading-relaxed">
            動画制作・画像生成・編集・演出・ビジネス。AIクリエイターに必要なスキルを、カテゴリ別に基礎から実践まで。
          </p>
          <div className="flex items-center justify-center gap-5 mt-5 text-[13px] text-gray-400">
            <span className="flex items-center gap-1.5"><Play className="w-4 h-4" />{CATEGORIES.reduce((sum, c) => sum + getTotalLessons(c), 0)}+ レッスン</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{CATEGORIES.reduce((sum, c) => sum + c.courses.length, 0)} コース</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />Tier 5→3 対応</span>
          </div>
        </div>
      </section>

      {/* ===== Creator Live Preview ===== */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h2 className="text-[20px] font-bold text-gray-900 m-0">Creator Live — トップクリエイターの制作現場</h2>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="bg-gray-100 rounded-2xl h-52 animate-pulse" />)}
          </div>
        ) : archives.length === 0 ? (
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 p-8 text-center">
            <Video className="w-10 h-10 text-teal-400 mx-auto mb-3" />
            <h3 className="text-[16px] font-bold text-gray-800 m-0">近日公開</h3>
            <p className="text-[13px] text-gray-500 mt-2">WAIFFファイナリスト級のトップクリエイターが、制作プロセスをライブ配信。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {archives.map(a => <ArchiveCard key={a.id} archive={a} isSubscribed={isSubscribed} />)}
          </div>
        )}

        {/* もっと見る button + subscription CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/live"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-[14px] font-bold rounded-xl hover:bg-teal-700 shadow-md hover:shadow-lg transition-all no-underline"
          >
            <Video className="w-4 h-4" />
            アーカイブ・配信予定をすべて見る
            <ChevronRight className="w-4 h-4" />
          </Link>

          {!isSubscribed && (
            <Link
              href="/subscription"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[14px] font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all no-underline"
            >
              <Crown className="w-4 h-4 text-white" />
              有料会員になる — 初月無料
              <ChevronRight className="w-4 h-4 text-white/80" />
            </Link>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4"><div className="border-t border-gray-200" /></div>

      {/* ===== Category Grid ===== */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-[20px] font-bold text-gray-900 mb-6">📚 カテゴリから学ぶ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (<CategoryCard key={cat.id} category={cat} />))}
        </div>
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
