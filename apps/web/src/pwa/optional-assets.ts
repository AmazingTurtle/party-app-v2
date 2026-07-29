import { getCardAssetUrl, standardDeck } from '@/games/playing-cards';

const audioAssetUrls = [
  '/sounds/bing.mp3',
  '/sounds/clock-ticking.mp3',
  '/sounds/flip-card.mp3',
  '/sounds/pop.mp3',
  '/sounds/whoosh.mp3',
  '/sounds/whoosh2.mp3',
] as const;

export const optionalAssetUrls = [
  ...standardDeck.map(getCardAssetUrl),
  ...audioAssetUrls,
];
