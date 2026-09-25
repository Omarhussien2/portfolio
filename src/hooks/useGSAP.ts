'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(callback: (gsapCtx: typeof gsap) => void, deps: React.DependencyList = []) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(gsap);
    });

    return () => {
      ctx.current?.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}

export function useScrollTrigger(
  trigger: string,
  animation: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars
) {
  useEffect(() => {
    const elements = document.querySelectorAll(trigger);
    elements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 60, ...animation },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
            ...scrollTriggerVars,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
