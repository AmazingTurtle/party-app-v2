import { render } from '@testing-library/react';
import type * as FramerMotion from 'framer-motion';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RouteTint } from './route-tint';

const animation = vi.hoisted(() => ({
  from: '',
  stop: vi.fn(),
  to: '',
}));
const theme = vi.hoisted(() => ({
  isDark: true,
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

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: theme.isDark ? 'dark' : 'light',
  }),
}));

describe('RouteTint', () => {
  beforeEach(() => {
    animation.stop.mockClear();
    theme.isDark = true;
    document.documentElement.style.setProperty('--route-tint', '#172429');
  });

  it('animates theme changes from the current route tint', () => {
    const { rerender } = render(
      <RouteTint darkColor="#274fa3" lightColor="#cbd9ff" />,
    );

    expect(animation.from).toBe('#172429');
    expect(animation.to).toBe('#274fa3');

    theme.isDark = false;
    rerender(<RouteTint darkColor="#274fa3" lightColor="#cbd9ff" />);

    expect(animation.stop).toHaveBeenCalledOnce();
    expect(animation.from).toBe('#274fa3');
    expect(animation.to).toBe('#cbd9ff');
  });
});
