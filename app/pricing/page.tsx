"use client";

import { Check, Sparkles, Building2, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "¥0",
    period: "",
    description: "まずは体験してみたい方へ",
    highlight: false,
    features: [
      "各コースのLesson 1を無料で視聴",
      "カテゴリ一覧の閲覧",
      "コミュニティ（閲覧のみ）",
    ],
    cta: "無料で始める",
    ctaStyle:
      "border border-gray-300 text-gray-700 hover:bg-gray-50",
  },
  {
    name: "Standard",
    price: "¥9,800",
    period: "/月",
    description: "本気で学びたいクリエイター向け",
    highlight: true,
    badge: "おすすめ",
    features: [
      "全コース・全レッスンが見放題",
      "Creator Liveにリアルタイム参加",
      "アーカイブ動画すべて視聴可能",
      "コミュニティ参加（質問・添削会）",
      "Awards応募時の優先レビュー",
      "学習進捗ダッシュボード",
    ],
    cta: "Standardで始める",
    ctaStyle:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-200",
  },
  {
    name: "Enterprise",
    price: "要相談",
    period: "",
    description: "法人・教育機関向けカスタムプラン",
    highlight: false,
    features: [
      "Standardの全機能",
      "カスタムカリキュラム設計",
      "専任メンター（月2回1on1）",
      "チーム管理ダッシュボード",
      "請求書払い対応",
      "導入支援・オンボーディング",
    ],
    cta: "お問い合わせ",
    ctaStyle:
      "border border-gray-300 text-gray-700 hover:bg-gray-50",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Academy に戻る
        </Link>
      </div>

      <div className="text-center pt-10 pb-12 px-4">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">CW Academy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          料金プラン
        </h1>
        <p className="text-gray-500 text-[15px] max-w-md mx-auto leading-relaxed">
          プロの制作現場で使われている知識を、
          <br className="hidden sm:block" />
          あなたのペースで学べます。
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? "bg-white ring-2 ring-orange-500 shadow-lg shadow-orange-100"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h2 className="text-[15px] font-semibold text-gray-900 mb-1">
                  {plan.name}
                </h2>
                <p className="text-[13px] text-gray-500 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[14px] text-gray-400">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="flex-1 space-y-2.5 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.highlight ? "text-orange-500" : "text-gray-400"
                      }`}
                    />
                    <span className="text-[13px] text-gray-700 leading-snug">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 rounded-lg text-[14px] font-medium transition-colors ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[13px] text-gray-400 leading-relaxed">
            すべてのプランはいつでもキャンセル可能です。
            <br />
            Enterprise プランの詳細は{" "}
            <a
              href="mailto:info@aihub.co.jp"
              className="text-orange-500 hover:underline"
            >
              info@aihub.co.jp
            </a>{" "}
            までお問い合わせください。
          </p>
        </div>
      </div>
    </div>
  );
}
