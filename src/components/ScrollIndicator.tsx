'use client';

import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
