import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GameStage } from './game-stage';

describe('GameStage', () => {
  it('uses the complete header content as the back link', () => {
    render(
      <GameStage gameId="truth-or-dare">
        <p>Spielinhalt</p>
      </GameStage>,
    );

    const backLink = screen.getByRole('link', { name: 'Zur Startseite' });

    expect(backLink).toHaveAttribute('href', '/');
    expect(
      within(backLink).getByRole('heading', {
        name: 'Wahrheit oder Pflicht',
      }),
    ).toBeInTheDocument();
  });
});
