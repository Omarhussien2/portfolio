export interface Project {
  id: string;
  slug: string;
  title: string;
  context: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  splashColor: string;
  landscapeImage: string;
  portraitImage: string;
  hasVideo: boolean;
  videoUrl?: string;
  period: string;
  role: string;
  responsibilities: string[];
  outcomes: {
    value: string;
    label: string;
    context: string;
  }[];
  teamCredit: string;
  challenge: string;
  approach: string;
  imageAlt: string;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'riyali',
    title: 'ريالي للوعي المالي',
    context: 'مؤسسة ريالي الأهلية · شراكة مع وزارة التعليم السعودية',
    subtitle: 'إدارة التسويق الرقمي وتطوير أدوات توعوية ضمن فريق سماوة',
    description:
      'أدرت الحضور الرقمي لبرنامج توعوي مالي عبر خمس منصات، ونظّمت النشر وقراءة الأداء، وطورت بمساعدة الذكاء الاصطناعي محاكاة للقروض وحاسبة للعبء المالي ضمن عمل فريق سماوة.',
    tags: ['تسويق رقمي', 'أتمتة', 'تحليل أداء'],
    color: '#007C6C',
    splashColor: '#EAF6F2',
    landscapeImage: '/projects/riyali/cover.webp',
    portraitImage: '/projects/riyali/cover.webp',
    hasVideo: false,
    period: '2024–2025',
    role: 'مسؤول التسويق الرقمي وإدارة الحملات ضمن فريق سماوة',
    responsibilities: [
      'إدارة النشر اليومي وتنسيق المحتوى عبر خمس منصات رقمية.',
      'أتمتة جدولة أكثر من 74 منشوراً شهرياً للمحافظة على انتظام النشر.',
      'متابعة مؤشرات الوصول والتفاعل ونمو الجمهور لدعم قرارات التوزيع.',
      'تطوير محاكاة للقروض وحاسبة للعبء المالي بمساعدة الذكاء الاصطناعي لدعم التوعية المالية.',
    ],
    outcomes: [
      {
        value: 'أكثر من 2.2 مليون',
        label: 'ظهور للمحتوى',
        context: 'خلال يناير 2025.',
      },
      {
        value: '27,427',
        label: 'تفاعلاً',
        context: 'خلال مارس 2025، مقابل 798 في بداية فترة القياس.',
      },
      {
        value: '1,929',
        label: 'متابعاً جديداً',
        context: 'خلال مارس 2025.',
      },
    ],
    teamCredit:
      'أنجزت هذا الدور ضمن فريق شركة سماوة، بالتعاون مع الزملاء في التسويق والمحتوى والتطوير.',
    challenge:
      'الحفاظ على حضور يومي منتظم لمشروع توعوي واسع عبر خمس منصات، مع حجم محتوى مرتفع وحاجة مستمرة إلى متابعة النتائج.',
    approach:
      'نظّمت دورة النشر، وأتمتُّ الجدولة المتكررة، ثم تابعت مؤشرات كل فترة لتحسين توزيع المحتوى بين المنصات. وبالتوازي، طورت محاكاة القروض وحاسبة العبء المالي كأداتين مساعدتين ضمن تجربة التوعية.',
    imageAlt: 'غلاف مشروع ريالي للوعي المالي',
  },
  {
    id: '2',
    slug: 'hidaya-hackathon',
    title: 'هاكاثون هداية',
    context: 'رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي · من أحدث أعمالي',
    subtitle: 'رصد إعلامي وتطوير منصة للتغطيات والتقارير ضمن فريق سماوة',
    description:
      'طورت منصة «رصد» لتجميع التغطيات الإخبارية والاجتماعية وتنظيم مراجعتها وإعداد مخرجات قابلة للتصدير، ضمن عمل فريق سماوة في هاكاثون هداية.',
    tags: ['رصد إعلامي', 'تطوير منصات', 'أتمتة'],
    color: '#8C6A2D',
    splashColor: '#F8F2E7',
    landscapeImage: '/projects/hidaya/cover.webp',
    portraitImage: '/projects/hidaya/cover.webp',
    hasVideo: false,
    period: 'خلال فترة الهاكاثون',
    role: 'مسؤول الرصد الإعلامي ومطور منصة «رصد» ضمن فريق سماوة',
    responsibilities: [
      'تطوير منصة «رصد» لجمع التغطيات الإخبارية والاجتماعية المرتبطة بالهاكاثون.',
      'تنظيم البيانات في واجهة تساعد الفريق على المتابعة والتدقيق.',
      'تهيئة مسار لتصدير التقارير الإعلامية من البيانات المرصودة.',
    ],
    outcomes: [
      {
        value: 'رصد آلي',
        label: 'للتغطيات الرقمية',
        context: 'جمع الأخبار والإشارات الاجتماعية في سير عمل واحد.',
      },
      {
        value: 'تقارير جاهزة',
        label: 'للتصدير والمراجعة',
        context: 'مخرجات منظمة تساعد الفريق على إعداد التقارير الإعلامية.',
      },
      {
        value: 'متابعة أوضح',
        label: 'لفريق الرصد',
        context: 'تقليل الخطوات اليدوية المتكررة في جمع التغطيات وإعدادها للمراجعة.',
      },
    ],
    teamCredit:
      'أنجزت الرصد الإعلامي وتطوير منصة «رصد» ضمن فريق شركة سماوة وبالتعاون مع فريق المشروع.',
    challenge:
      'متابعة ما يُنشر عن الهاكاثون عبر الأخبار ومنصات التواصل وتجهيزه للمراجعة والتقرير ضمن عملية كانت تعتمد على خطوات يدوية كثيرة.',
    approach:
      'طورت منصة تجمع التغطيات وتنظمها في واجهة موحدة، مع مسار واضح للتدقيق وتصدير التقارير.',
    imageAlt: 'غلاف مشروع منصة رصد لهاكاثون هداية',
  },
  {
    id: '3',
    slug: 'jalas',
    title: 'مجلس جلاس الثقافي',
    context: 'تسويق ونمو · تطوير تشغيلي · تجربة حضور',
    subtitle: 'تسويق المجلس وتطوير التقنية ورحلة الحضور ضمن فريق سماوة',
    description:
      'ساهمت في التسويق والنمو، وطورت نظام التذاكر من طلب متجر سلة إلى رمز QR والتحقق عند الدخول، مع تقارير تدعم تشغيل اللقاءات ومتابعتها.',
    tags: ['تسويق فعاليات', 'تجارة إلكترونية', 'أتمتة تشغيلية'],
    color: '#265565',
    splashColor: '#E8EFF1',
    landscapeImage: '/projects/jalas/cover.webp',
    portraitImage: '/projects/jalas/cover.webp',
    hasVideo: false,
    period: '2024–2026',
    role: 'مطور أنظمة تشغيلية ومسؤول التسويق والتطوير ضمن فريق سماوة',
    responsibilities: [
      'تنفيذ أنشطة التسويق عبر البريد وواتساب والمنصات الاجتماعية ضمن خطة الفريق.',
      'تطوير نظام يربط طلبات متجر سلة بإصدار تذاكر رقمية فردية برمز QR.',
      'إعداد لوحات وتقارير للأداء والمبيعات ومصادر الحجز لدعم قرارات اللقاءات.',
    ],
    outcomes: [
      {
        value: '175',
        label: 'حاضراً',
        context: 'حضور فعلي مكتمل السعة للقاء «حكايا الشعر» في 16 سبتمبر 2026.',
      },
      {
        value: '3,400 ر.س',
        label: 'مبيعات المتجر',
        context: 'قيمة 136 تذكرة بسعر 25 ر.س؛ سجل الطلبات يورد 135 منفذة وواحدة قيد المراجعة.',
      },
      {
        value: '88',
        label: 'عميلاً جديداً',
        context: 'قاعدة جديدة أشار إليها تقرير اللقاء للمتابعة والاحتفاظ.',
      },
    ],
    teamCredit:
      'نُفّذ العمل مع فريق شركة سماوة وشركاء مجلس جلاس؛ ويعرض هنا دوري في التسويق وتطوير النظام التشغيلي والتقارير.',
    challenge:
      'مواكبة نمو الإقبال مع تشتت بيانات البيع والحضور، والحاجة إلى رحلة أبسط من شراء التذكرة حتى التحقق منها عند باب القاعة.',
    approach:
      'ربطت بيانات متجر سلة بتذاكر QR فردية، وساهمت في تشغيل الحملات وقنوات التواصل، ثم نظمت مؤشرات الحضور والمبيعات في تقارير قابلة للمتابعة.',
    imageAlt: 'غلاف مشروع مجلس جلاس الثقافي',
  },
];

const englishProjects: Project[] = [
  {
    id: '1',
    slug: 'riyali',
    title: 'Riyali Financial Awareness',
    context: 'Riyali Foundation · In partnership with the Saudi Ministry of Education',
    subtitle: 'Digital marketing and educational tools, delivered with the Samawah team',
    description:
      'I managed a financial-awareness program’s presence across five platforms, organized publishing and performance review, and developed an AI-assisted loan simulator and debt-burden calculator as part of the Samawah team.',
    tags: ['Digital Marketing', 'Automation', 'Performance Analysis'],
    color: '#007C6C',
    splashColor: '#EAF6F2',
    landscapeImage: '/projects/riyali/cover.webp',
    portraitImage: '/projects/riyali/cover.webp',
    hasVideo: false,
    period: '2024–2025',
    role: 'Digital marketing and campaign manager as part of the Samawah team',
    responsibilities: [
      'Managed daily publishing and coordinated content across five digital platforms.',
      'Automated the scheduling of more than 74 posts per month to maintain a consistent publishing cadence.',
      'Tracked reach, engagement, and audience growth metrics to inform distribution decisions.',
      'Developed an AI-assisted loan simulator and debt-burden calculator to support financial awareness.',
    ],
    outcomes: [
      {
        value: 'More than 2.2 million',
        label: 'Content impressions',
        context: 'During January 2025.',
      },
      {
        value: '27,427',
        label: 'Engagements',
        context: 'During March 2025, compared with 798 at the start of the measurement period.',
      },
      {
        value: '1,929',
        label: 'New followers',
        context: 'During March 2025.',
      },
    ],
    teamCredit:
      'I delivered this role as part of the Samawah team, working with colleagues across marketing, content, and development.',
    challenge:
      'Maintaining a consistent daily presence for a large awareness initiative across five platforms, with a high volume of content and a continuous need to monitor results.',
    approach:
      'I structured the publishing cycle, automated recurring scheduling, and then reviewed each period’s metrics to improve content distribution across platforms. In parallel, I developed the loan simulator and debt-burden calculator as supporting tools within the awareness experience.',
    imageAlt: 'Cover image for the Riyali Financial Awareness project',
  },
  {
    id: '2',
    slug: 'hidaya-hackathon',
    title: 'Hidaya Hackathon',
    context: 'Presidency of Religious Affairs at the Grand Mosque and the Prophet’s Mosque · One of my latest projects',
    subtitle: 'Media monitoring and a coverage-reporting platform, delivered with the Samawah team',
    description:
      'I developed Rasd to collect news and social media coverage, organize its review, and prepare exportable outputs as part of the Samawah team’s work on Hidaya Hackathon.',
    tags: ['Media Monitoring', 'Platform Development', 'Automation'],
    color: '#8C6A2D',
    splashColor: '#F8F2E7',
    landscapeImage: '/projects/hidaya/cover.webp',
    portraitImage: '/projects/hidaya/cover.webp',
    hasVideo: false,
    period: 'During the hackathon',
    role: 'Media monitoring lead and developer of the Rasd platform as part of the Samawah team',
    responsibilities: [
      'Developed the Rasd platform to collect news and social media coverage related to the hackathon.',
      'Organized the data in an interface that helps the team monitor and review coverage.',
      'Prepared a workflow for exporting media reports from the monitored data.',
    ],
    outcomes: [
      {
        value: 'Automated monitoring',
        label: 'For digital coverage',
        context: 'Brought news and social media mentions into one workflow.',
      },
      {
        value: 'Export-ready reports',
        label: 'For review and delivery',
        context: 'Structured outputs that help the team prepare media reports.',
      },
      {
        value: 'Clearer tracking',
        label: 'For the monitoring team',
        context: 'Reduced repetitive manual steps in collecting coverage and preparing it for review.',
      },
    ],
    teamCredit:
      'I delivered the media-monitoring work and developed Rasd as part of the Samawah team, in collaboration with the project team.',
    challenge:
      'Tracking news and social media coverage of the hackathon and preparing it for review and reporting through a process that relied on many manual steps.',
    approach:
      'I developed a platform that collects coverage and organizes it in a unified interface, with a clear workflow for review and report export.',
    imageAlt: 'Cover image for the Hidaya Hackathon Rasd monitoring platform',
  },
  {
    id: '3',
    slug: 'jalas',
    title: 'Jalas Cultural Majlis',
    context: 'Marketing and growth · Operational development · Attendance experience',
    subtitle: 'Majlis marketing, technology, and the attendance journey, delivered with the Samawah team',
    description:
      'I contributed to marketing and growth and developed the ticketing system from Salla orders to QR-code issuance and entry validation, with reports that support event operations and follow-up.',
    tags: ['Event Marketing', 'E-commerce', 'Operational Automation'],
    color: '#265565',
    splashColor: '#E8EFF1',
    landscapeImage: '/projects/jalas/cover.webp',
    portraitImage: '/projects/jalas/cover.webp',
    hasVideo: false,
    period: '2024–2026',
    role: 'Operational systems developer and marketing and development lead as part of the Samawah team',
    responsibilities: [
      'Delivered marketing activities through email, WhatsApp, and social media as part of the team’s plan.',
      'Developed a system that connects Salla store orders to the issuance of individual digital tickets with QR codes.',
      'Created dashboards and reports for performance, sales, and booking sources to support event decisions.',
    ],
    outcomes: [
      {
        value: '175',
        label: 'Attendees',
        context: 'A full-capacity audience for the “Poetry Tales” event on 16 September 2026.',
      },
      {
        value: 'SAR 3,400',
        label: 'Store sales',
        context: 'The value of 136 tickets at SAR 25 each; the order record lists 135 fulfilled and one pending review.',
      },
      {
        value: '88',
        label: 'New customers',
        context: 'A new customer base identified in the event report for follow-up and retention.',
      },
    ],
    teamCredit:
      'The work was delivered with the Samawah team and Jalas Majlis partners; this case study presents my role in marketing, operational system development, and reporting.',
    challenge:
      'Keeping pace with growing demand while sales and attendance data were fragmented, and creating a simpler journey from ticket purchase to validation at the venue entrance.',
    approach:
      'I connected Salla store data to individual QR-code tickets, contributed to campaign and communication-channel operations, and then organized attendance and sales metrics into trackable reports.',
    imageAlt: 'Cover image for the Jalas Cultural Majlis project',
  },
];

export function getProjects(locale: 'ar' | 'en'): Project[] {
  return locale === 'en' ? englishProjects : projects;
}

export const projectTags = [
  'الكل',
  'تسويق رقمي',
  'أتمتة',
  'تحليل أداء',
  'رصد إعلامي',
  'تطوير منصات',
  'تسويق فعاليات',
  'تجارة إلكترونية',
  'أتمتة تشغيلية',
];
