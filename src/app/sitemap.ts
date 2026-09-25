import type { MetadataRoute } from 'next';
import { getProjects } from '@/data/projects';
import { locales, localePath } from '@/lib/i18n';
import { SITE_ORIGIN } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...getProjects('ar').map(({ slug }) => `/work/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_ORIGIN}${localePath(locale, path)}`,
      changeFrequency: path === '/' ? ('monthly' as const) : ('yearly' as const),
      priority: path === '/' ? 1 : 0.8,
      alternates: {
        languages: {
          ar: `${SITE_ORIGIN}${localePath('ar', path)}`,
          en: `${SITE_ORIGIN}${localePath('en', path)}`,
          'x-default': `${SITE_ORIGIN}${localePath('ar', path)}`,
        },
      },
    })),
  );
}
