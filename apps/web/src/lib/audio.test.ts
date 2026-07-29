import { describe, expect, it, vi } from 'vitest';
import { playAudio, stopAudio } from './audio';

describe('audio controls', () => {
  it('resets and reuses the provided audio element', () => {
    const audio = document.createElement('audio');
    const play = vi.spyOn(audio, 'play').mockResolvedValue();
    audio.currentTime = 4;

    playAudio(audio, 0.1);

    expect(audio.currentTime).toBe(0.1);
    expect(play).toHaveBeenCalledOnce();
  });

  it('treats rejected browser playback as harmless', async () => {
    const audio = document.createElement('audio');
    vi.spyOn(audio, 'play').mockRejectedValue(
      new DOMException('Blocked', 'NotAllowedError'),
    );

    expect(() => playAudio(audio)).not.toThrow();
    await Promise.resolve();
  });

  it('stops and rewinds an active element', () => {
    const audio = document.createElement('audio');
    const pause = vi.spyOn(audio, 'pause');
    audio.currentTime = 3;

    stopAudio(audio);

    expect(pause).toHaveBeenCalledOnce();
    expect(audio.currentTime).toBe(0);
  });
});
