'use client';

import { useCallback, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import { AnimatePresence, motion, useTime } from 'framer-motion';
import { ColorTransition } from '@/_components/color-transition';
import { playAudioClone } from '@/lib/audio';
import { classNames } from '@/utils/class-names';
import { useRandomPool } from '@/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

const promptTranslation = {
  truth: 'Wahrheit',
  dare: 'Pflicht',
};

export default function Home() {
  const time = useTime();
  const transitionTime = 500;
  const [lastChange, setLastChange] = useState(-transitionTime);
  const [promptType, setPromptType] = useState<'truth' | 'dare' | undefined>(
    undefined,
  );
  const [getNextTruth] = useRandomPool(contentJson.truth);
  const [getNextDare] = useRandomPool(contentJson.dare);

  const whoosh1AudioRef = useRef<HTMLAudioElement>(null);
  const whoosh2AudioRef = useRef<HTMLAudioElement>(null);

  const [prompt, setPrompt] = useState<string | undefined>('');

  const onClickNextTruth = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt(getNextTruth());
    setPromptType('truth');

    playAudioClone(whoosh1AudioRef.current);
  }, [getNextTruth, lastChange, time]);

  const onClickNextDare = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt(getNextDare());
    setPromptType('dare');

    playAudioClone(whoosh2AudioRef.current);
  }, [getNextDare, lastChange, time]);

  const targetColor =
    promptType === 'truth'
      ? '#101F4C'
      : promptType === 'dare'
        ? '#450C24'
        : '#080c27';

  return (
    <div className="flex w-full grow items-center text-left">
      <audio src="/sounds/whoosh.mp3" autoPlay={false} ref={whoosh1AudioRef} />
      <audio src="/sounds/whoosh2.mp3" autoPlay={false} ref={whoosh2AudioRef} />
      <ColorTransition targetColor={targetColor} />
      <div className="w-full">
        <div className="relative h-20">
          {promptType && (
            <AnimatePresence>
              <motion.div
                key={promptType}
                initial={{ translateX: '-50%', opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: '50%', opacity: 0 }}
                className={classNames(
                  'absolute top-0 right-0 bottom-0 left-0 max-w-xl text-center text-5xl',
                  outfit.className,
                )}
              >
                {promptTranslation[promptType]}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="relative mb-8 min-h-[200px] md:min-h-[160px]">
          <AnimatePresence>
            <motion.div
              key={prompt}
              initial={{ translateX: '-50%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
            >
              <div
                className={classNames(
                  'absolute top-0 right-0 bottom-0 left-0 max-w-xl text-center text-xl',
                  outfit.className,
                )}
              >
                {prompt ?? 'Wahrheit oder Pflicht?'}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center space-x-6">
          <button
            type="button"
            className="button !bg-blue-900/50"
            onClick={onClickNextTruth}
          >
            Wahrheit
          </button>
          <span>oder</span>
          <button
            type="button"
            className="button !bg-rose-900/50"
            onClick={onClickNextDare}
          >
            Pflicht
          </button>
        </div>
      </div>
    </div>
  );
}
