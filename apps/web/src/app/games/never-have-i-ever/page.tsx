'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import { AnimatePresence, motion, useTime } from 'framer-motion';
import { GameStage } from '@/_components/game-stage/game-stage';
import { RouteTint } from '@/_components/route-tint/route-tint';
import { getCaseInsensitiveContentKey } from '@/games/random-pool/random-pool';
import { useSessionRandomPool } from '@/games/random-pool/use-session-random-pool';
import { playAudio } from '@/lib/audio';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

interface NeverHaveIEverQuestion {
  question: string;
}

function getQuestionKey(question: NeverHaveIEverQuestion) {
  return getCaseInsensitiveContentKey(question.question);
}

export default function NeverHaveIEverPage() {
  const time = useTime();
  const transitionTime = 500;
  const [lastChange, setLastChange] = useState(0);

  const getNextItem = useSessionRandomPool(contentJson.questions, {
    getKey: getQuestionKey,
    id: 'never-have-i-ever/questions',
  });

  const popAudioRef = useRef<HTMLAudioElement>(null);
  const hasInitialPromptRef = useRef(false);
  const [prompt, setPrompt] = useState<string>();

  useEffect(() => {
    if (getNextItem === undefined || hasInitialPromptRef.current) {
      return;
    }

    hasInitialPromptRef.current = true;
    setPrompt(getNextItem().question);
  }, [getNextItem]);

  const onClickNext = useCallback(() => {
    if (getNextItem === undefined || lastChange + transitionTime > time.get()) {
      return;
    }

    setLastChange(time.get());
    setPrompt(getNextItem().question);
    playAudio(popAudioRef.current, 0.1);
  }, [getNextItem, lastChange, time]);

  return (
    <>
      <RouteTint darkColor="#194b4d" lightColor="#bcebea" key={lastChange} />
      <GameStage gameId="never-have-i-ever">
        <audio src="/sounds/pop.mp3" ref={popAudioRef} />
        <div className="w-full max-w-2xl">
          <div className="relative mb-8 min-h-57.5 w-full text-center text-2xl md:min-h-40">
            <AnimatePresence>
              <motion.div
                key={prompt ?? 'loading'}
                initial={{ translateX: '-50%', opacity: 0, translateY: '-50%' }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: '50%', opacity: 0 }}
                className={`absolute top-1/2 right-0 left-0 px-4 ${outfit.className}`}
              >
                {prompt ?? 'Inhalte werden geladen …'}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="button"
              disabled={getNextItem === undefined}
              onClick={onClickNext}
            >
              Weiter
            </button>
          </div>
        </div>
      </GameStage>
    </>
  );
}
