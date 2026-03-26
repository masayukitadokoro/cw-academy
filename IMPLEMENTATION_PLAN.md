# CW Academy — ライブ配信 & 添削チケット 実装プラン

## このドキュメントの使い方

このファイルはClaude Codeへの指示書です。
`claude` コマンドで「IMPLEMENTATION_PLAN.mdを読んで、Phase 1から順に実装してください」と指示してください。

---

## プロジェクト概要

- **リポ:** ~/Projects/cw-academy
- **スタック:** Next.js 16 + TypeScript + Tailwind CSS + Supabase + Vercel
- **本番URL:** https://cw-academy.vercel.app
- **Supabase URL:** https://mmuwllcbjcarobgghesk.supabase.co
- **既存機能:** 6カテゴリ学習ページ、認証（メール）、マイページ、管理画面

## 追加する3機能

1. **ライブ配信アーカイブ** — Tier 1クリエイターの制作配信。YouTube Live限定公開→アーカイブは有料会員限定
2. **添削チケット** — クリエイターTier別価格（5千〜5万円）で個別フィードバック。添削動画＋テキストコメント
3. **クリエイタープロフィール** — 配信＋添削チケットを集約するクリエイター軸のハブページ

---

## Phase 1: DB & API基盤（5-8時間）

### 1.1 Supabaseマイグレーション

`supabase/migration_002_live_review.sql` を作成して、Supabase SQL Editorで実行。

```sql
-- 1. クリエイター
CREATE TABLE creators (
  id            SERIAL PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  bio           TEXT,
  avatar_url    TEXT,
  tier          INT NOT NULL DEFAULT 1,
  specialties   TEXT[],
  social_links  JSONB,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. ライブ配信アーカイブ
CREATE TABLE live_archives (
  id            SERIAL PRIMARY KEY,
  creator_id    INT NOT NULL REFERENCES creators(id),
  title         TEXT NOT NULL,
  description   TEXT,
  youtube_url   TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_min  INT,
  streamed_at   TIMESTAMPTZ,
  tags          TEXT[],
  is_published  BOOLEAN NOT NULL DEFAULT false,
  is_free       BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. 有料会員（サブスクリプション）
CREATE TABLE subscriptions (
  id                     SERIAL PRIMARY KEY,
  user_id                UUID NOT NULL REFERENCES auth.users(id),
  plan_type              TEXT NOT NULL DEFAULT 'basic',
  status                 TEXT NOT NULL DEFAULT 'active',
  stripe_subscription_id TEXT,
  stripe_customer_id     TEXT,
  current_period_start   TIMESTAMPTZ,
  current_period_end     TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. 添削チケット（商品）
CREATE TABLE review_tickets (
  id            SERIAL PRIMARY KEY,
  creator_id    INT NOT NULL REFERENCES creators(id),
  title         TEXT NOT NULL,
  description   TEXT,
  price         INT NOT NULL,
  rank          TEXT NOT NULL,  -- 'silver', 'gold', 'platinum'
  max_per_month INT,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. 添削注文
CREATE TABLE review_orders (
  id                SERIAL PRIMARY KEY,
  ticket_id         INT NOT NULL REFERENCES review_tickets(id),
  user_id           UUID NOT NULL REFERENCES auth.users(id),
  creator_id        INT NOT NULL REFERENCES creators(id),
  status            TEXT NOT NULL DEFAULT 'pending',
  stripe_payment_id TEXT,
  submission_type   TEXT,          -- 'finished', 'wip', 'concept'
  submission_url    TEXT,
  production_note   JSONB,
  submitted_at      TIMESTAMPTZ,
  review_video_url  TEXT,
  review_text       TEXT,
  delivered_at      TIMESTAMPTZ,
  public_opt_in     BOOLEAN DEFAULT false,
  rating            INT,
  rating_comment    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "creators_read" ON creators FOR SELECT USING (true);
CREATE POLICY "archives_read_published" ON live_archives FOR SELECT USING (is_published = true);
CREATE POLICY "subs_own_read" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "subs_own_insert" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "subs_own_update" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "tickets_read" ON review_tickets FOR SELECT USING (is_active = true);
CREATE POLICY "orders_own_read" ON review_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "orders_own_insert" ON review_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "orders_own_update" ON review_orders FOR UPDATE USING (auth.uid() = user_id);

-- 初期データ: テスト用クリエイター
INSERT INTO creators (name, slug, bio, tier, specialties) VALUES
  ('まりか', 'marika', 'WAIFF 2025 ファイナリスト。SF映像・キャラクターアニメーション専門。', 1, ARRAY['SF映像', 'キャラクターアニメーション', 'ショートフィルム']),
  ('箱庭', 'hakoniwa', 'AIアニメーション・背景美術のトップクリエイター。', 1, ARRAY['背景美術', 'アニメーション', '風景映像']),
  ('yachimata', 'yachimata', 'AI動画制作のパイオニア。独自のワークフローで知られる。', 1, ARRAY['ワークフロー', 'AI動画', 'ComfyUI']);

-- 初期データ: テスト用チケット
INSERT INTO review_tickets (creator_id, title, description, price, rank) VALUES
  (1, 'まりかのショートフィルム添削（Platinum）', 'あなたの作品をまりかが添削動画＋テキストで詳細フィードバック', 30000, 'platinum'),
  (2, '箱庭の背景美術添削（Gold）', '背景・風景映像に特化した添削フィードバック', 15000, 'gold'),
  (3, 'yachimataのワークフロー添削（Gold）', 'ComfyUIワークフローの改善提案付き添削', 15000, 'gold');
```

### 1.2 TypeScript型定義

`types/index.ts` に以下の型を**追加**（既存の型は残す）:

```typescript
// === ライブ配信 & 添削チケット関連 ===

export interface Creator {
  id: number;
  user_id: string | null;
  name: string;
  slug: string;
  bio: string | null;
  avatar_url: string | null;
  tier: number;
  specialties: string[] | null;
  social_links: Record<string, string> | null;
  is_active: boolean;
  created_at: string;
}

export interface LiveArchive {
  id: number;
  creator_id: number;
  title: string;
  description: string | null;
  youtube_url: string;
  thumbnail_url: string | null;
  duration_min: number | null;
  streamed_at: string | null;
  tags: string[] | null;
  is_published: boolean;
  is_free: boolean;
  created_at: string;
  // joined
  creator?: Creator;
}

export interface Subscription {
  id: number;
  user_id: string;
  plan_type: string;
  status: string;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
}

export interface ReviewTicket {
  id: number;
  creator_id: number;
  title: string;
  description: string | null;
  price: number;
  rank: 'silver' | 'gold' | 'platinum';
  max_per_month: number | null;
  is_active: boolean;
  created_at: string;
  // joined
  creator?: Creator;
}

export type ReviewOrderStatus = 'pending' | 'submitted' | 'in_review' | 'delivered' | 'completed';

export interface ReviewOrder {
  id: number;
  ticket_id: number;
  user_id: string;
  creator_id: number;
  status: ReviewOrderStatus;
  stripe_payment_id: string | null;
  submission_type: 'finished' | 'wip' | 'concept' | null;
  submission_url: string | null;
  production_note: {
    goal?: string;
    pain_points?: string;
    tools?: string;
    type?: string;
  } | null;
  submitted_at: string | null;
  review_video_url: string | null;
  review_text: string | null;
  delivered_at: string | null;
  public_opt_in: boolean;
  rating: number | null;
  rating_comment: string | null;
  created_at: string;
  // joined
  ticket?: ReviewTicket;
  creator?: Creator;
}
```

### 1.3 Stripe連携

`npm install stripe` して以下を実装:

**`lib/stripe.ts`** — Stripe接続設定

**`app/api/stripe/checkout/route.ts`** — 2種類のCheckout Session作成:
- サブスク用（有料会員）: `mode: 'subscription'`
- 添削チケット用（単発決済）: `mode: 'payment'`, metadataにticket_id, user_idを含む

**`app/api/stripe/webhook/route.ts`** — Webhook handler:
- `checkout.session.completed` → subscriptionsテーブルにレコード作成 / review_ordersのstatusを'submitted'に更新
- `customer.subscription.deleted` → subscriptionsのstatusを'cancelled'に更新
- `invoice.payment_failed` → subscriptionsのstatusを'past_due'に更新

**`app/api/stripe/portal/route.ts`** — カスタマーポータル（サブスク管理用）

**環境変数（.env.localに追加）:**
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 1.4 有料会員チェックヘルパー

**`lib/subscription.ts`** を作成:

```typescript
// サーバーサイドで有料会員かどうかを判定するヘルパー
export async function isSubscribed(userId: string): Promise<boolean> {
  // supabase service roleでsubscriptionsテーブルを確認
  // status === 'active' && current_period_end > now()
}
```

### 1.5 ファイルアップロードAPI

**`app/api/upload/route.ts`** — Supabase Storageを使った添削提出物のアップロード:
- バケット名: `review-submissions`
- パス: `{user_id}/{order_id}/{filename}`
- 許可ファイル: mp4, mov, webm, png, jpg, pdf（最大500MB）

---

## Phase 2: 画面実装（10-14時間）

### 2.1 トップページ更新 — Creator Liveセクション追加

**`app/page.tsx`** を更新:

既存のカテゴリグリッド（6カテゴリ）の**上**に、Creator Liveセクションを追加。

```
[ヘッダー]

🎬 Creator Live — トップクリエイターの制作現場
┌─────────┐ ┌─────────┐ ┌─────────┐
│サムネイル │ │サムネイル │ │サムネイル │  →もっと見る
│🔒        │ │🔒        │ │  NEW!   │
│まりか    │ │箱庭      │ │yachimata│
└─────────┘ └─────────┘ └─────────┘
[有料会員になる →]  ← 非会員時のみ表示

📚 カテゴリから学ぶ
┌─────────┐ ┌─────────┐ ┌─────────┐
│AI動画制作│ │AI画像生成│ │編集・ポスプロ│  ← 既存
└─────────┘ └─────────┘ └─────────┘
```

実装ポイント:
- `live_archives` からis_published=trueのものを最新3件取得（creatorをjoin）
- 有料会員チェック: サーバーコンポーネントでsubscriptionを確認
- 非会員にはサムネイル＋🔒アイコン＋「有料会員になる」CTA
- カードクリック → `/live/[id]`

### 2.2 アーカイブ一覧ページ

**`app/live/page.tsx`** — 新規作成:
- 全アーカイブをグリッド表示（最新順）
- クリエイターでフィルタ可能
- 有料会員/非会員で表示を分岐

### 2.3 アーカイブ視聴ページ

**`app/live/[id]/page.tsx`** — 新規作成:

3カラムレイアウト（既存の`app/category/[slug]/page.tsx`を参考）:
- **左カラム:** クリエイター情報 + 他のアーカイブ一覧
- **中央:** YouTube埋め込み（有料会員のみ。非会員にはブラー＋CTA）
- **右カラム:** 配信説明 + タグ + 「このクリエイターに添削してもらう →」CTA

`components/YouTubeLite.tsx` を流用。有料チェックは `lib/subscription.ts` のヘルパーを使用。

### 2.4 クリエイタープロフィールページ

**`app/creator/[slug]/page.tsx`** — 新規作成:

```
[アバター]  まりか
WAIFF 2025 ファイナリスト
専門: SF映像 / キャラクターアニメーション

📺 ライブ配信アーカイブ
[アーカイブカード × N]

✏️ 添削チケット
┌─────────────────────────────────────┐
│ Platinum 添削 ¥30,000〜 [購入する] │
└─────────────────────────────────────┘

📚 公開添削アーカイブ（オプトイン済み）
[添削動画カード × N]  ← public_opt_in=trueのreview_ordersから取得
```

### 2.5 添削チケット一覧ページ

**`app/review/page.tsx`** — 新規作成:
- 全クリエイターの添削チケットをカード表示
- ランク（Platinum/Gold/Silver）でフィルタ
- 価格帯でソート

### 2.6 添削チケット購入ページ

**`app/review/[ticketId]/page.tsx`** — 新規作成:
- チケット詳細（クリエイター情報、価格、説明）
- 「購入する」ボタン → Stripe Checkoutにリダイレクト
- 購入後 → `/review/submit/[orderId]` にリダイレクト

### 2.7 作品提出フォーム

**`app/review/submit/[orderId]/page.tsx`** — 新規作成:

フォーム構成:
1. **提出タイプ選択** — ラジオボタン: 完成作品 / 制作途中(WIP) / 企画段階の相談
2. **ファイルアップロード** — 動画（mp4/mov/webm）, 画像（png/jpg）, PDF。Supabase Storageへアップロード
3. **制作ノート（4項目）:**
   - 「この作品/企画で目指していること」（textarea）
   - 「特に悩んでいるポイント・聞きたいこと」（textarea）
   - 「使用ツール・ワークフロー」（チェックボックス: KLING AI, Hailuo, ComfyUI, CapCut, DaVinci, その他 + 自由記述）
   - 参考URL（任意）
4. **提出ボタン** → review_ordersのstatusを'submitted'に更新、submission_url・production_noteを保存

### 2.8 マイページ拡張

**`app/mypage/reviews/page.tsx`** — 新規作成:
- 自分の添削注文一覧（ステータス別: 提出待ち / 添削中 / 納品済み）
- 納品済みの場合は添削動画＋テキストコメントを表示
- 評価（1-5星）を付けるフォーム

**`app/mypage/subscription/page.tsx`** — 新規作成:
- 現在のプラン表示
- Stripeカスタマーポータルへのリンク（プラン変更・解約）
- 未加入の場合は「有料会員になる」CTA

**`app/mypage/layout.tsx`** を更新:
- サイドバーに「添削履歴」「サブスクリプション」のナビを追加

---

## Phase 3: 管理画面 & 仕上げ（4-6時間）

### 3.1 管理画面拡張

**`app/admin/creators/page.tsx`** — クリエイター管理:
- CRUD: 名前、slug、bio、tier、specialties、SNSリンク
- アバター画像アップロード

**`app/admin/live/page.tsx`** — 配信管理:
- アーカイブの追加（YouTube URL、タイトル、説明、クリエイター選択）
- 公開/非公開の切り替え
- 無料公開フラグの切り替え

**`app/admin/reviews/page.tsx`** — 添削注文管理:
- 全注文の一覧（ステータスフィルタ）
- ステータス変更（手動で'in_review' → 'delivered'等）
- 添削動画URL・テキストの入力（クリエイターが管理画面を使う場合）

**`app/admin/layout.tsx`** を更新:
- サイドバーに「クリエイター」「配信管理」「添削管理」を追加

### 3.2 Vercel環境変数の追加

Vercelダッシュボードで以下を追加:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3.3 テスト

- Stripe testモードで有料会員登録→アーカイブ視聴できることを確認
- 添削チケット購入→提出→ステータス遷移を確認
- 管理画面でクリエイター・配信・注文の管理ができることを確認
- 非会員→会員→解約のフロー確認

---

## コーディング規約（既存コードに合わせる）

- **コンポーネント:** `'use client'` は必要な場合のみ。サーバーコンポーネント優先
- **スタイリング:** Tailwind CSSのユーティリティクラス。カスタムCSSは使わない
- **アイコン:** `lucide-react` を使用（既存に合わせる）
- **Supabase:** サーバー側は `lib/supabase-server.ts` の `createClient()`、クライアント側は `lib/supabase-client.ts`
- **認証:** `components/AuthProvider.tsx` の `useAuth()` フック
- **フォント:** デフォルトのTailwindフォント（既存に合わせる）
- **カラー:** 既存のカテゴリカラーに加え、Creator Live用にティール（#0D9488）をアクセントカラーとして使用

---

## ファイル一覧（新規作成・更新）

### 新規作成

| ファイル | 説明 |
|---------|------|
| supabase/migration_002_live_review.sql | DBスキーマ |
| lib/stripe.ts | Stripe接続設定 |
| lib/subscription.ts | 有料会員チェックヘルパー |
| app/api/stripe/checkout/route.ts | Checkout Session作成 |
| app/api/stripe/webhook/route.ts | Webhook handler |
| app/api/stripe/portal/route.ts | カスタマーポータル |
| app/api/upload/route.ts | ファイルアップロード |
| app/live/page.tsx | アーカイブ一覧 |
| app/live/[id]/page.tsx | アーカイブ視聴 |
| app/creator/[slug]/page.tsx | クリエイタープロフィール |
| app/review/page.tsx | 添削チケット一覧 |
| app/review/[ticketId]/page.tsx | チケット詳細＋購入 |
| app/review/submit/[orderId]/page.tsx | 作品提出フォーム |
| app/mypage/reviews/page.tsx | 添削注文履歴 |
| app/mypage/subscription/page.tsx | サブスク管理 |
| app/admin/creators/page.tsx | クリエイター管理 |
| app/admin/live/page.tsx | 配信管理 |
| app/admin/reviews/page.tsx | 添削注文管理 |

### 更新

| ファイル | 変更内容 |
|---------|---------|
| types/index.ts | Creator, LiveArchive, Subscription, ReviewTicket, ReviewOrder型追加 |
| app/page.tsx | Creator Liveセクション追加 |
| app/mypage/layout.tsx | サイドバーに添削履歴・サブスクのナビ追加 |
| app/admin/layout.tsx | サイドバーにクリエイター・配信・添削管理のナビ追加 |
| package.json | stripe パッケージ追加 |
| .env.local | Stripe環境変数追加 |
