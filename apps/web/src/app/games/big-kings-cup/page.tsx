'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import { AnimatePresence, motion } from 'framer-motion';
import { ColorTransition } from '@/_components/color-transition';
import { SvgCards } from '@/_components/svg-cards';
import { playAudioClone } from '@/lib/audio';
import { classNames } from '@/utils/class-names';
import { useRandomPool } from '@/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });
type CardId = keyof typeof contentJson.explain;

function isCardId(value: string): value is CardId {
  return Object.hasOwn(contentJson.explain, value);
}

export default function Home() {
  const [getNextCard] = useRandomPool(contentJson.cards);

  const [card, setCard] = useState<string | undefined>(() => getNextCard());
  const whooshAudioRef = useRef<HTMLAudioElement>(null);
  const onClickNext = useCallback(() => {
    setCard(getNextCard());

    playAudioClone(whooshAudioRef.current);
  }, [getNextCard]);

  const cardNumber = useMemo(() => {
    if (card === undefined) return undefined;
    const number = /\d+/.exec(card)?.[0];
    if (number === undefined || !isCardId(number)) return undefined;
    return number;
  }, [card]);

  return (
    <div className="flex w-full grow items-center text-left">
      <audio src="/sounds/whoosh.mp3" autoPlay={false} ref={whooshAudioRef} />
      <ColorTransition targetColor="#180621" />
      <div className="hidden">
        <SvgCards />
      </div>
      <div className="w-full">
        <div className="relative">
          <div style={{ width: 224 + 16, height: 314 + 16 }}>
            <AnimatePresence>
              <motion.div
                key={card}
                className="absolute top-0 right-0 bottom-0 left-0 rounded-xl bg-white p-2 shadow-xl"
                initial={{
                  translateX: '-200%',
                  rotateZ: '-45deg',
                  opacity: 0.0,
                }}
                animate={{ translateX: 0, rotateZ: '0deg', opacity: 1.0 }}
                exit={{ translateX: '200%', rotateZ: '45deg', opacity: 0.0 }}
              >
                <svg width="100%" height="100%" viewBox="0 0 225 314">
                  <use href={`#${card}`} />
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {cardNumber && (
              <motion.div
                key={card}
                className={classNames(
                  'absolute right-0 bottom-0 left-0 -m-8 transform rounded-xl bg-[#180621]/90 p-2 text-center text-white backdrop-blur',
                  outfit.className,
                )}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                initial={{ opacity: 0.0 }}
                animate={{ opacity: 1.0 }}
                exit={{ opacity: 0.0 }}
              >
                <div className="text-xl">
                  {contentJson.explain[cardNumber].title}
                </div>
                <div className="mt-2 text-xs">
                  {contentJson.explain[cardNumber].text}
                </div>
              </motion.div>
            )}
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
