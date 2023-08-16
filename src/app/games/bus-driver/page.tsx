'use client';

import { useCallback, useRef, useState } from 'react';
import { CardTemplate1 } from 'party/_components/bus-driver/card-template-1';
import { CardTemplate2 } from 'party/_components/bus-driver/card-template-2';
import { CardTemplate3 } from 'party/_components/bus-driver/card-template-3';
import { CardTemplate4 } from 'party/_components/bus-driver/card-template-4';
import { ColorTransition } from 'party/_components/color-transition';
import { FlippableCard } from 'party/_components/flippable-card';
import { SvgCards } from 'party/_components/svg-cards';
import { useRandomPool } from 'party/utils/use-random-pool';
import contentJson from './content.json';

export default function Home() {
  const [getNextCard] = useRandomPool(contentJson.cards);

  const flipCardAudioRef = useRef<HTMLAudioElement>(null);
  const [cardStack, setCardStack] = useState<typeof contentJson.cards>([]);
  const [flipStates, setFlipStates] = useState<Array<boolean>>([
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
    const flipStatesCopy = [...flipStates];
    const index = flipStatesCopy.findIndex((flipState) => !flipState);

    if (flipCardAudioRef.current) {
      const clonedSound =
        flipCardAudioRef.current.cloneNode() as HTMLAudioElement;
      clonedSound.currentTime = 0.3;
      clonedSound.play();
    }

    if (index === -1 || cardStack.length === 0) {
      startGame();
      if (index === -1) return;
    }
    flipStatesCopy[index] = true;
    setFlipStates(flipStatesCopy);
  }, [cardStack.length, flipStates, startGame]);

  return (
    <div className="text-left w-full grow flex items-center">
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
        <div
          className="w-full grid grid-cols-4 gap-2 cursor-pointer"
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
        </div>
        <div className="flex justify-center mt-16">
          <button className="button !bg-emerald-900/50" onClick={startGame}>
            Neu starten
          </button>
        </div>
      </div>
    </div>
  );
}
