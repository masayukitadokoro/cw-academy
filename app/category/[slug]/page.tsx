'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen, ChevronDown, ChevronUp, Check, Play, ArrowLeft,
  ArrowRight, ListVideo, Clock,
} from 'lucide-react';
import { getCategoryBySlug, type Category, type Course, type Lesson } from '@/lib/categoryDefinitions';

function formatDuration(seconds?: number): string {
  if (!seconds) return '';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function CourseSidebar({
  category, selectedCourseId, selectedLessonId, watchedLessonIds,
  onCourseClick, onLessonClick, expandedCourse, setExpandedCourse,
}: {
  category: Category;
  selectedCourseId: string;
  selectedLessonId: string;
  watchedLessonIds: string[];
  onCourseClick: (courseId: string) => void;
  onLessonClick: (courseId: string, lessonId: string) => void;
  expandedCourse: string;
  setExpandedCourse: (id: string) => void;
}) {
  return (
    <div
      className="w-[280px] bg-white border-r border-gray-200 overflow-y-auto shrink-0 hidden lg:flex flex-col"
      style={{ height: 'calc(100vh - 56px)', position: 'sticky', top: 56 }}
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-600 no-underline flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> カテゴリ一覧
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${category.color}15` }}
          >
            <BookOpen className="w-4 h-4" style={{ color: category.color }} />
          </div>
          <div className="text-[15px] font-bold text-gray-800">{category.name}</div>
        </div>
      </div>

      {category.courses.map(course => {
        const isExp = expandedCourse === course.id;
        const watchedCount = course.lessons.filter(l => watchedLessonIds.includes(l.id)).length;

        return (
          <div key={course.id}>
            <button
              onClick={() => {
                setExpandedCourse(isExp ? '' : course.id);
                onCourseClick(course.id);
              }}
              className="w-full text-left flex items-center gap-2.5 py-3 px-4 border-none cursor-pointer transition-all bg-transparent"
              style={{
                borderLeft: isExp ? `3px solid ${category.color}` : '3px solid transparent',
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-gray-700 truncate">{course.title}</div>
                <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-2">
                  <span>{course.lessons.length}レッスン</span>
                  {watchedCount > 0 && (
                    <span className="text-emerald-500">{watchedCount}/{course.lessons.length} 完了</span>
                  )}
                </div>
              </div>
              <span className="text-gray-400">
                {isExp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </span>
            </button>

            {isExp && course.lessons.map((lesson, i) => {
              const isActive = selectedLessonId === lesson.id;
              const isWatched = watchedLessonIds.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => onLessonClick(course.id, lesson.id)}
                  className="w-full text-left flex items-center gap-2 py-2.5 pr-4 border-none cursor-pointer transition-all bg-transparent"
                  style={{ paddingLeft: 40, background: isActive ? `${category.color}10` : 'transparent' }}
                >
                  <span
                    className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                    style={{
                      background: isWatched ? '#10b981' : isActive ? category.color : '#e5e7eb',
                      color: isWatched || isActive ? '#fff' : '#9ca3af',
                    }}
                  >
                    {isWatched ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] truncate block" style={{ color: isActive ? category.color : '#374151', fontWeight: isActive ? 600 : 400 }}>
                      {lesson.title}
                    </span>
                    {lesson.duration && <span className="text-[11px] text-gray-400">{formatDuration(lesson.duration)}</span>}
                  </div>
                  {lesson.isFree && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-bold shrink-0">無料</span>
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function PlaylistSidebar({
  course, currentLessonIdx, onLessonClick, watchedLessonIds, color,
}: {
  course: Course; currentLessonIdx: number; onLessonClick: (i: number) => void;
  watchedLessonIds: string[]; color: string;
}) {
  return (
    <div
      className="w-[360px] border-l border-gray-200 bg-white overflow-hidden shrink-0 hidden xl:flex flex-col"
      style={{ height: 'calc(100vh - 56px)', position: 'sticky', top: 56 }}
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="text-[14px] font-bold text-gray-700 flex items-center gap-1.5">
          <ListVideo className="w-4 h-4 text-gray-400" />
          {course.title}
        </div>
        <div className="mt-2 flex gap-[3px]">
          {course.lessons.map((l, i) => (
            <div key={l.id} className="flex-1 h-[4px] rounded-sm transition-all" style={{
              background: watchedLessonIds.includes(l.id) ? '#10b981' : i === currentLessonIdx ? color : '#e5e7eb',
            }} />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {course.lessons.map((lesson, i) => {
          const isActive = i === currentLessonIdx;
          const isWatched = watchedLessonIds.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => onLessonClick(i)}
              className="w-full flex gap-3 py-3 px-4 border-none cursor-pointer text-left transition-all bg-transparent"
              style={{ borderLeft: isActive ? `3px solid ${color}` : '3px solid transparent' }}
            >
              <span
                className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 mt-0.5"
                style={{ background: isWatched ? '#10b981' : isActive ? color : '#e5e7eb', color: isWatched || isActive ? '#fff' : '#9ca3af' }}
              >
                {isWatched ? <Check className="w-3 h-3" /> : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] leading-snug" style={{ fontWeight: isActive ? 700 : 500, color: isActive ? color : '#374151' }}>
                  {lesson.title}
                </div>
                <div className="text-[12px] text-gray-500 mt-0.5">{lesson.desc}</div>
                <div className="flex items-center gap-2 mt-1">
                  {isWatched && <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-0.5"><Check className="w-3 h-3" /> 完了</span>}
                  {lesson.duration && <span className="text-[11px] text-gray-400 flex items-center gap-0.5"><Clock className="w-3 h-3" /> {formatDuration(lesson.duration)}</span>}
                  {lesson.isFree && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">無料</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoryLearnPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);

  const [watchedLessonIds, setWatchedLessonIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const courseParam = searchParams.get('course');
  const lessonParam = searchParams.get('lesson');

  const [selectedCourseId, setSelectedCourseId] = useState(courseParam || category?.courses[0]?.id || '');
  const [selectedLessonId, setSelectedLessonId] = useState(lessonParam || '');
  const [expandedCourse, setExpandedCourse] = useState(selectedCourseId);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  const currentCourse = useMemo(
    () => category?.courses.find(c => c.id === selectedCourseId),
    [category, selectedCourseId]
  );
  const currentLesson = currentCourse?.lessons[currentLessonIdx] || null;

  const handleLessonClick = useCallback((courseId: string, lessonId: string) => {
    setSelectedCourseId(courseId);
    setExpandedCourse(courseId);
    const course = category?.courses.find(c => c.id === courseId);
    const idx = course?.lessons.findIndex(l => l.id === lessonId) ?? 0;
    setCurrentLessonIdx(idx);
    setSelectedLessonId(lessonId);
    window.history.replaceState(null, '', `/category/${slug}?course=${courseId}&lesson=${lessonId}`);
  }, [category, slug]);

  const goNext = useCallback(() => {
    if (!currentCourse || currentLessonIdx >= currentCourse.lessons.length - 1) return;
    const nextIdx = currentLessonIdx + 1;
    setCurrentLessonIdx(nextIdx);
    const nextLesson = currentCourse.lessons[nextIdx];
    setSelectedLessonId(nextLesson.id);
    window.history.replaceState(null, '', `/category/${slug}?course=${selectedCourseId}&lesson=${nextLesson.id}`);
  }, [currentCourse, currentLessonIdx, slug, selectedCourseId]);

  const goPrev = useCallback(() => {
    if (currentLessonIdx <= 0 || !currentCourse) return;
    const prevIdx = currentLessonIdx - 1;
    setCurrentLessonIdx(prevIdx);
    const prevLesson = currentCourse.lessons[prevIdx];
    setSelectedLessonId(prevLesson.id);
    window.history.replaceState(null, '', `/category/${slug}?course=${selectedCourseId}&lesson=${prevLesson.id}`);
  }, [currentCourse, currentLessonIdx, slug, selectedCourseId]);

  const markComplete = useCallback(() => {
    if (!currentLesson) return;
    setWatchedLessonIds(prev => [...new Set([...prev, currentLesson.id])]);
  }, [currentLesson]);

  if (!category) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">カテゴリが見つかりません</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 h-14">
        <div className="px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[14px] text-gray-900 hidden sm:block">CW Academy</span>
          </Link>
          {currentLesson && (
            <button
              onClick={markComplete}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition border-none cursor-pointer ${
                watchedLessonIds.includes(currentLesson.id)
                  ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Check className="w-4 h-4" />
              {watchedLessonIds.includes(currentLesson.id) ? '完了済み' : '完了にする'}
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 flex">
        <CourseSidebar
          category={category}
          selectedCourseId={selectedCourseId}
          selectedLessonId={selectedLessonId}
          watchedLessonIds={watchedLessonIds}
          onCourseClick={(id) => { setSelectedCourseId(id); setExpandedCourse(id); setCurrentLessonIdx(0); }}
          onLessonClick={handleLessonClick}
          expandedCourse={expandedCourse}
          setExpandedCourse={setExpandedCourse}
        />

        <main className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 56px)' }}>
          {currentLesson && currentLesson.videoId ? (
            <>
              <div className="bg-black">
                <div className="max-w-[960px] mx-auto">
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1&autoplay=1`}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={currentLesson.title}
                    />
                  </div>
                </div>
              </div>
              <div className="max-w-[960px] mx-auto px-4 py-5">
                <h1 className="text-[20px] font-bold text-gray-900 m-0">{currentLesson.title}</h1>
                <p className="text-[14px] text-gray-500 mt-1 m-0">{currentLesson.desc}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-200">
                  <button onClick={goPrev} disabled={currentLessonIdx === 0}
                    className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-30 border-none cursor-pointer bg-transparent">
                    <ArrowLeft className="w-4 h-4" /> 前のレッスン
                  </button>
                  <span className="text-[13px] text-gray-400">{currentLessonIdx + 1} / {currentCourse?.lessons.length}</span>
                  <button onClick={goNext} disabled={!currentCourse || currentLessonIdx >= currentCourse.lessons.length - 1}
                    className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-30 border-none cursor-pointer bg-transparent">
                    次のレッスン <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6">
              <h2 className="text-[22px] font-bold text-gray-900 mb-2">{currentCourse?.title}</h2>
              <p className="text-[14px] text-gray-500 mb-5">{currentCourse?.desc}</p>
              <div className="space-y-2">
                {currentCourse?.lessons.map((lesson, i) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(selectedCourseId, lesson.id)}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition text-left cursor-pointer"
                  >
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold shrink-0"
                      style={{
                        background: watchedLessonIds.includes(lesson.id) ? '#10b981' : `${category.color}15`,
                        color: watchedLessonIds.includes(lesson.id) ? '#fff' : category.color,
                      }}
                    >
                      {watchedLessonIds.includes(lesson.id) ? <Check className="w-5 h-5" /> : i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold text-gray-800">{lesson.title}</div>
                      <div className="text-[13px] text-gray-500">{lesson.desc}</div>
                    </div>
                    <Play className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {currentCourse && currentLesson?.videoId && (
          <PlaylistSidebar
            course={currentCourse}
            currentLessonIdx={currentLessonIdx}
            onLessonClick={(idx) => {
              setCurrentLessonIdx(idx);
              const lesson = currentCourse.lessons[idx];
              setSelectedLessonId(lesson.id);
              window.history.replaceState(null, '', `/category/${slug}?course=${selectedCourseId}&lesson=${lesson.id}`);
            }}
            watchedLessonIds={watchedLessonIds}
            color={category.color}
          />
        )}
      </div>
    </div>
  );
}
