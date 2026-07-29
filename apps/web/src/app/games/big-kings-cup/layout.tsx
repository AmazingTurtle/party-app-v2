import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Big Kings Cup',
  alternates: { canonical: '/games/big-kings-cup' },
};

export default function BigKingsCupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
