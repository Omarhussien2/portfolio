'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { localePath, type Locale } from '@/lib/i18n';
import LanguageSwitch from './LanguageSwitch';

export default function Header({ locale }: { locale: Locale }) {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
    });
    media.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(headerRef.current, { y: 0, opacity: 1 });
    });

    return () => media.revert();
  }, []);

  useEffect(() => {
    const handleToggle = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;
      if (typeof detail === 'boolean') setMenuOpen(detail);
    };
    window.addEventListener('toggleMenu', handleToggle);
    return () => window.removeEventListener('toggleMenu', handleToggle);
  }, []);

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    window.dispatchEvent(new CustomEvent('toggleMenu', { detail: nextState }));
  };

  return (
    <header
      ref={headerRef}
      className={`site-header fixed top-0 right-0 left-0 z-50 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled && !menuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none'
      }`}
    >
      <a
        href={localePath(locale)}
        className="relative z-50 flex-shrink-0 group"
        aria-label={locale === 'ar' ? 'عمر حسين — الرئيسية' : 'Omar Hussien — Home'}
        data-cursor-hover
      >
        <span className="flex flex-col text-start leading-[1.05] select-none">
          <span className="text-sm md:text-base font-black tracking-tighter text-black">{locale === 'ar' ? 'عمر' : 'Omar'}</span>
          <span className="text-sm md:text-base font-black tracking-tighter text-black">{locale === 'ar' ? 'حسين' : 'Hussien'}</span>
        </span>
      </a>

      <div className="header-controls"><LanguageSwitch locale={locale} /><button
        id="menu-toggle"
        type="button"
        onClick={toggleMenu}
        className="relative z-50 w-11 h-11 flex flex-col items-center justify-center gap-1.5 group p-2"
        data-cursor-hover
        aria-label={menuOpen ? (locale === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (locale === 'ar' ? 'فتح القائمة' : 'Open menu')}
        aria-controls="site-navigation"
        aria-expanded={menuOpen}
      >
        <span
          aria-hidden="true"
          className={`block h-0.5 bg-black transition-all duration-300 ${
            menuOpen ? 'w-6 rotate-45 translate-y-1' : 'w-6'
          }`}
        />
        <span
          aria-hidden="true"
          className={`block h-0.5 bg-black transition-all duration-300 ${
            menuOpen ? 'w-6 -rotate-45 -translate-y-1' : 'w-6'
          }`}
        />
      </button></div>
    </header>
  );
}
