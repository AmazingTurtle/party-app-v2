import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import BigKingsCupGame from './big-kings-cup-game';

vi.mock('@/_components/color-transition', () => ({
  ColorTransition: () => null,
}));

describe('Big Kings Cup', () => {
  it('loads one accessible card asset at a time', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup();

    render(<BigKingsCupGame />);

    const firstCard = screen.getByRole('img', { name: 'Ass Kreuz' });
    expect(firstCard).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Weiter' }));

    expect(
      await screen.findByRole('img', { name: 'König Pik' }),
    ).toBeInTheDocument();
  });
});
