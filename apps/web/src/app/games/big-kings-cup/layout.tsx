import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { games } from '@/games/game-catalog';

export const metadata: Metadata = {
  title: games['big-kings-cup'].title,
  alternates: { canonical: '/games/big-kings-cup' },
};

export default function BigKingsCupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
