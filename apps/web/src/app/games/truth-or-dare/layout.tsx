import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { games } from '@/games/game-catalog';

export const metadata: Metadata = {
  title: games['truth-or-dare'].title,
  alternates: { canonical: '/games/truth-or-dare' },
};

export default function TruthOrDareLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
