export const locales = ['ar', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function normalizePath(path: string) {
  if (!path || path === '/') return '';
  return `/${path.replace(/^\/+|\/+$/g, '')}`;
}

export function localePath(locale: Locale, path = '/') {
  const normalizedPath = normalizePath(path);

  if (locale === defaultLocale) {
    return normalizedPath || '/';
  }

  return `/en${normalizedPath}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}
