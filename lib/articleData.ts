// lib/articleData.ts
// CW Academy ニュース記事データ

export type ArticleCategory = 'tool-update' | 'industry-news' | 'tutorial' | 'creator-story';

export const CATEGORY_META: Record<ArticleCategory, { label: string; color: string; bg: string }> = {
  'tool-update':   { label: 'ツールアップデート', color: '#2563eb', bg: '#eff6ff' },
  'industry-news': { label: '業界ニュース',       color: '#7c3aed', bg: '#f5f3ff' },
  'tutorial':      { label: 'チュートリアル',     color: '#059669', bg: '#ecfdf5' },
  'creator-story': { label: 'クリエイター事例',   color: '#ea580c', bg: '#fff7ed' },
};

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;           // Markdown-ish plain text
  category: ArticleCategory;
  thumbnail: string;      // placeholder gradient
  publishedAt: string;    // ISO date
  source: string;
  readMin: number;
}

export const articles: Article[] = [
  // ── ツールアップデート ──────────────────────────
  {
    id: 'a01',
    slug: 'kling-3-0-all-in-one',
    title: 'KLING AI 3.0 正式リリース — "All in One"マルチショット生成でAI映像制作が変わる',
    excerpt: 'Kuaishouが3.0を公開。AIディレクターによるマルチショット自動演出、ネイティブ音声同期、4K出力が1つのモデルに統合された。',
    category: 'tool-update',
    thumbnail: 'linear-gradient(135deg, #1e3a5f, #3b82f6)',
    publishedAt: '2026-03-26',
    source: 'KLING AI公式',
    readMin: 5,
    body: `Kuaishou Technologyは3月26日、AI動画生成モデル「KLING 3.0」を正式リリースした。

## 主な新機能

**AIディレクターモード（vCoT）**
最大の目玉は「Visual Chain-of-Thought」と呼ばれるAIディレクターシステムだ。テキストで書いたシナリオから、カメラアングルの切り替え（ショット/リバースショット）やシーントランジションを自動で生成する。1回の推論で最大15秒のマルチショット映像を出力できる。

**ネイティブ音声生成の統合**
2.6で導入された音声同期がさらに進化。日本語・英語・中国語のダイアログ、環境音、効果音を映像と完全同期で生成する。従来の「無声映画問題」が完全に解消された。

**4K出力対応**
解像度が4K（3840×2160）まで対応。静止画生成のKOLORS 3.0もImage 3.0として統合され、テキスト→画像→動画のワンストップ制作が可能に。

## クリエイターへの影響

これまでAI動画制作は「画像生成→動画化→音声追加→編集」と複数ツールをまたぐ必要があった。3.0の統合により、1つのプラットフォームで企画から完パケまでを完結できる可能性が出てきた。

特にTier 3-4のクリエイターにとって、マルチショット生成は「1カットずつ作って繋ぐ」という最大のボトルネックを解消するゲームチェンジャーだ。

## 料金体系

API料金は2.6と同水準を維持。Pro版は5秒あたり約$0.07で、商用利用ライセンスも含まれる。`,
  },
  {
    id: 'a02',
    slug: 'kling-2-6-native-audio',
    title: 'KLING AI 2.6 の音声同期がもたらす「サイレント映画の終焉」',
    excerpt: '動画と音声を1パスで同時生成。日英中3言語の対話、歌唱、環境音をフレーム単位で同期する。',
    category: 'tool-update',
    thumbnail: 'linear-gradient(135deg, #0f172a, #6366f1)',
    publishedAt: '2026-03-24',
    source: 'Atlas Cloud',
    readMin: 4,
    body: `KLING AI 2.6がもたらした最大の変化は、動画と音声の同時生成だ。

## ネイティブオーディオとは

従来のAI動画生成は「無声映画」だった。映像を生成した後、別ツールで音声を付ける2ステップが必要だった。KLING 2.6はこれを1パスに統合。テキストプロンプトから映像・音声・効果音を同時に生成する。

## 対応する音声モダリティ

- 日本語・英語・中国語の自然な対話
- 歌唱（ラップを含む）
- 環境音・効果音
- 複数キャラクターの同時会話

## モーションコントロールの進化

2.6ではモーション品質も大幅に向上。ブラインドテストでWan 2.2に対して76%の勝率、Runwayに対しては94%の勝率を記録。手指の表現、微表情、身体のプロポーション維持が劇的に改善された。

## 価格

5秒動画あたりの生成コストが前バージョン比30%ダウン。月50本以上の動画制作を行うMCNやスタジオにとって、年間で大幅なコスト削減になる。`,
  },
  {
    id: 'a03',
    slug: 'hailuo-video-agent-beta',
    title: 'Hailuo Video Agent ベータ公開 — テキスト1行から完成動画を自動生成',
    excerpt: 'MiniMaxが"Vibe Videoing"をコンセプトにしたVideo Agentを発表。スクリプト→画像→動画→音声を1クリックで完結。',
    category: 'tool-update',
    thumbnail: 'linear-gradient(135deg, #1a1a2e, #e94560)',
    publishedAt: '2026-03-27',
    source: 'MiniMax公式',
    readMin: 4,
    body: `MiniMaxは3月27日、Hailuo Video Agentのベータ版を公開した。

## "Vibe Videoing"とは

「テキストを入力するだけで、企画→スクリプト→画像生成→動画化→音声合成→編集を全自動で実行する」というコンセプト。従来のノードベースのワークフローではなく、LLMベースのツール呼び出しにより、自然言語だけで映像制作を完結させる。

## 3段階のロードマップ

1. **Stage 1（現在）**: プリビルトテンプレートによる1クリック動画生成
2. **Stage 2**: 制作パイプラインの各ステップを個別に編集可能
3. **Stage 3**: 完全自律型エンドツーエンドAgent

## Hailuo 2.3との連携

同時に発表されたHailuo 2.3モデルは、物理的な身体動作の精度が大幅に向上。アニメ、水墨画、ゲームCGなどのスタイライズにも対応し、Hailuo 02と同価格で「量より質」を実現。

## 実用例

30秒のブランド広告をVideo Agentで試作したデモでは、シーン設計・カラートーン・カメラスタイル・BGMを指定するだけで、商用レベルの映像が生成された。`,
  },
  {
    id: 'a04',
    slug: 'comfyui-app-mode-launch',
    title: 'ComfyUI App Modeが革命的 — ノードグラフ不要でAI画像・動画生成が誰でも使える時代へ',
    excerpt: 'GDCで発表されたApp Modeは、複雑なノードグラフをシンプルなUIに変換。ComfyHubでワークフローの共有・販売も可能に。',
    category: 'tool-update',
    thumbnail: 'linear-gradient(135deg, #064e3b, #10b981)',
    publishedAt: '2026-03-10',
    source: 'NVIDIA / ComfyUI',
    readMin: 6,
    body: `ComfyUIチームは3月10日のGDCで、App Mode、App Builder、ComfyHubを発表した。

## App Modeとは

ノードグラフを「アプリ」に変換する機能。ユーザーはプロンプト入力、パラメータ調整、生成ボタンだけのシンプルなUIで操作できる。Node Viewとの切り替えもワンクリック。

## なぜこれが重要か

ComfyUIは最も柔軟なAI画像/動画生成ツールだが、ノードグラフのUIが「90%のユーザーを門前払い」していた。App Modeにより、技術的なハードルが一気に下がる。

## NVIDIAとの連携

RTX GPUでの最適化も同時発表。NVFP4フォーマットにより、RTX 50シリーズで2.5倍の高速化、60%のVRAM削減を実現。ローカル環境でのAI動画生成がより身近になった。

## ComfyHub

作成したApp Modeワークフローを共有・販売できるマーケットプレイス。クリエイターは自分のワークフローを「アプリ」として配布できる。

## V3スキーマ

カスタムノードの新アーキテクチャ「V3」も並行して進行中。ステートレス実行、プロセス分離、TypeScript型安全性により、エコシステムの安定性が大幅に向上する見込み。`,
  },
  {
    id: 'a05',
    slug: 'hailuo-2-3-media-agent',
    title: 'Hailuo 2.3 + Media Agent — MiniMaxが掲げる「会話で映像を作る」未来',
    excerpt: 'Video AgentがMedia Agentに進化。画像・動画・音声のマルチモーダル制作を自然言語で統合管理。',
    category: 'tool-update',
    thumbnail: 'linear-gradient(135deg, #4a1942, #c74b50)',
    publishedAt: '2026-03-27',
    source: 'MiniMax公式',
    readMin: 5,
    body: `MiniMaxはHailuo 2.3の発表と同時に、Video AgentをMedia Agentへと進化させた。

## Hailuo 2.3の改善点

- 物理動作の精度向上：複雑な身体動作がより自然に
- スタイライズの拡張：アニメ、イラスト、水墨画、ゲームCGに対応
- キャラクターの微表情がよりリアルに
- 価格はHailuo 02と同水準（"同じ値段でより高品質"）

## Media Agentとは

従来のVideo Agentが動画特化だったのに対し、Media Agentは画像・動画・音声を統合的に扱う。テキストで制作したい内容を入力すると、最適なモデルを自動選択して「1クリック動画生成」を実現する。

プロフェッショナル向けには、ステップバイステップモードで画像・動画・音声を個別にカスタマイズすることも可能。

## クリエイターにとっての意味

「会話で映像を作る」というビジョンは、特にTier 4-5の初心者クリエイターにとって革命的。複雑なツール操作を覚える必要なく、アイデアをそのまま映像化できる未来が近づいている。`,
  },
  {
    id: 'a06',
    slug: 'wan-2-2-open-source',
    title: 'Wan 2.2 オープンソース公開 — MoEアーキテクチャでビデオ生成品質が大幅向上',
    excerpt: 'Alibaba WANチームがMoEベースの新モデルを公開。ComfyUIネイティブサポート済みで即座に利用可能。',
    category: 'tool-update',
    thumbnail: 'linear-gradient(135deg, #1e1b4b, #818cf8)',
    publishedAt: '2026-03-15',
    source: 'ComfyUI Wiki',
    readMin: 4,
    body: `WANチームがWan 2.2のオープンソース版をリリースした。

## MoEアーキテクチャの採用

Mixture-of-Experts（MoE）アーキテクチャにより、計算効率を維持しながら生成品質を大幅に向上。テキスト→ビデオ、画像→ビデオの両方で顕著な改善が見られる。

## ComfyUIネイティブサポート

公開と同時にComfyUIでのネイティブサポートが完了。ノード1つ追加するだけで、既存のワークフローにWan 2.2を組み込める。

## 競合との位置づけ

KLING 2.6とのブラインドテストでは善戦するも、特にモーションコントロールの精度でKLINGに軍配。ただしオープンソースという点は大きなアドバンテージで、カスタマイズ性やローカル実行を重視するクリエイターには最適な選択肢。

## ダウンロードと利用

HuggingFaceおよびModelScopeからダウンロード可能。ライセンスは商用利用可。`,
  },
  {
    id: 'a07',
    slug: 'seedance-2-0-turbo-draft',
    title: 'Seedance 2.0 の "Turbo Draft" — 生成速度30-40%向上で大量制作の新基準に',
    excerpt: 'ByteDanceのSeedanceが2.0に。高速化により1日50本以上のバッチ制作が現実的に。',
    category: 'tool-update',
    thumbnail: 'linear-gradient(135deg, #1a1a1a, #f59e0b)',
    publishedAt: '2026-03-20',
    source: 'ByteDance',
    readMin: 3,
    body: `ByteDanceが開発するAI動画生成モデル「Seedance」が2.0にアップデートされた。

## Turbo Draftモード

最大の特徴は30-40%の生成速度向上を実現する「Turbo Draft」モード。品質を維持しながら、バッチ制作のコストを最大50%削減する。

## ユースケース

MCNや広告代理店など、1日に数十本の動画を制作する大量生産ニーズに特化。「量を出して高速にA/Bテストする」というモダンなクリエイティブ運用に最適化されている。

## KLINGとの差別化

KLING 3.0が「品質と統合性」に注力するのに対し、Seedance 2.0は「スピードとコスト効率」に振り切った戦略。用途によって使い分けるのが2026年のベストプラクティスになりそうだ。`,
  },

  // ── 業界ニュース ──────────────────────────
  {
    id: 'a08',
    slug: 'ai-video-2026-landscape',
    title: '2026年AI動画生成の勢力図 — Sora 2 vs KLING 3.0 vs Wan 2.2、何が違う？',
    excerpt: '三つ巴の競争が激化。物理シミュレーション、コスト、オープンソースの3軸で比較する。',
    category: 'industry-news',
    thumbnail: 'linear-gradient(135deg, #312e81, #c084fc)',
    publishedAt: '2026-03-22',
    source: 'CW Academy編集部',
    readMin: 7,
    body: `2026年のAI動画生成市場は、3つの巨頭による三つ巴の戦いとなっている。

## OpenAI Sora 2
- 強み：物理シミュレーションの精度、映画的リアリズム
- 弱み：価格が高い、クローズドソース、APIの制限
- 向いている用途：ハイエンドCM、映画のコンセプトアート

## Kuaishou KLING 3.0
- 強み：All-in-One統合、音声同期、マルチショット演出
- 弱み：中国企業への抵抗感（一部市場）
- 向いている用途：SNS動画、広告、教育コンテンツ

## Alibaba Wan 2.2
- 強み：オープンソース、カスタマイズ性、ローカル実行
- 弱み：モーションコントロールでKLINGに劣る
- 向いている用途：カスタムワークフロー、研究開発、コスト重視

## クリエイターへの提言

「1つのモデルに全賭け」は危険。用途に応じて使い分け、ComfyUIのようなオーケストレーションツールで複数モデルを組み合わせるのが2026年の最適解だ。`,
  },
  {
    id: 'a09',
    slug: 'japan-ai-copyright-guidelines-2026',
    title: '文化庁が生成AI著作権ガイドラインを改定 — クリエイターが知るべき5つのポイント',
    excerpt: '2026年改定版では「AI学習と著作権」「生成物の著作物性」の判断基準がより明確に。実務への影響を解説。',
    category: 'industry-news',
    thumbnail: 'linear-gradient(135deg, #4c1d95, #8b5cf6)',
    publishedAt: '2026-03-18',
    source: 'CW Academy編集部',
    readMin: 6,
    body: `文化庁は2026年3月、生成AIと著作権に関するガイドラインの改定版を公開した。

## 5つの重要ポイント

### 1. AI学習目的の著作物利用
著作権法30条の4の適用範囲がより具体的に。「享受目的」の判断基準として、生成物が既存著作物の「創作的表現」を再現する場合は権利侵害となりうることが明確化された。

### 2. 生成物の著作物性
AIが自律的に生成したものは著作物ではないが、人間の「創作的寄与」が認められる場合は著作物となりうる。プロンプトの工夫だけでは不十分で、生成後の選択・編集・加工のプロセスが重要。

### 3. LoRA/ファインチューニング
特定のアーティストのスタイルを学習させたLoRAの利用は、「享受目的」に該当する可能性が高いと指摘。

### 4. 商用利用時の注意
商用利用の場合、より厳格な基準が適用される可能性。クライアントワークでは権利処理の証跡を残すことが推奨。

### 5. 今後のスケジュール
パブリックコメントを経て、2026年夏に正式版を公開予定。

## クリエイターの実務への影響

Academyの著作権コースでは、このガイドラインに準拠した実務的な判断フレームワークを提供している。特に「どこまでがOKか」の判断に迷うケースを具体例で解説する。`,
  },
  {
    id: 'a10',
    slug: 'ai-creator-market-size-2026',
    title: 'AIクリエイター市場規模が2026年で1兆円突破見込み — Tier 3-4が牽引',
    excerpt: '矢野経済研究所の推計。動画生成ツール市場の急成長により、フリーランスAIクリエイターの需要が急増。',
    category: 'industry-news',
    thumbnail: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)',
    publishedAt: '2026-03-12',
    source: '矢野経済研究所',
    readMin: 5,
    body: `矢野経済研究所は、2026年の日本国内AIクリエイター関連市場の規模が1兆円を超える見通しであることを発表した。

## 内訳

- AIツール・プラットフォーム市場：約3,500億円（前年比180%）
- AI活用コンテンツ制作市場：約4,200億円（前年比150%）
- AIクリエイター教育・人材市場：約2,500億円（前年比200%）

## Tier 3-4が市場を牽引

最も成長が著しいのは「セミプロ・初中級層」（Tier 3-4）。副業クリエイターとして企業案件を受注するフリーランスが急増しており、クラウドソーシングプラットフォームでのAI関連案件数は前年比3倍に。

## 企業側の需要

広告代理店、Webtoon企業、ゲーム会社からのAIクリエイター需要が急増。特に「プロジェクト単位で柔軟に人員を確保したい」というニーズが強く、フルタイム採用ではなくフリーランス活用にシフトしている。

## 課題

スキルの可視化と品質保証が未整備。「AIが使える」の定義が曖昧で、採用ミスマッチが頻発している。`,
  },
  {
    id: 'a11',
    slug: 'minimax-series-d-funding',
    title: 'MiniMax（Hailuo AI）がシリーズDで10億ドル調達 — AI動画の覇権争い激化',
    excerpt: '評価額は80億ドル超。Hailuoの急成長を背景に、開発投資をさらに加速。',
    category: 'industry-news',
    thumbnail: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
    publishedAt: '2026-03-05',
    source: 'TechCrunch',
    readMin: 4,
    body: `MiniMaxがシリーズDラウンドで10億ドルの資金調達を完了した。

## 調達の背景

Hailuo AIの急成長が最大の要因。月間アクティブユーザー数は前年比5倍に成長し、特にアジア市場での伸びが顕著。Video AgentやMedia Agentといった「AIエージェント型映像制作」のビジョンが投資家から高い評価を受けた。

## 資金の使途

- Hailuo 3.0モデルの開発
- グローバル展開（日本市場を含む）
- Media Agentのフルバージョン開発
- 開発者向けAPIプラットフォームの強化

## 日本市場への影響

MiniMaxは日本市場を重点地域と位置づけており、日本語対応の強化やローカルパートナーシップの拡大を予定。AiHUBのようなクリエイターコミュニティとの連携も視野に入っている。`,
  },
  {
    id: 'a12',
    slug: 'ua-creative-ai-mobile-gaming',
    title: 'モバイルゲームUA広告の50%がAI制作に — 2026年末までの予測',
    excerpt: 'ComfyUIワークフローによる自動化が鍵。中国のゲームスタジオが先行する「AI UA革命」の全貌。',
    category: 'industry-news',
    thumbnail: 'linear-gradient(135deg, #3f3f46, #a1a1aa)',
    publishedAt: '2026-03-14',
    source: 'Tenjin',
    readMin: 5,
    body: `モバイルゲーム業界で、AIによるクリエイティブ自動生成が急速に浸透している。

## 現状

ゲーム業界アナリストの予測によれば、2026年末までにUA（ユーザー獲得）広告クリエイティブの約50%がAIで制作されるか、AIの要素を含むものになるという。

## 中国スタジオの先行事例

中国のモバイルゲームスタジオでは、ComfyUIベースのワークフローにより、追加人員なしでUA規模を10倍に拡大した事例が報告されている。週に数百本の広告クリエイティブをテストし、パフォーマンスデータに基づいて高速にイテレーションする手法だ。

## ComfyUIの役割

基本画像の生成 → 動画化（Veo 3, KLING等）→ テキストオーバーレイ → A/Bテスト配信という一連のパイプラインをComfyUIのノードグラフで自動化。App Modeの登場により、非エンジニアでもこのワークフローを実行できるようになった。

## 日本市場の課題

日本のゲーム会社はこの分野で遅れを取っている。言語の壁とComfyUIの学習コストが障壁だが、日本語チュートリアルやAcademyのようなプログラムが普及すれば急速にキャッチアップすると見られる。`,
  },

  // ── チュートリアル ──────────────────────────
  {
    id: 'a13',
    slug: 'kling-26-motion-control-tutorial',
    title: '【実践】KLING 2.6 モーションコントロール完全ガイド — スマホ動画から高品質アニメーションを作る',
    excerpt: 'リファレンス動画1本からキャラクターを自在に動かす方法を、ステップバイステップで解説。',
    category: 'tutorial',
    thumbnail: 'linear-gradient(135deg, #14532d, #22c55e)',
    publishedAt: '2026-03-21',
    source: 'CW Academy',
    readMin: 8,
    body: `KLING 2.6のモーションコントロール機能を使って、スマホで撮影した動画からAIアニメーションを制作する方法を解説する。

## 準備するもの

- KLING AIアカウント（Pro以上推奨）
- リファレンス動画（スマホ撮影でOK）
- ベース画像（キャラクターイラスト or 写真）

## ステップ1: リファレンス動画の撮影

ポイントは「動きをはっきりと」。背景はシンプルに、照明は均一に。ダンス動画がベストだが、ウォーキングや手振りでもOK。

## ステップ2: ベース画像の準備

キャラクターは全身が見えるポーズが推奨。AIがリファレンス動画のモーションをマッピングする「見えないMoCap」として機能する。

## ステップ3: KLING 2.6での生成

Image-to-Video モードを選択し、ベース画像をアップロード。リファレンス動画を「Motion Reference」として追加。プロンプトでスタイルや環境を指定する。

## ステップ4: 音声の追加

2.6のネイティブオーディオ機能を使って、環境音やBGMを同時生成。手動で追加する場合は、タイムライン上で同期を調整。

## Tips

- 手指の表現はKLING 2.6の得意分野。あえて手の動きが多いリファレンスを選ぶと、他モデルとの差が出やすい
- 1080pでの生成を推奨。4K出力は3.0で対応
- 生成結果が期待と異なる場合、プロンプトよりリファレンス動画の質を見直す方が効果的`,
  },
  {
    id: 'a14',
    slug: 'comfyui-first-workflow-2026',
    title: '【入門】ComfyUI 2026年版 初心者ガイド — App Modeで始めるAI画像生成',
    excerpt: 'ノードグラフを知らなくてもOK。App Modeで「使うだけ」から始めて、徐々にノード編集に進む学習パス。',
    category: 'tutorial',
    thumbnail: 'linear-gradient(135deg, #052e16, #4ade80)',
    publishedAt: '2026-03-16',
    source: 'CW Academy',
    readMin: 10,
    body: `ComfyUIを使ったことがない人のための、2026年版スタートガイド。

## なぜComfyUIなのか

- 無料・オープンソース
- 最も柔軟なAI画像/動画生成ツール
- KLING, Wan, FLUX, LTXなど主要モデルをすべてサポート
- App Modeで初心者にも使いやすくなった

## インストール

### デスクトップ版（推奨）
ComfyUI公式サイトからデスクトップアプリをダウンロード。Windows/Mac対応。インストーラーが必要な環境を自動セットアップ。

### ポータブル版
Pythonに詳しい人向け。GitHubからクローンして手動セットアップ。

## App Modeで最初の画像を生成

1. ComfyUIを起動
2. 画面上部のトグルで「App Mode」に切り替え
3. テンプレートから「Text to Image」を選択
4. プロンプトを入力して「Generate」
5. 完成！

## 次のステップ

App Modeに慣れたら、「Node View」に切り替えてノードグラフを見てみよう。最初は怖く見えるが、実は「プロンプト→モデル→画像保存」の3ノードだけで動いている。

## おすすめの学習順序

1. App Modeで生成に慣れる（1日目）
2. Node Viewで基本ノードを理解する（2-3日目）
3. ControlNetを使った構図制御（1週間目）
4. LoRAを使ったスタイル制御（2週間目）
5. 動画生成ワークフローの構築（1ヶ月目）`,
  },
  {
    id: 'a15',
    slug: 'ai-video-ad-production-workflow',
    title: '【実践】AI動画広告を30分で作る方法 — KLING + Hailuo + CapCutの組み合わせ',
    excerpt: '広告代理店向け。企画→生成→編集→納品までの最速ワークフローを公開。',
    category: 'tutorial',
    thumbnail: 'linear-gradient(135deg, #1c1917, #78716c)',
    publishedAt: '2026-03-08',
    source: 'CW Academy',
    readMin: 7,
    body: `15秒のSNS動画広告を、AIツールだけで30分以内に制作するワークフローを紹介する。

## 使用ツール

- KLING AI 2.6（メイン映像生成）
- Hailuo AI（サブカット生成）
- CapCut（編集・テロップ）

## ワークフロー

### フェーズ1: 企画（5分）
広告の構成を決める。推奨は「フック（3秒）→ 商品紹介（7秒）→ CTA（5秒）」の3パート構成。

### フェーズ2: 素材生成（15分）
- KLING 2.6でメインカットを3-5パターン生成（音声付き）
- Hailuoでバリエーションカットを2-3パターン生成
- 最も良いカットを選定

### フェーズ3: 編集（10分）
- CapCutに読み込み
- カット編集、テロップ追加
- BGM調整（KLINGの自動音声 or 手動追加）
- 書き出し

## コスト

APIコスト合計で約500-1,000円。従来の動画制作会社に発注すれば10-50万円かかる工程が、ほぼゼロコストで実現できる。

## 注意点

生成AIの映像であることをクライアントに事前に伝えること。著作権リスクの確認も忘れずに。`,
  },
  {
    id: 'a16',
    slug: 'prompt-engineering-ai-video-2026',
    title: '【保存版】AI動画プロンプトの書き方 2026年版 — KLING, Hailuo, Wan対応',
    excerpt: 'モデルごとの癖を理解して、狙い通りの映像を1発で出す。テンプレート付き。',
    category: 'tutorial',
    thumbnail: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
    publishedAt: '2026-03-03',
    source: 'CW Academy',
    readMin: 8,
    body: `AI動画生成で最も重要なのがプロンプト設計。モデルごとの特性を理解して、効率的に高品質な映像を生成する方法を解説する。

## プロンプトの基本構造

### 推奨フォーマット
[被写体] + [アクション] + [環境・照明] + [カメラワーク] + [スタイル]

### 例
"A young woman in a white dress walks slowly through a sunlit bamboo forest, soft golden hour light filtering through leaves, tracking shot following from behind, cinematic film grain, anamorphic lens flare"

## モデル別の特性

### KLING 2.6 / 3.0
- シーケンシャルアクションに強い（「AしてからBする」が通じる）
- カメラワーク指定の精度が高い
- ネガティブプロンプト対応

### Hailuo 2.3
- 物理シミュレーションが得意（水、煙、髪、布）
- スタイライズ指定が効きやすい（"anime style", "ink wash painting"）
- 短めのプロンプトの方が良い結果が出る傾向

### Wan 2.2
- 詳細なプロンプトほど効く
- ComfyUI経由でControlNetとの組み合わせが強力
- ローカル実行なのでイテレーションが高速

## テンプレート集

本記事の末尾に、用途別（広告、MVPコンセプト、教育コンテンツ、SNSショート）のプロンプトテンプレートを用意している。`,
  },

  // ── クリエイター事例 ──────────────────────────
  {
    id: 'a17',
    slug: 'interview-hakoniwa-ai-creator',
    title: '箱庭氏インタビュー — フォロワー50万人のAIクリエイターが語る「質と量のバランス」',
    excerpt: '月200本以上のAI動画を制作する箱庭氏の制作環境、ワークフロー、マネタイズの全貌。',
    category: 'creator-story',
    thumbnail: 'linear-gradient(135deg, #431407, #ea580c)',
    publishedAt: '2026-03-19',
    source: 'CW Academy',
    readMin: 8,
    body: `SNSで50万人以上のフォロワーを持つAIクリエイター・箱庭氏に、制作の裏側を聞いた。

## プロフィール

- 活動開始: 2024年
- メインプラットフォーム: X (Twitter), YouTube
- 使用ツール: ComfyUI, KLING AI, Stable Diffusion, Hailuo
- 月間制作本数: 200本以上

## 制作環境

自宅にRTX 4090搭載のデスクトップを2台。ローカル生成とクラウドAPIを併用している。

「ComfyUIが軸です。Image Generationはローカル（SDXL + LoRA）、Video GenerationはKLINGとHailuoのAPI。使い分けはケースバイケースですが、モーション重視ならKLING、スタイル重視ならHailuoという感覚です」

## マネタイズ

- 企業タイアップ（月3-5件、単価10-50万円）
- YouTube広告収益
- AIツール企業のアンバサダー契約
- コミュニティ運営（有料Discord）

## Tier 4-5へのアドバイス

「最初から完璧を目指さないこと。量を出す中で自分のスタイルが見えてくる。1日1本でいいから、まず100本作ってみてください。100本目の自分は、1本目とは別人になっています」`,
  },
  {
    id: 'a18',
    slug: 'case-study-webtoon-ai-production',
    title: '事例紹介: AI活用でWebtoon制作コストを70%削減した制作スタジオの手法',
    excerpt: '背景生成、カラーリング、エフェクト追加をAIで自動化。人間は「演出」と「品質管理」に集中。',
    category: 'creator-story',
    thumbnail: 'linear-gradient(135deg, #713f12, #eab308)',
    publishedAt: '2026-03-09',
    source: 'CW Academy',
    readMin: 6,
    body: `縦スクロール漫画（Webtoon）の制作にAIを全面導入し、制作コストを70%削減した制作スタジオの事例を紹介する。

## 課題

韓国Webtoon勢との価格競争。100話×100タイトルという大量コンテンツ需要に、従来の手描きベースでは対応不可能だった。

## AI導入範囲

1. **背景生成（80%自動化）**: SDXL + ControlNet（深度マップ）で一貫性のある背景を自動生成
2. **カラーリング（70%自動化）**: 線画にAIで自動着色。人間は微修正のみ
3. **エフェクト（90%自動化）**: 光、影、パーティクルをAIで追加
4. **キャラクター（30%自動化）**: 表情差分の生成。ただし最終的な表現は人間が監修

## 結果

- 1話あたりの制作コスト: 50万円 → 15万円
- 制作期間: 2週間 → 4日
- 品質: 「読者アンケートのスコアは維持」

## 人間の役割の変化

「AIに置き換えられない」のは、ストーリーテリング、演出、品質管理の3つ。これらに人間のリソースを集中させることで、少人数でも大量・高品質の制作が可能になった。`,
  },
  {
    id: 'a19',
    slug: 'freelance-ai-creator-income-report',
    title: 'フリーランスAIクリエイター収入レポート 2026 — 月収100万円を超える人の共通点',
    excerpt: '27名のAIクリエイターに調査。収入源の構成、使用ツール、案件獲得方法を定量データで解析。',
    category: 'creator-story',
    thumbnail: 'linear-gradient(135deg, #1e293b, #475569)',
    publishedAt: '2026-02-28',
    source: 'CW Academy',
    readMin: 7,
    body: `CW Academyが27名のフリーランスAIクリエイター（Tier 2-3）にアンケート調査を実施した。

## 回答者の概要

- 平均月収: 67万円（中央値: 52万円）
- 月収100万円以上: 7名（26%）
- 活動歴: 平均1.8年
- 主な活動分野: AI動画制作（41%）、AI画像生成（33%）、ワークフロー構築（26%）

## 月収100万円超の共通点

1. **複数収入源**: 受注制作 + 教育コンテンツ + ツール紹介の3本柱
2. **SNS発信の継続**: 全員がX (Twitter)で1,000フォロワー以上
3. **専門分野の確立**: 「AI動画広告」「Webtoon背景」など、具体的な得意分野を持つ
4. **ツールの深い理解**: ComfyUIの独自ワークフローを持っている
5. **B2Bの案件獲得**: 個人SNS経由ではなく、紹介やプラットフォーム経由

## 案件獲得チャネル

- 紹介（43%）
- SNS経由のDM（28%）
- クラウドソーシング（15%）
- 自社サイト（14%）

## これからのクリエイターへ

最も効果的な第一歩は「1つのツールを徹底的に使いこなすこと」。広く浅くではなく、KLING + ComfyUIなど、2つに絞って深掘りするのが最短ルート。`,
  },
  {
    id: 'a20',
    slug: 'art-university-ai-curriculum-case',
    title: '芸大がAIカリキュラムを導入 — 「AIを使う側」を育てる新しい美術教育の形',
    excerpt: '先進的な取り組みを始めた芸術大学の事例。伝統的アートとAIの融合をどう教えるか。',
    category: 'creator-story',
    thumbnail: 'linear-gradient(135deg, #581c87, #a855f7)',
    publishedAt: '2026-03-01',
    source: 'CW Academy',
    readMin: 5,
    body: `ある芸術大学が、2026年度からAIクリエイティブのカリキュラムを正式に導入した事例を紹介する。

## 背景

「AIを無視できない」という認識は教員間で共有されていたが、「どう教えるか」で意見が割れていた。最終的に「AIを道具として使いこなす力」を教える方針に。

## カリキュラム構成

### 前期: AI基礎（必修）
- 生成AIの仕組みと限界
- 著作権・倫理の基礎
- プロンプトエンジニアリング入門

### 後期: AI応用（選択）
- AI動画制作ワークショップ
- ComfyUIによるカスタムワークフロー構築
- AI × 伝統技法の融合プロジェクト

## 学生の反応

「最初は抵抗があった」という声もあるが、実際に手を動かすと「表現の幅が広がった」「アイデアの試作が高速にできるようになった」とポジティブな反応が多い。

## 企業との連携

卒業制作にAIを活用した学生が、そのまま制作スタジオにインターンとして参加するケースも出始めている。「AIが使える美大卒」は、今後のクリエイティブ業界で重宝される人材になりそうだ。`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(cat: ArticleCategory): Article[] {
  return articles.filter(a => a.category === cat);
}

export function getLatestArticles(n: number): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, n);
}
