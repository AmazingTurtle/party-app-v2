import { describe, expect, it } from 'vitest';
import { optionalAssetUrls } from './optional-assets';

describe('optional offline assets', () => {
  it('contains every card and sound exactly once', () => {
    expect(optionalAssetUrls).toHaveLength(58);
    expect(new Set(optionalAssetUrls).size).toBe(optionalAssetUrls.length);
    expect(optionalAssetUrls).toContain('/cards/1c.svg');
    expect(optionalAssetUrls).toContain('/cards/13s.svg');
    expect(optionalAssetUrls).toContain('/sounds/clock-ticking.mp3');
  });
});
