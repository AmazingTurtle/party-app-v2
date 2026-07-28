'use client';

import { useCallback, useRef, useState } from 'react';
import { CardTemplate1 } from '@/_components/bus-driver/card-template-1';
import { CardTemplate2 } from '@/_components/bus-driver/card-template-2';
import { CardTemplate3 } from '@/_components/bus-driver/card-template-3';
import { CardTemplate4 } from '@/_components/bus-driver/card-template-4';
import { ColorTransition } from '@/_components/color-transition';
import { FlippableCard } from '@/_components/flippable-card';
import { SvgCards } from '@/_components/svg-cards';
import { playAudioClone } from '@/lib/audio';
import { useRandomPool } from '@/utils/use-random-pool';
import contentJson from './content.json';

type CardStack = readonly [
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
];

type FlipStates = [boolean, boolean, boolean, boolean];

const emptyCardStack: CardStack = [undefined, undefined, undefined, undefined];

export default function Home() {
  const [getNextCard] = useRandomPool(contentJson.cards);

  const flipCardAudioRef = useRef<HTMLAudioElement>(null);
  const [cardStack, setCardStack] = useState<CardStack>(emptyCardStack);
  const [flipStates, setFlipStates] = useState<FlipStates>([
    false,
    false,
    false,
    false,
  ]);

  const startGame = useCallback(() => {
    setCardStack([getNextCard(), getNextCard(), getNextCard(), getNextCard()]);
    setFlipStates([false, false, false, false]);
  }, [getNextCard]);

  const doFlip = useCallback(() => {
    // slowly fill the flipStates array with true values, if the array is full, use startGame
    const flipStatesCopy: FlipStates = [...flipStates];
    const index = flipStatesCopy.findIndex((flipState) => !flipState);

    playAudioClone(flipCardAudioRef.current, 0.3);

    if (index === -1 || cardStack[0] === undefined) {
      startGame();
      if (index === -1) return;
    }
    flipStatesCopy[index] = true;
    setFlipStates(flipStatesCopy);
  }, [cardStack, flipStates, startGame]);

  return (
    <div className="flex w-full grow items-center text-left">
      <audio
        src="/sounds/flip-card.mp3"
        autoPlay={false}
        ref={flipCardAudioRef}
      />
      <ColorTransition targetColor={'#121004'} />
      <div className="hidden">
        <SvgCards />
      </div>
      <div>
        <button
          type="button"
          aria-label="Nächste Karte aufdecken"
          className="grid w-full cursor-pointer grid-cols-4 gap-2"
          onClick={doFlip}
        >
          <FlippableCard card={cardStack[0]} isFlipped={flipStates[0]}>
            <CardTemplate1 />
          </FlippableCard>
          <FlippableCard card={cardStack[1]} isFlipped={flipStates[1]}>
            <CardTemplate2 />
          </FlippableCard>
          <FlippableCard card={cardStack[2]} isFlipped={flipStates[2]}>
            <CardTemplate3 />
          </FlippableCard>
          <FlippableCard card={cardStack[3]} isFlipped={flipStates[3]}>
            <CardTemplate4 />
          </FlippableCard>
        </button>
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            className="button !bg-emerald-900/50"
            onClick={startGame}
          >
            Neu starten
          </button>
        </div>
      </div>
    </div>
  );
}
