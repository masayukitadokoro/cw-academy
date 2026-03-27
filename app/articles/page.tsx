'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { articles, CATEGORY_META, type ArticleCategory } from '@/lib/articleData';

const ALL_CATEGORIES: (ArticleCategory | 'all')[] = ['all', 'tool-update', 'industry-news', 'tutorial', 'creator-story'];

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function ArticlesListPage() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const list = activeCategory === 'all' ? articles : articles.filter(a => a.category === activeCategory);
    return [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page title */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-4">
        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-4 no-underline">
          <ArrowLeft className="w-3 h-3" /> Academyに戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">生成AI クリエイターニュース</h1>
        <p className="text-[14px] text-gray-500 mt-1">ツールアップデート、業界動向、実践テクニックを毎日配信</p>
      </div>

      {/* Category filter */}
      <div className="max-w-5xl mx-auto px-4 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ALL_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const label = cat === 'all' ? 'すべて' : CATEGORY_META[cat].label;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-colors border-none cursor-pointer ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                style={!isActive ? { border: '1px solid #e5e7eb' } : undefined}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Article grid */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(article => {
            const catMeta = CATEGORY_META[article.category];
            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all no-underline"
              >
                <div
                  className="h-40 flex items-end p-3"
                  style={{ background: article.thumbnail }}
                >
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{ background: catMeta.bg, color: catMeta.color }}
                  >
                    {catMeta.label}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-[12px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readMin}分
                    </span>
                    <span className="ml-auto">{article.source}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            このカテゴリの記事はまだありません
          </div>
        )}
      </div>
    </div>
  );
}
