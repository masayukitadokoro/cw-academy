'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Creator, ReviewTicket } from '@/types';
import {
  BookOpen, ArrowLeft, Pencil, Radio, MessageCircle, Star, Crown,
  ChevronRight, Filter, Sparkles,
} from 'lucide-react';

type TicketType = 'review' | 'live' | 'session';

const TICKET_TYPES: { id: TicketType; label: string; icon: any; color: string; description: string }[] = [
  { id: 'review', label: '添削チケット', icon: Pencil, color: '#0D9488', description: 'トップクリエイターがあなたの作品を添削動画＋テキストで詳細フィードバック' },
  { id: 'live', label: 'ライブ参加チケット', icon: Radio, color: '#8B5CF6', description: 'ライブ配信に参加して、リアルタイムで質問・相談できる' },
  { id: 'session', label: '1対1セッション', icon: MessageCircle, color: '#D97706', description: 'クリエイターとマンツーマンで30-60分の個別Q&Aセッション' },
];

const RANK_LABELS: Record<string, { label: string; color: string; icon: any }> = {
  platinum: { label: 'Platinum', color: '#D97706', icon: Crown },
  gold: { label: 'Gold', color: '#0D9488', icon: Star },
  silver: { label: 'Silver', color: '#6B7280', icon: Star },
};

// Mock live & session tickets (DB has only review_tickets for now)
const MOCK_LIVE_TICKETS = [
  { id: 101, creator_name: '平田茉莉花', creator_slug: 'marika', title: 'SF映像制作ライブ — 質問し放題', price: 3000, rank: 'gold' },
  { id: 102, creator_name: '箱庭', creator_slug: 'hakoniwa', title: '背景美術ライブ配信 参加チケット', price: 3000, rank: 'gold' },
  { id: 103, creator_name: 'くりえみ', creator_slug: 'kuriemi', title: 'AI×SNSブランディング ライブQ&A', price: 5000, rank: 'platinum' },
];

const MOCK_SESSION_TICKETS = [
  { id: 201, creator_name: '平田茉莉花', creator_slug: 'marika', title: 'まりかの1対1メンタリング（60分）', price: 50000, rank: 'platinum' },
  { id: 202, creator_name: '箱庭', creator_slug: 'hakoniwa', title: '箱庭の1対1セッション（30分）', price: 15000, rank: 'gold' },
  { id: 203, creator_name: 'yachimata', creator_slug: 'yachimata', title: 'ワークフロー相談1対1（30分）', price: 10000, rank: 'gold' },
  { id: 204, creator_name: 'くりえみ', creator_slug: 'kuriemi', title: 'くりえみのSNS戦略メンタリング（60分）', price: 50000, rank: 'platinum' },
];

type TicketWithCreator = ReviewTicket & { creators: Creator };

export default function TicketsPage() {
  const [activeType, setActiveType] = useState<TicketType>('review');
  const [reviewTickets, setReviewTickets] = useState<TicketWithCreator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data } = await supabase
          .from('review_tickets')
          .select('*, creators(*)')
          .eq('is_active', true)
          .order('price', { ascending: true });
        setReviewTickets((data as TicketWithCreator[]) || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  const activeTypeInfo = TICKET_TYPES.find(t => t.id === activeType)!;

  const renderTicketCard = (ticket: { id: number; title: string; price: number; rank: string; creator_name?: string; creator_slug?: string; creators?: Creator }) => {
    const rankInfo = RANK_LABELS[ticket.rank] || RANK_LABELS.silver;
    const RankIcon = rankInfo.icon;
    const creatorName = ticket.creator_name || ticket.creators?.name || '不明';
    const creatorSlug = ticket.creator_slug || ticket.creators?.slug;

    return (
      <div key={`${activeType}-${ticket.id}`} className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden">
        <div className="h-1" style={{ background: activeTypeInfo.color }} />
        <div className="p-5">
          {/* Rank badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: `${rankInfo.color}10`, color: rankInfo.color }}>
              <RankIcon className="w-3 h-3" />
              {rankInfo.label}
            </div>
            <div className="text-right">
              <span className="text-[22px] font-extrabold text-gray-900">¥{ticket.price.toLocaleString()}</span>
              <span className="text-[11px] text-gray-400 ml-0.5">/回</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-gray-900 m-0 mb-2 line-clamp-2">{ticket.title}</h3>

          {/* Creator */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
              {creatorName[0]}
            </div>
            <span className="text-[13px] text-gray-600">{creatorName}</span>
          </div>

          {/* CTA */}
          <button
            className="w-full py-2.5 rounded-xl text-[13px] font-bold transition-all"
            style={{ background: `${activeTypeInfo.color}10`, color: activeTypeInfo.color }}
            onClick={() => alert('チケット購入機能は次のフェーズで実装します')}
          >
            チケットを購入する →
          </button>
        </div>
      </div>
    );
  };

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
          {true ? (
              <Link href="/mypage" className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition no-underline">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">U</div>
                <span className="text-[14px] font-medium text-gray-700 hidden sm:block">マイページ</span>
              </Link>
            ) : (
              <Link href="/auth/login" className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition no-underline">
                ログイン
              </Link>
            )}
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <span className="text-[13px] text-teal-300 font-medium">Individual Tickets</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-extrabold leading-tight m-0">
            トップクリエイターから<span className="text-teal-400">直接フィードバック</span>
          </h1>
          <p className="text-[14px] text-gray-300 mt-3 max-w-[480px] mx-auto leading-relaxed">
            添削・ライブ質問・1対1セッション。サブスク会員ならさらにお得に。
          </p>
        </div>
      </section>

      {/* Type tabs */}
      <section className="max-w-5xl mx-auto px-4 pt-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {TICKET_TYPES.map(type => {
            const Icon = type.icon;
            const isActive = activeType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap border-2 ${
                  isActive
                    ? 'bg-white shadow-md'
                    : 'bg-white/50 border-transparent text-gray-500 hover:bg-white hover:text-gray-700'
                }`}
                style={isActive ? { borderColor: type.color, color: type.color } : {}}
              >
                <Icon className="w-4 h-4" />
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Type description */}
        <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-white">
          <p className="text-[14px] text-gray-700 m-0">
            <span className="font-bold" style={{ color: activeTypeInfo.color }}>{activeTypeInfo.label}</span>
            <span className="mx-2 text-gray-300">—</span>
            {activeTypeInfo.description}
          </p>
        </div>
      </section>

      {/* Ticket grid */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        {loading && activeType === 'review' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="bg-gray-100 rounded-2xl h-52 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeType === 'review' && reviewTickets.map(t => renderTicketCard(t))}
            {activeType === 'live' && MOCK_LIVE_TICKETS.map(t => renderTicketCard(t))}
            {activeType === 'session' && MOCK_SESSION_TICKETS.map(t => renderTicketCard(t))}
          </div>
        )}

        {/* Subscription upsell */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 m-0">サブスク会員ならもっとお得</h3>
              <p className="text-[13px] text-gray-600 mt-1 m-0">
                Pro会員は全チケット<span className="font-bold text-teal-600">10%OFF</span>、
                Master会員は<span className="font-bold text-amber-600">20%OFF</span>＋月1回添削無料
              </p>
            </div>
            <Link href="/subscription" className="px-5 py-2.5 bg-teal-600 text-white text-[13px] font-bold rounded-xl hover:bg-teal-700 transition no-underline shrink-0 flex items-center gap-1">
              プランを見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 px-4 mt-8">
        <div className="max-w-6xl mx-auto text-center text-[13px] text-gray-400">
          &copy; 2026 Creators&apos; Wonderland (AiHUB Inc.) — CW Academy
        </div>
      </footer>
    </div>
  );
}
