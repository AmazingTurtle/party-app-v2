import { describe, expect, it } from 'vitest';
import { games, publishedGameIds, publishedGames } from './game-catalog';

describe('game catalog', () => {
  it('publishes every launcher game once and keeps unavailable games hidden', () => {
    expect(new Set(publishedGameIds).size).toBe(publishedGameIds.length);
    expect(publishedGameIds).not.toContain('gigalo');

    for (const gameId of publishedGameIds) {
      expect(publishedGames[gameId]).toMatchObject({
        href: `/games/${gameId}`,
        title: games[gameId].title,
      });
    }
  });
});
