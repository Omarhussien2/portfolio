import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { localePath } from '@/lib/i18n';

export const SITE_ORIGIN = 'https://omar-hussein-portfolio.vercel.app';
export const SITE_NAME = 'Omar Hussien';

type PageMetadataOptions = {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
};

export function pageMetadata({
  locale,
  title,
  description,
  path = '/',
  imagePath,
}: PageMetadataOptions): Metadata {
  const canonical = localePath(locale, path);
  const ogImage = imagePath ?? `${canonical === '/' ? '' : canonical}/opengraph-image`;

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: path === '/' ? title : `${title} | ${locale === 'ar' ? 'عمر حسين' : SITE_NAME}` },
    description,
    alternates: {
      canonical,
      languages: {
        ar: localePath('ar', path),
        en: localePath('en', path),
        'x-default': localePath('ar', path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_EG'],
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
