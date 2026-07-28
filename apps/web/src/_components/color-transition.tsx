'use client';

import { useMemo } from 'react';
import { useMotionValueEvent, useTime, useTransform } from 'framer-motion';

export interface ColorTransitionProps {
  targetColor: string;
}

export function ColorTransition({ targetColor }: ColorTransitionProps) {
  const time = useTime();
  const currentColor = useMemo(() => {
    return typeof document !== 'undefined'
      ? document.documentElement.style.getPropertyValue(
          '--background-start-hex',
        )
      : '#0a1012';
  }, []);
  const transitionColor = useTransform(
    time,
    [0, 250],
    [currentColor, targetColor],
    { clamp: true },
  );

  useMotionValueEvent(transitionColor, 'change', (value) => {
    document.documentElement.style.setProperty('--background-start-hex', value);
  });
  return null;
}
