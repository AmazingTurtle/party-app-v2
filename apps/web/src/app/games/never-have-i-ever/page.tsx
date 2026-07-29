'use client';

import { useCallback, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import { motion, AnimatePresence, useTime } from 'framer-motion';
import { ColorTransition } from '@/_components/color-transition';
import { playAudio } from '@/lib/audio';
import { useRandomPool } from '@/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

export default function NeverHaveIEverPage() {
  const time = useTime();
  const transitionTime = 500;
  const [lastChange, setLastChange] = useState(0);

  const getNextItem = useRandomPool(contentJson.questions);

  const popAudioRef = useRef<HTMLAudioElement>(null);

  const [prompt, setPrompt] = useState<string | undefined>(
    () => getNextItem().question,
  );
  const onClickNext = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt(getNextItem().question);
    playAudio(popAudioRef.current, 0.1);
  }, [getNextItem, lastChange, time]);

  return (
    <div className="flex w-full grow items-center text-left">
      <audio src="/sounds/pop.mp3" ref={popAudioRef} />
      <ColorTransition targetColor="#010F11" key={lastChange} />
      <div className="w-full">
        <div className="relative mb-8 min-h-[230px] w-screen max-w-xl text-center text-2xl md:min-h-[160px]">
          <AnimatePresence>
            <motion.div
              key={prompt}
              initial={{ translateX: '-50%', opacity: 0, translateY: '-50%' }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
              className={`absolute top-1/2 right-0 left-0 px-8 ${outfit.className}`}
            >
              {prompt}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center">
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
