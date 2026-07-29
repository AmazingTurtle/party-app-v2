import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gigalo',
  alternates: { canonical: '/games/gigalo' },
  robots: { index: false, follow: false },
};

export default function GigaloLayout({ children }: { children: ReactNode }) {
  return children;
}
