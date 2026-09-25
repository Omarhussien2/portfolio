'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import ProjectArtwork from './ProjectArtwork';
import AnimatedMetric from './AnimatedMetric';
import { localePath, type Locale } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(cardRef.current, {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 96%', once: true },
      });
    }, cardRef);
    return () => media.revert();
  }, []);

  return (
    <article ref={cardRef} className={`project-card project-card-${index + 1}`}>
      <Link href={localePath(locale, `/work/${project.slug}`)} className="project-link" aria-label={`${locale === 'ar' ? 'عرض مشروع' : 'View project'} ${project.title}`}>
        <ProjectArtwork project={project} locale={locale} />
        <div className="project-caption">
          <div>
            <p className="project-context">{project.context}</p>
            <h3>{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
          <span className="project-arrow" aria-hidden="true">↖</span>
        </div>
      </Link>
      <div className="card-outcome"><strong><AnimatedMetric value={project.outcomes[0].value} /></strong><span>{project.outcomes[0].label}</span><p>{project.outcomes[0].context}</p></div>
      {project.slug === 'jalas' && <div className="card-secondary-outcome"><strong><AnimatedMetric value={project.outcomes[2].value} /></strong><span>{project.outcomes[2].label}</span><small>{locale === 'ar' ? 'وفق تقرير اللقاء نفسه' : 'In the same event report'}</small></div>}
      <p className="project-credit">{locale === 'ar' ? 'ضمن فريق سماوة' : 'As part of the Samawah team'}</p>
    </article>
  );
}

