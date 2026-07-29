'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useSerwist } from '@serwist/turbopack/react';
import { optionalAssetUrls } from './optional-assets';

declare global {
  interface Navigator {
    readonly connection?: {
      readonly effectiveType?: string;
      readonly saveData?: boolean;
    };
  }
}

const batchSize = 4;

function shouldDeferWarming(): boolean {
  const connection = navigator.connection;

  return (
    connection?.saveData === true ||
    connection?.effectiveType === 'slow-2g' ||
    connection?.effectiveType === '2g'
  );
}

export function OfflineAssetWarmer() {
  const { serwist } = useSerwist();
  const isWarmingRef = useRef(false);
  const isCompleteRef = useRef(false);

  const warmAssets = useCallback(async () => {
    if (
      serwist === null ||
      isWarmingRef.current ||
      isCompleteRef.current ||
      shouldDeferWarming()
    ) {
      return;
    }

    isWarmingRef.current = true;

    try {
      for (
        let index = 0;
        index < optionalAssetUrls.length;
        index += batchSize
      ) {
        const urlsToCache = optionalAssetUrls.slice(index, index + batchSize);

        await serwist.messageSW({
          type: 'CACHE_URLS',
          payload: { urlsToCache },
        });
      }

      isCompleteRef.current = true;
    } catch {
      // Optional offline warming retries on a later online event.
    } finally {
      isWarmingRef.current = false;
    }
  }, [serwist]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleCallbackId: number | undefined;

    const scheduleWarming = () => {
      if ('requestIdleCallback' in window) {
        idleCallbackId = window.requestIdleCallback(
          () => {
            void warmAssets();
          },
          { timeout: 2_000 },
        );
        return;
      }

      timeoutId = setTimeout(() => {
        void warmAssets();
      }, 1_000);
    };

    const handleOnline = () => {
      scheduleWarming();
    };

    if (document.readyState === 'complete') {
      scheduleWarming();
    } else {
      window.addEventListener('load', scheduleWarming, { once: true });
    }

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('load', scheduleWarming);
      window.removeEventListener('online', handleOnline);

      if (idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [warmAssets]);

  return null;
}
