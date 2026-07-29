import { type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getCardAssetUrl,
  getCardLabel,
  type CardId,
} from '@/games/playing-cards';

export interface FlippableCardProps {
  card: CardId | undefined;
  children: ReactNode;
  isFlipped: boolean;
}
export function FlippableCard({
  card,
  children,
  isFlipped,
}: FlippableCardProps) {
  const cardClassNames =
    'absolute inset-0 overflow-hidden rounded-xl bg-white p-1 text-black shadow-xl lg:p-2';

  return (
    <div className="relative">
      {/* just a placeholder to maintain the aspect ratio */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 225 314"
        className="opacity-0"
      >
        <use href={`#${card}`} />
      </svg>

      <AnimatePresence initial={false}>
        {!isFlipped && (
          <motion.div
            key="placeholder"
            className={cardClassNames}
            initial={{ rotateY: '180deg' }}
            animate={{ rotateY: '0deg' }}
            exit={{ rotateY: '180deg' }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#3b340d]/20">
              {children}
            </div>
          </motion.div>
        )}
        {isFlipped && (
          <motion.div
            key={card ?? 'empty-card'}
            className={cardClassNames}
            initial={{ rotateY: '180deg' }}
            animate={{ rotateY: '0deg' }}
            exit={{ rotateY: '180deg' }}
          >
            {card === undefined ? null : (
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={getCardAssetUrl(card)}
                  alt={getCardLabel(card)}
                  fill
                  sizes="(max-width: 1024px) 25vw, 12rem"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
