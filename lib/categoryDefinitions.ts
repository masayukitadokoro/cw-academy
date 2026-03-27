// lib/categoryDefinitions.ts
// CW Academy カテゴリ・コース・レッスン構造定義
// 3セクション構造: 理論 (Foundation) / 実践 (Hands-on) / 応用・ライブ (Live & Community)

// ============================================================
// Types
// ============================================================

export type SectionType = 'theory' | 'practice' | 'applied';

export interface Lesson {
  id: string;
  title: string;
  desc: string;
  videoId?: string;
  duration?: number; // seconds
  isFree?: boolean;
  source?: string; // 元スライド参照 (e.g., "p.381")
  durability?: number; // 耐久性スコア 1-5
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  desc: string;
  tierTarget: string;
  difficulty: number; // 1-5
  lessons: Lesson[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  section: SectionType;
  courses: Course[];
}

export interface LiveContent {
  id: string;
  type: 'live' | 'archive' | 'workshop' | 'update' | 'awards' | 'qa';
  title: string;
  desc: string;
  speaker?: string;
  speakerTier?: string;
  date?: string;
  duration?: number; // minutes
  isFree?: boolean;
  isPremium?: boolean;
  thumbnail?: string;
}

export interface SectionMeta {
  type: SectionType;
  title: string;
  titleEn: string;
  desc: string;
  icon: string;
  tagLabel: string;
  tagColor: string;
}

// ============================================================
// Section Metadata
// ============================================================

export const SECTIONS: SectionMeta[] = [
  {
    type: 'theory',
    title: '理論',
    titleEn: 'Foundation',
    desc: '2〜5年使える「考え方」と「知識」。ツールが変わっても価値が残る',
    icon: '📖',
    tagLabel: '耐久性 ★★★★★',
    tagColor: '#3B82F6',
  },
  {
    type: 'practice',
    title: '実践',
    titleEn: 'Hands-on',
    desc: '実際のツールを使って、作品を作りながら学ぶ。手を動かして理論を定着させる',
    icon: '🛠️',
    tagLabel: 'ツール実装',
    tagColor: '#10B981',
  },
  {
    type: 'applied',
    title: '応用・ライブ',
    titleEn: 'Live & Community',
    desc: 'トップクリエイターの制作実演、最新ツール速報、コミュニティ添削会',
    icon: '⚡',
    tagLabel: 'リアルタイム更新',
    tagColor: '#F59E0B',
  },
];

// ============================================================
// Categories (Theory Section)
// ============================================================

const theoryCategories: Category[] = [
  {
    id: 'cat-copyright-basic',
    slug: 'copyright-basic',
    name: '生成AIと著作権（基礎）',
    desc: '著作権法の考え方から、AI学習・生成・利用の法的枠組み、職務著作まで',
    icon: 'Scale',
    color: '#3B82F6',
    section: 'theory',
    courses: [
      {
        id: 'c-copyright-basic',
        slug: 'copyright-fundamentals',
        title: '生成AIと著作権の基礎',
        desc: 'クリエイターが知るべき著作権法の全体像',
        tierTarget: 'tier3-5',
        difficulty: 2,
        lessons: [
          {
            id: 'l-cb-01', title: '著作権法の基本的な考え方（第一条）',
            desc: '著作権法はなぜ存在するのか。権利保護と著作物の円滑な利用のバランス、文化の発展への寄与という目的を理解する。',
            isFree: true, source: 'p.381', durability: 5,
          },
          {
            id: 'l-cb-02', title: '著作者・著作権者・著作物の定義',
            desc: '著作者≠著作権者の場合がある理由。著作財産権は譲渡可能だが、著作者人格権は譲渡不可。侵害の判断基準（類似性＋依拠性）。',
            source: 'p.382-385', durability: 5,
          },
          {
            id: 'l-cb-03', title: '著作権の全体構造（人格権・財産権・隣接権）',
            desc: '著作者人格権（公表権・氏名表示権・同一性保持権・名誉声望権）、著作財産権、著作隣接権の3つの権利体系を整理。',
            source: 'p.386-387', durability: 5,
          },
          {
            id: 'l-cb-04', title: '職務著作と翻案権',
            desc: '法人が著作者になる4要件（職務著作）と、翻案権（第27条）の考え方。制作会社・スタジオで働くクリエイターに必須の知識。',
            source: 'p.388-390', durability: 5,
          },
          {
            id: 'l-cb-05', title: 'AI学習・生成・利用の3段階と著作権',
            desc: 'データ収集→学習→生成→利用の各段階で、何が法的に許されるのか。著作権30条の4項（情報解析の権利制限）を軸に整理。',
            source: 'p.309, p.350', durability: 5,
          },
          {
            id: 'l-cb-06', title: 'アニメ業界ドメインモデルの権利処理',
            desc: 'アニメ業界特化の基盤モデルを構築する際の権利処理。原作者・制作委員会への必要性の伝え方と合意形成の実践。',
            source: 'p.391-392', durability: 5,
          },
        ],
      },
    ],
  },
  {
    id: 'cat-workflow-theory',
    slug: 'workflow-theory',
    name: 'AI制作ワークフロー実践',
    desc: 'DX vs AI の違い、PoC設計、アニメ制作フローへのAI導入パターン',
    icon: 'RefreshCw',
    color: '#8B5CF6',
    section: 'theory',
    courses: [
      {
        id: 'c-workflow-theory',
        slug: 'ai-workflow-design',
        title: 'AI時代の制作ワークフロー設計',
        desc: 'ツールに依存しない、ワークフロー設計の考え方',
        tierTarget: 'tier3-5',
        difficulty: 2,
        lessons: [
          {
            id: 'l-wt-01', title: 'DX vs AI: 工程効率化と工程変革の違い',
            desc: 'DXは既存工程の効率化、AIは工程そのものが変わる。この本質的な違いを理解することで、AI導入の正しいアプローチが見える。',
            isFree: true, source: 'p.516', durability: 5,
          },
          {
            id: 'l-wt-02', title: 'AI時代のプロジェクト設計（PoC思考）',
            desc: '「考えるより試した方がはやい」。AIによる試作コスト激減を活かしたPoC設計の考え方とテストプロジェクトの位置づけ。',
            source: 'p.514-515', durability: 5,
          },
          {
            id: 'l-wt-03', title: 'アニメ制作の基本フロー（従来型）',
            desc: '企画→脚本→デザイン→絵コンテ→レイアウト→原画→動画→彩色→撮影→編集→完成。各工程のコスト構造と人材配置。',
            isFree: true, source: 'p.547-548', durability: 5,
          },
          {
            id: 'l-wt-04', title: 'AI支援アニメ制作フロー（段階的導入）',
            desc: '従来フローにAIを組み込む3つの段階。第一原画（人+AI）→第二原画（AI）→動画（AI）への移行パターン。',
            source: 'p.517-518, p.549-550', durability: 4,
          },
          {
            id: 'l-wt-05', title: '手書きイラスト→AI化ワークフロー',
            desc: 'スケッチ→depth/canny→AI生成→バリエーション展開。「AIはクリエイターの文房具」を具体例で体感する。',
            source: 'p.509-510', durability: 4,
          },
          {
            id: 'l-wt-06', title: '漫画原作者のためのAI活用',
            desc: '絵を描けない原作者がイメージ通りのキャラデザインをAIで生成する方法。LoRA学習→意図通りの出力の実践。',
            source: 'p.511', durability: 4,
          },
          {
            id: 'l-wt-07', title: 'AI動画生成の課題と対策（プリプロ/ポストプロ）',
            desc: 'チラツキ・ノイズの対処、最新アルゴリズム検証の必要性、アニメ撮影工程との統合方法。',
            source: 'p.512', durability: 4,
          },
          {
            id: 'l-wt-08', title: '並行制作モデルと将来のワークフロー',
            desc: '1話をリファレンスに生成AIモデルを構築→2話以降を並列生産する将来像。従来の直列制作からの転換。',
            source: 'p.519-520', durability: 4,
          },
        ],
      },
    ],
  },
  {
    id: 'cat-ip-strategy',
    slug: 'ip-strategy',
    name: 'IP×生成AI ビジネス戦略',
    desc: 'IPビジネスの変革、マルチメディア展開の新しい形、市場動向と海外事例',
    icon: 'Globe',
    color: '#F59E0B',
    section: 'theory',
    courses: [
      {
        id: 'c-ip-strategy',
        slug: 'ip-ai-business',
        title: 'IP×生成AI ビジネス戦略',
        desc: '生成AIがIPビジネスをどう変えるか',
        tierTarget: 'tier2-4',
        difficulty: 3,
        lessons: [
          {
            id: 'l-ip-01', title: '生成AIによるIPビジネス変革（4軸フレームワーク）',
            desc: '①製作ワークフロー変革 ②マルチメディア展開加速 ③海賊版対応 ④ビッグテック寡占対応。4つの軸でIPビジネスの変化を構造化。',
            isFree: true, source: 'p.513', durability: 5,
          },
          {
            id: 'l-ip-02', title: 'マルチメディア展開: AS-IS vs ToBe',
            desc: '従来：原作→2-5年かけてアニメ化・ゲーム化。将来：Day 1からゲーム・アニメ・漫画・Webtoonを同時グローバル展開。',
            source: 'p.526-527', durability: 5,
          },
          {
            id: 'l-ip-03', title: '海外事例: テンセントのIP化促進',
            desc: 'テンセント傘下の閲文集団。95万作品中IP化わずか0.5%。LLM「閲文妙筆」で創作支援→IP化のスピードを加速する戦略。',
            source: 'p.528-529', durability: 3,
          },
          {
            id: 'l-ip-04', title: '市場概況（ゲーム・アニメ産業）',
            desc: '国内ゲーム市場約2兆円、アニメ産業1.4兆円。市場は拡大中だが供給能力が追いつかない。AI人材の深刻な不足。',
            source: 'p.531', durability: 3,
          },
          {
            id: 'l-ip-05', title: 'IP化の実践: インフルエンサーAI化事例',
            desc: 'くりえみ氏（Instagram 125万人）のAI化事例。教師画像50枚→LoRA作成→写真集・ファッション・コスプレの展開。',
            source: 'p.533', durability: 3,
          },
          {
            id: 'l-ip-06', title: 'AIに求められる4要素（創造性/教育/支援/効率化）',
            desc: 'アニメ生成AIに求められること。①創造性（楽しさ）②教育（学習曲線配慮）③作業サポート（監督視点）④効率化（経営視点）。',
            source: 'p.523', durability: 5,
          },
        ],
      },
    ],
  },
  {
    id: 'cat-ethics',
    slug: 'ai-ethics',
    name: 'AI倫理と著作権（上級）',
    desc: 'EU著作権法、オプトアウト権、クローズ vs OSS vs 民主的AI',
    icon: 'Shield',
    color: '#6366F1',
    section: 'theory',
    courses: [
      {
        id: 'c-ethics',
        slug: 'ai-ethics-advanced',
        title: 'AI倫理と著作権（上級）',
        desc: 'AI時代のクリエイターが理解すべき倫理的課題',
        tierTarget: 'tier2-5',
        difficulty: 3,
        lessons: [
          {
            id: 'l-et-01', title: 'EU著作権法制の基礎（規則/指令/決定）',
            desc: 'EU加盟国における4つの法形式（規則・指令・決定・勧告）。指令を受けて各国で法律が作られる仕組みを理解。',
            isFree: true, source: 'p.501', durability: 5,
          },
          {
            id: 'l-et-02', title: 'オプトアウト権の法的根拠（フランス事例）',
            desc: 'フランス知的財産法典L122-5-3条。著作者の異議申立によりデータ使用を除外できるオプトアウト権。SACEM事例。',
            source: 'p.502', durability: 5,
          },
          {
            id: 'l-et-03', title: '生成AI×著作権: 学習段階 vs 生成/利用段階',
            desc: '学習段階（著作権30条の4項/フェアユース）と生成・利用段階（類似性・依拠性による侵害判断）の法的枠組み。文化庁資料ベース。',
            source: 'p.537-539', durability: 5,
          },
          {
            id: 'l-et-04', title: '独占的AI vs OSS: それぞれの問題点',
            desc: 'クローズドAI（非公開データ、高コスト、オプトアウト不全）vs オープンAI（権利トレース困難、海賊版問題）の構造的課題。',
            source: 'p.568-570', durability: 5,
          },
          {
            id: 'l-et-05', title: '民主的AIの理想像とバランスの取り方',
            desc: 'オプトインデータセット、ドメイン特化学習、業界公共インフラ基盤モデル、Blockchainトレーサビリティ。理想のバランス。',
            source: 'p.571-572', durability: 5,
          },
          {
            id: 'l-et-06', title: 'トレーサビリティ: Blockchain/C2PA',
            desc: 'AIモデルのBlockchain登記、C2PA（メディアデータの来歴証明規格）によるディープフェイク対策。',
            source: 'p.578-580', durability: 4,
          },
          {
            id: 'l-et-07', title: 'OSSコミュニティの課題（リークモデル問題）',
            desc: 'LAION→Stability AI→リークモデル→派生モデルのサプライチェーン問題。企業が安心して商用利用できない構造。',
            source: 'p.581-583', durability: 4,
          },
          {
            id: 'l-et-08', title: 'セキュアモデルの考え方',
            desc: 'オプトインデータで再学習したセキュアモデル。企業が安心して使える基盤を作るAiHUBのアプローチ。',
            source: 'p.584-587', durability: 3,
          },
        ],
      },
    ],
  },
  {
    id: 'cat-model-theory',
    slug: 'model-theory',
    name: 'AI画像生成モデルの仕組みと学習',
    desc: 'Checkpoint、LoRA、ControlNetの原理を理解する。「なぜそう動くか」を知る',
    icon: 'Brain',
    color: '#EC4899',
    section: 'theory',
    courses: [
      {
        id: 'c-model-theory',
        slug: 'ai-model-fundamentals',
        title: 'AI画像生成モデルの仕組みと学習',
        desc: 'ツールの「なぜ」を理解して応用力をつける',
        tierTarget: 'tier3-5',
        difficulty: 3,
        lessons: [
          {
            id: 'l-mt-01', title: 'AI学習の基礎用語（step/epoch/batch）',
            desc: 'batch size、epoch、stepの関係を具体例で解説（1000sample÷4batch=250step）。学習パラメータの意味を直感的に理解。',
            isFree: true, source: 'p.301', durability: 3,
          },
          {
            id: 'l-mt-02', title: 'キャプションデータ作成（選別・セグメンテーション・アノテーション）',
            desc: '学習用画像の選別基準、Meta SAMによるセグメンテーション、wd14-taggerによるアノテーション。データ準備の全体像。',
            source: 'p.302-307', durability: 3,
          },
          {
            id: 'l-mt-03', title: 'Checkpointモデルとは（学習データ・マージ）',
            desc: '数百万枚以上の学習データセット＋キャプションで作られる基盤。モデル同士のマージ（合成）の仕組み。',
            source: 'p.341-343', durability: 4,
          },
          {
            id: 'l-mt-04', title: 'LoRA: 差分学習で好みのテイストを実現する',
            desc: '学習画像−Checkpointモデル＝LoRA（差分学習）。数十枚の画像でモデルの出力をカスタマイズできる革命的技術。',
            source: 'p.344-345', durability: 4,
          },
          {
            id: 'l-mt-05', title: 'ControlNet: 出力をコントロールする技術',
            desc: '正解画像＋ヒント画像＋キャプションの3種データで学習。depth、canny、openposeなどで構図を制御。',
            source: 'p.359', durability: 4,
          },
          {
            id: 'l-mt-06', title: '階層マージとXYプロット: 品質最適化テクニック',
            desc: 'U-net階層レベルでのモデル合成。XYプロットでパラメータ組合せを比較し「ガチャの確率を上げる」。',
            source: 'p.311-313', durability: 3,
          },
          {
            id: 'l-mt-07', title: '基盤モデルの構造と進化（Foundation Model/LAION-5B）',
            desc: 'スタンフォード大が2021年に命名。大量・多様なデータから汎化性能を獲得。CommonCrawl→LAION-5B（58億ペア）の構築過程。',
            source: 'p.346-349', durability: 4,
          },
          {
            id: 'l-mt-08', title: 'VAEモデルの比較と選択',
            desc: '8種類のVAE（kl-f8-anime、ClearVAE等）の出力比較。色味・ディティールの違いと選び方。',
            source: 'p.393-395', durability: 2,
          },
        ],
      },
    ],
  },
];

// ============================================================
// Categories (Practice Section)
// ============================================================

const practiceCategories: Category[] = [
  {
    id: 'cat-video',
    slug: 'video-production',
    name: 'AI動画制作',
    desc: 'KLING AI・Hailuo等を使ったAI動画生成の基礎から実践',
    icon: 'Video',
    color: '#DC2626',
    section: 'practice',
    courses: [
      {
        id: 'c-kling', slug: 'kling-ai-intro',
        title: 'KLING AI 入門', desc: 'KLING AIで10秒のAIショート動画を完成させる',
        tierTarget: 'tier4-5', difficulty: 1,
        lessons: [
          { id: 'l-v-01', title: 'KLING AIとは', desc: 'アカウント作成から最初の動画生成まで。UIの基本操作とクレジットの仕組み。', isFree: true },
          { id: 'l-v-02', title: 'プロンプト設計の基本', desc: '思い通りの動画を生成するためのプロンプトの書き方。英語/日本語の使い分け。' },
          { id: 'l-v-03', title: '画像→動画変換（Image to Video）', desc: 'AI画像生成で作った1枚絵を動画に変換する。モーション指定とカメラワーク。' },
        ],
      },
      {
        id: 'c-hailuo', slug: 'hailuo-intro',
        title: 'Hailuo AI 入門', desc: 'Hailuoの特徴と使い分け',
        tierTarget: 'tier4-5', difficulty: 1,
        lessons: [
          { id: 'l-v-04', title: 'Hailuo AIの特徴', desc: 'KLING AIとの違い、得意なスタイル、生成品質の比較。', isFree: true },
          { id: 'l-v-05', title: 'スタイル別の使い分け', desc: 'アニメ風/実写風/アート風で最適なツールと設定を選ぶ判断基準。' },
        ],
      },
    ],
  },
  {
    id: 'cat-image',
    slug: 'image-generation',
    name: 'AI画像生成',
    desc: 'Stable Diffusion・Illustrious XLを使った画像生成の実践',
    icon: 'Image',
    color: '#2563EB',
    section: 'practice',
    courses: [
      {
        id: 'c-sd', slug: 'stable-diffusion-basics',
        title: 'Stable Diffusion 入門', desc: 'AI画像生成の基本操作を学ぶ',
        tierTarget: 'tier4-5', difficulty: 2,
        lessons: [
          { id: 'l-i-01', title: 'プロンプトの基本', desc: '良いプロンプトの構造。品質タグ、スタイル指定、構図指定の書き方。', isFree: true },
          { id: 'l-i-02', title: 'ネガティブプロンプト', desc: '不要な要素を排除して品質を上げる。よく使うネガティブプロンプトのテンプレート。' },
          { id: 'l-i-03', title: 'モデル選択', desc: 'Illustrious XL、animagine等の特徴と用途別の選び方。CivitAIでのモデル探し方。' },
        ],
      },
    ],
  },
  {
    id: 'cat-editing',
    slug: 'editing',
    name: '編集・ポストプロダクション',
    desc: 'CapCut・DaVinci Resolveでの仕上げ・編集テクニック',
    icon: 'Scissors',
    color: '#059669',
    section: 'practice',
    courses: [
      {
        id: 'c-capcut', slug: 'capcut-basics',
        title: 'CapCut で仕上げる', desc: 'AI生成素材を実際の動画作品に仕上げる',
        tierTarget: 'tier4-5', difficulty: 1,
        lessons: [
          { id: 'l-e-01', title: 'CapCut基本操作', desc: 'タイムライン・カット・BGM挿入・テロップの基本。AI生成素材の読み込みと配置。', isFree: true },
          { id: 'l-e-02', title: 'AIエフェクト活用', desc: 'CapCut内蔵のAIエフェクト・フィルターを使いこなす。トランジション設計。' },
        ],
      },
    ],
  },
  {
    id: 'cat-directing',
    slug: 'directing',
    name: '演出・ストーリーテリング',
    desc: '三幕構成・カメラワーク・演出の本質。技術+αの表現力',
    icon: 'Clapperboard',
    color: '#7C3AED',
    section: 'practice',
    courses: [
      {
        id: 'c-story', slug: 'storytelling-basics',
        title: '映像で語るストーリー', desc: '10秒のショート動画でも使える構成・演出術',
        tierTarget: 'tier3-4', difficulty: 2,
        lessons: [
          { id: 'l-d-01', title: '三幕構成の基本', desc: '起承転結を超える映像構成術。10秒チャレンジでも使えるフレームワーク。', isFree: true },
          { id: 'l-d-02', title: 'フック設計', desc: '最初の3秒で引き込む。スクロールを止めさせるオープニングの型。' },
          { id: 'l-d-03', title: 'カメラワークの基本', desc: 'パン、ティルト、ズーム。AI動画生成のプロンプトでカメラワークを指定する方法。' },
        ],
      },
    ],
  },
  {
    id: 'cat-workflow-practice',
    slug: 'workflow',
    name: 'ワークフロー構築',
    desc: 'ComfyUI・エージェントを活用した制作パイプラインの構築',
    icon: 'GitBranch',
    color: '#D97706',
    section: 'practice',
    courses: [
      {
        id: 'c-comfyui', slug: 'comfyui-intro',
        title: 'ComfyUI 入門', desc: 'ノードベースのワークフロー構築',
        tierTarget: 'tier3-4', difficulty: 3,
        lessons: [
          { id: 'l-w-01', title: 'ComfyUIとは', desc: 'インストールから基本UI操作まで。なぜComfyUIが制作現場で使われるのか。', isFree: true },
          { id: 'l-w-02', title: '基本ワークフロー', desc: 'txt2img→img2img→img2vidの基本フロー。ノードの繋ぎ方と出力の確認。' },
        ],
      },
    ],
  },
  {
    id: 'cat-architecture',
    slug: 'architecture-ai',
    name: '建築×AI画像生成 実践',
    desc: '建築パース・内装・外装をAIで生成する。ドメイン特化コース',
    icon: 'Building',
    color: '#0EA5E9',
    section: 'practice',
    courses: [
      {
        id: 'c-arch', slug: 'architecture-ai-practice',
        title: '建築×AI画像生成 実践', desc: 'AI建築デザイナー YUiCHI氏による特化コース',
        tierTarget: 'tier3-5', difficulty: 2,
        lessons: [
          {
            id: 'l-a-01', title: '建築で重要な3つのモデル（料理のたとえ）',
            desc: '食材=Checkpoint（必須）、スパイス=LoRA（テイスト付加）、レシピ=ControlNet（出来栄えコントロール）。建築向けの直感的理解。',
            isFree: true, source: 'p.351-355', durability: 4,
          },
          {
            id: 'l-a-02', title: '基盤/追加学習/LoRAモデルの効果比較',
            desc: '建築外装のSeed固定比較。基盤=ただの箱→追加学習=ディティール出現→LoRA=病院特化の段階的品質向上。',
            source: 'p.329-338', durability: 3,
          },
          {
            id: 'l-a-03', title: 'LoRAによるドメイン特化（病院/アニメ風）',
            desc: '病院特化LoRAで日本の病室特徴を学習。アニメ風LoRAで廃墟建築を画風変換。ドメイン適応の実践。',
            source: 'p.334-338', durability: 3,
          },
          {
            id: 'l-a-04', title: 'ControlNetによる建築パース生成',
            desc: 'ボリュームスタディ（3Dマス）→建築外装パース、スケルトン→内装パース、スケッチ→パースの変換実践。',
            source: 'p.356-363', durability: 3,
          },
          {
            id: 'l-a-05', title: 'ドメインデータの重要性とデータ戦略',
            desc: 'WWW/デジタル化ドメインデータ/アナログドメインデータの3層構造。非公開データが生む競争優位。',
            source: 'p.339', durability: 4,
          },
        ],
      },
    ],
  },
];

// ============================================================
// Live & Applied Content
// ============================================================

export const LIVE_CONTENTS: LiveContent[] = [
  {
    id: 'live-01', type: 'live',
    title: 'AIバーチャルヒューマンの作り方 — 270万フォロワーの裏側',
    desc: 'くりえみ氏によるAI×インフルエンサーの制作実演とQ&A',
    speaker: 'くりえみ', speakerTier: 'Top', duration: 75, isFree: true,
  },
  {
    id: 'live-02', type: 'archive',
    title: 'SF短編ショートフィルムの作り方 — 企画から完成まで',
    desc: '平田茉莉花氏が制作プロセスを全公開。企画→プロンプト→編集の流れ',
    speaker: '平田茉莉花', speakerTier: 'Top', duration: 120, isPremium: true,
  },
  {
    id: 'live-03', type: 'workshop',
    title: '背景美術の極意 — AIで世界観を構築する',
    desc: '箱庭氏による背景生成のライブ実演。ControlNet活用テクニック',
    speaker: '箱庭', speakerTier: 'Top', duration: 90, isFree: true,
  },
  {
    id: 'live-04', type: 'update',
    title: '最新ツールアップデート速報',
    desc: 'KLING AI / Hailuo / ComfyUI等の新機能をプロが検証した「使える/使えない」の速報',
  },
  {
    id: 'live-05', type: 'awards',
    title: 'Kuriemi Awards 入賞作品 制作過程解説',
    desc: 'グランプリ作品のメイキング。使用ツール・プロンプト・ワークフローをすべて公開',
  },
  {
    id: 'live-06', type: 'qa',
    title: 'コミュニティ Q&A・作品添削会',
    desc: 'あなたの作品を講師がリアルタイムでレビュー。改善ポイントを具体的にフィードバック',
  },
];

// ============================================================
// Aggregated exports
// ============================================================

export const CATEGORIES: Category[] = [...theoryCategories, ...practiceCategories];

export function getCategoriesBySection(section: SectionType): Category[] {
  return CATEGORIES.filter(c => c.section === section);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getCourseBySlug(categorySlug: string, courseSlug: string): Course | undefined {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.courses.find(c => c.slug === courseSlug);
}

export function getTotalLessons(cat: Category): number {
  return cat.courses.reduce((sum, c) => sum + c.lessons.length, 0);
}

export function getTotalLessonsAll(): number {
  return CATEGORIES.reduce((sum, cat) => sum + getTotalLessons(cat), 0);
}

export function getTotalCourses(): number {
  return CATEGORIES.reduce((sum, cat) => sum + cat.courses.length, 0);
}

export function getSectionMeta(section: SectionType): SectionMeta | undefined {
  return SECTIONS.find(s => s.type === section);
}
