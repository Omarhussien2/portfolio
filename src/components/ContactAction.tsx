'use client';
import type { Locale } from '@/lib/i18n';
import { useAudience } from './AudienceProvider';
export const CV_URL = '/cv/Omar-Hussien-CV.pdf';
export const EMAIL = 'omar.hussien.device@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/omar-hussien/';
export default function ContactAction({ locale }: { locale: Locale }) {
  const { audience } = useAudience();
  const ar = locale === 'ar';
  const client = audience === 'client';
  const hiring = audience === 'hiring';
  const message = ar ? 'مرحبًا عمر، أود مناقشة مشروع معك. الهدف: ' : 'Hi Omar, I would like to discuss a project. Our goal: ';
  const subject = hiring ? (ar ? 'فرصة عمل — عمر حسين' : 'A role for Omar Hussien') : (ar ? 'تواصل من البورتفوليو' : 'Hello from your portfolio');
  const href = client ? `https://wa.me/201152806034?text=${encodeURIComponent(message)}` : `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
  return <div className="contact-actions"><a className="button button-primary" href={href} {...(client ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{client ? (ar ? 'ناقش مشروعك' : 'Discuss your project') : hiring ? (ar ? 'تواصل للتوظيف' : 'Discuss a role') : (ar ? 'تواصل معي' : 'Get in touch')}<span aria-hidden="true">↗</span></a>{hiring && <a className="button button-secondary" href={CV_URL} download>{ar ? 'تحميل السيرة الذاتية' : 'Download CV'}<span aria-hidden="true">↓</span></a>}</div>;
}
