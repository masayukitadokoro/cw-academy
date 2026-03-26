-- migration_002_live_review.sql
-- ライブ配信アーカイブ、添削チケット、クリエイター、有料会員

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
  rank          TEXT NOT NULL,
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
  submission_type   TEXT,
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
