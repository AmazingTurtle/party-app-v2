import { type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { games, type GameId } from '@/games/game-catalog';

export interface GameStageProps {
  children: ReactNode;
  gameId: GameId;
}

export function GameStage({ children, gameId }: GameStageProps) {
  const definition = games[gameId];
  const Icon = definition.icon;
  const headingId = `${gameId}-heading`;

  return (
    <section
      className="game-stage"
      data-game={gameId}
      aria-labelledby={headingId}
    >
      <header className="game-stage__header">
        <Link
          href="/"
          className="game-stage__header-link"
          aria-label="Zur Startseite"
        >
          <span className="game-stage__back">
            <ArrowLeft aria-hidden="true" />
          </span>
          <span className="game-stage__icon">
            <Icon aria-hidden="true" />
          </span>
          <h1 id={headingId}>{definition.title}</h1>
        </Link>
      </header>
      <div className="game-stage__body">{children}</div>
    </section>
  );
}
