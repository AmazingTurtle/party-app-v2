'use client';

import { useLinkStatus } from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export interface GameLinkContentProps {
  title: string;
  description: string;
}

export function GameLinkContent({ title, description }: GameLinkContentProps) {
  const { pending } = useLinkStatus();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pending ? 'pending' : 'ready'}
        transition={{ duration: 0.1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {pending ? (
          <h3 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-light">
            Das Spiel wird gestartet...
          </h3>
        ) : (
          <>
            <h2>{title}</h2>
            <p>{description}</p>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
