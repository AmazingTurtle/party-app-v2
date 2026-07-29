'use client';

import { type ReactNode } from 'react';
import { useLinkStatus } from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';

export interface GameLinkContentProps {
  description: string;
  icon: ReactNode;
  title: string;
}

export function GameLinkContent({
  description,
  icon,
  title,
}: GameLinkContentProps) {
  const { pending } = useLinkStatus();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pending ? 'pending' : 'ready'}
        className="game-link__content"
        transition={{ duration: 0.1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {pending ? (
          <div className="game-link__pending" role="status">
            <LoaderCircle aria-hidden="true" className="size-6 animate-spin" />
            Das Spiel wird gestartet...
          </div>
        ) : (
          <>
            <div className="game-link__topline">
              <span className="game-link__icon">{icon}</span>
              <ArrowUpRight aria-hidden="true" className="game-link__arrow" />
            </div>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <span className="game-link__action">Spielen</span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
