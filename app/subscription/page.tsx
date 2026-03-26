'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import {
  BookOpen, Check, X, Star, Crown, Zap, ArrowLeft, CreditCard, Shield,
} from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1980,
    color: '#6B7280',
    icon: Zap,
    badge: null,
    description: 'まずはAIクリエイティブの世界を覗いてみたい方に',
    features: [
      { label: 'アーカイブ視聴', value: '月3本まで', included: true },
      { label: 'ライブ配信', value: '視聴のみ', included: true },
      { label: '添削チケット割引', value: 'なし', included: false },
      { label: '添削チケット無料枠', value: 'なし', included: false },
      { label: '限定コンテンツ', value: 'なし', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 4980,
    color: '#0D9488',
    icon: Star,
    badge: '人気No.1',
    description: '本気でスキルアップしたいクリエイターにおすすめ',
    features: [
      { label: 'アーカイブ視聴', value: '無制限', included: true },
      { label: 'ライブ配信', value: 'Q&A参加可', included: true },
      { label: '添削チケット割引', value: '10% OFF', included: true },
      { label: '添削チケット無料枠', value: 'なし', included: false },
      { label: '限定コンテンツ', value: 'なし', included: false },
    ],
  },
  {
    id: 'master',
    name: 'Master',
    price: 14800,
    color: '#D97706',
    icon: Crown,
    badge: '最上位',
    description: 'トップクリエイターから直接学び、最速で成長したい方に',
    features: [
      { label: 'アーカイブ視聴', value: '無制限', included: true },
      { label: 'ライブ配信', value: '優先質問権', included: true },
      { label: '添削チケット割引', value: '20% OFF', included: true },
      { label: '添削チケット無料枠', value: '月1回無料', included: true },
      { label: '限定コンテンツ', value: 'アクセス可', included: true },
    ],
  },
];

export default function SubscriptionPage() {
  const { user } = useAuth();

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
          {user ? (
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
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-[28px] sm:text-[36px] font-extrabold leading-tight m-0">
            トップクリエイターから、<span className="text-teal-400">直接学ぶ</span>
          </h1>
          <p className="text-[15px] text-gray-300 mt-3 max-w-[520px] mx-auto leading-relaxed">
            ライブ配信・アーカイブ・添削・1対1セッション。あなたのレベルに合ったプランで、AIクリエイティブを加速させよう。
          </p>
          <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full">
            <CreditCard className="w-4 h-4 text-teal-400" />
            <span className="text-[13px] text-teal-300 font-medium">初月無料 — クレジットカード登録で今すぐ始められます</span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => {
            const Icon = plan.icon;
            const isPro = plan.id === 'pro';

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-xl ${
                  isPro ? 'border-teal-500 shadow-lg scale-[1.02]' : 'border-gray-200'
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0 px-3 py-1 text-[11px] font-bold text-white rounded-bl-lg" style={{ background: plan.color }}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-6">
                  {/* Plan header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${plan.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: plan.color }} />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-gray-900 m-0">{plan.name}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[36px] font-extrabold text-gray-900">¥{plan.price.toLocaleString()}</span>
                      <span className="text-[14px] text-gray-400">/月</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[12px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-bold">初月無料</span>
                      <span className="text-[11px] text-gray-400">翌月から自動課金</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">{plan.description}</p>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 rounded-xl text-[14px] font-bold transition-all ${
                      isPro
                        ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => alert('決済機能は次のフェーズで実装します')}
                  >
                    {isPro ? '無料で始める →' : 'このプランを選択'}
                  </button>

                  {/* Features */}
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">含まれる機能</p>
                    <div className="space-y-3">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          {f.included ? (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${plan.color}15` }}>
                              <Check className="w-3 h-3" style={{ color: plan.color }} />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                              <X className="w-3 h-3 text-gray-300" />
                            </div>
                          )}
                          <div>
                            <span className="text-[13px] text-gray-700">{f.label}</span>
                            <span className={`ml-1.5 text-[12px] font-medium ${f.included ? 'text-gray-900' : 'text-gray-400'}`}>
                              {f.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust signals */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4">
            <Shield className="w-8 h-8 text-teal-500 shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-gray-800 m-0">初月完全無料</p>
              <p className="text-[11px] text-gray-500 m-0">気に入らなければ1ヶ月以内に解約OK</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4">
            <CreditCard className="w-8 h-8 text-teal-500 shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-gray-800 m-0">安心のクレカ決済</p>
              <p className="text-[11px] text-gray-500 m-0">Stripe による安全な決済処理</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4">
            <Zap className="w-8 h-8 text-teal-500 shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-gray-800 m-0">いつでも解約・プラン変更</p>
              <p className="text-[11px] text-gray-500 m-0">縛りなし。マイページから即時変更</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-[20px] font-bold text-gray-900 text-center mb-6">よくある質問</h2>
          {[
            { q: '初月無料とはどういう仕組みですか？', a: 'クレジットカードを登録するとすぐに全機能をご利用いただけます。最初の1ヶ月間は無料で、翌月1日から選択したプランの料金が発生します。1ヶ月以内に解約すれば料金は一切かかりません。' },
            { q: 'プランはいつでも変更できますか？', a: 'はい、マイページからいつでもアップグレード・ダウングレードが可能です。変更は次の請求サイクルから反映されます。' },
            { q: '添削チケットの割引はどう適用されますか？', a: 'Pro会員は全ての添削チケットが10%OFF、Master会員は20%OFFで購入できます。さらにMaster会員は月1回分の添削が無料で付いてきます。' },
            { q: '解約後もコンテンツは見られますか？', a: '解約すると、現在の請求期間の終了時点でアーカイブ等の有料コンテンツへのアクセスが停止します。カテゴリ学習コンテンツ（無料分）は引き続きご利用いただけます。' },
          ].map((item, i) => (
            <details key={i} className="group bg-white rounded-xl border border-gray-200 mb-3 overflow-hidden">
              <summary className="px-5 py-4 cursor-pointer text-[14px] font-bold text-gray-800 hover:bg-gray-50 transition list-none flex items-center justify-between">
                {item.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-[18px]">▾</span>
              </summary>
              <div className="px-5 pb-4 text-[13px] text-gray-600 leading-relaxed">{item.a}</div>
            </details>
          ))}
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
