'use client';

import { type ReactNode } from 'react';
import { SerwistProvider } from '@serwist/turbopack/react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { OfflineAssetWarmer } from '@/pwa/offline-asset-warmer';
import { ThemeToggle } from '@/theme/theme-toggle';

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <SerwistProvider swUrl="/serwist/sw.js" reloadOnOnline={false}>
          <OfflineAssetWarmer />
          {children}
          <ThemeToggle />
        </SerwistProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
