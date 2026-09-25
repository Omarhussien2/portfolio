import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import ProjectVideo from './ProjectVideo';

type MediaProps = { locale: Locale };

export function ProjectCover({ slug, locale }: { slug: string; locale: Locale }) {
  const ar = locale === 'ar';
  const covers: Record<string, { src: string; alt: string; width: number; height: number }> = {
    riyali: { src: '/projects/riyali/media/calculator.webp', alt: ar ? 'واجهة محاكاة القروض العقارية لريالي' : 'Riyali mortgage-simulator interface', width: 593, height: 544 },
    'hidaya-hackathon': { src: '/projects/hidaya/media/platform.webp', alt: ar ? 'واجهة التقارير في منصة رصد' : 'The reporting interface in Rasd', width: 1610, height: 854 },
    jalas: { src: '/projects/jalas/media/speakers.webp', alt: ar ? 'المتحدثان على مسرح مجلس جلاس' : 'Speakers at Jalas Cultural Majlis', width: 1280, height: 853 },
  };
  const cover = covers[slug];
  return <div className={`case-cover case-cover-${slug}`}>
    <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} priority sizes={slug === 'riyali' ? '(max-width: 767px) 53vw, 650px' : '(max-width: 767px) 90vw, 1200px'} />
    {slug === 'riyali' && <Image src="/projects/riyali/media/money-week.webp" alt={ar ? 'محتوى أسبوع المال العالمي من ريالي' : 'Riyali Global Money Week content'} width={1080} height={1350} priority className="case-cover-post" sizes="(max-width: 767px) 27vw, 330px" />}
  </div>;
}

function RiyaliMedia({ locale }: MediaProps) {
  const ar = locale === 'ar';
  return <>
    <section className="media-chapter">
      <div className="chapter-heading"><span className="chapter-number">01 /</span><div>
        <h2>{ar ? 'محتوى يدعو للمشاركة' : 'Content that invites participation'}</h2>
        <p>{ar ? 'نماذج من عمل الفريق؛ كان دوري إدارة التسويق والنشر والتوزيع ومتابعة الأداء.' : 'Examples of the team’s work. My role covered marketing, publishing, distribution, and performance tracking.'}</p>
      </div></div>
      <div className="campaign-pair">
        <figure><Image src="/projects/riyali/media/quiz.webp" alt={ar ? 'فوازير ريالي: ما هو الادخار الذكي؟' : 'Riyali quiz: What is smart saving?'} width={1080} height={1350} sizes="(max-width: 639px) 90vw, 40vw" />
          <figcaption><span>{ar ? 'فوازير ريالي · 4 مارس 2025' : 'Riyali quiz · 4 March 2025'}</span><a href="https://www.instagram.com/p/DGyZ-GkNJFY/" target="_blank" rel="noopener noreferrer">{ar ? 'المنشور الأصلي ↗' : 'Original post ↗'}<span className="sr-only">{ar ? ' — يفتح في تبويب جديد' : ' — opens in a new tab'}</span></a></figcaption>
        </figure>
        <figure><Image src="/projects/riyali/media/money-week.webp" alt={ar ? 'غلاف حملة أسبوع المال العالمي' : 'Global Money Week campaign cover'} width={1080} height={1350} sizes="(max-width: 639px) 90vw, 40vw" />
          <figcaption><span>{ar ? 'أسبوع المال العالمي · 18 مارس 2025' : 'Global Money Week · 18 March 2025'}</span><a href="https://www.instagram.com/p/DHVpcJAzJXp/" target="_blank" rel="noopener noreferrer">{ar ? 'المنشور الأصلي ↗' : 'Original post ↗'}<span className="sr-only">{ar ? ' — يفتح في تبويب جديد' : ' — opens in a new tab'}</span></a></figcaption>
        </figure>
      </div>
    </section>
    <section className="media-chapter tool-chapter">
      <div className="chapter-heading"><span className="chapter-number">02 /</span><div>
        <h2>{ar ? 'من المحتوى إلى أداة تفاعلية' : 'From content to an interactive tool'}</h2>
        <p>{ar ? 'طوّرت بمساعدة الذكاء الاصطناعي محاكاة للقروض العقارية وحاسبة للعبء المالي، ضمن عمل سماوة لريالي.' : 'Using AI, I developed a mortgage simulator and a financial burden calculator as part of Samawah’s work for Riyali.'}</p>
        <a className="text-link" href="https://itehuyto.genspark.space/" target="_blank" rel="noopener noreferrer">{ar ? 'جرّب الأداة ↗' : 'Try the tool ↗'}<span className="sr-only">{ar ? ' — يفتح في تبويب جديد' : ' — opens in a new tab'}</span></a>
      </div></div>
      <figure className="tool-preview"><Image src="/projects/riyali/media/calculator.webp" alt={ar ? 'مدخلات محاكاة القرض ونتائجها البيانية' : 'Mortgage simulator inputs and visual results'} width={593} height={544} sizes="(max-width: 767px) 90vw, 650px" /><figcaption>{ar ? 'واجهة فعلية للأداة بمدخلاتها الافتراضية.' : 'The actual interface with its default inputs.'}</figcaption></figure>
    </section>
  </>;
}

function HidayaMedia({ locale }: MediaProps) {
  const ar = locale === 'ar';
  return <>
    <section className="media-chapter">
      <div className="chapter-heading"><span className="chapter-number">01 /</span><div>
        <h2>{ar ? 'رصد. مراجعة. تقارير.' : 'Monitor. Review. Report.'}</h2>
        <p>{ar ? 'واجهة واحدة تساعد الفريق على متابعة التغطيات ومراجعتها وإعداد المخرجات. مقتطف من المنصة التي طوّرتها.' : 'One interface for the team to track coverage, review it, and prepare outputs. A short look at the platform I developed.'}</p>
      </div></div>
      <ProjectVideo src="/projects/hidaya/media/demo.mp4" poster="/projects/hidaya/media/poster.webp" title={ar ? 'عرض منصة رصد' : 'Rasd platform walkthrough'} locale={locale} width={1280} height={678} />
      <ol className="workflow-strip">{(ar ? ['جمع التغطيات', 'مراجعة المواد', 'تجهيز التقارير'] : ['Collect coverage', 'Review materials', 'Prepare reports']).map((step, i) => <li key={step}><span>0{i + 1}</span>{step}</li>)}</ol>
    </section>
    <section className="media-chapter">
      <div className="chapter-heading"><span className="chapter-number">02 /</span><div>
        <h2>{ar ? 'المادة المرصودة، في تقرير واضح' : 'Coverage, brought into a clear report'}</h2>
        <p>{ar ? 'نموذج من إعداد التقرير الإعلامي ضمن عمل الفريق؛ مرحلة تحرير وتصميم مستقلة عن واجهة المنصة.' : 'An example of the team’s media report preparation: a separate editorial and design stage from the platform interface.'}</p>
      </div></div>
      <figure><Image src="/projects/hidaya/media/report.webp" alt={ar ? 'صفحات التقرير الإعلامي من عمل الفريق' : 'Media report pages prepared by the team'} width={1468} height={690} sizes="90vw" className="media-wide" /><figcaption>{ar ? 'من إعداد التقرير في InDesign.' : 'From the report preparation in InDesign.'}</figcaption></figure>
    </section>
  </>;
}

function JalasMedia({ locale }: MediaProps) {
  const ar = locale === 'ar';
  return <>
    <section className="media-chapter ticket-chapter">
      <div>
        <div className="chapter-heading"><span className="chapter-number">01 /</span><div><h2>{ar ? 'رحلة أبسط، من الطلب إلى الدخول' : 'A simpler journey, from order to entry'}</h2><p>{ar ? 'ربطت طلبات متجر سلة بإصدار التذاكر والتحقق عند الحضور، لمساعدة الفريق على تنظيم تجربة اللقاء.' : 'I connected Salla store orders with ticket issuance and entry validation to help the team organize the event experience.'}</p></div></div>
        <ol className="ticket-steps">{(ar ? ['طلب عبر متجر سلة', 'تذكرة فردية برمز QR', 'التحقق وتسجيل الحضور', 'تقارير لدعم اللقاء التالي'] : ['Order through Salla', 'An individual QR ticket', 'Entry validation and attendance', 'Reports for the next event']).map((step,i)=><li key={step}><span>0{i+1}</span>{step}</li>)}</ol>
      </div>
      <figure><Image src="/projects/jalas/media/ticket.webp" alt={ar ? 'نموذج تذكرة جلاس مع إخفاء رمز الدخول' : 'Jalas ticket with its entry code removed'} width={1081} height={1921} sizes="(max-width: 639px) 65vw, 300px" /><figcaption>{ar ? 'نموذج التذكرة · رمز الدخول محجوب.' : 'Ticket example · entry code removed.'}</figcaption></figure>
    </section>
    <section className="media-chapter">
      <div className="chapter-heading"><span className="chapter-number">02 /</span><div><h2>{ar ? 'وراء اللقاء، نظام للعمل' : 'Behind the event, an operating system'}</h2><p>{ar ? 'لوحة تشغيل تربط الطلبات والعضويات والتذاكر وتتابع تحديثاتها تلقائيًا باستخدام Google Sheets وApps Script.' : 'An operating dashboard connecting orders, memberships, and tickets with automated sync using Google Sheets and Apps Script.'}</p></div></div>
      <ProjectVideo src="/projects/jalas/media/system.mp4" poster="/projects/jalas/media/system-poster.webp" title={ar ? 'تفاصيل اللقاء داخل النظام' : 'Event details in the system'} locale={locale} width={1280} height={600} />
    </section>
    <section className="media-chapter">
      <div className="chapter-heading"><span className="chapter-number">03 /</span><div><h2>{ar ? 'والنتيجة، لقاء يجمع الناس' : 'And the result: people coming together'}</h2><p>{ar ? 'من أجواء مجلس جلاس؛ ثمرة عمل فريق سماوة وشركاء المجلس.' : 'A moment from Jalas Majlis, made possible by the Samawah team and the Majlis partners.'}</p></div></div>
      <Image src="/projects/jalas/media/audience.webp" alt={ar ? 'الجمهور خلال إحدى فعاليات مجلس جلاس' : 'The audience at a Jalas Majlis event'} width={1280} height={853} sizes="90vw" className="media-wide" />
    </section>
  </>;
}

const projectStories: Record<string, (props: MediaProps) => React.JSX.Element> = {
  riyali: RiyaliMedia,
  'hidaya-hackathon': HidayaMedia,
  jalas: JalasMedia,
};

export default function ProjectMedia({ slug, locale }: { slug: string; locale: Locale }) {
  const Story = projectStories[slug];
  return <div className="project-story"><Story locale={locale} /></div>;
}
