'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { classNames } from 'party/utils/class-names';

export interface GameLinkProps {
  href: string;
  className: string;
  title: string;
  description: string;
}
export function GameLink({
  href,
  className,
  title,
  description,
}: GameLinkProps) {
  const [isNavigating, setNavigating] = useState(false);
  const onClick = useCallback(() => {
    setNavigating(true);
  }, []);

  return (
    <Link
      href={href}
      className={classNames('relative h-32 game-link', className)}
      onClick={onClick}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={`${isNavigating}`}
          transition={{ duration: 0.1 }}
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 1.0 }}
          exit={{ opacity: 0.0 }}
        >
          {isNavigating ? (
            <h3 className="absolute text-center top-1/2 left-0 right-0 -translate-y-1/2 font-light">
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
    </Link>
  );
}
