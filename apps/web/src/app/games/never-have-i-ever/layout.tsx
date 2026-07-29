import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ich hab noch nie',
  alternates: { canonical: '/games/never-have-i-ever' },
};

export default function NeverHaveIEverLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
