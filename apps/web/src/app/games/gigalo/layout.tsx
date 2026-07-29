import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { games } from '@/games/game-catalog';

export const metadata: Metadata = {
  title: games.gigalo.title,
  alternates: { canonical: '/games/gigalo' },
  robots: { index: false, follow: false },
};

export default function GigaloLayout({ children }: { children: ReactNode }) {
  return children;
}
