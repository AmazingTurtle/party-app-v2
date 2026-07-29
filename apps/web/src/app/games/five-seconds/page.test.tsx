import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { animate } from 'framer-motion';
import type { ReactNode } from 'react';
import type * as FramerMotion from 'framer-motion';
import { describe, expect, it, vi } from 'vitest';
import { getCaseInsensitiveContentKey } from '@/games/random-pool/random-pool';
import contentJson from './content.json';
import FiveSecondsPage from './page';

const animation = vi.hoisted(() => ({
  countdownCompletions: [] as (() => void)[],
  promptComplete: undefined as (() => void) | undefined,
  stop: vi.fn(),
}));

vi.mock('@/_components/route-tint/route-tint', () => ({
  RouteTint: () => null,
}));

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof FramerMotion>();
  const { createElement, Fragment } = await import('react');

  function MockAnimatePresence({
    children,
  }: {
    children?: ReactNode;
  }) {
    return createElement(Fragment, null, children);
  }

  function MockMotionDiv({
    children,
    className,
    onAnimationComplete,
  }: {
    children?: ReactNode;
    className?: string;
    onAnimationComplete?: FramerMotion.MotionProps['onAnimationComplete'];
  }) {
    if (onAnimationComplete !== undefined) {
      animation.promptComplete = () => {
        onAnimationComplete('visible');
      };
    }

    return createElement('div', { className }, children);
  }

  return {
    ...actual,
    AnimatePresence: MockAnimatePresence,
    animate: vi.fn(
      (_from: unknown, _to: unknown, options: { onComplete?: () => void }) => {
        if (options.onComplete !== undefined) {
          animation.countdownCompletions.push(options.onComplete);
        }

        return { stop: animation.stop };
      },
    ),
    motion: {
      div: MockMotionDiv,
    },
  };
});

describe('5 Sekunden Regel', () => {
  it('has no case-insensitive exact prompt duplicates', () => {
    const promptKeys = contentJson.questions.map(getCaseInsensitiveContentKey);

    expect(new Set(promptKeys).size).toBe(promptKeys.length);
  });

  it('starts each timer after the new prompt is visible', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup();
    const firstPrompt = contentJson.questions[0];
    const secondPrompt = contentJson.questions.at(-1);

    if (firstPrompt === undefined || secondPrompt === undefined) {
      throw new Error('The game requires prompts.');
    }

    render(<FiveSecondsPage />);

    expect(screen.getByRole('status')).toHaveTextContent('Timer bereit');
    await user.click(screen.getByRole('button', { name: 'Starten' }));

    expect(await screen.findByText(firstPrompt)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Weiter' })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Neue Frage wird angezeigt',
    );
    expect(animate).not.toHaveBeenCalled();

    act(() => {
      animation.promptComplete?.();
    });

    expect(screen.getByRole('status')).toHaveTextContent(
      'Fünf-Sekunden-Timer läuft',
    );
    expect(screen.getByRole('button', { name: 'Weiter' })).toBeEnabled();
    expect(animate).toHaveBeenCalledOnce();

    const firstCountdownComplete = animation.countdownCompletions[0];

    await user.click(screen.getByRole('button', { name: 'Weiter' }));

    expect(await screen.findByText(secondPrompt)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Neue Frage wird angezeigt',
    );
    expect(animate).toHaveBeenCalledOnce();

    act(() => {
      firstCountdownComplete?.();
    });
    expect(screen.getByRole('status')).toHaveTextContent(
      'Neue Frage wird angezeigt',
    );

    act(() => {
      animation.promptComplete?.();
    });
    expect(screen.getByRole('status')).toHaveTextContent(
      'Fünf-Sekunden-Timer läuft',
    );
    expect(animate).toHaveBeenCalledTimes(2);

    act(() => {
      animation.countdownCompletions[1]?.();
    });
    expect(screen.getByRole('status')).toHaveTextContent('Zeit abgelaufen');
  });
});
