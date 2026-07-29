import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import BigKingsCupGame from './big-kings-cup-game';

vi.mock('@/_components/route-tint/route-tint', () => ({
  RouteTint: () => null,
}));

describe('Big Kings Cup', () => {
  it('draws the next card through the accessible card control', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup();

    const { container } = render(<BigKingsCupGame />);

    const firstCard = screen.getByRole('button', {
      name: 'Nächste Karte ziehen. Aktuelle Karte: Ass Kreuz',
    });
    expect(container.querySelectorAll('img[src*="/cards/"]')).toHaveLength(1);
    expect(
      screen.queryByRole('button', { name: 'Weiter' }),
    ).not.toBeInTheDocument();

    await user.click(firstCard);

    expect(
      await screen.findByRole('button', {
        name: 'Nächste Karte ziehen. Aktuelle Karte: König Pik',
      }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('img[src*="/cards/"]')).toHaveLength(1);
  });
});
