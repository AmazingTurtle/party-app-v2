'use client';

import { useEffect } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

export interface ColorTransitionProps {
  targetColor: string;
}

export function ColorTransition({ targetColor }: ColorTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const currentColor = getComputedStyle(root)
      .getPropertyValue('--background-start-hex')
      .trim();

    if (prefersReducedMotion) {
      root.style.setProperty('--background-start-hex', targetColor);
      return;
    }

    const controls = animate(currentColor || targetColor, targetColor, {
      duration: 0.25,
      ease: 'easeInOut',
      onUpdate(value) {
        root.style.setProperty('--background-start-hex', value);
      },
    });

    return () => {
      controls.stop();
    };
  }, [prefersReducedMotion, targetColor]);

  return null;
}
