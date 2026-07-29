'use client';

import { useEffect } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';

export interface RouteTintProps {
  darkColor: string;
  lightColor: string;
}

export function RouteTint({ darkColor, lightColor }: RouteTintProps) {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const targetColor = resolvedTheme === 'dark' ? darkColor : lightColor;

  useEffect(() => {
    const root = document.documentElement;
    const currentColor = getComputedStyle(root)
      .getPropertyValue('--route-tint')
      .trim();

    if (prefersReducedMotion) {
      root.style.setProperty('--route-tint', targetColor);
      return;
    }

    const controls = animate(currentColor || targetColor, targetColor, {
      duration: 0.25,
      ease: 'easeInOut',
      onUpdate(value) {
        root.style.setProperty('--route-tint', value);
      },
    });

    return () => {
      controls.stop();
    };
  }, [prefersReducedMotion, targetColor]);

  return null;
}
