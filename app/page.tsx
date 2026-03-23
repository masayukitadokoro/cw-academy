'use client';

import Link from 'next/link';
import {
  Video, Image as ImageIcon, Scissors, GitBranch, Clapperboard, Briefcase,
  BookOpen, ChevronRight, Play, Users,
} from 'lucide-react';
import { CATEGORIES, getTotalLessons } from '@/lib/categoryDefinitions';
import { useAuth } from '@/components/AuthProvider';

const ICON_MAP: Record<string, any> = {
  Video, Image: ImageIcon, Scissors, GitBranch, Clapperboard, Briefcase,
};

function CategoryCard({ category }: { category: typeof CATEGORIES[0] }) {
  const Icon = ICON_MAP[category.icon] || BookOpen;
  const totalLessons = getTotalLessons(category);
  const totalCourses = category.courses.length;

  return (
    <Link
      href={`/category/${category.slug}`}
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

export default function AcademyHome() {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
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
      </header>

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

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-[20px] font-bold text-gray-900 mb-5">カテゴリから学ぶ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (<CategoryCard key={cat.id} category={cat} />))}
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-8 px-4 mt-8">
        <div className="max-w-6xl mx-auto text-center text-[13px] text-gray-400">
          &copy; 2026 Creators&apos; Wonderland (AiHUB Inc.) — CW Academy
        </div>
      </footer>
    </div>
  );
}
