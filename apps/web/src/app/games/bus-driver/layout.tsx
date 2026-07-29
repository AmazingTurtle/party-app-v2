import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { games } from '@/games/game-catalog';

export const metadata: Metadata = {
  title: games['bus-driver'].title,
  alternates: { canonical: '/games/bus-driver' },
};

export default function BusDriverLayout({ children }: { children: ReactNode }) {
  return children;
}
