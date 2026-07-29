import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { games } from '@/games/game-catalog';

export const metadata: Metadata = {
  title: games['never-have-i-ever'].title,
  alternates: { canonical: '/games/never-have-i-ever' },
};

export default function NeverHaveIEverLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
