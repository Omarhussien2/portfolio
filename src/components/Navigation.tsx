'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Navigation.module.css';
import { localePath, type Locale } from '@/lib/i18n';
import { useAudience } from './AudienceProvider';
import AudienceSelector from './AudienceSelector';
import LanguageSwitch from './LanguageSwitch';

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Navigation({ locale }: { locale: Locale }) {
  const { audience } = useAudience();
  const ar = locale === 'ar';
  const menuItems = [
    { label: ar ? 'الرئيسية' : 'Home', href: '/' },
    { label: ar ? 'أعمالي' : 'Work', href: '/#work' },
    { label: ar ? 'عنّي' : 'About', href: '/#about' },
    ...(audience === 'client' ? [{ label: ar ? 'خدماتي' : 'Services', href: '/#services' }] : []),
    { label: ar ? 'تواصل' : 'Contact', href: '/#contact' },
  ];
  const dialogRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const focusFrameRef = useRef<number | null>(null);
  const openRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPresent, setIsPresent] = useState(false);

  const closeMenu = useCallback(() => {
    if (focusFrameRef.current !== null) {
      cancelAnimationFrame(focusFrameRef.current);
      focusFrameRef.current = null;
    }
    window.dispatchEvent(new CustomEvent('toggleMenu', { detail: false }));
  }, []);

  useEffect(() => {
    const handleToggle = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;
      if (typeof detail !== 'boolean') return;

      const wasOpen = openRef.current;
      openRef.current = detail;
      if (detail && !wasOpen) {
        restoreFocusRef.current =
          document.getElementById('menu-toggle');
        setIsPresent(true);
      }
      setIsOpen(detail);
    };

    window.addEventListener('toggleMenu', handleToggle);
    return () => window.removeEventListener('toggleMenu', handleToggle);
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !contentRef.current || !wavePathRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let context: gsap.Context;

    const buildTimeline = () => {
      timelineRef.current?.kill();
      context = gsap.context(() => {
        gsap.set(sceneRef.current, { xPercent: -112 });
        gsap.set(contentRef.current, { x: -28, opacity: 0 });

        const duration = reducedMotion.matches ? 0.01 : 0.9;
        timelineRef.current = gsap
          .timeline({
            paused: true,
            defaults: { overwrite: 'auto' },
            onReverseComplete: () => setIsPresent(false),
          })
          .to(sceneRef.current, { xPercent: 0, duration, ease: 'power3.inOut' }, 0)
          .fromTo(
            wavePathRef.current,
            { attr: { d: 'M0 0H36C54 170 150 310 72 500C-4 690 142 820 44 1000H0Z' } },
            {
              attr: { d: 'M0 0H30C154 170 10 340 94 500C166 650 12 820 42 1000H0Z' },
              duration,
              ease: 'sine.inOut',
            },
            0
          )
          .to(
            contentRef.current,
            {
              x: 0,
              opacity: 1,
              duration: reducedMotion.matches ? 0.01 : 0.46,
              ease: 'power2.out',
            },
            reducedMotion.matches ? 0 : 0.32
          );
      }, dialogRef);
    };

    buildTimeline();
    const handlePreferenceChange = () => {
      context.revert();
      buildTimeline();
      if (openRef.current) {
        timelineRef.current?.progress(1);
      } else {
        timelineRef.current?.progress(0);
        setIsPresent(false);
      }
    };

    reducedMotion.addEventListener('change', handlePreferenceChange);
    return () => {
      reducedMotion.removeEventListener('change', handlePreferenceChange);
      timelineRef.current?.kill();
      context.revert();
    };
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timeline.pause();
      gsap.set(sceneRef.current, { xPercent: isOpen ? 0 : -112 });
      gsap.set(contentRef.current, { x: 0, opacity: isOpen ? 1 : 0 });
      setIsPresent(isOpen);
      return;
    }
    if (isOpen) {
      setIsPresent(true);
      timeline.play();
    } else if (isPresent) {
      timeline.reverse();
    }
  }, [isOpen, isPresent]);

  useEffect(() => {
    const siteContent = document.getElementById('site-content');
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      if (dialogRef.current) dialogRef.current.inert = false;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
      if (siteContent) siteContent.inert = true;
      if (focusFrameRef.current !== null) cancelAnimationFrame(focusFrameRef.current);
      focusFrameRef.current = requestAnimationFrame(() => {
        focusFrameRef.current = null;
        if (openRef.current && closeButtonRef.current?.isConnected) {
          closeButtonRef.current.focus();
        }
      });
    } else {
      if (focusFrameRef.current !== null) {
        cancelAnimationFrame(focusFrameRef.current);
        focusFrameRef.current = null;
      }
      if (dialogRef.current) dialogRef.current.inert = true;
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('menu-open');
      if (siteContent) siteContent.inert = false;
      const trigger = restoreFocusRef.current;
      focusFrameRef.current = requestAnimationFrame(() => {
        focusFrameRef.current = null;
        if (!openRef.current && trigger?.isConnected) trigger.focus({ preventScroll: true });
      });
      restoreFocusRef.current = null;
    }

    return () => {
      if (focusFrameRef.current !== null) {
        cancelAnimationFrame(focusFrameRef.current);
        focusFrameRef.current = null;
      }
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('menu-open');
      if (siteContent) siteContent.inert = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => element.tabIndex !== -1);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
        dialogRef.current.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu, isOpen]);

  return (
    <div
      id="site-navigation"
      ref={dialogRef}
      className={`${styles.dialog} ${isPresent ? styles.present : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={ar ? 'قائمة الموقع' : 'Site menu'}
      aria-hidden={!isOpen}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeMenu();
      }}
    >
      <div ref={sceneRef} className={styles.scene}>
        <div className={styles.panel} data-lenis-prevent>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label={ar ? 'إغلاق القائمة' : 'Close menu'}
            data-cursor-hover
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <div ref={contentRef} className={styles.content}>
            <nav aria-label={ar ? 'التنقل الرئيسي' : 'Main navigation'} className={styles.links}>
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={localePath(locale, item.href)}
                  className={styles.link}
                  onClick={closeMenu}
                  data-index={String(index + 1).padStart(2, '0')}
                  data-cursor-hover
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.contact}>
              <p>{ar ? 'للتواصل' : 'Get in touch'}</p>
              <a href="mailto:omar.hussien.device@gmail.com">
                omar.hussien.device@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/omar-hussien/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <LanguageSwitch locale={locale} />
              <AudienceSelector locale={locale} />
            </div>
          </div>
        </div>

        <svg
          className={styles.wave}
          viewBox="0 0 160 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={wavePathRef}
            d="M0 0H30C154 170 10 340 94 500C166 650 12 820 42 1000H0Z"
          />
        </svg>
      </div>
    </div>
  );
}
