'use client';

import { useCallback, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import { AnimatePresence, motion, useTime } from 'framer-motion';
import { GameStage } from '@/_components/game-stage/game-stage';
import { RouteTint } from '@/_components/route-tint/route-tint';
import { getCaseInsensitiveContentKey } from '@/games/random-pool/random-pool';
import { useSessionRandomPool } from '@/games/random-pool/use-session-random-pool';
import { playAudio } from '@/lib/audio';
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
  const getNextTruth = useSessionRandomPool(contentJson.truth, {
    getKey: getCaseInsensitiveContentKey,
    id: 'truth-or-dare/truth',
  });
  const getNextDare = useSessionRandomPool(contentJson.dare, {
    getKey: getCaseInsensitiveContentKey,
    id: 'truth-or-dare/dare',
  });

  const whoosh1AudioRef = useRef<HTMLAudioElement>(null);
  const whoosh2AudioRef = useRef<HTMLAudioElement>(null);

  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);

  const onClickNextTruth = useCallback(() => {
    if (
      getNextTruth === undefined ||
      lastChange + transitionTime > time.get()
    ) {
      return;
    }

    setLastChange(time.get());
    setPrompt({ type: 'truth', text: getNextTruth() });

    playAudio(whoosh1AudioRef.current);
  }, [getNextTruth, lastChange, time]);

  const onClickNextDare = useCallback(() => {
    if (getNextDare === undefined || lastChange + transitionTime > time.get()) {
      return;
    }

    setLastChange(time.get());
    setPrompt({ type: 'dare', text: getNextDare() });

    playAudio(whoosh2AudioRef.current);
  }, [getNextDare, lastChange, time]);

  const darkColor =
    prompt?.type === 'truth'
      ? '#354a8c'
      : prompt?.type === 'dare'
        ? '#71354f'
        : '#303b69';
  const lightColor =
    prompt?.type === 'truth'
      ? '#cdd8fa'
      : prompt?.type === 'dare'
        ? '#f1cfdd'
        : '#dce2f5';

  return (
    <>
      <RouteTint darkColor={darkColor} lightColor={lightColor} />
      <GameStage gameId="truth-or-dare">
        <audio src="/sounds/whoosh.mp3" ref={whoosh1AudioRef} />
        <audio src="/sounds/whoosh2.mp3" ref={whoosh2AudioRef} />
        <div className="w-full max-w-2xl">
          <div className="relative h-20">
            {prompt && (
              <AnimatePresence>
                <motion.div
                  key={prompt.type}
                  initial={{ translateX: '-50%', opacity: 0 }}
                  animate={{ translateX: 0, opacity: 1 }}
                  exit={{ translateX: '50%', opacity: 0 }}
                  className={`absolute inset-0 text-center text-5xl ${outfit.className}`}
                >
                  {promptTranslation[prompt.type]}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          <div className="relative mb-8 min-h-50 md:min-h-40">
            <AnimatePresence>
              <motion.div
                key={prompt?.text ?? 'choice'}
                initial={{ translateX: '-50%', opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: '50%', opacity: 0 }}
              >
                <div
                  className={`absolute inset-0 text-center text-xl ${outfit.className}`}
                >
                  {prompt?.text ?? 'Wahrheit oder Pflicht?'}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <button
              type="button"
              className="button button--truth"
              disabled={getNextTruth === undefined}
              onClick={onClickNextTruth}
            >
              Wahrheit
            </button>
            <span className="text-sm opacity-60">oder</span>
            <button
              type="button"
              className="button button--dare"
              disabled={getNextDare === undefined}
              onClick={onClickNextDare}
            >
              Pflicht
            </button>
          </div>
        </div>
      </GameStage>
    </>
  );
}
