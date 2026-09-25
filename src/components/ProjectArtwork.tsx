import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Project } from '@/data/projects';
import type { Locale } from '@/lib/i18n';

const visuals: Record<string, { image: string; ar: string; en: string }> = {
 riyali: { image: '/projects/riyali/media/calculator.webp', ar: 'محتوى وأدوات للوعي المالي', en: 'Content and financial awareness tools' },
 'hidaya-hackathon': { image: '/projects/hidaya/media/platform.webp', ar: 'من داخل منصة رصد', en: 'Inside the Rasd platform' },
 jalas: { image: '/projects/jalas/media/speakers.webp', ar: 'من أجواء مجلس جلاس', en: 'A moment from Jalas Majlis' }
};
export default function ProjectArtwork({ project, locale }: { project: Project; locale: Locale }) {
 const palette = { '--project-color': project.color, '--project-bg': project.splashColor } as CSSProperties;
 const visual = visuals[project.slug];
 return <div className={'project-artwork artwork-' + project.slug} style={palette}>
 <div className="artwork-top"><span className="artwork-number" aria-hidden="true">0{project.id}</span><div className="artwork-mark"><Image src={project.landscapeImage} alt={project.imageAlt} width={140} height={85} sizes="140px" /></div></div>
 <div className="artwork-screen"><Image src={visual.image} alt={locale === 'ar' ? visual.ar : visual.en} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw" /></div>
 {project.slug === 'riyali' && <div className="artwork-post"><Image src="/projects/riyali/media/money-week.webp" alt={locale === 'ar' ? 'نموذج محتوى أسبوع المال العالمي' : 'Global Money Week content example'} fill sizes="(max-width: 639px) 35vw, 160px" /></div>}
 <div className="artwork-caption">{locale === 'ar' ? visual.ar : visual.en}<span aria-hidden="true">↗</span></div>
 </div>;
}

