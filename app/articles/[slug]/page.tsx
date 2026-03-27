'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { getArticleBySlug, CATEGORY_META } from '@/lib/articleData';

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function renderBody(body: string) {
  const lines = body.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-3 text-[15px] text-gray-700 leading-relaxed">
          {listItems.map((item, i) => (
            <li key={i}>{processInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const processInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushList();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-[16px] font-bold text-gray-900 mt-6 mb-2">
          {trimmed.slice(4)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={key++} className="text-[18px] font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-100">
          {trimmed.slice(3)}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      listItems.push(trimmed.replace(/^\d+\.\s/, ''));
      continue;
    }

    flushList();
    elements.push(
      <p key={key++} className="text-[15px] text-gray-700 leading-[1.85] my-3">
        {processInline(trimmed)}
      </p>
    );
  }
  flushList();
  return elements;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        記事が見つかりません
      </div>
    );
  }

  const catMeta = CATEGORY_META[article.category];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="h-48 sm:h-64 flex items-end"
        style={{ background: article.thumbnail }}
      >
        <div className="w-full max-w-3xl mx-auto px-4 pb-5">
          <span
            className="text-[12px] font-semibold px-2.5 py-1 rounded"
            style={{ background: 'rgba(255,255,255,0.9)', color: catMeta.color }}
          >
            {catMeta.label}
          </span>
        </div>
      </div>

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-4 text-[13px] text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readMin}分で読める
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            {article.source}
          </span>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[14px] text-gray-600 leading-relaxed m-0">{article.excerpt}</p>
        </div>

        <div className="mt-8">
          {renderBody(article.body)}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/articles"
              className="text-[14px] text-gray-500 hover:text-gray-800 flex items-center gap-1.5 no-underline"
            >
              <ArrowLeft className="w-4 h-4" /> 記事一覧に戻る
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-800 bg-transparent border border-gray-200 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" /> 共有
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
