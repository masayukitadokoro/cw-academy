export interface Lesson {
  id: string;
  title: string;
  desc: string;
  videoId?: string;
  duration?: number;
  isFree?: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  desc: string;
  tierTarget: string;
  difficulty: number;
  lessons: Lesson[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  courses: Course[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'cat-video', slug: 'video-production',
    name: 'AI動画制作', desc: 'KLING AI・Hailuo等を使ったAI動画生成の基礎から実践',
    icon: 'Video', color: '#DC2626',
    courses: [
      {
        id: 'c-kling-basics', slug: 'kling-ai-basics',
        title: 'KLING AI 入門', desc: '初めてのAI動画生成。テキストから動画を作る基本フロー',
        tierTarget: 'tier4-5', difficulty: 1,
        lessons: [
          { id: 'l-001', title: 'KLING AIとは？', desc: 'アカウント作成からUI概要まで', isFree: true },
          { id: 'l-002', title: 'テキストから動画を生成する', desc: 'プロンプトの基本と生成パラメータ' },
          { id: 'l-003', title: '画像から動画を生成する', desc: 'Image-to-Videoの活用テクニック' },
          { id: 'l-004', title: 'カメラワーク指定', desc: 'パン・ティルト・ズームの制御方法' },
        ],
      },
      {
        id: 'c-hailuo-basics', slug: 'hailuo-ai-basics',
        title: 'Hailuo AI 入門', desc: 'Hailuo AIの特徴と使い分け',
        tierTarget: 'tier4-5', difficulty: 1,
        lessons: [
          { id: 'l-010', title: 'Hailuo AIの特徴', desc: 'KLING AIとの違いと使い分け', isFree: true },
          { id: 'l-011', title: '基本的な動画生成', desc: 'テキスト→動画の基本操作' },
        ],
      },
    ],
  },
  {
    id: 'cat-image', slug: 'image-generation',
    name: 'AI画像生成', desc: 'Stable Diffusion・Illustrious XLを使った画像生成',
    icon: 'Image', color: '#2563EB',
    courses: [
      {
        id: 'c-sd-basics', slug: 'stable-diffusion-basics',
        title: 'Stable Diffusion 入門', desc: '画像生成AIの基本を学ぶ',
        tierTarget: 'tier4-5', difficulty: 2,
        lessons: [
          { id: 'l-020', title: 'プロンプトの基本', desc: '良いプロンプトの書き方', isFree: true },
          { id: 'l-021', title: 'ネガティブプロンプト', desc: '品質を上げるためのネガティブプロンプト' },
          { id: 'l-022', title: 'モデル選択', desc: '用途に合ったモデルの選び方' },
        ],
      },
    ],
  },
  {
    id: 'cat-editing', slug: 'editing',
    name: '編集・ポストプロダクション', desc: 'CapCut・DaVinci Resolveでの仕上げ・編集テクニック',
    icon: 'Scissors', color: '#059669',
    courses: [
      {
        id: 'c-capcut', slug: 'capcut-basics',
        title: 'CapCut で仕上げる', desc: 'AI生成素材を実際の動画作品に仕上げる',
        tierTarget: 'tier4-5', difficulty: 1,
        lessons: [
          { id: 'l-030', title: 'CapCut基本操作', desc: 'タイムライン・カット・BGM', isFree: true },
          { id: 'l-031', title: 'AIエフェクト活用', desc: 'CapCut内蔵のAI機能を使いこなす' },
        ],
      },
    ],
  },
  {
    id: 'cat-workflow', slug: 'workflow',
    name: 'ワークフロー構築', desc: 'ComfyUI・エージェントを活用した制作パイプライン',
    icon: 'GitBranch', color: '#D97706',
    courses: [
      {
        id: 'c-comfyui', slug: 'comfyui-intro',
        title: 'ComfyUI 入門', desc: 'ノードベースのワークフロー構築',
        tierTarget: 'tier3', difficulty: 3,
        lessons: [
          { id: 'l-040', title: 'ComfyUIとは', desc: 'インストールとUI基本操作', isFree: true },
          { id: 'l-041', title: '基本ワークフロー', desc: 'txt2img → img2vid の基本フロー' },
        ],
      },
    ],
  },
  {
    id: 'cat-directing', slug: 'directing',
    name: '演出・ストーリーテリング', desc: '三幕構成・カメラワーク・演出の本質',
    icon: 'Clapperboard', color: '#7C3AED',
    courses: [
      {
        id: 'c-story', slug: 'storytelling-basics',
        title: '映像で語るストーリー', desc: '三幕構成・フック設計・感情曲線',
        tierTarget: 'tier3', difficulty: 2,
        lessons: [
          { id: 'l-050', title: '三幕構成の基本', desc: '10秒でも使える構成術', isFree: true },
          { id: 'l-051', title: 'フック設計', desc: '最初の3秒で引き込むテクニック' },
        ],
      },
    ],
  },
  {
    id: 'cat-business', slug: 'business',
    name: 'ビジネス・マネタイズ', desc: 'フリーランス案件獲得・著作権・クライアントワーク',
    icon: 'Briefcase', color: '#0891B2',
    courses: [
      {
        id: 'c-freelance', slug: 'freelance-start',
        title: 'AIクリエイターとして稼ぐ', desc: '案件獲得からクライアント対応まで',
        tierTarget: 'tier3', difficulty: 2,
        lessons: [
          { id: 'l-060', title: 'AIクリエイターの市場概況', desc: '月額相場・需要のある領域', isFree: true },
          { id: 'l-061', title: 'ポートフォリオの作り方', desc: '受注につながるポートフォリオ設計' },
        ],
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getCourseBySlug(categorySlug: string, courseSlug: string): Course | undefined {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.courses.find(c => c.slug === courseSlug);
}

export function getLessonById(lessonId: string): { category: Category; course: Course; lesson: Lesson } | undefined {
  for (const cat of CATEGORIES) {
    for (const course of cat.courses) {
      const lesson = course.lessons.find(l => l.id === lessonId);
      if (lesson) return { category: cat, course, lesson };
    }
  }
  return undefined;
}

export function getTotalLessons(category: Category): number {
  return category.courses.reduce((sum, c) => sum + c.lessons.length, 0);
}
