'use client';

import { useCallback, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ColorTransition } from '@/_components/color-transition';
import {
  getCardAssetUrl,
  getCardLabel,
  getCardRank,
  standardDeck,
  type CardId,
} from '@/games/playing-cards';
import { playAudio } from '@/lib/audio';
import { useRandomPool } from '@/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

export default function BigKingsCupGame() {
  const getNextCard = useRandomPool(standardDeck);

  const [card, setCard] = useState<CardId>(() => getNextCard());
  const whooshAudioRef = useRef<HTMLAudioElement>(null);
  const onClickNext = useCallback(() => {
    setCard(getNextCard());

    playAudio(whooshAudioRef.current);
  }, [getNextCard]);

  const explanation = contentJson.explain[getCardRank(card)];

  return (
    <div className="flex w-full grow items-center text-left">
      <audio src="/sounds/whoosh.mp3" ref={whooshAudioRef} />
      <ColorTransition targetColor="#180621" />
      <div className="w-full">
        <div className="relative">
          <div className="h-[330px] w-[240px]">
            <AnimatePresence>
              <motion.div
                key={card}
                role="img"
                aria-label={getCardLabel(card)}
                className="absolute inset-0 rounded-xl bg-white p-2 shadow-xl"
                initial={{
                  translateX: '-200%',
                  rotateZ: '-45deg',
                  opacity: 0.0,
                }}
                animate={{ translateX: 0, rotateZ: '0deg', opacity: 1.0 }}
                exit={{ translateX: '200%', rotateZ: '45deg', opacity: 0.0 }}
              >
                <Image
                  src={getCardAssetUrl(card)}
                  alt=""
                  fill
                  sizes="225px"
                  className="rounded-xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            <motion.div
              key={card}
              className={`absolute right-0 bottom-0 left-0 -m-8 transform rounded-xl bg-[#180621]/90 p-2 text-center text-white backdrop-blur ${outfit.className}`}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              initial={{ opacity: 0.0 }}
              animate={{ opacity: 1.0 }}
              exit={{ opacity: 0.0 }}
            >
              <div className="text-xl">{explanation.title}</div>
              <div className="mt-2 text-xs">{explanation.text}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            className="button !bg-emerald-900/50"
            onClick={onClickNext}
          >
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}
