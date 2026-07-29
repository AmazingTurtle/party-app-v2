'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type AnimationPlaybackControls,
  type MotionProps,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion';
import { GameStage } from '@/_components/game-stage/game-stage';
import { RouteTint } from '@/_components/route-tint/route-tint';
import { getCaseInsensitiveContentKey } from '@/games/random-pool/random-pool';
import { useSessionRandomPool } from '@/games/random-pool/use-session-random-pool';
import { playAudio, stopAudio } from '@/lib/audio';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });
const timerDurationSeconds = 5;
const promptTransition = {
  duration: 0.2,
  ease: 'easeInOut',
} satisfies MotionProps['transition'];
const promptVariants = {
  enter: { translateX: '-50%', opacity: 0 },
  exit: { translateX: '50%', opacity: 0 },
  visible: { translateX: 0, opacity: 1 },
} satisfies MotionProps['variants'];

type TimerState =
  | { status: 'idle' }
  | { status: 'transitioning'; prompt: string; runId: number }
  | { status: 'running'; prompt: string; runId: number }
  | { status: 'expired'; prompt: string; runId: number };

interface AnimatedProgressStyle extends MotionStyle {
  '--progress-percent': MotionValue<string>;
}

export default function FiveSecondsPage() {
  const getNextItem = useSessionRandomPool(contentJson.questions, {
    getKey: getCaseInsensitiveContentKey,
    id: 'five-seconds/questions',
  });
  const progress = useMotionValue(0);
  const progressPercent = useMotionTemplate`${progress}%`;
  const animationRef = useRef<AnimationPlaybackControls>(null);
  const runIdRef = useRef(0);
  const clockTickingAudioRef = useRef<HTMLAudioElement>(null);
  const bingAudioRef = useRef<HTMLAudioElement>(null);
  const [timer, setTimer] = useState<TimerState>({ status: 'idle' });

  const handleTimerComplete = useCallback((runId: number) => {
    if (runIdRef.current !== runId) {
      return;
    }

    stopAudio(clockTickingAudioRef.current);
    playAudio(bingAudioRef.current, 0.1);
    setTimer((currentTimer) =>
      currentTimer.status === 'running' && currentTimer.runId === runId
        ? { ...currentTimer, status: 'expired' }
        : currentTimer,
    );
  }, []);

  const handlePromptAnimationComplete = useCallback<
    NonNullable<MotionProps['onAnimationComplete']>
  >(
    (definition) => {
      if (
        definition !== 'visible' ||
        timer.status !== 'transitioning' ||
        runIdRef.current !== timer.runId
      ) {
        return;
      }

      const { prompt, runId } = timer;

      setTimer({ status: 'running', prompt, runId });
      playAudio(clockTickingAudioRef.current);
      animationRef.current = animate(progress, 100, {
        duration: timerDurationSeconds,
        ease: 'linear',
        onComplete() {
          handleTimerComplete(runId);
        },
      });
    },
    [handleTimerComplete, progress, timer],
  );

  const handleNext = useCallback(() => {
    if (getNextItem === undefined || timer.status === 'transitioning') {
      return;
    }

    runIdRef.current += 1;
    const runId = runIdRef.current;

    animationRef.current?.stop();
    stopAudio(clockTickingAudioRef.current);
    stopAudio(bingAudioRef.current);
    progress.set(0);
    setTimer({ status: 'transitioning', prompt: getNextItem(), runId });
  }, [getNextItem, progress, timer.status]);

  useEffect(() => {
    const clockTickingAudio = clockTickingAudioRef.current;
    const bingAudio = bingAudioRef.current;

    return () => {
      runIdRef.current += 1;
      animationRef.current?.stop();
      stopAudio(clockTickingAudio);
      stopAudio(bingAudio);
    };
  }, []);

  const prompt =
    timer.status === 'idle'
      ? 'Drücke auf Start wenn du bereit bist'
      : timer.prompt;
  const statusMessage =
    timer.status === 'idle'
      ? 'Timer bereit'
      : timer.status === 'transitioning'
        ? 'Neue Frage wird angezeigt'
        : timer.status === 'running'
          ? 'Fünf-Sekunden-Timer läuft'
          : 'Zeit abgelaufen';
  const animatedProgressStyle: AnimatedProgressStyle = {
    '--progress-percent': progressPercent,
  };

  return (
    <>
      <RouteTint darkColor="#71384b" lightColor="#f2cdd8" />
      <GameStage gameId="five-seconds">
        <audio src="/sounds/clock-ticking.mp3" ref={clockTickingAudioRef} />
        <audio src="/sounds/bing.mp3" ref={bingAudioRef} />
        <div className="flex w-full flex-col items-center gap-8">
          <div role="status" aria-live="polite" className="sr-only">
            {statusMessage}
          </div>
          <div className="relative size-[min(72vw,42dvh,22rem)] text-center text-lg lg:text-2xl">
            <motion.div
              aria-hidden="true"
              className="radial-progress absolute inset-0"
              style={animatedProgressStyle}
            />
            <AnimatePresence initial={false}>
              <motion.div
                key={prompt}
                initial="enter"
                animate="visible"
                exit="exit"
                variants={promptVariants}
                transition={promptTransition}
                onAnimationComplete={handlePromptAnimationComplete}
                className={`${outfit.className} absolute inset-0 flex items-center justify-center p-8`}
              >
                {prompt}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="button"
            disabled={
              getNextItem === undefined || timer.status === 'transitioning'
            }
            onClick={handleNext}
          >
            {timer.status === 'idle' ? 'Starten' : 'Weiter'}
          </button>
        </div>
      </GameStage>
    </>
  );
}
