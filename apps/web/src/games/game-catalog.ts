import {
  BusFront,
  Construction,
  Crown,
  MessagesSquare,
  Shuffle,
  Timer,
  type LucideIcon,
} from 'lucide-react';

export type PublishedGameId =
  | 'never-have-i-ever'
  | 'truth-or-dare'
  | 'big-kings-cup'
  | 'bus-driver'
  | 'five-seconds';

export type GameId = PublishedGameId | 'gigalo';

export interface GameDefinition {
  href: string;
  icon: LucideIcon;
  title: string;
}

export interface PublishedGameDefinition extends GameDefinition {
  description: string;
}

export const publishedGameIds: readonly PublishedGameId[] = [
  'never-have-i-ever',
  'truth-or-dare',
  'big-kings-cup',
  'bus-driver',
  'five-seconds',
];

export const publishedGames: Readonly<
  Record<PublishedGameId, PublishedGameDefinition>
> = {
  'never-have-i-ever': {
    href: '/games/never-have-i-ever',
    icon: MessagesSquare,
    title: 'Ich hab noch nie',
    description:
      'Der Klassiker unter den Trinkspielen. Einfach, schnell und lustig.',
  },
  'truth-or-dare': {
    href: '/games/truth-or-dare',
    icon: Shuffle,
    title: 'Wahrheit oder Pflicht',
    description: 'Das Spiel für die etwas Mutigeren unter euch.',
  },
  'big-kings-cup': {
    href: '/games/big-kings-cup',
    icon: Crown,
    title: 'Big Kings Cup',
    description: 'Funktioniert besser mit mehr Leuten.',
  },
  'bus-driver': {
    href: '/games/bus-driver',
    icon: BusFront,
    title: 'Bus Fahrer',
    description:
      'Schnell betrunken werden? Dann ist das Spiel genau das Richtige für dich.',
  },
  'five-seconds': {
    href: '/games/five-seconds',
    icon: Timer,
    title: '5 Sekunden Regel',
    description:
      'Beantworte die Fragen in 5 Sekunden. Klingt einfach? Ist es nicht.',
  },
};

export const games: Readonly<Record<GameId, GameDefinition>> = {
  ...publishedGames,
  gigalo: {
    href: '/games/gigalo',
    icon: Construction,
    title: 'Gigalo',
  },
};
