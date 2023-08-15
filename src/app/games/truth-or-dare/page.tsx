'use client';

import { useCallback, useState } from 'react';
import { Outfit } from 'next/font/google';
import { AnimatePresence, motion, useTime } from 'framer-motion';
import { ColorTransition } from 'party/app/color-transition';
import { classNames } from 'party/utils/class-names';
import { useRandomPool } from 'party/utils/use-random-pool';
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

  const [prompt, setPrompt] = useState<string | undefined>('');

  const onClickNextTruth = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt(getNextTruth());
    setPromptType('truth');
  }, [getNextTruth, lastChange, time]);

  const onClickNextDare = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt(getNextDare());
    setPromptType('dare');
  }, [getNextDare, lastChange, time]);

  const targetColor =
    promptType === 'truth'
      ? '#101F4C'
      : promptType === 'dare'
      ? '#450C24'
      : '#080c27';

  return (
    <div className="text-left w-full grow flex items-center">
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
                  'absolute top-0 left-0 right-0 bottom-0 text-5xl text-center max-w-xl',
                  outfit.className,
                )}
              >
                {!!promptType ? promptTranslation[promptType] : <>&nbsp;</>}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="relative min-h-[200px] md:min-h-[160px] mb-8">
          <AnimatePresence>
            <motion.div
              key={prompt}
              initial={{ translateX: '-50%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
            >
              <div
                className={classNames(
                  'absolute top-0 left-0 right-0 bottom-0 text-xl text-center max-w-xl',
                  outfit.className,
                )}
              >
                {prompt || 'Wahrheit oder Pflicht?'}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center items-center space-x-6">
          <button className="button !bg-blue-900/50" onClick={onClickNextTruth}>
            Wahrheit
          </button>
          <span>oder</span>
          <button className="button !bg-rose-900/50" onClick={onClickNextDare}>
            Pflicht
          </button>
        </div>
      </div>
    </div>
  );
}
