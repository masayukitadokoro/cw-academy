'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface YouTubeLiteProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
  jaSubtitles?: boolean;
}

export default function YouTubeLite({ videoId, title, autoplay = false, className = '', jaSubtitles = false }: YouTubeLiteProps) {
  const [activated, setActivated] = useState(autoplay);

  const activate = useCallback(() => setActivated(true), []);

  if (activated) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1${jaSubtitles ? '&cc_lang_pref=ja&hl=ja&cc_load_policy=1' : ''}`}
        className={`w-full h-full border-none ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title || 'YouTube video'}
      />
    );
  }

  return (
    <button
      onClick={activate}
      className={`relative w-full h-full border-none cursor-pointer p-0 bg-black group ${className}`}
      aria-label={`Play ${title || 'video'}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title || ''}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
        priority
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
        <div className="w-[68px] h-[48px] bg-[#212121]/80 group-hover:bg-red-600 rounded-xl flex items-center justify-center transition-colors">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
