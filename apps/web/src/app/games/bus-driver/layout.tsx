import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bus Fahrer',
  alternates: { canonical: '/games/bus-driver' },
};

export default function BusDriverLayout({ children }: { children: ReactNode }) {
  return children;
}
