import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import BusDriverPage from './page';

vi.mock('@/_components/route-tint/route-tint', () => ({
  RouteTint: () => null,
}));

describe('Bus Fahrer', () => {
  it('deals and reveals the first card on the first card-area click', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup();

    render(<BusDriverPage />);
    expect(screen.queryAllByRole('img')).toHaveLength(0);

    await user.click(
      screen.getByRole('button', { name: 'Nächste Karte aufdecken' }),
    );

    expect(
      await screen.findByRole('img', { name: 'Ass Kreuz' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('starts a manually restarted round face down', async () => {
    const user = userEvent.setup();
    render(<BusDriverPage />);

    await user.click(screen.getByRole('button', { name: 'Neu starten' }));

    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
