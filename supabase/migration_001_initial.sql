CREATE TABLE categories (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  color       TEXT NOT NULL DEFAULT '#6366f1',
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE courses (
  id           SERIAL PRIMARY KEY,
  category_id  INT NOT NULL REFERENCES categories(id),
  slug         TEXT NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT,
  thumbnail_url TEXT,
  tier_target  TEXT DEFAULT 'tier4-5',
  difficulty   INT NOT NULL DEFAULT 1,
  sort_order   INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(category_id, slug)
);

CREATE TABLE lessons (
  id            SERIAL PRIMARY KEY,
  course_id     INT NOT NULL REFERENCES courses(id),
  title         TEXT NOT NULL,
  description   TEXT,
  video_url     TEXT,
  video_id      TEXT,
  duration      INT,
  thumbnail_url TEXT,
  sort_order    INT NOT NULL DEFAULT 0,
  is_free       BOOLEAN NOT NULL DEFAULT false,
  key_points    JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE profiles (
  user_id       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT,
  email         TEXT,
  avatar_url    TEXT,
  creator_tier  TEXT DEFAULT 'tier5',
  interests     TEXT[],
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE watch_history (
  id               SERIAL PRIMARY KEY,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id        INT NOT NULL REFERENCES lessons(id),
  video_id         TEXT,
  progress_seconds INT DEFAULT 0,
  completed        BOOLEAN NOT NULL DEFAULT false,
  watched_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE bookmarks (
  id         SERIAL PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id  INT NOT NULL REFERENCES lessons(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE lesson_notes (
  id         SERIAL PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id  INT NOT NULL REFERENCES lessons(id),
  content    TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_read" ON categories FOR SELECT USING (true);
CREATE POLICY "courses_read" ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "lessons_read" ON lessons FOR SELECT USING (true);

CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "watch_history_select" ON watch_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "watch_history_insert" ON watch_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "watch_history_update" ON watch_history FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_select" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookmarks_insert" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookmarks_delete" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "notes_select" ON lesson_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notes_upsert" ON lesson_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notes_update" ON lesson_notes FOR UPDATE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO categories (slug, name, description, icon, color, sort_order) VALUES
  ('video-production',  'AI動画制作',       'KLING AI・Hailuo等を使ったAI動画生成の基礎から実践', 'Video',      '#DC2626', 1),
  ('image-generation',  'AI画像生成',       'Stable Diffusion・Illustrious XLを使った画像生成',   'Image',      '#2563EB', 2),
  ('editing',           '編集・ポストプロダクション', 'CapCut・DaVinci Resolveでの仕上げ・編集テクニック',    'Scissors',   '#059669', 3),
  ('workflow',          'ワークフロー構築',  'ComfyUI・エージェントを活用した制作パイプライン',      'GitBranch',  '#D97706', 4),
  ('directing',         '演出・ストーリーテリング', '三幕構成・カメラワーク・演出の本質',                   'Clapperboard','#7C3AED', 5),
  ('business',          'ビジネス・マネタイズ', 'フリーランス案件獲得・著作権・クライアントワーク',      'Briefcase',  '#0891B2', 6);
