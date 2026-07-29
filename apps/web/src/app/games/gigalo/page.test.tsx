import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GigaloPage from './page';

vi.mock('@/_components/color-transition', () => ({
  ColorTransition: () => null,
}));

describe('Gigalo', () => {
  it('keeps the direct unavailable route intact', () => {
    render(<GigaloPage />);

    expect(
      screen.getByText('Das Spiel Gigalo gibt es leider noch nicht.'),
    ).toBeInTheDocument();
  });
});
