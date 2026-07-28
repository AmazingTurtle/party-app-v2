import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface FlippableCardProps {
  card: string | undefined;
  children: ReactNode;
  isFlipped: boolean;
}
export function FlippableCard({
  card,
  children,
  isFlipped,
}: FlippableCardProps) {
  const cardClassNames =
    'absolute top-0 left-0 right-0 bottom-0 p-1 lg:p-2 text-black bg-white rounded-xl shadow-xl';

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
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#121004]/20">
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
            <svg width="100%" height="100%" viewBox="0 0 225 314">
              {card === undefined ? null : <use href={`#${card}`} />}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
