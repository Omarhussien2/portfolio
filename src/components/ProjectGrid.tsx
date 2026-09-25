import { getProjects } from '@/data/projects';
import type { Locale } from '@/lib/i18n';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ locale }: { locale: Locale }) {
  const projects = getProjects(locale);
  return (
    <section id="work" className="work-section page-gutter" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title">{locale === 'ar' ? 'أعمال مختارة' : 'Selected work'}<span className="section-count"> / 03</span></h2>
        <p>{locale === 'ar' ? 'أدوار مختلفة. عمل جماعي. أثر واضح.' : 'Different roles. Shared effort. Visible impact.'}</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} locale={locale} />
        ))}
      </div>
    </section>
  );
}

