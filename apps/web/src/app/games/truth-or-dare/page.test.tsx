import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type * as FramerMotion from 'framer-motion';
import { describe, expect, it, vi } from 'vitest';
import contentJson from './content.json';
import TruthOrDarePage from './page';

vi.mock('@/_components/color-transition', () => ({
  ColorTransition: () => null,
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

describe('Wahrheit oder Pflicht', () => {
  it('starts with a meaningful choice instead of a blank prompt', () => {
    render(<TruthOrDarePage />);

    expect(screen.getByText('Wahrheit oder Pflicht?')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Wahrheit' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pflicht' })).toBeInTheDocument();
  });

  it('shows a typed truth prompt after the player chooses truth', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup();
    const firstTruth = contentJson.truth[0];

    if (firstTruth === undefined) {
      throw new Error('The game requires a truth prompt.');
    }

    render(<TruthOrDarePage />);
    await user.click(screen.getByRole('button', { name: 'Wahrheit' }));

    expect(screen.getAllByText('Wahrheit')).toHaveLength(2);
    expect(screen.getByText(firstTruth)).toBeInTheDocument();
  });
});
