// app/live/[id]/page.tsx
// Creator Live 個別ページ — ライブビュー概要
// DB未設計のため、LIVE_CONTENTS からデータを取得（将来はSupabaseに移行）

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, Clock, Users, Video, ExternalLink,
  Star, Lock, Play, CheckCircle, BookOpen, Share2,
  Mic, MessageCircle,
} from 'lucide-react';
import { LIVE_CONTENTS, type LiveContent } from '@/lib/categoryDefinitions';

// ============================================================
// Extended live data (will come from DB in production)
// ============================================================
interface LiveEventDetail extends LiveContent {
  status: 'upcoming' | 'live' | 'archived';
  scheduledDate?: string;
  scheduledTime?: string;
  meetingUrl?: string;
  meetingPlatform?: 'google_meet' | 'zoom';
  speakerBio?: string;
  speakerAvatar?: string;
  overview?: string;
  whatYouLearn?: string[];
  prerequisites?: string[];
  relatedLessons?: { title: string; slug: string }[];
  attendeeCount?: number;
  maxAttendees?: number;
}

// Placeholder extended data (replace with DB fetch)
const LIVE_DETAILS: Record<string, Partial<LiveEventDetail>> = {
  'live-01': {
    status: 'archived',
    scheduledDate: '2026年3月15日（土）',
    scheduledTime: '20:00 - 21:15',
    meetingUrl: 'https://meet.google.com/xxx-yyyy-zzz',
    meetingPlatform: 'google_meet',
    speakerBio: 'Instagram 270万フォロワーのAIインフルエンサー。AiHUB CMO。Kuriemi Awards主催。LoRAを活用したAIバーチャルヒューマン制作の第一人者。',
    overview: 'くりえみ氏が自身のAIバーチャルヒューマン制作の全プロセスを公開。教師画像の選定からLoRA学習、生成画像の品質管理、SNS運用までを実演しながら解説します。270万フォロワーを獲得するまでの試行錯誤と、AI×インフルエンサービジネスの可能性を語ります。',
    whatYouLearn: [
      'LoRA学習用の教師画像の選び方（50枚で十分な理由）',
      'AIバーチャルヒューマンの一貫性を保つテクニック',
      'SNSプラットフォーム別の最適な投稿戦略',
      'AI生成コンテンツの著作権・肖像権の取り扱い',
      '収益化モデル（写真集、ファッション、コスプレ展開）',
    ],
    prerequisites: ['Stable Diffusionの基本操作ができること', 'LoRAの概念を理解していること（未経験でも視聴可能）'],
    relatedLessons: [
      { title: 'LoRA: 差分学習で好みのテイストを実現する', slug: 'model-theory' },
      { title: 'IP化の実践: インフルエンサーAI化事例', slug: 'ip-strategy' },
    ],
    attendeeCount: 87,
    maxAttendees: 100,
  },
  'live-02': {
    status: 'archived',
    scheduledDate: '2026年3月8日（土）',
    scheduledTime: '19:00 - 21:00',
    meetingUrl: 'https://zoom.us/j/1234567890',
    meetingPlatform: 'zoom',
    speakerBio: 'SF映像作家。AIを活用したショートフィルム制作で国内外のコンテストに入賞。企画から完成まで全工程をワンオペで実現する制作スタイルが特徴。',
    overview: '平田茉莉花氏が、SF短編ショートフィルムの企画から完成までの全プロセスを2時間で解説。脚本の書き方、AI画像/動画生成のプロンプト設計、CapCutでの編集、BGM選定まで。「一人でも映画が作れる」ことを実証するライブ制作実演。',
    whatYouLearn: [
      'SF短編の企画・脚本の立て方（三幕構成の応用）',
      'KLING AI / Hailuo を使い分けるシーン別戦略',
      'キャラクターの一貫性を保つプロンプトテクニック',
      'CapCutでのSFエフェクト・色調補正',
      'BGM・SE選定のコツ（著作権フリー素材の探し方）',
    ],
    prerequisites: ['特になし（初心者歓迎）'],
    attendeeCount: 100,
    maxAttendees: 100,
  },
  'live-03': {
    status: 'upcoming',
    scheduledDate: '2026年4月12日（土）',
    scheduledTime: '20:00 - 21:30',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    meetingPlatform: 'google_meet',
    speakerBio: 'AI背景アーティスト。ControlNetを駆使した世界観構築の専門家。Kuriemi Awards審査員。独自のワークフローで1日50枚以上の高品質背景を生成。',
    overview: '箱庭氏による背景美術のライブ制作実演。「世界観を構築する」ための思考プロセスから、ControlNet（depth/canny）を活用した具体的な制作手順まで。参加者の作品レビューも実施予定。',
    whatYouLearn: [
      '世界観設計の思考フレームワーク（リファレンス収集→コンセプト→実制作）',
      'ControlNet depth/cannyの使い分け',
      '背景の「空気感」を出すポストプロセス技法',
      'アニメ背景 vs フォトリアル背景のプロンプト差',
      '1日50枚生成するための効率的ワークフロー',
    ],
    prerequisites: ['ComfyUIの基本操作ができること'],
    attendeeCount: 34,
    maxAttendees: 100,
  },
};

// ============================================================
// Status badge component
// ============================================================
function StatusBadge({ status }: { status: string }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-[12px] font-bold px-3 py-1 rounded-full animate-pulse">
        <span className="w-2 h-2 bg-white rounded-full" /> LIVE配信中
      </span>
    );
  }
  if (status === 'upcoming') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-blue-500 text-white text-[12px] font-bold px-3 py-1 rounded-full">
        <Calendar className="w-3.5 h-3.5" /> 配信予定
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-gray-500 text-white text-[12px] font-bold px-3 py-1 rounded-full">
      <Play className="w-3.5 h-3.5" /> アーカイブ
    </span>
  );
}

// ============================================================
// Main Page
// ============================================================
export default function LiveDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Find base content
  const baseContent = LIVE_CONTENTS.find(l => l.id === id);
  const detail = LIVE_DETAILS[id];

  if (!baseContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">コンテンツが見つかりません</p>
          <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1 justify-center">
            <ArrowLeft className="w-4 h-4" /> トップに戻る
          </Link>
        </div>
      </div>
    );
  }

  const event: LiveEventDetail = {
    ...baseContent,
    status: 'archived',
    ...detail,
  };

  const isAccessible = event.isFree || !event.isPremium;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> トップに戻る
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== LEFT: Main content ===== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <StatusBadge status={event.status} />
                {event.isFree && <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded">無料</span>}
                {event.isPremium && <span className="text-[12px] font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded flex items-center gap-1"><Lock className="w-3 h-3" /> 有料会員限定</span>}
              </div>
              <h1 className="text-[22px] sm:text-[26px] font-black text-gray-900 leading-tight mb-4">
                {event.title}
              </h1>
            </div>

            {/* Video area / Meeting link */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
              {event.status === 'archived' ? (
                /* Archive video player placeholder */
                <div className="relative aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-white/30 mx-auto mb-3" />
                    <p className="text-white/50 text-[14px]">アーカイブ動画</p>
                    {!isAccessible && (
                      <a href="/pricing" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-orange-500 text-white text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                        <Lock className="w-3.5 h-3.5" /> 有料会員になって視聴する
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                /* Upcoming / Live — meeting link */
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    {event.status === 'live' ? (
                      <Video className="w-8 h-8 text-red-400" />
                    ) : (
                      <Calendar className="w-8 h-8 text-blue-400" />
                    )}
                  </div>
                  <p className="text-white/70 text-[14px] mb-4">
                    {event.status === 'live' ? 'ライブ配信中です。下のボタンから参加してください。' : `${event.scheduledDate} ${event.scheduledTime} に配信予定`}
                  </p>
                  {event.meetingUrl && isAccessible && (
                    <a
                      href={event.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold text-[15px] px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {event.meetingPlatform === 'zoom' ? 'Zoomで参加する' : 'Google Meetで参加する'}
                    </a>
                  )}
                  {!isAccessible && (
                    <a href="/pricing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold text-[14px] px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors">
                      <Lock className="w-3.5 h-3.5" /> 有料会員になって参加する
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Overview */}
            {event.overview && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-[16px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" /> 概要
                </h2>
                <p className="text-[14px] text-gray-700 leading-relaxed">{event.overview}</p>
              </div>
            )}

            {/* What you'll learn */}
            {event.whatYouLearn && event.whatYouLearn.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-[16px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> 学べること
                </h2>
                <ul className="space-y-2">
                  {event.whatYouLearn.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {event.prerequisites && event.prerequisites.length > 0 && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h2 className="text-[16px] font-bold text-gray-900 mb-3">前提知識</h2>
                <ul className="space-y-1.5">
                  {event.prerequisites.map((item, i) => (
                    <li key={i} className="text-[13px] text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ===== RIGHT: Sidebar ===== */}
          <div className="space-y-5">
            {/* Event info card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[14px]">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{event.scheduledDate || '日程未定'}</div>
                    <div className="text-[12px] text-gray-500">{event.scheduledTime || ''}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{event.duration}分</span>
                </div>
                {event.maxAttendees && (
                  <div className="flex items-center gap-3 text-[14px]">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      {event.attendeeCount || 0} / {event.maxAttendees}名
                      {event.status === 'upcoming' && event.attendeeCount && event.attendeeCount < event.maxAttendees && (
                        <span className="text-emerald-600 text-[12px] ml-1">（残り{event.maxAttendees - event.attendeeCount}席）</span>
                      )}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-[14px]">
                  <Video className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {event.meetingPlatform === 'zoom' ? 'Zoom' : 'Google Meet'}
                  </span>
                </div>
              </div>
            </div>

            {/* Speaker card */}
            {event.speaker && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[14px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-purple-500" /> スピーカー
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[18px] font-bold">
                    {event.speaker[0]}
                  </div>
                  <div>
                    <div className="font-bold text-[15px] text-gray-900">{event.speaker}</div>
                    {event.speakerTier && (
                      <span className="text-orange-500 text-[12px] flex items-center gap-0.5">
                        <Star className="w-3 h-3" fill="currentColor" /> {event.speakerTier} クリエイター
                      </span>
                    )}
                  </div>
                </div>
                {event.speakerBio && (
                  <p className="text-[13px] text-gray-600 leading-relaxed">{event.speakerBio}</p>
                )}
              </div>
            )}

            {/* Related lessons */}
            {event.relatedLessons && event.relatedLessons.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[14px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" /> 関連レッスン
                </h3>
                <div className="space-y-2">
                  {event.relatedLessons.map((lesson, i) => (
                    <Link
                      key={i}
                      href={`/category/${lesson.slug}`}
                      className="block text-[13px] text-blue-600 hover:underline flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 flex-shrink-0" />
                      {lesson.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 text-[13px] font-medium py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
              <Share2 className="w-4 h-4" /> この配信をシェアする
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
