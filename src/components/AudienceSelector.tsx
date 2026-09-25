'use client';
import type { Locale } from '@/lib/i18n';
import { useAudience, type Audience } from './AudienceProvider';
export default function AudienceSelector({ locale }: { locale: Locale }) {
  const { audience, setAudience } = useAudience();
  const options: [Audience, string][] = locale === 'ar' ? [['hiring', 'للتوظيف'], ['client', 'لمشروع'], ['explore', 'استكشاف']] : [['hiring', 'Hiring'], ['client', 'A project'], ['explore', 'Exploring']];
  return <fieldset className="audience-selector"><legend>{locale === 'ar' ? 'هنا من أجل…' : 'Here for…'}</legend><div>{options.map(([value, label]) => <button key={value} type="button" aria-pressed={audience === value} onClick={() => setAudience(value)}>{label}</button>)}</div></fieldset>;
}
