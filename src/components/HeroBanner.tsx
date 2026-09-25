'use client';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import AudienceSelector from './AudienceSelector';
import ContactAction from './ContactAction';

const words = { ar: ['أداء الحملات', 'نمو الأعمال', 'المبيعات', 'العائد الإعلاني (ROAS)'], en: ['campaign performance', 'business growth', 'sales', 'return on ad spend'] };
export default function HeroBanner({ locale }: { locale: Locale }) {
 const videoRef = useRef<HTMLVideoElement>(null);
 const [paused, setPaused] = useState(true);
 const [word, setWord] = useState(0);
 const manualPause = useRef(false);
 const ar = locale === 'ar';
 useEffect(() => {
   const video = videoRef.current;
   if (!video) return;
   const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
   const mobile = window.matchMedia('(max-width: 639px)');
   const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
   let inView = false;
   let loaded = false;
   const sync = () => {
     if (reduced.matches || document.hidden || !inView || manualPause.current || connection?.saveData) { video.pause(); return; }
     if (!loaded) { video.src = mobile.matches ? '/videos/hero-loop-mobile.mp4' : '/videos/hero-loop.mp4'; loaded = true; }
     video.play().catch(() => setPaused(true));
   };
   const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: .15 });
   observer.observe(video);
   reduced.addEventListener('change', sync);
   document.addEventListener('visibilitychange', sync);
   return () => { observer.disconnect(); reduced.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); video.pause(); };
 }, []);
 useEffect(() => {
   const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
   let timer: ReturnType<typeof setInterval> | undefined;
   const sync = () => { if (timer) clearInterval(timer); if (!reduced.matches) timer = setInterval(() => { if (!document.hidden) setWord(index => (index + 1) % words[locale].length); }, 3600); else setWord(0); };
   sync(); reduced.addEventListener('change', sync);
   return () => { clearInterval(timer); reduced.removeEventListener('change', sync); };
 }, [locale]);
 const toggle = () => {
   const video = videoRef.current;
   if (!video) return;
   manualPause.current = !video.paused;
   if (video.paused) { if (!video.getAttribute('src')) video.src = window.innerWidth < 640 ? '/videos/hero-loop-mobile.mp4' : '/videos/hero-loop.mp4'; video.play().catch(() => setPaused(true)); } else video.pause();
 };
 return <section className="hero-section page-gutter" aria-labelledby="hero-title">
 <div className="hero-film"><video ref={videoRef} poster="/videos/hero-loop-poster.webp" muted loop playsInline preload="none" onPlay={() => setPaused(false)} onPause={() => setPaused(true)} aria-label={ar ? 'قصة عمر حسين برسوم متحركة' : 'Omar’s story in animation'} />
 <button type="button" onClick={toggle} className="video-toggle" aria-label={paused ? (ar ? 'تشغيل الفيديو' : 'Play video') : (ar ? 'إيقاف الفيديو مؤقتًا' : 'Pause video')}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button></div>
 <p className="hero-intro">{ar ? 'عمر حسين' : 'Omar Hussien'}</p>
 <h1 id="hero-title">{ar ? 'متخصص تسويق رقمي' : 'Digital marketing specialist'}</h1>
 <p className="hero-method">{ar ? 'بدمجه مع الذكاء الاصطناعي والأتمتة' : 'Combining marketing with AI & automation'}</p>
 <p className="hero-outcome"><span>{ar ? 'لتحسين' : 'To improve'}</span><span className="rotating-words" aria-hidden="true">{words[locale].map((label, index) => <span key={label} className={index === word ? 'active' : ''}>{label}</span>)}</span><span className="sr-only">{words[locale].join(ar ? '، ' : ', ')}</span></p>
 <AudienceSelector locale={locale} />
 <div className="hero-actions"><a href="#work" className="text-link">{ar ? 'اكتشف أعمالي' : 'Explore my work'} <span aria-hidden="true">↓</span></a><ContactAction locale={locale} /></div>
 </section>;
}

