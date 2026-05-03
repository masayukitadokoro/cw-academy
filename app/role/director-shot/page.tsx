"use client";

import Link from "next/link";

/**
 * ディレクター+ショット制作者ロール認定取得プログラム v3
 *
 * v1.0 → v3.0 改善ポイント:
 *   1. タイポグラフィ強化: タイトル明朝体太字44px、本文17px、行間1.9
 *   2. 色設計拡張: 深紅 + ゴールド + ダークブラウン + クリーム の4色設計
 *   3. ヒエラルキー強化: 数字4/8/1を56px大判化、セクション見出し32px
 *   4. ビジュアル要素: CW.認定バッジSVG、メダルアイコン、ピル状アクティブラベル
 *   5. セクション間メリハリ: 背景色交互(クリーム/白)、中間ダークCTA追加
 *
 * 配置先: app/role/director-shot/page.tsx
 *
 * v3.0 / 2026-04-30 / プラン1: ロール特化ページ磨き込み版
 */

// ============================================================
// データ定義
// ============================================================

const HERO_STATS = [
  { num: "4", suffix: "", label: "認定レベル" },
  { num: "8", suffix: "", label: "学習ステップ" },
  { num: "1", suffix: "ヶ月", label: "取得目安(SILVER)" },
];

const TIERS = [
  {
    code: "Lv.1 BRONZE",
    name: "Bronze",
    description: "基礎スキルの証明。指示に基づいた1カット制作、法務リテラシーの基礎",
    medalNum: "1",
    medalBg: "#C08B58",
    medalOpacity: "1",
    active: false,
  },
  {
    code: "Lv.2 SILVER",
    name: "Silver",
    description: "実務対応力の証明。CM(15秒〜)レベルの作品を完結できる",
    medalNum: "2",
    medalBg: "#993C1D",
    medalOpacity: "1",
    active: true,
  },
  {
    code: "Lv.3 GOLD",
    name: "Gold",
    description: "専門家レベル。ロッテCM級の商業案件を独力で納品可能",
    medalNum: "3",
    medalBg: "#B8893E",
    medalOpacity: "0.5",
    active: false,
  },
  {
    code: "Lv.4 PLATINUM",
    name: "Platinum",
    description: "業界リーダー。長編作品やブランドCMを統括可能",
    medalNum: "4",
    medalBg: "#5F5E5A",
    medalOpacity: "0.5",
    active: false,
  },
];

const LEARNING_PATH = [
  { step: "01", title: "著作権・法務の基礎", type: "理論", note: "全レベル必修・法務15問対策", duration: "2時間", categorySlug: "copyright-law" },
  { step: "02", title: "AI画像生成原理", type: "理論", note: "プロンプト設計の基礎理解", duration: "3時間", categorySlug: "ai-image-principles" },
  { step: "03", title: "演出・ストーリーテリング", type: "実践", note: "ディレクション能力の核", duration: "4時間", categorySlug: "directing-storytelling" },
  { step: "04", title: "AI画像生成 実践", type: "実践", note: "ショット制作の基礎", duration: "5時間", categorySlug: "ai-image-practical" },
  { step: "05", title: "AI動画制作", type: "実践", note: "ショット制作の応用", duration: "6時間", categorySlug: "ai-video-production" },
  { step: "06", title: "ワークフロー思考", type: "理論", note: "パイプライン設計の理解", duration: "3時間", categorySlug: "workflow-thinking" },
  { step: "07", title: "ワークフロー構築 実践", type: "実践", note: "ワークフロー保存習慣化", duration: "4時間", categorySlug: "workflow-construction" },
  { step: "08", title: "編集・ポストプロダクション", type: "実践", note: "仕上げ工程の習得", duration: "3時間", categorySlug: "editing-postproduction" },
];

const SILVER_REQUIREMENTS = [
  { strong: "8ステップの学習コース", text: "をすべて完了" },
  { strong: "法務筆記試験(15問)", text: "に合格 — 著作権・肖像権・AI関連法規の理解を確認" },
  { strong: "課題提出", text: "(自宅作業可) — ワークフロー保存指定、提出物は本人制作のもの" },
  { strong: "Yachimat氏(主審)による判定", text: " — 作品のクオリティとワークフローの双方を評価" },
];

const BENCHMARK_WORKS = [
  { level: "GOLD レベル", title: "Scrap Garden", description: "短編アニメーション作品。一貫性管理と演出の総合力が問われる事例。" },
  { level: "GOLD レベル", title: "KEMURI", description: "複数キャラクターの長尺コンテンツ。Silver合格者が次に目指すレベル。" },
  { level: "PLATINUM レベル", title: "桃太郎裁判 / rap battle", description: "業界リーダーレベルの統合作品。複合演出と高度な一貫性管理。" },
];

// ============================================================
// 共通スタイル定数(明朝体・色・サイズ)
// ============================================================

const MINCHO = "'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const COLOR_DEEP_RED = "#993C1D";
const COLOR_DARK = "#2A1F1A";
const COLOR_CREAM = "#FBF7F0";
const COLOR_GOLD = "#B8893E";
const COLOR_BORDER = "#E8E0D3";
const COLOR_BORDER_LIGHT = "#F0EAE0";
const COLOR_TEXT_BODY = "#1F1B17";
const COLOR_TEXT_SUB = "#6B6259";
const COLOR_TEXT_MID = "#4A4138";

// ============================================================
// 認定バッジ SVG
// ============================================================

function CertBadge({ size = 64 }: { size?: number }) {
  const fontSize1 = size * 0.17;
  const fontSize2 = size * 0.20;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={{ display: "block", margin: "0 auto 1.5rem" }}
    >
      <circle cx="32" cy="32" r="30" fill={COLOR_DEEP_RED} />
      <circle cx="32" cy="32" r="26" fill="none" stroke={COLOR_CREAM} strokeWidth="0.5" />
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fill={COLOR_CREAM}
        fontFamily="Yu Mincho, serif"
        fontSize={fontSize1}
        fontWeight="700"
      >
        CW.
      </text>
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fill={COLOR_CREAM}
        fontFamily="Yu Mincho, serif"
        fontSize={fontSize2}
        fontWeight="700"
      >
        認定
      </text>
    </svg>
  );
}

// ============================================================
// 共通アイブロウ(装飾ライン付き見出し)
// ============================================================

function Eyebrow({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <p
      style={{
        fontSize: "11px",
        letterSpacing: "0.2em",
        margin: "0 0 12px",
        fontWeight: 500,
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: centered ? "center" : "flex-start",
        color: COLOR_DEEP_RED,
      }}
    >
      <span style={{ display: "inline-block", width: "24px", height: "1px", background: "currentColor" }}></span>
      {children}
      {centered && (
        <span style={{ display: "inline-block", width: "24px", height: "1px", background: "currentColor" }}></span>
      )}
    </p>
  );
}

// ============================================================
// ページコンポーネント
// ============================================================

export default function DirectorShotRolePage() {
  return (
    <div style={{ fontFamily: "var(--font-sans, system-ui)", color: COLOR_TEXT_BODY }}>
      <style jsx>{`
        .path-step {
          transition: background 0.15s;
        }
        .path-step:hover {
          background: ${COLOR_CREAM};
        }
      `}</style>

      {/* パンくず */}
      <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1.5rem 0", fontSize: "13px", color: COLOR_TEXT_SUB }}>
        <Link href="/" style={{ color: COLOR_TEXT_SUB }}>CW Academy</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <span>認定取得プログラム</span>
        <span style={{ margin: "0 8px" }}>›</span>
        <span style={{ color: COLOR_TEXT_BODY }}>ディレクター+ショット制作者</span>
      </nav>

      {/* ヒーロー(クリーム背景) */}
      <section style={{ background: COLOR_CREAM, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <CertBadge size={64} />
          <Eyebrow centered>ROLE 01 / DIRECTOR &amp; SHOT</Eyebrow>
          <h1
            style={{
              fontFamily: MINCHO,
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 44px)",
              lineHeight: 1.25,
              margin: "0 0 1.5rem",
              letterSpacing: "-0.01em",
              color: COLOR_DARK,
            }}
          >
            ディレクター+ショット制作者
            <br />
            <span style={{ color: COLOR_DEEP_RED }}>認定</span>取得プログラム
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: COLOR_TEXT_MID,
              lineHeight: 1.9,
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            セルフディレクションで小規模作品を完結できる人材を育成・認定。
            <br />
            業界初の体系的スキル認定で、
            <br />
            <strong style={{ color: COLOR_DEEP_RED }}>あなたのクリエイターとしての価値</strong>を可視化します。
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              maxWidth: "580px",
              margin: "2rem auto 0",
              paddingTop: "2rem",
              borderTop: "0.5px solid #D9D2C7",
            }}
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: MINCHO,
                    fontSize: "clamp(40px, 6vw, 56px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: COLOR_DARK,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.num}
                  {stat.suffix && (
                    <span style={{ fontSize: "24px", fontWeight: 500 }}>{stat.suffix}</span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: COLOR_TEXT_SUB,
                    marginTop: "8px",
                    letterSpacing: "0.1em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ロール定義(白背景) */}
      <section style={{ background: "#FFFFFF", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Eyebrow>ROLE DEFINITION</Eyebrow>
          <h2 style={sectionH2Style()}>このロールは何をする人か</h2>
          <p style={sectionSubStyle()}>AI制作領域の現実を反映した統合ロール。</p>
          <div style={{ background: COLOR_CREAM, padding: "32px", borderRadius: "8px" }}>
            <p style={{ fontSize: "17px", lineHeight: 1.9, margin: "0 0 16px", color: COLOR_TEXT_BODY }}>
              AI生成メディアの制作現場で、
              <strong style={{ color: COLOR_DEEP_RED }}>企画から実行まで一人で完結できる</strong>
              クリエイターです。
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.9, margin: 0, color: COLOR_TEXT_MID }}>
              クライアント窓口、進行管理、プロンプト設計、ショット制作、リテイク対応までを一貫して担います。従来の業界では「ディレクター」と「ショット制作」は別職種でしたが、AI制作領域では境界が薄く、実務上1人で両方をこなすケースが多いという現実を反映した統合ロールです。
            </p>
          </div>
        </div>
      </section>

      {/* 4段階(クリーム背景) */}
      <section style={{ background: COLOR_CREAM, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Eyebrow centered>CERTIFICATION LEVELS</Eyebrow>
            <h2 style={sectionH2Style()}>4段階の合格者像</h2>
            <p style={{ ...sectionSubStyle(), maxWidth: "560px", margin: "0 auto" }}>
              各レベルで対応可能な映像の長さと複雑さが明確に定義されています。
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                style={{
                  padding: "24px 16px",
                  borderRadius: "6px",
                  background: "#FFFFFF",
                  border: tier.active ? `2px solid ${COLOR_DEEP_RED}` : `1px solid ${COLOR_BORDER}`,
                  textAlign: "center",
                  position: "relative",
                  boxShadow: tier.active ? "0 2px 8px rgba(153, 60, 29, 0.08)" : "none",
                  marginTop: tier.active ? "12px" : "0",
                }}
              >
                {tier.active && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: COLOR_DEEP_RED,
                      color: "white",
                      fontSize: "11px",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ★ 1ヶ月で目指す
                  </span>
                )}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "0 auto 12px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: MINCHO,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "white",
                    background: tier.medalBg,
                    opacity: tier.medalOpacity,
                  }}
                >
                  {tier.medalNum}
                </div>
                <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: COLOR_TEXT_SUB, margin: "0 0 4px" }}>
                  {tier.code}
                </p>
                <p style={{ fontFamily: MINCHO, fontSize: "22px", fontWeight: 700, margin: "0 0 8px", color: COLOR_DARK }}>
                  {tier.name}
                </p>
                <p style={{ fontSize: "13px", color: COLOR_TEXT_SUB, lineHeight: 1.7, margin: 0 }}>
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 学習パス(白背景) */}
      <section style={{ background: "#FFFFFF", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Eyebrow centered>LEARNING PATH</Eyebrow>
            <h2 style={sectionH2Style()}>Silver認定までの学習ステップ</h2>
            <p style={{ ...sectionSubStyle(), maxWidth: "580px", margin: "0 auto" }}>
              既存11カテゴリから選別された8ステップ。順序通りに進めることで、Silver認定の試験要件を網羅できます。
            </p>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "8px",
              border: `1px solid ${COLOR_BORDER}`,
              maxWidth: "720px",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            {LEARNING_PATH.map((step, idx) => (
              <Link
                key={step.step}
                href={`/category/${step.categorySlug}`}
                className="path-step"
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  gap: "16px",
                  padding: "18px 24px",
                  alignItems: "center",
                  borderBottom: idx < LEARNING_PATH.length - 1 ? `1px solid ${COLOR_BORDER_LIGHT}` : "none",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontFamily: MINCHO, fontSize: "28px", color: COLOR_DEEP_RED, fontWeight: 700, lineHeight: 1 }}>
                  {step.step}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "16px", fontWeight: 500, margin: "0 0 4px", color: COLOR_TEXT_BODY }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: "12px", color: COLOR_TEXT_SUB, display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", margin: 0 }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: "11px",
                        fontSize: "11px",
                        fontWeight: 500,
                        background: step.type === "理論" ? COLOR_BORDER_LIGHT : "#FAECE7",
                        color: step.type === "理論" ? COLOR_TEXT_SUB : COLOR_DEEP_RED,
                      }}
                    >
                      {step.type}
                    </span>
                    <span>{step.note}</span>
                  </p>
                </div>
                <div style={{ fontSize: "13px", color: "#999088", fontWeight: 500 }}>{step.duration}</div>
              </Link>
            ))}
          </div>
          <p
            style={{
              textAlign: "right",
              fontSize: "13px",
              color: COLOR_TEXT_SUB,
              maxWidth: "720px",
              margin: "12px auto 0",
              padding: "0 8px",
            }}
          >
            合計学習時間{" "}
            <strong style={{ color: COLOR_DARK, fontSize: "16px", fontFamily: MINCHO }}>約30時間</strong>
          </p>
        </div>
      </section>

      {/* 中間CTA(クリーム + ダークカード) */}
      <section style={{ background: COLOR_CREAM, padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              background: COLOR_DARK,
              color: COLOR_CREAM,
              padding: "3rem 2rem",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: COLOR_GOLD,
                margin: "0 0 12px",
                fontWeight: 500,
              }}
            >
              — TAKE THE NEXT STEP —
            </p>
            <h3
              style={{
                fontFamily: MINCHO,
                fontSize: "26px",
                fontWeight: 700,
                margin: "0 0 12px",
                lineHeight: 1.4,
              }}
            >
              あなたは、いまどのレベルにいますか?
            </h3>
            <p style={{ fontSize: "14px", color: "#C9BFB1", margin: "0 0 1.5rem", lineHeight: 1.7 }}>
              学習を始める前に、現在のスキルを把握しましょう。
              <br />
              あなたの出発点に最適なステップから始められます。
            </p>
            <Link
              href="/skill-check"
              style={{
                display: "inline-block",
                background: COLOR_GOLD,
                color: COLOR_DARK,
                border: "none",
                padding: "14px 32px",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: "4px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              スキル診断を受ける →
            </Link>
          </div>
        </div>
      </section>

      {/* Silver取得要件(白背景) */}
      <section style={{ background: "#FFFFFF", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Eyebrow centered>SILVER REQUIREMENTS</Eyebrow>
            <h2 style={sectionH2Style()}>Silver認定の取得要件</h2>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "8px",
              border: `1px solid ${COLOR_BORDER}`,
              maxWidth: "720px",
              margin: "0 auto",
              padding: "32px",
            }}
          >
            {SILVER_REQUIREMENTS.map((req, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: "16px",
                  padding: "16px 0",
                  borderBottom: idx < SILVER_REQUIREMENTS.length - 1 ? `1px solid ${COLOR_BORDER_LIGHT}` : "none",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: MINCHO,
                    fontSize: "22px",
                    color: COLOR_DEEP_RED,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: COLOR_TEXT_BODY, margin: 0 }}>
                  <strong>{req.strong}</strong>
                  {req.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 試験プレビュー(クリーム背景) */}
      <section style={{ background: COLOR_CREAM, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Eyebrow centered>EXAM PREVIEW</Eyebrow>
            <h2 style={sectionH2Style()}>試験課題のプレビュー</h2>
            <p style={{ ...sectionSubStyle(), maxWidth: "560px", margin: "0 auto" }}>
              実技試験ではこのような課題が出題されます(Silver想定例)。
            </p>
          </div>

          <div
            style={{
              background: COLOR_CREAM,
              border: `1px solid ${COLOR_BORDER}`,
              borderLeft: `4px solid ${COLOR_DEEP_RED}`,
              padding: "32px",
              borderRadius: "6px",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            <p style={{ fontFamily: MINCHO, fontSize: "17px", lineHeight: 1.9, color: COLOR_DARK, margin: "0 0 16px" }}>
              「8人のアイドルキャラクターが登場するMV用のショットを制作してください。キャラクターの一貫性を保ちつつ、指定されたシーン構成に従ってください。ワークフローを保存し、判定者が再現可能な形で提出してください。」
            </p>
            <div
              style={{
                fontSize: "12px",
                color: COLOR_TEXT_SUB,
                paddingTop: "16px",
                borderTop: `1px solid ${COLOR_BORDER}`,
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              {["制限時間あり", "カンニング可", "他人代行不可", "ワークフロー保存必須"].map((item) => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: COLOR_DEEP_RED,
                    }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ベンチマーク(白背景) */}
      <section style={{ background: "#FFFFFF", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Eyebrow centered>BENCHMARK WORKS</Eyebrow>
            <h2 style={sectionH2Style()}>合格者像の参考事例</h2>
            <p style={{ ...sectionSubStyle(), maxWidth: "580px", margin: "0 auto" }}>
              Yachimat氏の過去案件から、Gold〜Platinumレベルの参考事例を提示します。
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
              maxWidth: "980px",
              margin: "0 auto",
            }}
          >
            {BENCHMARK_WORKS.map((work) => (
              <div
                key={work.title}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${COLOR_BORDER}`,
                  padding: "24px",
                  borderRadius: "6px",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: COLOR_GOLD,
                    margin: "0 0 8px",
                    fontWeight: 700,
                  }}
                >
                  {work.level}
                </p>
                <p
                  style={{
                    fontFamily: MINCHO,
                    fontSize: "19px",
                    fontWeight: 700,
                    margin: "0 0 8px",
                    color: COLOR_DARK,
                  }}
                >
                  {work.title}
                </p>
                <p style={{ fontSize: "12px", color: COLOR_TEXT_SUB, lineHeight: 1.7, margin: 0 }}>
                  {work.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最終CTA(クリーム背景) */}
      <section style={{ background: COLOR_CREAM, padding: "4rem 1.5rem" }}>
        <div
          style={{
            background: "#FFFFFF",
            padding: "4rem 2rem",
            textAlign: "center",
            borderRadius: "8px",
            margin: "0 auto",
            maxWidth: "980px",
            border: `1px solid ${COLOR_BORDER}`,
          }}
        >
          <CertBadge size={48} />
          <h2
            style={{
              fontFamily: MINCHO,
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 700,
              margin: "0 0 12px",
              lineHeight: 1.5,
              color: COLOR_DARK,
            }}
          >
            あなたのクリエイターとしての価値を、
            <br />
            認定で証明する
          </h2>
          <p style={{ fontSize: "14px", color: COLOR_TEXT_SUB, margin: "0 0 2rem" }}>
            Silver認定取得まで、約1ヶ月。あなたの学習はここから始まります。
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/category/copyright-law"
              style={{
                background: COLOR_DEEP_RED,
                color: "white",
                border: "none",
                padding: "16px 40px",
                fontSize: "15px",
                fontWeight: 700,
                borderRadius: "4px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              学習を始める
            </Link>
            <Link
              href="/certification/about"
              style={{
                background: "transparent",
                color: COLOR_DARK,
                border: `1px solid ${COLOR_DARK}`,
                padding: "16px 32px",
                fontSize: "15px",
                fontWeight: 500,
                borderRadius: "4px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              認定について詳しく
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// セクション見出しスタイル(共通)
// ============================================================

function sectionH2Style(): React.CSSProperties {
  return {
    fontFamily: MINCHO,
    fontSize: "clamp(24px, 4vw, 32px)",
    lineHeight: 1.3,
    margin: "0 0 1rem",
    letterSpacing: "-0.01em",
    fontWeight: 700,
    color: COLOR_DARK,
  };
}

function sectionSubStyle(): React.CSSProperties {
  return {
    fontSize: "15px",
    color: COLOR_TEXT_SUB,
    margin: "0 0 2rem",
    lineHeight: 1.8,
  };
}
