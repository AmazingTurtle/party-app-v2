'use client';

import { useCallback, useRef, useState } from 'react';
import { CardTemplate1 } from '@/_components/bus-driver/card-template-1';
import { CardTemplate2 } from '@/_components/bus-driver/card-template-2';
import { CardTemplate3 } from '@/_components/bus-driver/card-template-3';
import { CardTemplate4 } from '@/_components/bus-driver/card-template-4';
import { FlippableCard } from '@/_components/flippable-card';
import { GameStage } from '@/_components/game-stage/game-stage';
import { RouteTint } from '@/_components/route-tint/route-tint';
import {
  advanceBusDriver,
  initialBusDriverState,
  startBusDriverRound,
} from '@/games/bus-driver-state';
import { standardDeck, type CardId } from '@/games/playing-cards';
import { useSessionRandomPool } from '@/games/random-pool/use-session-random-pool';
import { playAudio } from '@/lib/audio';

const cardIndexes = [0, 1, 2, 3] as const;
const cardTemplates = [
  <CardTemplate1 key="template-1" />,
  <CardTemplate2 key="template-2" />,
  <CardTemplate3 key="template-3" />,
  <CardTemplate4 key="template-4" />,
] as const;

function getCardKey(card: CardId) {
  return card;
}

export default function BusDriverPage() {
  const getNextCard = useSessionRandomPool(standardDeck, {
    getKey: getCardKey,
    id: 'bus-driver/cards',
  });

  const flipCardAudioRef = useRef<HTMLAudioElement>(null);
  const [game, setGame] = useState(initialBusDriverState);

  const handleStartGame = useCallback(() => {
    if (getNextCard === undefined) {
      return;
    }

    setGame(startBusDriverRound(getNextCard));
  }, [getNextCard]);

  const handleAdvance = useCallback(() => {
    if (getNextCard === undefined) {
      return;
    }

    setGame((currentGame) => advanceBusDriver(currentGame, getNextCard));
    playAudio(flipCardAudioRef.current, 0.3);
  }, [getNextCard]);

  return (
    <>
      <RouteTint darkColor="#66532a" lightColor="#f5e6b7" />
      <GameStage gameId="bus-driver">
        <audio src="/sounds/flip-card.mp3" ref={flipCardAudioRef} />
        <div className="w-full max-w-4xl">
          <button
            type="button"
            aria-label="Nächste Karte aufdecken"
            className="grid w-full cursor-pointer grid-cols-4 gap-2 rounded-xl sm:gap-3"
            disabled={getNextCard === undefined}
            onClick={handleAdvance}
          >
            {cardIndexes.map((index) => (
              <FlippableCard
                key={index}
                card={game.phase === 'round' ? game.cards[index] : undefined}
                isFlipped={game.phase === 'round' && index < game.revealedCount}
              >
                {cardTemplates[index]}
              </FlippableCard>
            ))}
          </button>
          <div className="mt-10 flex justify-center sm:mt-12">
            <button
              type="button"
              className="button button--secondary"
              disabled={getNextCard === undefined}
              onClick={handleStartGame}
            >
              Neu starten
            </button>
          </div>
        </div>
      </GameStage>
    </>
  );
}
