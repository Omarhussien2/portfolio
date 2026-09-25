'use client';
import type { Locale } from '@/lib/i18n';
import { useAudience } from './AudienceProvider';
import AudienceSelector from './AudienceSelector';
import ContactAction, { EMAIL, LINKEDIN } from './ContactAction';
export default function Footer({ locale }: { locale: Locale }) {
 const { audience } = useAudience();
 const ar = locale === 'ar';
 const prompt = audience === 'hiring' ? (ar ? 'نتكلم عن فرصة في فريقك' : 'Let’s talk about your team') : audience === 'client' ? (ar ? 'عندك هدف نمو أو تحدّي في مشروعك؟' : 'A growth goal or a project challenge?') : (ar ? 'خلّينا على تواصل' : 'Let’s stay in touch');
 return <footer id="contact" className="site-footer page-gutter">
 <p className="eyebrow">{prompt}</p><h2>{ar ? 'نبدأ بكلام بسيط.' : 'It starts with a conversation.'}<span aria-hidden="true">↗</span></h2>
 <ContactAction locale={locale} />
 {audience === 'client' && <p className="contact-hint">{ar ? 'احكي لي عن الهدف، والمرحلة الحالية، والموعد المتوقع.' : 'Tell me your goal, where things stand and your timeline.'}</p>}
 <a className="contact-email" href={'mailto:' + EMAIL} dir="ltr">{EMAIL}</a>
 <div className="footer-bottom"><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><p>{ar ? 'القاهرة، مصر' : 'Cairo, Egypt'}</p><p>© {new Date().getFullYear()} {ar ? 'عمر حسين' : 'Omar Hussien'}</p></div>
 <AudienceSelector locale={locale} /></footer>;
}

