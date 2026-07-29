import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { games } from '@/games/game-catalog';

export const metadata: Metadata = {
  title: games['five-seconds'].title,
  alternates: { canonical: '/games/five-seconds' },
};

export default function FiveSecondsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
