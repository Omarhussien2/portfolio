'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { localePath, type Locale } from '@/lib/i18n';
export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [suffix, setSuffix] = useState('');
  useEffect(() => {
    const sync = () => setSuffix(window.location.search + window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); };
  }, [pathname]);
  const targetLocale = locale === 'ar' ? 'en' : 'ar';
  const path = pathname.replace(/^\/(ar|en)(?=\/|$)/, '') || '/';
  const target = localePath(targetLocale, path);
  return <a className="language-switch" href={target + suffix} lang={targetLocale} hrefLang={targetLocale} aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return; event.preventDefault(); router.push(target + window.location.search + window.location.hash); }}>{locale === 'ar' ? 'EN' : 'عربي'}</a>;
}
