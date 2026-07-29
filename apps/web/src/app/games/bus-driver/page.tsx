'use client';

import { useCallback, useRef, useState } from 'react';
import { CardTemplate1 } from '@/_components/bus-driver/card-template-1';
import { CardTemplate2 } from '@/_components/bus-driver/card-template-2';
import { CardTemplate3 } from '@/_components/bus-driver/card-template-3';
import { CardTemplate4 } from '@/_components/bus-driver/card-template-4';
import { ColorTransition } from '@/_components/color-transition';
import { FlippableCard } from '@/_components/flippable-card';
import {
  advanceBusDriver,
  initialBusDriverState,
  startBusDriverRound,
} from '@/games/bus-driver-state';
import { standardDeck } from '@/games/playing-cards';
import { playAudio } from '@/lib/audio';
import { useRandomPool } from '@/utils/use-random-pool';

const cardIndexes = [0, 1, 2, 3] as const;
const cardTemplates = [
  <CardTemplate1 key="template-1" />,
  <CardTemplate2 key="template-2" />,
  <CardTemplate3 key="template-3" />,
  <CardTemplate4 key="template-4" />,
] as const;

export default function BusDriverPage() {
  const getNextCard = useRandomPool(standardDeck);

  const flipCardAudioRef = useRef<HTMLAudioElement>(null);
  const [game, setGame] = useState(initialBusDriverState);

  const handleStartGame = useCallback(() => {
    setGame(startBusDriverRound(getNextCard));
  }, [getNextCard]);

  const handleAdvance = useCallback(() => {
    setGame((currentGame) => advanceBusDriver(currentGame, getNextCard));
    playAudio(flipCardAudioRef.current, 0.3);
  }, [getNextCard]);

  return (
    <div className="flex w-full grow items-center text-left">
      <audio src="/sounds/flip-card.mp3" ref={flipCardAudioRef} />
      <ColorTransition targetColor={'#121004'} />
      <div>
        <button
          type="button"
          aria-label="Nächste Karte aufdecken"
          className="grid w-full cursor-pointer grid-cols-4 gap-2"
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
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            className="button !bg-emerald-900/50"
            onClick={handleStartGame}
          >
            Neu starten
          </button>
        </div>
      </div>
    </div>
  );
}
