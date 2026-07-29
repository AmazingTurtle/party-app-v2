import { describe, expect, it } from 'vitest';
import {
  getCardAssetUrl,
  getCardLabel,
  getCardRank,
  getCardSuit,
  standardDeck,
} from './playing-cards';

describe('standard playing cards', () => {
  it('contains every rank and suit exactly once', () => {
    expect(standardDeck).toHaveLength(52);
    expect(new Set(standardDeck).size).toBe(52);

    for (const rank of [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
    ]) {
      expect(
        standardDeck.filter((card) => getCardRank(card) === rank),
      ).toHaveLength(4);
    }
  });

  it('owns stable asset URLs and German accessible labels', () => {
    expect(getCardAssetUrl('1c')).toBe('/cards/1c.svg');
    expect(getCardLabel('1c')).toBe('Ass Kreuz');
    expect(getCardLabel('12h')).toBe('Dame Herz');
    expect(getCardLabel('13s')).toBe('König Pik');
    expect(getCardSuit('10d')).toBe('d');
  });
});
