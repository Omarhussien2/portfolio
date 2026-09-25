'use client';
import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n';
import { useAudience } from './AudienceProvider';
import { CV_URL } from './ContactAction';
const services = {
 ar: [
 ['التسويق الرقمي والإعلانات المدفوعة', 'خطط حملات، إدارة ميزانيات، وتحسين الأداء بناءً على النتائج.'],
 ['خطط واستراتيجيات النمو على المنصات', 'تحديد الجمهور، وخطة حضور ونمو تناسب أهداف المشروع.'],
 ['الذكاء الاصطناعي والأتمتة', 'أدوات وسير عمل يربطان البيانات ويقلّلان المهام المتكررة.'],
 ['التحليل وقياس الأداء', 'لوحات متابعة وتقارير توضّح ما يعمل وما يحتاج تطويرًا.'],
 ['الاستشارات التسويقية', 'مراجعة الوضع الحالي وتحديد الأولويات والخطوات التالية.']],
 en: [
 ['Digital marketing & paid media', 'Campaign plans, budget management and performance optimization.'],
 ['Platform growth strategies', 'Audience insights and a practical growth plan aligned with your goals.'],
 ['AI & workflow automation', 'Practical tools that connect data and reduce repetitive tasks.'],
 ['Analytics & measurement', 'Dashboards and reporting to see what works and what needs attention.'],
 ['Marketing consulting', 'A review of where you are, what to prioritize and how to move forward.']]
};
export default function AboutSection({ locale }: { locale: Locale }) {
 const { audience } = useAudience();
 const ar = locale === 'ar';
 useEffect(() => {
   if (audience !== 'client' || window.location.hash !== '#services') return;
   const frame = requestAnimationFrame(() => document.getElementById('services')?.scrollIntoView({ behavior: 'instant' }));
   return () => cancelAnimationFrame(frame);
 }, [audience, locale]);
 return <section id="about" className="about-section page-gutter" aria-labelledby="about-title">
 <p className="eyebrow">{ar ? 'عنّي، باختصار' : 'A little about me'}</p>
 <div className="about-intro"><h2 id="about-title">{ar ? <>أربط التسويق<br />بالتقنية.</> : <>Connecting marketing<br />with technology.</>}</h2><div>
 <p>{ar ? 'أنا عمر حسين، متخصص تسويق رقمي. أجمع بين الحملات المدفوعة واستراتيجيات النمو وتحليل الأداء، وأطوّر أدوات بالذكاء الاصطناعي تساعد الفريق والعملاء على الإنجاز.' : 'I’m Omar Hussien, a digital marketing specialist. I combine paid campaigns, growth strategy and performance analysis with practical AI-assisted tools for teams and clients.'}</p>
 <p>{ar ? 'ضمن فريق سماوة، أعمل مع زملائي في التسويق والمحتوى والتشغيل، وأساهم في تطوير المشاريع التقنية والمحتوى الإبداعي المولّد بالذكاء الاصطناعي.' : 'At Samawah, I work alongside marketing, creative and operations colleagues, supporting technical projects and contributing to AI-generated creative content.'}</p></div></div>
 {audience === 'hiring' && <div className="career-summary"><p className="eyebrow">{ar ? 'خبرة تجمع التسويق والتطوير' : 'Marketing experience. A builder’s mindset.'}</p>
 <div><strong>{ar ? 'سماوة' : 'Samawah'}</strong><p>{ar ? 'التسويق الرقمي، ثم تطوير حلول ومشاريع بالذكاء الاصطناعي.' : 'Digital marketing, followed by AI-assisted solutions and project development.'}</p><span>2024 — {ar ? 'الآن' : 'Present'}</span></div>
 <div><strong>Seamless Media</strong><p>{ar ? 'إدارة الحملات وخطط النمو على المنصات.' : 'Campaign management and platform growth planning.'}</p><span>2022 — 2024</span></div>
 <a className="text-link" href={CV_URL} download>{ar ? 'التفاصيل في السيرة الذاتية' : 'Explore the full CV'} ↓</a></div>}
 {audience === 'client' && <div id="services" className="services-list"><h3 className="services-title">{ar ? 'كيف أقدر أساعدك؟' : 'How can I help?'}</h3>
 {services[locale].map(([title, description], index) => <div className="service-row" key={title}><span className="service-number" aria-hidden="true">0{index+1}</span><h4>{title}</h4><p>{description}</p></div>)}</div>}
 </section>;
}

