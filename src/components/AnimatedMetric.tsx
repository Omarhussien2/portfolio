'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

const NUMBER_PATTERN = /\d[\d,.]*/;
const NUMBER_STYLE: CSSProperties = {
  direction: 'ltr',
  fontFamily: 'Arial, sans-serif',
  fontVariantNumeric: 'tabular-nums',
};
const SCREEN_READER_ONLY: CSSProperties = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0,
};

function splitMetric(value: string) {
  const match = NUMBER_PATTERN.exec(value);
  if (!match) return null;
  const number = match[0];
  return { prefix: value.slice(0, match.index), number, suffix: value.slice(match.index + number.length) };
}

function numberFormatter(source: string) {
  const decimals = source.includes('.') ? source.split('.')[1].length : 0;
  return new Intl.NumberFormat('en-US', {
    useGrouping: source.includes(','),
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function NumericCounter({ source }: { source: string }) {
  const [displayNumber, setDisplayNumber] = useState(source);
  const numberRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const number = numberRef.current;
    const target = Number(source.replaceAll(',', ''));
    const formatter = numberFormatter(source);
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;

    const showFinalValue = () => {
      observer?.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      setDisplayNumber(source);
      hasAnimated.current = true;
    };
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) showFinalValue();
    };

    motionPreference.addEventListener('change', handleMotionPreference);
    if (!number || !Number.isFinite(target) || motionPreference.matches || !('IntersectionObserver' in window)) {
      showFinalValue();
      return () => motionPreference.removeEventListener('change', handleMotionPreference);
    }

    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return;
      hasAnimated.current = true;
      observer?.disconnect();
      const duration = 1100;
      const startedAt = performance.now();
      setDisplayNumber(formatter.format(0));

      const update = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayNumber(progress === 1 ? source : formatter.format(target * eased));
        if (progress < 1) frameRef.current = requestAnimationFrame(update);
        else frameRef.current = null;
      };
      frameRef.current = requestAnimationFrame(update);
    }, { threshold: 0.15 });

    observer.observe(number);
    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener('change', handleMotionPreference);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [source]);

  return (
    <span style={{ display: 'inline-grid', whiteSpace: 'nowrap' }}>
      <bdi aria-hidden="true" className="animated-metric-number" style={{ ...NUMBER_STYLE, gridArea: '1 / 1', visibility: 'hidden' }}>{source}</bdi>
      <bdi ref={numberRef} className="animated-metric-number" style={{ ...NUMBER_STYLE, gridArea: '1 / 1' }}>{displayNumber}</bdi>
    </span>
  );
}

export default function AnimatedMetric({ value }: { value: string }) {
  const parts = splitMetric(value);
  if (!parts) return <span>{value}</span>;

  return (
    <span className="animated-metric" style={{ position: 'relative' }}>
      <span aria-hidden="true">{parts.prefix}<NumericCounter key={parts.number} source={parts.number} />{parts.suffix}</span>
      <span style={SCREEN_READER_ONLY}>{value}</span>
    </span>
  );
}
