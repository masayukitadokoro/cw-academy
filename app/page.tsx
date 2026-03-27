// app/page.tsx
// CW Academy トップページ - ログイン済みユーザー向け学習ポータル

'use client';

import Link from 'next/link';
import {
  Play, BookOpen, Video, ArrowRight, Clock, Lock,
  ChevronRight, Sparkles, Flame, Star, Scale, RefreshCw,
  Globe, Shield, Brain, Image, Scissors, Clapperboard,
  GitBranch, Building2, Mic, Bell, Trophy, MessageCircle,
} from 'lucide-react';
import {
  CATEGORIES, SECTIONS, LIVE_CONTENTS,
  getCategoriesBySection, getTotalLessons,
  type Category, type SectionMeta, type LiveContent,
} from '@/lib/categoryDefinitions';
import NewsFeedSection from "@/components/NewsFeedSection";

const ICON_MAP: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-5 h-5" />,
  RefreshCw: <RefreshCw className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  Image: <Image className="w-5 h-5" />,
  Scissors: <Scissors className="w-5 h-5" />,
  Clapperboard: <Clapperboard className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Building: <Building2 className="w-5 h-5" />,
};

function CategoryCard({ category }: { category: Category }) {
  const totalLessons = getTotalLessons(category);
  return (
    <Link href={`/category/${category.slug}`} className="block bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
      <div className="h-1.5" style={{ background: category.color }} />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: category.color }}>
            {ICON_MAP[category.icon] || <BookOpen className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">{category.name}</h3>
            <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-2">{category.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-gray-400 mb-3">
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{category.courses.length} コース</span>
          <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5" />{totalLessons} レッスン</span>
        </div>
        <div className="space-y-1.5">
          {category.courses.slice(0, 2).map(course => (
            <div key={course.id} className="flex items-center gap-2 text-[13px]">
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
              <span className="text-gray-700 truncate">{course.title}</span>
              {course.lessons.some(l => l.isFree) && (
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex-shrink-0">初心者OK</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

function LiveCard({ content }: { content: LiveContent }) {
  const bgMap: Record<string, string> = { live: 'from-purple-900/90 to-indigo-900/90', archive: 'from-slate-800/90 to-slate-900/90', workshop: 'from-teal-900/90 to-cyan-900/90' };
  const bg = bgMap[content.type] || 'from-slate-800/90 to-slate-900/90';
  return (
    <Link href={`/live/${content.id}`} className="block rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
      <div className={`relative h-[180px] bg-gradient-to-br ${bg} flex items-center justify-center`}>
        {content.isFree && <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded">FREE</span>}
        {content.isPremium && <span className="absolute top-3 left-3 bg-gray-600/80 text-white text-[11px] font-medium px-2.5 py-0.5 rounded flex items-center gap-1"><Lock className="w-3 h-3" /> 有料会員限定</span>}
        <Video className="w-10 h-10 text-white/40" />
        {content.duration && <span className="absolute bottom-3 right-3 text-white/60 text-[12px] flex items-center gap-1"><Clock className="w-3 h-3" />{content.duration}分</span>}
      </div>
      <div className="bg-white p-4">
        <h3 className="font-bold text-[14px] text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{content.title}</h3>
        {content.speaker && (
          <div className="flex items-center gap-2 mt-2 text-[12px]">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">{content.speaker[0]}</div>
            <span className="text-gray-600">{content.speaker}</span>
            {content.speakerTier && <span className="text-orange-500 flex items-center gap-0.5"><Star className="w-3 h-3" fill="currentColor" /> {content.speakerTier}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}

function SectionBlock({ section, children }: { section: SectionMeta; children: React.ReactNode }) {
  const iconMap: Record<string, React.ReactNode> = {
    theory: <BookOpen className="w-5 h-5" style={{ color: section.tagColor }} />,
    practice: <Clapperboard className="w-5 h-5" style={{ color: section.tagColor }} />,
    applied: <Sparkles className="w-5 h-5" style={{ color: section.tagColor }} />,
  };
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200">
        {iconMap[section.type]}
        <div>
          <h2 className="text-[20px] font-bold text-gray-900">{section.title} <span className="text-gray-400 font-normal text-[14px]">— {section.titleEn}</span></h2>
          <p className="text-[13px] text-gray-500 mt-0.5">{section.desc}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

const APPLIED_ITEMS = [
  { icon: <Mic className="w-5 h-5" />, label: '月2回', title: 'ゲスト講師ライブ配信', desc: 'トップクリエイターが制作過程をリアルタイムで実演。Q&A付き。アーカイブ視聴可能。' },
  { icon: <Bell className="w-5 h-5" />, label: '毎週更新', title: '最新ツール速報', desc: 'KLING AI / Hailuo / ComfyUI等の新機能を5分で把握。プロが「使える/使えない」を検証。' },
  { icon: <Trophy className="w-5 h-5" />, label: 'Awards連動', title: '入賞作品 制作過程解説', desc: 'Kuriemi Awards入賞作品のメイキング。ツール・プロンプト・ワークフロー全公開。' },
  { icon: <MessageCircle className="w-5 h-5" />, label: '月1回', title: 'Q&A・作品添削会', desc: 'あなたの作品を講師がリアルタイムレビュー。改善ポイントを具体的にフィードバック。' },
];

export default function HomePage() {
  const theorySection = SECTIONS.find(s => s.type === 'theory')!;
  const practiceSection = SECTIONS.find(s => s.type === 'practice')!;
  const appliedSection = SECTIONS.find(s => s.type === 'applied')!;
  const theoryCats = getCategoriesBySection('theory');
  const practiceCats = getCategoriesBySection('practice');
  const liveContents = LIVE_CONTENTS.filter(l => ['live', 'archive', 'workshop'].includes(l.type)).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO — copy + subtext only */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white text-center py-10 px-4">
        <h1 className="text-[24px] sm:text-[32px] font-black tracking-tight leading-tight mb-3">
          AIクリエイティブを、<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">体系的に</span>学ぶ。<br />世界の<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">最先端の</span>AIクリエーター情報を知る。
        </h1>
        <p className="text-[14px] text-gray-400 max-w-lg mx-auto leading-relaxed">
          動画制作・画像生成・編集・演出・ビジネス。AIクリエイターに必要なスキルを、カテゴリ別に基礎から実践まで。
        </p>
      </section>

      {/* CREATOR LIVE */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-[18px] font-bold text-gray-900 flex items-center gap-2 mb-5">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Creator Live — トップクリエイターの制作現場
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveContents.map(c => <LiveCard key={c.id} content={c} />)}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
          <Link href="/live" className="inline-flex items-center gap-2 bg-emerald-500 text-white font-semibold text-[14px] px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors">
            <Video className="w-4 h-4" />アーカイブ・配信予定をすべて見る<ArrowRight className="w-4 h-4" />
          </Link>
          <a href="/pricing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold text-[14px] px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors">
            <Star className="w-4 h-4" />有料会員になる — 初月無料<ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <div className="border-t border-gray-200" />

      {/* 注目・新着 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-[18px] font-bold text-gray-900 flex items-center gap-2 mb-5">
          <Flame className="w-5 h-5 text-orange-500" />注目・新着コンテンツ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2"><span className="text-[10px] font-bold text-white bg-blue-500 px-2 py-0.5 rounded">NEW</span><span className="text-[11px] text-gray-400">2026.03.25</span></div>
            <h3 className="font-bold text-[14px] text-gray-900 mb-1">新コース「AI制作ワークフロー実践」公開</h3>
            <p className="text-[12px] text-gray-500">DX vs AIの違い、PoC設計、アニメ制作フローへのAI導入を8レッスンで体系的に学ぶ</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2"><span className="text-[10px] font-bold text-white bg-purple-500 px-2 py-0.5 rounded">AWARDS</span></div>
            <h3 className="font-bold text-[14px] text-gray-900 mb-1">Kuriemi Awards 入賞作品の制作過程を完全解説</h3>
            <p className="text-[12px] text-gray-500">グランプリ作品はどう作られた？使用ツール・プロンプト・ワークフローを公開</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2"><span className="text-[10px] font-bold text-white bg-emerald-500 px-2 py-0.5 rounded">UPDATE</span></div>
            <h3 className="font-bold text-[14px] text-gray-900 mb-1">KLING AI v2.0 速報: 何が変わった？</h3>
            <p className="text-[12px] text-gray-500">プロが検証した新機能の「使える/使えない」を5分で把握</p>
          </div>
        </div>
      </section>

      {/* 生成AI最新ニュース */}
      <NewsFeedSection />

      <div className="border-t border-gray-200" />

      {/* 3 SECTIONS */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <SectionBlock section={theorySection}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{theoryCats.map(c => <CategoryCard key={c.id} category={c} />)}</div>
        </SectionBlock>
        <SectionBlock section={practiceSection}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{practiceCats.map(c => <CategoryCard key={c.id} category={c} />)}</div>
        </SectionBlock>
        <SectionBlock section={appliedSection}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APPLIED_ITEMS.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-amber-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">{item.icon}</div>
                  <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{item.label}</span>
                </div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">{item.title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionBlock>
      </div>

      <footer className="border-t border-gray-200 bg-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px] text-gray-400">© 2026 Creators&apos; Wonderland (AiHUB Inc.) — CW Academy</span>
          <div className="flex gap-4 text-[12px] text-gray-400">
            <a href="/pricing" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">料金プラン</a>
            <Link href="/terms" className="hover:text-gray-600">利用規約</Link>
            <Link href="/privacy" className="hover:text-gray-600">プライバシー</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
