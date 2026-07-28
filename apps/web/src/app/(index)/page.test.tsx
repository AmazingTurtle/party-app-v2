import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HomePage from './page';

vi.mock('@/_components/color-transition', () => ({
  ColorTransition: () => null,
}));

describe('home page', () => {
  it('links to every available party game', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('img', { name: 'Party App Logo' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Ich hab noch nie/i }),
    ).toHaveAttribute('href', '/games/never-have-i-ever');
    expect(
      screen.getByRole('link', { name: /Wahrheit oder Pflicht/i }),
    ).toHaveAttribute('href', '/games/truth-or-dare');
    expect(
      screen.getByRole('link', { name: /Big Kings Cup/i }),
    ).toHaveAttribute('href', '/games/big-kings-cup');
    expect(screen.getByRole('link', { name: /Gigalo/i })).toHaveAttribute(
      'href',
      '/games/gigalo',
    );
    expect(screen.getByRole('link', { name: /Bus Fahrer/i })).toHaveAttribute(
      'href',
      '/games/bus-driver',
    );
    expect(
      screen.getByRole('link', { name: /5 Sekunden Regel/i }),
    ).toHaveAttribute('href', '/games/five-seconds');
  });
});
