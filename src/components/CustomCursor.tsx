'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'text'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // إخفاء على أجهزة اللمس
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    let isFirstMove = true;

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      
      if (isFirstMove) {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        isFirstMove = false;
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const textElement = target.closest('[data-cursor-text]');
      if (textElement) {
        setText(textElement.getAttribute('data-cursor-text') || '');
        setHoverState('text');
        return;
      }

      const interactiveElement = target.closest('a, button, input, textarea, [data-cursor-hover]');
      if (interactiveElement) {
        setHoverState('link');
        setText('');
        return;
      }

      setHoverState('default');
      setText('');
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setIsVisible(false);
        isFirstMove = true;
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const textEl = textRef.current;
    if (!cursor || !textEl) return;

    if (hoverState === 'text') {
      gsap.to(cursor, {
        width: 64,
        height: 64,
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(textEl, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        delay: 0.1,
        ease: 'power3.out',
      });
    } else if (hoverState === 'link') {
      gsap.to(cursor, {
        width: 16,
        height: 16,
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(textEl, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: 'power3.out',
      });
    } else {
      gsap.to(cursor, {
        width: 8,
        height: 8,
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(textEl, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: 'power3.out',
      });
    }
  }, [hoverState]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: '#000',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        willChange: 'width, height, transform'
      }}
    >
      <div
        ref={textRef}
        className="text-xs font-medium tracking-wider text-white whitespace-nowrap"
        style={{ opacity: 0, transform: 'scale(0.5)' }}
      >
        {text}
      </div>
    </div>
  );
}
