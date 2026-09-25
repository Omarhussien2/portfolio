import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/data/projects';
import ContactAction from '@/components/ContactAction';
import ProjectMedia, { ProjectCover } from '@/components/ProjectMedia';
import AnimatedMetric from '@/components/AnimatedMetric';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

type ProjectPageProps = { params: { locale: string; slug: string } };

const labels = {
  ar: {
    back: 'جميع الأعمال',
    role: 'دوري في المشروع',
    outcomes: 'الأثر والمخرجات مع الفريق',
    outcomesIntro: 'نتائج ومخرجات موثقة في مواد المشروع؛ ثمرة جهود الفريق والشركاء.',
    thanks: 'شكرًا للفريق والشركاء على العمل المشترك.',
    process: 'من التحدي إلى التنفيذ',
    approach: 'ما عملت عليه',
    evidence: 'من داخل المشروع',
    next: 'المشروع التالي',
    detailsLabel: 'الدور وطريقة العمل',
  },
  en: {
    back: 'All work',
    role: 'My role in the project',
    outcomes: 'Team outcomes and deliverables',
    outcomesIntro: 'Results and deliverables documented in the project materials, achieved with the team and partners.',
    thanks: 'Thank you to the team and partners for the shared work.',
    process: 'From challenge to delivery',
    approach: 'What I worked on',
    evidence: 'Inside the project',
    next: 'Next project',
    detailsLabel: 'Role and working approach',
  },
} satisfies Record<Locale, Record<string, string>>;

export function generateStaticParams() {
  return getProjects('ar').map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  if (!isLocale(params.locale)) return {};
  const project = getProjects(params.locale).find(({ slug }) => slug === params.slug);
  if (!project) return { title: params.locale === 'ar' ? 'المشروع غير موجود' : 'Project not found' };

  return pageMetadata({
    locale: params.locale,
    title: project.title,
    description: project.description,
    path: `/work/${project.slug}`,
    imagePath: `/og/${params.locale}/${project.slug}.png`,
  });
}

export default function ProjectPage({ params }: ProjectPageProps) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const projects = getProjects(locale);
  const projectIndex = projects.findIndex(({ slug }) => slug === params.slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const text = labels[locale];

  return (
    <main id="main-content" className="case-page">
      <div className="page-gutter">
        <Link href={`${localePath(locale)}#work`} className="case-back">
          <span aria-hidden="true">{locale === 'ar' ? '→' : '←'}</span> {text.back}
        </Link>

        <header className="case-heading">
          <div>
            <p className="eyebrow"><bdi>{project.period}</bdi> / {project.tags[0]}</p>
            <p className="case-context">{project.context}</p>
            <h1>{project.title}</h1>
            <p className="case-subtitle">{project.subtitle}</p>
          </div>
          <p className="case-lead">{project.description}</p>
        </header>

        {project.slug === 'jalas' && <aside className="case-impact-preview" aria-label={locale === 'ar' ? 'أبرز نتائج الفريق' : 'Team results at a glance'}>
          <p>{locale === 'ar' ? 'من نتائج الفريق · لقاء حكايا الشعر · 16 سبتمبر 2026' : 'Team results · Poetry Tales · 16 September 2026'}</p>
          <div>{[project.outcomes[0], project.outcomes[2]].map((outcome) => <p key={outcome.label}><strong><AnimatedMetric value={outcome.value} /></strong> {outcome.label}</p>)}</div>
          <a href="#outcomes-title">{locale === 'ar' ? 'تفاصيل النتائج والمبيعات ↓' : 'Results and sales details ↓'}</a>
        </aside>}

        <ProjectCover slug={project.slug} locale={locale} />

        <div className="case-team">
          <Image src="/images/samawah.webp" alt={locale === 'ar' ? 'سماوة' : 'Samawah'} width={76} height={76} />
          <p>{project.teamCredit} {text.thanks}</p>
        </div>

        <section className="case-details" aria-label={text.detailsLabel}>
          <div>
            <h2>{text.role}</h2>
            <p>{project.role}</p>
            <ul>{project.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
          </div>
          <div>
            <h2>{text.process}</h2>
            <p>{project.challenge}</p>
            <h3>{text.approach}</h3>
            <p>{project.approach}</p>
          </div>
        </section>
      </div>

      <div className="page-gutter">
        <ProjectMedia slug={project.slug} locale={locale} />

      </div>

      <section className="case-outcomes page-gutter" aria-labelledby="outcomes-title">
        <h2 id="outcomes-title">{text.outcomes}</h2>
        <p>{text.outcomesIntro}</p>
        <div className="outcome-grid">
          {project.outcomes.map((outcome) => (
            <div key={outcome.label}>
              <p className="outcome-value"><AnimatedMetric value={outcome.value} /></p>
              <h3 className="outcome-label">{outcome.label}</h3>
              <p className="outcome-context">{outcome.context}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="page-gutter">
        <ContactAction locale={locale} />

        <Link href={localePath(locale, `/work/${nextProject.slug}`)} className="case-next">
          <div><p>{text.next}</p><h2>{nextProject.title}</h2></div>
          <span aria-hidden="true">{locale === 'ar' ? '↖' : '↗'}</span>
        </Link>
      </div>
    </main>
  );
}
