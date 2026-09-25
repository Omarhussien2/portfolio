'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';

type ProjectVideoProps = {
  src: string;
  poster: string;
  title: string;
  locale: Locale;
  width: number;
  height: number;
};

export default function ProjectVideo({ src, poster, title, locale, width, height }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    observer.observe(video);
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, []);

  const startVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.src = src;
    setRequested(true);
    video.focus({ preventScroll: true });
    video.play().catch(() => setFailed(true));
  };

  return (
    <div className="project-video">
      <video ref={videoRef} poster={poster} width={width} height={height}
        controls={requested} tabIndex={requested ? 0 : -1} playsInline muted preload="none" aria-label={title}
        onError={() => setFailed(true)} />
      {!requested && <button type="button" className="project-video-play" onClick={startVideo}>
        <span aria-hidden="true">▷</span>
        {locale === 'ar' ? 'شاهد طريقة العمل' : 'Watch the workflow'}
      </button>}
      {failed && <p role="status" className="video-error">
        {locale === 'ar' ? 'تعذّر التشغيل داخل الصفحة.' : 'Playback could not start here.'}{' '}
        <a href={src}>{locale === 'ar' ? 'افتح الفيديو' : 'Open the video'}</a>
      </p>}
    </div>
  );
}
