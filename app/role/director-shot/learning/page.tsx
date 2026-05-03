"use client";

import Link from "next/link";

/**
 * ディレクター+ショット制作者 認定講座 ジャーニー画面 v1
 *
 * 認定取得の進捗をスゴロク状の直線ロードマップで可視化する没入型UI。
 * パターン3(没入型ロードマップ)の実装。
 *
 * 配置先: app/role/director-shot/learning/page.tsx
 *
 * 設計トーン: CW認定LP(深紅・ゴールド・ダーク・クリーム)を継承
 * 構成: タイトル → KPIバー → ロードマップ → 現在のレッスン+認定要件 → 次のアクション
 *
 * v1.0 / 2026-05-03
 */

// ============================================================
// データ定義
// ============================================================

const KPIS = [
  { num: "04", suffix: " / 08", label: "STEPS" },
  { num: "50", suffix: "%", label: "PROGRESS" },
  { num: "18", suffix: "h", label: "REMAINING" },
  { num: "21", suffix: "日", label: "UNTIL SILVER" },
];

const STEPS = [
  { n: 1, x: 60, label: "著作権・法務", duration: "2h", state: "done", categorySlug: "copyright-law" },
  { n: 2, x: 170, label: "AI画像原理", duration: "3h", state: "done", categorySlug: "ai-image-principles" },
  { n: 3, x: 280, label: "演出・ストーリー", duration: "4h", state: "done", categorySlug: "directing-storytelling" },
  { n: 4, x: 390, label: "AI画像生成 実践", duration: "5h", state: "current", categorySlug: "ai-image-practical" },
  { n: 5, x: 500, label: "AI動画制作", duration: "6h", state: "upcoming", categorySlug: "ai-video-production" },
  { n: 6, x: 610, label: "WF思考", duration: "3h", state: "upcoming", categorySlug: "workflow-thinking" },
  { n: 7, x: 720, label: "WF構築", duration: "4h", state: "upcoming", categorySlug: "workflow-construction" },
  { n: 8, x: 830, label: "編集・ポスプロ", duration: "3h", state: "upcoming", categorySlug: "editing-postproduction" },
] as const;

// 完了線の終点(Step 4直前まで深紅)
const PROGRESS_LINE_END_X = 500;

const CERT_REQUIREMENTS = [
  { text: "8ステップ完了", status: "progress" as const, statusLabel: "4/8" },
  { text: "法務筆記試験", status: "done" as const, statusLabel: "合格" },
  { text: "課題提出", status: "pending" as const, statusLabel: "未着手" },
  { text: "主審判定", status: "pending" as const, statusLabel: "未着手" },
];

const NEXT_ACTIONS = [
  {
    icon: "📚",
    title: "法務15問の復習",
    sub: "合格済みですが、課題提出前に再確認しましょう",
    href: "/category/copyright-law",
  },
  {
    icon: "💾",
    title: "ワークフロー保存",
    sub: "学習段階から保存習慣をつけて、課題提出を楽に",
    href: "#",
  },
  {
    icon: "💬",
    title: "コミュニティで質問",
    sub: "Discord内の認定取得チャンネルで仲間と学ぶ",
    href: "#",
  },
];

// ============================================================
// スタイル定数
// ============================================================

const COLORS = {
  deepRed: "#993C1D",
  deepRedDark: "#712B13",
  dark: "#2A1F1A",
  darkMid: "#4A382C",
  cream: "#FBF7F0",
  gold: "#B8893E",
  border: "#E8E0D3",
  borderLight: "#F0EAE0",
  textBody: "#1F1B17",
  textSub: "#6B6259",
  textMute: "#999088",
  bgPale: "#FAECE7",
} as const;

// ============================================================
// ページコンポーネント
// ============================================================

export default function DirectorShotLearningPage() {
  return (
    <div style={{ background: COLORS.cream, minHeight: "100vh" }}>
      {/* 脈動アニメ用のグローバルstyle */}
      <style jsx global>{`
        @keyframes journeyPulseR {
          0%, 100% { r: 26; opacity: 0.6; }
          50% { r: 36; opacity: 0; }
        }
        .journey-pulse-circle {
          animation: journeyPulseR 2s ease-in-out infinite;
        }
      `}</style>

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "24px 24px 40px",
        }}
      >
        {/* タイトルブロック */}
        <TitleBlock />

        {/* KPIバー */}
        <KpiBar />

        {/* ロードマップ */}
        <RoadmapBlock />

        {/* 現在のレッスン + 認定要件 */}
        <NowLearningRow />

        {/* 次のアクション */}
        <NextActionsBlock />
      </main>
    </div>
  );
}

// ============================================================
// タイトルブロック
// ============================================================

function TitleBlock() {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.25em",
          color: COLORS.deepRed,
          fontWeight: 700,
          marginBottom: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <span style={{ width: "28px", height: "1px", background: COLORS.deepRed }} />
        CW.認定 / ROLE 01 — DIRECTOR &amp; SHOT
        <span style={{ width: "28px", height: "1px", background: COLORS.deepRed }} />
      </p>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: COLORS.dark,
          margin: "0 0 4px",
          lineHeight: 1.4,
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ color: COLORS.deepRed }}>Silver</span>認定へのステップ
      </h1>
      <p style={{ fontSize: "12px", color: COLORS.textSub, margin: 0 }}>
        あなたのクリエイターとしての価値を、認定で証明する
      </p>
    </div>
  );
}

// ============================================================
// KPIバー
// ============================================================

function KpiBar() {
  return (
    <div
      style={{
        background: "white",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "8px",
        padding: "12px 24px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
        marginBottom: "20px",
      }}
    >
      {KPIS.map((kpi, idx) => (
        <div
          key={kpi.label}
          style={{
            textAlign: "center",
            borderRight: idx < KPIS.length - 1 ? `1px solid ${COLORS.border}` : "none",
            padding: "0 12px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: COLORS.deepRed,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {kpi.num}
            <small
              style={{
                fontSize: "13px",
                color: COLORS.textSub,
                fontWeight: 500,
              }}
            >
              {kpi.suffix}
            </small>
          </div>
          <div
            style={{
              fontSize: "9px",
              color: COLORS.textSub,
              letterSpacing: "0.1em",
              marginTop: "4px",
              fontWeight: 600,
            }}
          >
            {kpi.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// ロードマップ(SVG)
// ============================================================

function RoadmapBlock() {
  return (
    <div
      style={{
        background: "white",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "12px",
        padding: "20px 28px",
        marginBottom: "20px",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: COLORS.gold,
          fontWeight: 700,
          textAlign: "center",
          margin: "0 0 4px",
        }}
      >
        — THE STEPS —
      </p>
      <h2
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: COLORS.dark,
          textAlign: "center",
          margin: "0 0 16px",
        }}
      >
        8ステップの道のり
      </h2>

      <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
        <svg
          style={{ display: "block", width: "100%", height: "auto" }}
          viewBox="0 0 1000 130"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 背景線(これから) */}
          <line
            x1="60"
            y1="50"
            x2="940"
            y2="50"
            stroke={COLORS.border}
            strokeWidth="4"
            strokeDasharray="3 5"
            strokeLinecap="round"
          />
          {/* 完了線(深紅) */}
          <line
            x1="60"
            y1="50"
            x2={PROGRESS_LINE_END_X}
            y2="50"
            stroke={COLORS.deepRed}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* ゴールマーカー */}
          <circle
            cx="940"
            cy="50"
            r="22"
            fill={COLORS.cream}
            stroke={COLORS.gold}
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <text
            x="940"
            y="48"
            textAnchor="middle"
            fontSize="7"
            fontWeight="700"
            fill={COLORS.gold}
            letterSpacing="1"
          >
            SILVER
          </text>
          <text
            x="940"
            y="60"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={COLORS.gold}
          >
            ★
          </text>

          {/* 各ステップ */}
          {STEPS.map((step) => (
            <StepMarker key={step.n} step={step} />
          ))}
        </svg>
      </div>
    </div>
  );
}

// ============================================================
// ステップマーカー
// ============================================================

function StepMarker({ step }: { step: typeof STEPS[number] }) {
  const isDone = step.state === "done";
  const isCurrent = step.state === "current";
  const isUpcoming = step.state === "upcoming";

  if (isCurrent) {
    return (
      <g>
        {/* 脈動するハロー */}
        <circle
          className="journey-pulse-circle"
          cx={step.x}
          cy="50"
          r="26"
          fill={COLORS.bgPale}
          opacity="0.6"
        />
        {/* メインマーカー(大型) */}
        <circle
          cx={step.x}
          cy="50"
          r="22"
          fill={COLORS.deepRed}
          stroke="white"
          strokeWidth="4"
        />
        <text
          x={step.x}
          y="57"
          textAnchor="middle"
          fill="white"
          fontSize="13"
          fontWeight="700"
        >
          {String(step.n).padStart(2, "0")}
        </text>
        <text
          x={step.x}
          y="92"
          textAnchor="middle"
          fill={COLORS.deepRed}
          fontSize="10"
          fontWeight="700"
        >
          ▶ {step.label}
        </text>
        <text
          x={step.x}
          y="105"
          textAnchor="middle"
          fill={COLORS.deepRed}
          fontSize="9"
          fontWeight="600"
        >
          いまここ / {step.duration}
        </text>
      </g>
    );
  }

  if (isDone) {
    return (
      <g>
        <circle
          cx={step.x}
          cy="50"
          r="18"
          fill={COLORS.deepRed}
          stroke="white"
          strokeWidth="3"
        />
        <text
          x={step.x}
          y="56"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="700"
        >
          ✓
        </text>
        <text
          x={step.x}
          y="92"
          textAnchor="middle"
          fill={COLORS.textSub}
          fontSize="9"
          fontWeight="600"
        >
          {step.label}
        </text>
        <text
          x={step.x}
          y="105"
          textAnchor="middle"
          fill={COLORS.textMute}
          fontSize="8"
        >
          {step.duration}
        </text>
      </g>
    );
  }

  // upcoming
  return (
    <g opacity="0.5">
      <circle
        cx={step.x}
        cy="50"
        r="18"
        fill="white"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={step.x}
        y="56"
        textAnchor="middle"
        fill={COLORS.textMute}
        fontSize="11"
        fontWeight="700"
      >
        {String(step.n).padStart(2, "0")}
      </text>
      <text
        x={step.x}
        y="92"
        textAnchor="middle"
        fill={COLORS.textMute}
        fontSize="9"
        fontWeight="600"
      >
        {step.label}
      </text>
      <text
        x={step.x}
        y="105"
        textAnchor="middle"
        fill={COLORS.textMute}
        fontSize="8"
      >
        {step.duration}
      </text>
    </g>
  );
}

// ============================================================
// 現在のレッスン + 認定要件
// ============================================================

function NowLearningRow() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      <NowLearningCard />
      <CertRequirementsCard />
    </div>
  );
}

function NowLearningCard() {
  return (
    <div
      style={{
        background: "white",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "8px",
        padding: "20px 24px",
        borderTop: `3px solid ${COLORS.deepRed}`,
      }}
    >
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: COLORS.deepRed,
          fontWeight: 700,
          margin: "0 0 6px",
        }}
      >
        ▎ NOW LEARNING
      </p>
      <span
        style={{
          display: "inline-block",
          background: COLORS.bgPale,
          color: COLORS.deepRed,
          padding: "3px 10px",
          borderRadius: "11px",
          fontSize: "10px",
          fontWeight: 700,
          marginBottom: "6px",
        }}
      >
        STEP 04 / レッスン 03
      </span>
      <h3
        style={{
          fontSize: "19px",
          fontWeight: 700,
          color: COLORS.dark,
          margin: "0 0 6px",
          lineHeight: 1.4,
        }}
      >
        プロンプト設計の基本構造
      </h3>
      <div
        style={{
          fontSize: "11px",
          color: COLORS.textSub,
          marginBottom: "12px",
          display: "flex",
          gap: "14px",
        }}
      >
        <span>📹 18分</span>
        <span>📝 演習あり</span>
        <span>📊 6/12 レッスン</span>
      </div>
      <div
        style={{
          height: "5px",
          background: COLORS.borderLight,
          borderRadius: "3px",
          overflow: "hidden",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.deepRed} 0%, ${COLORS.gold} 100%)`,
            width: "33%",
            borderRadius: "3px",
          }}
        />
      </div>
      <p
        style={{
          fontSize: "11px",
          color: COLORS.textSub,
          marginBottom: "14px",
          margin: "0 0 14px",
        }}
      >
        Step 04 進捗 33% / レッスン 6/12 完了
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <Link
          href="/category/ai-image-practical"
          style={{
            background: COLORS.deepRed,
            color: "white",
            border: "none",
            padding: "11px 20px",
            fontSize: "13px",
            fontWeight: 700,
            borderRadius: "4px",
            cursor: "pointer",
            flex: 1,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          ▶ 続きから視聴する
        </Link>
        <Link
          href="/role/director-shot"
          style={{
            background: "white",
            border: `1px solid ${COLORS.border}`,
            color: COLORS.textBody,
            padding: "11px 16px",
            fontSize: "13px",
            fontWeight: 500,
            borderRadius: "4px",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          📑 ステップ詳細
        </Link>
      </div>
    </div>
  );
}

function CertRequirementsCard() {
  const statusStyle = (status: "done" | "progress" | "pending") => {
    const map = {
      done: { background: "rgba(184, 137, 62, 0.3)", color: COLORS.gold },
      progress: { background: "rgba(184, 137, 62, 0.6)", color: COLORS.cream },
      pending: { background: "rgba(255, 255, 255, 0.1)", color: "#C9BFB1" },
    };
    return map[status];
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.darkMid} 100%)`,
        color: COLORS.cream,
        borderRadius: "8px",
        padding: "18px 20px",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: COLORS.gold,
          fontWeight: 700,
          margin: "0 0 6px",
        }}
      >
        ▎ SILVER 認定要件
      </p>
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 700,
          margin: "0 0 12px",
        }}
      >
        取得まで、あと一歩
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        {CERT_REQUIREMENTS.map((req) => {
          const ss = statusStyle(req.status);
          const isDone = req.status === "done";
          return (
            <div
              key={req.text}
              style={{
                display: "grid",
                gridTemplateColumns: "18px 1fr auto",
                gap: "8px",
                fontSize: "11px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: isDone ? COLORS.gold : "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  color: isDone ? COLORS.dark : "white",
                }}
              >
                {isDone ? "✓" : "○"}
              </span>
              <span style={{ color: COLORS.cream }}>{req.text}</span>
              <span
                style={{
                  fontSize: "9px",
                  padding: "1px 6px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  background: ss.background,
                  color: ss.color,
                }}
              >
                {req.statusLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// 次のアクション
// ============================================================

function NextActionsBlock() {
  return (
    <div
      style={{
        background: COLORS.cream,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "8px",
        padding: "20px 24px",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: COLORS.deepRed,
          fontWeight: 700,
          margin: "0 0 10px",
        }}
      >
        ▎ NEXT ACTIONS
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {NEXT_ACTIONS.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            style={{
              background: "white",
              border: `1px solid ${COLORS.border}`,
              borderRadius: "6px",
              padding: "14px",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <div style={{ fontSize: "22px", marginBottom: "6px" }}>{action.icon}</div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: COLORS.textBody,
                marginBottom: "4px",
                margin: "0 0 4px",
              }}
            >
              {action.title}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: COLORS.textSub,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {action.sub}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
