'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localePath } from '@/lib/i18n';

export default function NotFound() {
  const pathname = usePathname();
  const locale = /^\/en(?:\/|$)/.test(pathname) ? 'en' : 'ar';
  return <main id="main-content" className="page-gutter py-40 min-h-[65vh]">
    <p className="eyebrow">404</p>
    <h1 className="text-3xl mb-8">{locale === 'ar' ? 'الصفحة غير موجودة' : 'Page not found'}</h1>
    <Link href={`${localePath(locale)}#work`} className="text-link">{locale === 'ar' ? 'العودة إلى الأعمال المختارة' : 'Return to selected work'}</Link>
  </main>;
}
