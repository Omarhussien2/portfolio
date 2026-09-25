'use client';
import { createContext, useContext, useEffect, useState } from 'react';
export type Audience = 'explore' | 'hiring' | 'client';
const AudienceContext = createContext<{ audience: Audience; setAudience: (value: Audience) => void }>({ audience: 'explore', setAudience: () => {} });
export default function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, updateAudience] = useState<Audience>('explore');
  useEffect(() => {
    try { const stored = sessionStorage.getItem('portfolio-audience'); if (stored === 'hiring' || stored === 'client' || stored === 'explore') updateAudience(stored); } catch { /* Storage may be unavailable. */ }
  }, []);
  const setAudience = (value: Audience) => { updateAudience(value); try { sessionStorage.setItem('portfolio-audience', value); } catch { /* Keep in-memory choice. */ } };
  return <AudienceContext.Provider value={{ audience, setAudience }}>{children}</AudienceContext.Provider>;
}
export const useAudience = () => useContext(AudienceContext);
