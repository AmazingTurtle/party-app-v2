export type CardRank =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13';

export type CardSuit = 'c' | 'd' | 'h' | 's';
export type CardId = `${CardRank}${CardSuit}`;

export const standardDeck = [
  '1c',
  '1d',
  '1h',
  '1s',
  '2c',
  '2d',
  '2h',
  '2s',
  '3c',
  '3d',
  '3h',
  '3s',
  '4c',
  '4d',
  '4h',
  '4s',
  '5c',
  '5d',
  '5h',
  '5s',
  '6c',
  '6d',
  '6h',
  '6s',
  '7c',
  '7d',
  '7h',
  '7s',
  '8c',
  '8d',
  '8h',
  '8s',
  '9c',
  '9d',
  '9h',
  '9s',
  '10c',
  '10d',
  '10h',
  '10s',
  '11c',
  '11d',
  '11h',
  '11s',
  '12c',
  '12d',
  '12h',
  '12s',
  '13c',
  '13d',
  '13h',
  '13s',
] as const satisfies readonly CardId[];

const rankLabels: Record<CardRank, string> = {
  '1': 'Ass',
  '2': 'Zwei',
  '3': 'Drei',
  '4': 'Vier',
  '5': 'Fünf',
  '6': 'Sechs',
  '7': 'Sieben',
  '8': 'Acht',
  '9': 'Neun',
  '10': 'Zehn',
  '11': 'Bube',
  '12': 'Dame',
  '13': 'König',
};

const suitLabels: Record<CardSuit, string> = {
  c: 'Kreuz',
  d: 'Karo',
  h: 'Herz',
  s: 'Pik',
};

export function getCardRank(card: CardId): CardRank {
  const rank = card.slice(0, -1);

  switch (rank) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '10':
    case '11':
    case '12':
    case '13':
      return rank;
    default:
      throw new Error(`Invalid card rank in ${card}.`);
  }
}

export function getCardSuit(card: CardId): CardSuit {
  const suit = card.at(-1);

  switch (suit) {
    case 'c':
    case 'd':
    case 'h':
    case 's':
      return suit;
    default:
      throw new Error(`Invalid card suit in ${card}.`);
  }
}

export function getCardAssetUrl(card: CardId): string {
  return `/cards/${card}.svg`;
}

export function getCardLabel(card: CardId): string {
  return `${rankLabels[getCardRank(card)]} ${suitLabels[getCardSuit(card)]}`;
}
