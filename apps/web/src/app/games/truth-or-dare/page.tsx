'use client';

import { useCallback, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import { AnimatePresence, motion, useTime } from 'framer-motion';
import { ColorTransition } from '@/_components/color-transition';
import { playAudio } from '@/lib/audio';
import { useRandomPool } from '@/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

const promptTranslation = {
  truth: 'Wahrheit',
  dare: 'Pflicht',
};

interface Prompt {
  type: keyof typeof promptTranslation;
  text: string;
}

export default function TruthOrDarePage() {
  const time = useTime();
  const transitionTime = 500;
  const [lastChange, setLastChange] = useState(-transitionTime);
  const getNextTruth = useRandomPool(contentJson.truth);
  const getNextDare = useRandomPool(contentJson.dare);

  const whoosh1AudioRef = useRef<HTMLAudioElement>(null);
  const whoosh2AudioRef = useRef<HTMLAudioElement>(null);

  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);

  const onClickNextTruth = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt({ type: 'truth', text: getNextTruth() });

    playAudio(whoosh1AudioRef.current);
  }, [getNextTruth, lastChange, time]);

  const onClickNextDare = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt({ type: 'dare', text: getNextDare() });

    playAudio(whoosh2AudioRef.current);
  }, [getNextDare, lastChange, time]);

  const targetColor =
    prompt?.type === 'truth'
      ? '#101F4C'
      : prompt?.type === 'dare'
        ? '#450C24'
        : '#080c27';

  return (
    <div className="flex w-full grow items-center text-left">
      <audio src="/sounds/whoosh.mp3" ref={whoosh1AudioRef} />
      <audio src="/sounds/whoosh2.mp3" ref={whoosh2AudioRef} />
      <ColorTransition targetColor={targetColor} />
      <div className="w-full">
        <div className="relative h-20">
          {prompt && (
            <AnimatePresence>
              <motion.div
                key={prompt.type}
                initial={{ translateX: '-50%', opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: '50%', opacity: 0 }}
                className={`absolute top-0 right-0 bottom-0 left-0 max-w-xl text-center text-5xl ${outfit.className}`}
              >
                {promptTranslation[prompt.type]}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="relative mb-8 min-h-[200px] md:min-h-[160px]">
          <AnimatePresence>
            <motion.div
              key={prompt?.text ?? 'choice'}
              initial={{ translateX: '-50%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
            >
              <div
                className={`absolute top-0 right-0 bottom-0 left-0 max-w-xl text-center text-xl ${outfit.className}`}
              >
                {prompt?.text ?? 'Wahrheit oder Pflicht?'}
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
