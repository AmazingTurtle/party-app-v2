import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type * as FramerMotion from 'framer-motion';
import { describe, expect, it, vi } from 'vitest';
import contentJson from './content.json';
import FiveSecondsPage from './page';

const animation = vi.hoisted(() => ({
  complete: undefined as (() => void) | undefined,
  stop: vi.fn(),
}));

vi.mock('@/_components/color-transition', () => ({
  ColorTransition: () => null,
}));

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof FramerMotion>();

  return {
    ...actual,
    animate: vi.fn(
      (_from: unknown, _to: unknown, options: { onComplete?: () => void }) => {
        animation.complete = options.onComplete;
        return { stop: animation.stop };
      },
    ),
  };
});

describe('5 Sekunden Regel', () => {
  it('moves from ready to running and announces expiry once', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup();
    const firstPrompt = contentJson.questions[0];

    if (firstPrompt === undefined) {
      throw new Error('The game requires a prompt.');
    }

    render(<FiveSecondsPage />);

    expect(screen.getByRole('status')).toHaveTextContent('Timer bereit');
    await user.click(screen.getByRole('button', { name: 'Starten' }));

    expect(await screen.findByText(firstPrompt)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Fünf-Sekunden-Timer läuft',
    );

    act(() => {
      animation.complete?.();
    });
    expect(screen.getByRole('status')).toHaveTextContent('Zeit abgelaufen');
  });
});
