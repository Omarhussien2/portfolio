'use client';

import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [updatePosition]);

  return position;
}
