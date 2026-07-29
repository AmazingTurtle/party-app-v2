import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5 Sekunden Regel',
  alternates: { canonical: '/games/five-seconds' },
};

export default function FiveSecondsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
