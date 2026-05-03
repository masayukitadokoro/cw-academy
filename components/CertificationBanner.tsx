"use client";

import Link from "next/link";
import { Award, ChevronRight } from "lucide-react";

/**
 * 認定取得CTAバナー(トップページ用)
 *
 * トップページの3セクション(理論/実践/応用)構造を維持しつつ、
 * ヒーロー直下に配置することで認定取得導線を作る。
 *
 * 配置先: app/page.tsx の Hero セクション直後
 * 使い方: <CertificationBanner />
 *
 * v1.0 / 2026-04-30 / プラン1: ロール特化ページ追加(最小改修)
 */

export default function CertificationBanner() {
  return (
    <section className="my-8 sm:my-12">
      <Link
        href="/role/director-shot"
        className="block bg-white rounded-2xl border border-stone-200 hover:border-[#993C1D] hover:shadow-sm transition-all overflow-hidden group"
      >
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 items-center p-6 sm:p-8">
          {/* 左: バッジアイコン */}
          <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAECE7] mx-auto md:mx-0">
            <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#993C1D]" />
          </div>

          {/* 中央: メッセージ */}
          <div className="text-center md:text-left">
            <p className="text-xs tracking-widest text-[#993C1D] mb-2 font-medium">
              CW.認定 / NEW
            </p>
            <h3
              className="text-lg sm:text-xl font-medium mb-2 text-stone-900 leading-tight"
              style={{
                fontFamily: "'Yu Mincho', 'Hiragino Mincho ProN', serif",
              }}
            >
              業界初のAIクリエイター認定で、あなたの価値を証明する
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              ディレクター+ショット制作者ロール、Silver認定取得まで約1ヶ月。
              <span className="hidden sm:inline">
                既存の学習コンテンツと連動した認定プログラムが始動しました。
              </span>
            </p>
          </div>

          {/* 右: CTA矢印 */}
          <div className="flex items-center justify-center md:justify-end gap-2 text-[#993C1D] font-medium text-sm group-hover:gap-3 transition-all">
            <span>認定プログラムを見る</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </section>
  );
}
