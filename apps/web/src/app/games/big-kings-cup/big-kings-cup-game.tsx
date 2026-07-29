'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import { GameStage } from '@/_components/game-stage/game-stage';
import { RouteTint } from '@/_components/route-tint/route-tint';
import {
  getCardAssetUrl,
  getCardLabel,
  getCardRank,
  standardDeck,
  type CardId,
} from '@/games/playing-cards';
import { useSessionRandomPool } from '@/games/random-pool/use-session-random-pool';
import { playAudio } from '@/lib/audio';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

function getCardKey(card: CardId) {
  return card;
}

export default function BigKingsCupGame() {
  const getNextCard = useSessionRandomPool(standardDeck, {
    getKey: getCardKey,
    id: 'big-kings-cup/cards',
  });

  const [card, setCard] = useState<CardId>();
  const hasInitialCardRef = useRef(false);
  const whooshAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (getNextCard === undefined || hasInitialCardRef.current) {
      return;
    }

    hasInitialCardRef.current = true;
    setCard(getNextCard());
  }, [getNextCard]);

  const onClickNext = useCallback(() => {
    if (getNextCard === undefined) {
      return;
    }

    setCard(getNextCard());

    playAudio(whooshAudioRef.current);
  }, [getNextCard]);

  const explanation =
    card === undefined ? undefined : contentJson.explain[getCardRank(card)];
  const cardLabel = card === undefined ? undefined : getCardLabel(card);

  return (
    <>
      <RouteTint darkColor="#4d356c" lightColor="#e5d6f6" />
      <GameStage gameId="big-kings-cup">
        <audio src="/sounds/whoosh.mp3" ref={whooshAudioRef} />
        <div className="kings-game">
          <div className="kings-game__deck">
            <button
              type="button"
              className="kings-card"
              aria-label={
                cardLabel === undefined
                  ? 'Karten werden gemischt'
                  : `Nächste Karte ziehen. Aktuelle Karte: ${cardLabel}`
              }
              disabled={getNextCard === undefined}
              onClick={onClickNext}
            >
              <AnimatePresence initial={false} mode="wait">
                {card !== undefined && (
                  <motion.span
                    key={card}
                    className="kings-card__face"
                    initial={{
                      translateX: '-150%',
                      rotateZ: '-35deg',
                      opacity: 0,
                    }}
                    animate={{ translateX: 0, rotateZ: 0, opacity: 1 }}
                    exit={{
                      translateX: '150%',
                      rotateZ: '35deg',
                      opacity: 0,
                    }}
                  >
                    <Image
                      src={getCardAssetUrl(card)}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 240px"
                      className="rounded-xl"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <span className="kings-game__hint">
              <MousePointerClick aria-hidden="true" />
              Karte antippen
            </span>
          </div>
          <div className={`kings-rule ${outfit.className}`} aria-live="polite">
            <AnimatePresence mode="wait">
              {explanation === undefined ? (
                <p>Karten werden gemischt …</p>
              ) : (
                <motion.div
                  key={card}
                  className="kings-rule__content"
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  initial={{ opacity: 0, translateY: 8 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -8 }}
                >
                  <h2>{explanation.title}</h2>
                  <p>{explanation.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GameStage>
    </>
  );
}
