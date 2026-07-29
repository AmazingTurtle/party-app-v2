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
  type MotionStyle,
  type MotionValue,
} from 'framer-motion';
import { ColorTransition } from '@/_components/color-transition';
import { playAudio, stopAudio } from '@/lib/audio';
import { useRandomPool } from '@/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });
const timerDurationSeconds = 5;
const transitionCooldownMilliseconds = 500;

type TimerState =
  | { status: 'idle' }
  | { status: 'running'; prompt: string; runId: number }
  | { status: 'expired'; prompt: string; runId: number };

interface ProgressStyle {
  '--background-color': string;
  '--bar-background-color': string;
  '--bar-color': string;
  '--bar-size': string;
}

interface AnimatedProgressStyle extends MotionStyle, ProgressStyle {
  '--progress-percent': MotionValue<string>;
}

const progressStyle: ProgressStyle = {
  '--background-color': '#2C0C15',
  '--bar-background-color': '#641b30',
  '--bar-color': '#c83760',
  '--bar-size': '12px',
};

export default function FiveSecondsPage() {
  const getNextItem = useRandomPool(contentJson.questions);
  const progress = useMotionValue(0);
  const progressPercent = useMotionTemplate`${progress}%`;
  const animationRef = useRef<AnimationPlaybackControls>(null);
  const runIdRef = useRef(0);
  const lastStartedAtRef = useRef(Number.NEGATIVE_INFINITY);
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

  const handleNext = useCallback(() => {
    const now = performance.now();

    if (now - lastStartedAtRef.current < transitionCooldownMilliseconds) {
      return;
    }

    lastStartedAtRef.current = now;
    runIdRef.current += 1;
    const runId = runIdRef.current;

    animationRef.current?.stop();
    stopAudio(clockTickingAudioRef.current);
    stopAudio(bingAudioRef.current);
    progress.set(0);
    setTimer({ status: 'running', prompt: getNextItem(), runId });
    playAudio(clockTickingAudioRef.current);

    animationRef.current = animate(progress, 100, {
      duration: timerDurationSeconds,
      ease: 'linear',
      onComplete() {
        handleTimerComplete(runId);
      },
    });
  }, [getNextItem, handleTimerComplete, progress]);

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
      : timer.status === 'running'
        ? 'Fünf-Sekunden-Timer läuft'
        : 'Zeit abgelaufen';
  const animatedProgressStyle: AnimatedProgressStyle = {
    ...progressStyle,
    '--progress-percent': progressPercent,
  };

  return (
    <div className="flex w-full grow items-center text-left">
      <audio src="/sounds/clock-ticking.mp3" ref={clockTickingAudioRef} />
      <audio src="/sounds/bing.mp3" ref={bingAudioRef} />
      <ColorTransition targetColor="#2C0C15" />
      <div className="flex w-full flex-col items-center gap-8">
        <div role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </div>
        <div className="relative size-[min(72vw,45dvh,24rem)] text-center text-lg lg:text-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={prompt}
              initial={{ translateX: '-50%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
              className={outfit.className}
            >
              <motion.div
                aria-hidden="true"
                className="radial-progress absolute inset-0"
                style={animatedProgressStyle}
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {prompt}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center pb-24 lg:pb-0">
          <button
            type="button"
            className="button !bg-fuchsia-900/50"
            onClick={handleNext}
          >
            {timer.status === 'idle' ? 'Starten' : 'Weiter'}
          </button>
        </div>
      </div>
    </div>
  );
}
