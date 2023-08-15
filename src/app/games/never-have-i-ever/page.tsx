'use client';

import { useCallback, useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';
import { motion, AnimatePresence, useTime } from 'framer-motion';
import { ColorTransition } from 'party/app/color-transition';
import { classNames } from 'party/utils/class-names';
import { useRandomPool } from 'party/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

export default function Home() {
  const time = useTime();
  const transitionTime = 500;
  const [lastChange, setLastChange] = useState(0);

  const [getNextItem] = useRandomPool(contentJson.questions);

  const [prompt, setPrompt] = useState<string | undefined>('');
  const onClickNext = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt(getNextItem().question);
  }, [getNextItem, lastChange, time]);

  useEffect(() => {
    setPrompt(getNextItem().question);
  }, [getNextItem]);

  return (
    <div className="text-left w-full grow flex items-center">
      <ColorTransition targetColor="#010F11" key={lastChange} />
      <div className="w-full">
        <div className="relative text-2xl min-h-[230px] md:min-h-[160px] text-center max-w-xl w-screen mb-8">
          <AnimatePresence>
            <motion.div
              key={prompt}
              initial={{ translateX: '-50%', opacity: 0, translateY: '-50%' }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
              className={classNames(
                'absolute top-1/2 left-0 right-0 px-8',
                outfit.className,
              )}
            >
              {prompt}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center">
          <button className="button !bg-emerald-900/50" onClick={onClickNext}>
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}
