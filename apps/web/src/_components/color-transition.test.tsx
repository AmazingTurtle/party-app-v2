import { render } from '@testing-library/react';
import type * as FramerMotion from 'framer-motion';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ColorTransition } from './color-transition';

const animation = vi.hoisted(() => ({
  from: '',
  stop: vi.fn(),
  to: '',
}));

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof FramerMotion>();

  return {
    ...actual,
    animate: vi.fn(
      (
        from: string,
        to: string,
        options: { onUpdate: (value: string) => void },
      ) => {
        animation.from = from;
        animation.to = to;
        options.onUpdate(to);
        return { stop: animation.stop };
      },
    ),
    useReducedMotion: () => false,
  };
});

describe('ColorTransition', () => {
  beforeEach(() => {
    document.documentElement.style.setProperty(
      '--background-start-hex',
      '#0a1012',
    );
  });

  it('animates a changed target from the current computed color', () => {
    const { rerender } = render(<ColorTransition targetColor="#101f4c" />);

    expect(animation.from).toBe('#0a1012');
    expect(animation.to).toBe('#101f4c');

    rerender(<ColorTransition targetColor="#450c24" />);

    expect(animation.stop).toHaveBeenCalledOnce();
    expect(animation.from).toBe('#101f4c');
    expect(animation.to).toBe('#450c24');
  });
});
