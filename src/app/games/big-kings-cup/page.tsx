'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import { AnimatePresence, motion } from 'framer-motion';
import { ColorTransition } from 'party/_components/color-transition';
import { SvgCards } from 'party/_components/svg-cards';
import { classNames } from 'party/utils/class-names';
import { useRandomPool } from 'party/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });
type CardId = keyof typeof contentJson.explain;

export default function Home() {
  const [getNextCard] = useRandomPool(contentJson.cards);

  const [card, setCard] = useState<string | undefined>();
  const whooshAudioRef = useRef<HTMLAudioElement>(null);
  const onClickNext = useCallback(() => {
    setCard(getNextCard());

    if (whooshAudioRef.current) {
      const soundClone = whooshAudioRef.current.cloneNode() as HTMLAudioElement;
      soundClone.currentTime = 0.0;
      soundClone.play();
    }
  }, [getNextCard]);

  useEffect(() => {
    setCard(getNextCard());
  }, [getNextCard]);

  const cardNumber = useMemo(() => {
    if (card === undefined) return undefined;
    const number = card.match(/\d+/)?.[0];
    if (number === undefined) return undefined;
    return number as CardId;
  }, [card]);

  return (
    <div className="text-left w-full grow flex items-center">
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
                className="bg-white rounded-xl p-2 shadow-xl absolute top-0 left-0 bottom-0 right-0"
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
                  'absolute bottom-0 left-0 right-0 text-center transform bg-[#180621]/90 text-white p-2 backdrop-blur -m-8 rounded-xl',
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
                <div className="text-xs mt-2">
                  {contentJson.explain[cardNumber].text}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-16">
          <button className="button !bg-emerald-900/50" onClick={onClickNext}>
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}
