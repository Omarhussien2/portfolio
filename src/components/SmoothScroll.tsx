'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ duration: 0.9, smoothWheel: true, anchors: { offset: -100 } });
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      const syncMenu = (event: Event) => {
        if ((event as CustomEvent<boolean>).detail) lenis.stop();
        else lenis.start();
      };

      if (document.body.classList.contains('menu-open')) lenis.stop();
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      window.addEventListener('toggleMenu', syncMenu);
      return () => {
        window.removeEventListener('toggleMenu', syncMenu);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => media.revert();
  }, []);

  return <>{children}</>;
}

