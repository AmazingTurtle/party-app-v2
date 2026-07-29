import type { CardId } from '@/games/playing-cards';

export type BusDriverCards = readonly [CardId, CardId, CardId, CardId];

export type BusDriverState =
  | { phase: 'idle' }
  | {
      phase: 'round';
      cards: BusDriverCards;
      revealedCount: 0 | 1 | 2 | 3 | 4;
    };

export const initialBusDriverState: BusDriverState = { phase: 'idle' };

export function dealBusDriverCards(nextCard: () => CardId): BusDriverCards {
  return [nextCard(), nextCard(), nextCard(), nextCard()];
}

export function startBusDriverRound(nextCard: () => CardId): BusDriverState {
  return {
    phase: 'round',
    cards: dealBusDriverCards(nextCard),
    revealedCount: 0,
  };
}

export function advanceBusDriver(
  state: BusDriverState,
  nextCard: () => CardId,
): BusDriverState {
  if (state.phase === 'idle') {
    return {
      phase: 'round',
      cards: dealBusDriverCards(nextCard),
      revealedCount: 1,
    };
  }

  switch (state.revealedCount) {
    case 0:
      return { ...state, revealedCount: 1 };
    case 1:
      return { ...state, revealedCount: 2 };
    case 2:
      return { ...state, revealedCount: 3 };
    case 3:
      return { ...state, revealedCount: 4 };
    case 4:
      return startBusDriverRound(nextCard);
  }
}
