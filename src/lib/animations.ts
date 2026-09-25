// تكوينات الأنيميشن المركزية
export const EASE = {
  smooth: 'power3.out',
  elastic: 'elastic.out(1, 0.5)',
  bounce: 'bounce.out',
  expo: 'expo.out',
  circ: 'circ.out',
  back: 'back.out(1.7)',
  custom: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  verySlow: 1.5,
} as const;

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// تأثيرات الدخول
export const fadeInUp = {
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0, duration: DURATION.slow, ease: EASE.smooth },
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: DURATION.normal, ease: EASE.smooth },
};

export const scaleIn = {
  from: { scale: 0.8, opacity: 0 },
  to: { scale: 1, opacity: 1, duration: DURATION.normal, ease: EASE.smooth },
};

export const slideInRight = {
  from: { x: 100, opacity: 0 },
  to: { x: 0, opacity: 1, duration: DURATION.slow, ease: EASE.smooth },
};

export const slideInLeft = {
  from: { x: -100, opacity: 0 },
  to: { x: 0, opacity: 1, duration: DURATION.slow, ease: EASE.smooth },
};

// أنيميشن الحروف
export const charReveal = {
  from: { opacity: 0, y: '100%' },
  to: {
    opacity: 1,
    y: '0%',
    duration: DURATION.normal,
    ease: EASE.smooth,
    stagger: STAGGER.fast,
  },
};

// تأثيرات الكيرسور
export const cursorExpand = {
  scale: 2.5,
  duration: DURATION.fast,
  ease: EASE.smooth,
};

export const cursorShrink = {
  scale: 1,
  duration: DURATION.fast,
  ease: EASE.smooth,
};

// Hero text rotation words
export const heroWords = [
  'علامات تجارية',
  'منتجات رقمية',
  'تجارب تفاعلية',
  'مواقع إلكترونية',
  'تطبيقات ذكية',
];
