'use client';

import Link from 'next/link';
import { Newspaper, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getLatestArticles, CATEGORY_META } from '@/lib/articleData';

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function NewsFeedSection() {
  const latest = getLatestArticles(3);

  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <Newspaper className="w-5 h-5 text-blue-500" />
          <h2 className="text-[18px] font-bold text-gray-900">
            生成AI最新ニュース
          </h2>
        </div>
        <a
          href="/articles"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[13px] text-orange-500 font-medium hover:text-orange-600 transition-colors no-underline"
        >
          もっと見る <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Article cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {latest.map(article => {
          const catMeta = CATEGORY_META[article.category];
          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all no-underline"
            >
              {/* Thumbnail */}
              <div
                className="h-36 flex items-end p-3"
                style={{ background: article.thumbnail }}
              >
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded"
                  style={{ background: catMeta.bg, color: catMeta.color }}
                >
                  {catMeta.label}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-[12px] text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-2.5 text-[11px] text-gray-400">
                  <span className="flex items-center gap-0.5">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-0.5">
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
    </section>
  );
}
