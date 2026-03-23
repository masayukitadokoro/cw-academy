'use client';

import { useState } from 'react';
import { CATEGORIES, getTotalLessons } from '@/lib/categoryDefinitions';
import {
  BookOpen, ChevronDown, ChevronUp, Play, Edit, Plus, Video, ExternalLink,
} from 'lucide-react';

export default function AdminContentPage() {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[24px] font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-gray-400" /> コンテンツ管理
        </h1>
        <div className="text-[14px] text-gray-500">
          {CATEGORIES.length}カテゴリ / {CATEGORIES.reduce((s, c) => s + c.courses.length, 0)}コース / {CATEGORIES.reduce((s, c) => s + getTotalLessons(c), 0)}レッスン
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <div className="text-[14px] text-amber-800 font-medium">現在の管理方法</div>
        <div className="text-[13px] text-amber-700 mt-1">
          コンテンツは <code className="bg-amber-100 px-1.5 py-0.5 rounded text-[12px]">lib/categoryDefinitions.ts</code> で管理しています。
          編集するにはコードを直接変更してデプロイしてください。DB管理への移行は次フェーズで対応予定です。
        </div>
      </div>

      <div className="space-y-3">
        {CATEGORIES.map(cat => {
          const isCatExp = expandedCat === cat.id;
          return (
            <div key={cat.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setExpandedCat(isCatExp ? null : cat.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left bg-transparent border-none cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}15` }}>
                  <BookOpen className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] font-bold text-gray-800">{cat.name}</div>
                  <div className="text-[13px] text-gray-500">{cat.desc}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[14px] font-semibold text-gray-700">{cat.courses.length} コース</div>
                  <div className="text-[12px] text-gray-400">{getTotalLessons(cat)} レッスン</div>
                </div>
                {isCatExp ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {isCatExp && (
                <div className="border-t border-gray-100">
                  {cat.courses.map(course => {
                    const isCourseExp = expandedCourse === course.id;
                    return (
                      <div key={course.id}>
                        <button
                          onClick={() => setExpandedCourse(isCourseExp ? null : course.id)}
                          className="w-full flex items-center gap-3 px-5 py-3 text-left bg-transparent border-none cursor-pointer hover:bg-gray-50 transition"
                          style={{ paddingLeft: 72 }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-semibold text-gray-700">{course.title}</div>
                            <div className="text-[12px] text-gray-400 flex items-center gap-3">
                              <span>難易度 {course.difficulty}/5</span>
                              <span>対象: {course.tierTarget}</span>
                              <span>{course.lessons.length} レッスン</span>
                            </div>
                          </div>
                          {isCourseExp ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>

                        {isCourseExp && (
                          <div className="bg-gray-50">
                            {course.lessons.map((lesson, i) => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-3 px-5 py-2.5 border-t border-gray-100"
                                style={{ paddingLeft: 96 }}
                              >
                                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-bold text-gray-500 shrink-0">
                                  {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[13px] text-gray-700 flex items-center gap-2">
                                    {lesson.title}
                                    {lesson.isFree && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-600 font-medium">無料</span>}
                                  </div>
                                  <div className="text-[11px] text-gray-400">{lesson.desc}</div>
                                </div>
                                <div className="text-[12px] text-gray-400 shrink-0 flex items-center gap-2">
                                  {lesson.videoId ? (
                                    <a
                                      href={`https://youtube.com/watch?v=${lesson.videoId}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 no-underline"
                                    >
                                      <Video className="w-3.5 h-3.5" /> YouTube
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  ) : (
                                    <span className="text-orange-400">動画未設定</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
