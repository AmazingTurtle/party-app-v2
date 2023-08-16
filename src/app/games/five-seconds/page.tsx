'use client';

import { useCallback, useRef, useState } from 'react';
import { Outfit } from 'next/font/google';
import {
  motion,
  AnimatePresence,
  useTime,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from 'framer-motion';
import { ColorTransition } from 'party/_components/color-transition';
import { classNames } from 'party/utils/class-names';
import { useRandomPool } from 'party/utils/use-random-pool';
import contentJson from './content.json';

const outfit = Outfit({ subsets: ['latin'] });

export default function Home() {
  const time = useTime();
  const motionValue = useMotionValue(0);

  const [gameState] = useState({ isRunning: false });

  const transitionTime = 500;
  const [lastChange, setLastChange] = useState(0);

  const clockTickingAudioRef = useRef<HTMLAudioElement>(null);
  const bingAudioRef = useRef<HTMLAudioElement>(null);

  const [getNextItem] = useRandomPool(contentJson.questions);

  const startSoundEffect = useCallback(() => {
    if (clockTickingAudioRef.current) {
      clockTickingAudioRef.current.currentTime = 0;
      clockTickingAudioRef.current.play();
    }
  }, []);

  const [prompt, setPrompt] = useState<string | undefined>(undefined);
  const onClickNext = useCallback(() => {
    if (lastChange + transitionTime > time.get()) return;
    setLastChange(time.get());
    setPrompt(getNextItem().question);
    startSoundEffect();

    gameState.isRunning = true;
  }, [gameState, getNextItem, lastChange, startSoundEffect, time]);

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
    if (!gameState.isRunning) return;
    const progressBarDiv =
      progressBarRef.current || document.getElementById('progress-bar');
    progressBarDiv?.style.setProperty(
      '--progress-percent',
      `${value.toFixed(2)}%`,
    );

    if (value + 0.0001 >= 100) {
      if (clockTickingAudioRef.current) {
        clockTickingAudioRef.current.pause();
        clockTickingAudioRef.current.currentTime = 0;
      }
      if (/Android|iPhone/i.test(navigator.userAgent)) return;
      try {
        if (bingAudioRef.current) {
          bingAudioRef.current.currentTime = 0.1;
          bingAudioRef.current.play();
        }
      } catch (error) {
        console.log('boop');
        // most likely permission issues on mobile devices
      }
    }
  });

  return (
    <div className="text-left w-full grow flex items-center">
      <audio
        src="/sounds/clock-ticking.mp3"
        autoPlay={false}
        ref={clockTickingAudioRef}
      />
      <audio src="/sounds/bing.mp3" autoPlay={false} ref={bingAudioRef} />
      <ColorTransition targetColor="#2C0C15" key={lastChange} />
      <div className="w-full">
        <div className="relative text-lg lg:text-2xl text-center max-w-xl w-screen w-full aspect-square p-8">
          <AnimatePresence>
            <motion.div
              key={prompt}
              initial={{ translateX: '-50%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
              className={classNames(outfit.className)}
            >
              <div
                className="radial-progress absolute top-1/2 left-0 right-0 px-8"
                style={{
                  ['--background-color' as any]: '#2C0C15',
                  ['--bar-background-color' as any]: '#641b30',
                  ['--bar-color' as any]: '#c83760',
                  ['--progress-percent' as any]: '0%',
                  ['--bar-size' as any]: '12px',
                }}
                ref={progressBarRef}
                id="progress-bar"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center aspect-square p-8">
                {prompt || 'Drücke auf Start wenn du bereit bist'}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center">
          <button className="button !bg-fuchsia-900/50" onClick={onClickNext}>
            {prompt === undefined ? 'Starten' : 'Weiter'}
          </button>
        </div>
      </div>
    </div>
  );
}
