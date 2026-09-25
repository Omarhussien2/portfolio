import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../fonts.css';
import '../globals.css';
import AudienceProvider from '@/components/AudienceProvider';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { SITE_ORIGIN } from '@/lib/metadata';

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: 'Omar Hussien', template: '%s | Omar Hussien' },
};

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preload" href="/fonts/mestika-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/mestika-bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-black antialiased">
        <a href="#main-content" className="skip-link">
          {locale === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
        </a>
        <AudienceProvider>
          <Header locale={locale} />
          <Navigation locale={locale} />
          <SmoothScroll>
            <div id="site-content">
              {children}
              <Footer locale={locale} />
            </div>
          </SmoothScroll>
        </AudienceProvider>
      </body>
    </html>
  );
}
