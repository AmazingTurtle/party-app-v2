import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { OfflineAssetWarmer } from './offline-asset-warmer';
import { optionalAssetUrls } from './optional-assets';

interface CacheMessage {
  type: 'CACHE_URLS';
  payload: { urlsToCache: string[] };
}

const serwist = vi.hoisted(() => ({
  messageSW: vi
    .fn<(message: CacheMessage) => Promise<boolean>>()
    .mockResolvedValue(true),
}));

vi.mock('@serwist/turbopack/react', () => ({
  useSerwist: () => ({ serwist }),
}));

function installImmediateIdleCallback() {
  window.requestIdleCallback = vi.fn((callback: IdleRequestCallback) => {
    callback({ didTimeout: false, timeRemaining: () => 50 });
    return 1;
  });
  window.cancelIdleCallback = vi.fn();
}

describe('OfflineAssetWarmer', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'connection');
    serwist.messageSW.mockClear();
  });

  it('warms optional assets silently in batches of four', async () => {
    installImmediateIdleCallback();

    render(<OfflineAssetWarmer />);

    await waitFor(() => {
      expect(serwist.messageSW).toHaveBeenCalledTimes(
        Math.ceil(optionalAssetUrls.length / 4),
      );
    });

    const warmedUrls = serwist.messageSW.mock.calls.flatMap(
      ([message]) => message.payload.urlsToCache,
    );
    expect(warmedUrls).toStrictEqual(optionalAssetUrls);
    expect(
      serwist.messageSW.mock.calls.every(
        ([message]) => message.payload.urlsToCache.length <= 4,
      ),
    ).toBe(true);
  });

  it.each([
    { effectiveType: '4g', saveData: true },
    { effectiveType: 'slow-2g', saveData: false },
    { effectiveType: '2g', saveData: false },
  ])('defers warming on a constrained connection: %o', (connection) => {
    installImmediateIdleCallback();
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: connection,
    });

    render(<OfflineAssetWarmer />);

    expect(serwist.messageSW).not.toHaveBeenCalled();
  });
});
