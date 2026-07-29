import Link from 'next/link';
import { publishedGames, type PublishedGameId } from '@/games/game-catalog';
import { GameLinkContent } from './game-link-content';

export interface GameLinkProps {
  gameId: PublishedGameId;
}

export function GameLink({ gameId }: GameLinkProps) {
  const definition = publishedGames[gameId];
  const Icon = definition.icon;

  return (
    <Link href={definition.href} className="game-link" data-game={gameId}>
      <GameLinkContent
        title={definition.title}
        description={definition.description}
        icon={<Icon aria-hidden="true" />}
      />
    </Link>
  );
}
