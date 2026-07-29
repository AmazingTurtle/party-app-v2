'use client';

import { type ReactNode } from 'react';
import { SerwistProvider } from '@serwist/turbopack/react';
import { MotionConfig } from 'framer-motion';
import { OfflineAssetWarmer } from '@/pwa/offline-asset-warmer';

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <SerwistProvider swUrl="/serwist/sw.js" reloadOnOnline={false}>
        <OfflineAssetWarmer />
        {children}
      </SerwistProvider>
    </MotionConfig>
  );
}
