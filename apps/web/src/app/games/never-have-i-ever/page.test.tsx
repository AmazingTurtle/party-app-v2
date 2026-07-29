import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type * as FramerMotion from 'framer-motion';
import { describe, expect, it, vi } from 'vitest';
import { getCaseInsensitiveContentKey } from '@/games/random-pool/random-pool';
import contentJson from './content.json';
import NeverHaveIEverPage from './page';

vi.mock('@/_components/route-tint/route-tint', () => ({
  RouteTint: () => null,
}));

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof FramerMotion>();

  return {
    ...actual,
    useTime: () => ({
      get: () => 1_000,
    }),
  };
});

describe('Never Have I Ever', () => {
  it('has no case-insensitive exact prompt duplicates', () => {
    const promptKeys = contentJson.questions.map(({ question }) =>
      getCaseInsensitiveContentKey(question),
    );

    expect(new Set(promptKeys).size).toBe(promptKeys.length);
  });

  it('shows a different prompt when the player continues', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup();
    const firstQuestion = contentJson.questions[0];
    const nextQuestion = contentJson.questions.at(-1);

    if (firstQuestion === undefined || nextQuestion === undefined) {
      throw new Error('The game requires prompts.');
    }

    render(<NeverHaveIEverPage />);

    expect(await screen.findByText(firstQuestion.question)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Weiter' }));

    expect(await screen.findByText(nextQuestion.question)).toBeInTheDocument();
  });
});
