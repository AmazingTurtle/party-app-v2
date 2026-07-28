'use client';

import { useCallback, useRef, useState, type CSSProperties } from 'react';
import { Outfit } from 'next/font/google';
import {
  motion,
  AnimatePresence,
  useTime,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from 'framer-motion';
import { ColorTransition } from '@/_components/color-transition';
import { playAudio } from '@/lib/audio';
import { classNames } from '@/utils/class-names';
import { useRandomPool } from '@/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

interface ProgressStyle extends CSSProperties {
  '--background-color': string;
  '--bar-background-color': string;
  '--bar-color': string;
  '--progress-percent': string;
  '--bar-size': string;
}

const progressStyle: ProgressStyle = {
  '--background-color': '#2C0C15',
  '--bar-background-color': '#641b30',
  '--bar-color': '#c83760',
  '--progress-percent': '0%',
  '--bar-size': '12px',
};

export default function Home() {
  const time = useTime();
  const motionValue = useMotionValue(0);

  const isRunningRef = useRef(false);

  const transitionTime = 500;
  const [lastChange, setLastChange] = useState(0);

  const clockTickingAudioRef = useRef<HTMLAudioElement>(null);
  const bingAudioRef = useRef<HTMLAudioElement>(null);

  const [getNextItem] = useRandomPool(contentJson.questions);

  const startSoundEffect = useCallback(() => {
    playAudio(clockTickingAudioRef.current);
  }, []);

  const [prompt, setPrompt] = useState<string | undefined>(undefined);
  const onClickNext = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt(getNextItem());
    startSoundEffect();

    isRunningRef.current = true;
  }, [getNextItem, lastChange, startSoundEffect, time]);

  /*useEffect(() => {
    setPrompt(getNextItem().question);
    startSoundEffect();
  }, [getNextItem, startSoundEffect]);*/

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progress = useTransform(motionValue, [0, 5000], [0, 100]);

  useMotionValueEvent(time, 'change', (value) => {
    motionValue.set(value - lastChange);
  });

  useMotionValueEvent(progress, 'change', (value) => {
    if (!isRunningRef.current) return;
    const progressBarDiv =
      progressBarRef.current ?? document.getElementById('progress-bar');
    progressBarDiv?.style.setProperty(
      '--progress-percent',
      `${value.toFixed(2)}%`,
    );

    if (value + 0.0001 >= 100) {
      isRunningRef.current = false;

      if (clockTickingAudioRef.current) {
        clockTickingAudioRef.current.pause();
        clockTickingAudioRef.current.currentTime = 0;
      }
      if (/Android|iPhone/i.test(navigator.userAgent)) return;
      playAudio(bingAudioRef.current, 0.1);
    }
  });

  return (
    <div className="flex w-full grow items-center text-left">
      <audio
        src="/sounds/clock-ticking.mp3"
        autoPlay={false}
        ref={clockTickingAudioRef}
      />
      <audio src="/sounds/bing.mp3" autoPlay={false} ref={bingAudioRef} />
      <ColorTransition targetColor="#2C0C15" key={lastChange} />
      <div className="flex w-full flex-col items-center gap-8">
        <div className="relative size-[min(72vw,45vh,24rem)] text-center text-lg lg:text-2xl">
          <AnimatePresence>
            <motion.div
              key={prompt}
              initial={{ translateX: '-50%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
              className={classNames(outfit.className)}
            >
              <div
                className="radial-progress absolute inset-0"
                style={progressStyle}
                ref={progressBarRef}
                id="progress-bar"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {prompt ?? 'Drücke auf Start wenn du bereit bist'}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center pb-24 lg:pb-0">
          <button
            type="button"
            className="button !bg-fuchsia-900/50"
            onClick={onClickNext}
          >
            {prompt === undefined ? 'Starten' : 'Weiter'}
          </button>
        </div>
      </div>
    </div>
  );
}
