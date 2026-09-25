import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroBanner from '@/components/HeroBanner';
import ProjectGrid from '@/components/ProjectGrid';
import AboutSection from '@/components/AboutSection';
import { isLocale, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

type HomePageProps = { params: { locale: string } };

const copy: Record<Locale, { title: string; description: string }> = {
  ar: {
    title: 'عمر حسين — خبير التسويق الرقمي والأتمتة الذكية',
    description: 'بورتفوليو عمر حسين: استراتيجيات نمو رقمي، تحسين تحويل العملاء، وأنظمة أتمتة مخصصة. خبرة مع جهات كبرى ونتائج نمو موثقة بالأرقام.',
  },
  en: {
    title: 'Omar Hussien — Digital Marketing & Smart Automation Expert',
    description: "Omar Hussien's portfolio: Digital growth strategies, conversion optimization, and custom automation systems. Proven track record with leading organizations and verified metrics.",
  },
};

export function generateMetadata({ params }: HomePageProps): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    locale: params.locale,
    ...copy[params.locale],
    imagePath: `/og/${params.locale}/home.png`,
  });
}

export default function HomePage({ params }: HomePageProps) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Omar Hussien',
    alternateName: 'عمر حسين',
    url: 'https://omar-hussein-portfolio.vercel.app',
    jobTitle: locale === 'ar' ? 'خبير التسويق الرقمي والأتمتة الذكية' : 'Digital Marketing & Smart Automation Expert',
    description: copy[locale].description,
    knowsAbout: ['Digital Marketing', 'Growth Strategy', 'AI Automation', 'E-Commerce', 'Performance Marketing', 'ROAS Optimization'],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroBanner locale={params.locale} />
      <ProjectGrid locale={params.locale} />
      <AboutSection locale={params.locale} />
    </main>
  );
}
