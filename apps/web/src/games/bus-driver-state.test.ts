import { describe, expect, it } from 'vitest';
import {
  advanceBusDriver,
  initialBusDriverState,
  startBusDriverRound,
} from './bus-driver-state';
import type { CardId } from './playing-cards';

function createCardSource(): () => CardId {
  const cards: CardId[] = ['1c', '2c', '3c', '4c', '5c', '6c', '7c', '8c'];

  return () => {
    const card = cards.shift();

    if (card === undefined) {
      throw new Error('The test card source is empty.');
    }

    return card;
  };
}

describe('Bus Fahrer transitions', () => {
  it('deals and reveals the first card on the first card-area click', () => {
    const game = advanceBusDriver(initialBusDriverState, createCardSource());

    expect(game).toStrictEqual({
      phase: 'round',
      cards: ['1c', '2c', '3c', '4c'],
      revealedCount: 1,
    });
  });

  it('reveals one card per click and deals a face-down round after card four', () => {
    const nextCard = createCardSource();
    let game = advanceBusDriver(initialBusDriverState, nextCard);

    game = advanceBusDriver(game, nextCard);
    game = advanceBusDriver(game, nextCard);
    game = advanceBusDriver(game, nextCard);
    expect(game).toMatchObject({ phase: 'round', revealedCount: 4 });

    expect(advanceBusDriver(game, nextCard)).toStrictEqual({
      phase: 'round',
      cards: ['5c', '6c', '7c', '8c'],
      revealedCount: 0,
    });
  });

  it('starts a new round face down from the restart command', () => {
    expect(startBusDriverRound(createCardSource())).toStrictEqual({
      phase: 'round',
      cards: ['1c', '2c', '3c', '4c'],
      revealedCount: 0,
    });
  });
});
