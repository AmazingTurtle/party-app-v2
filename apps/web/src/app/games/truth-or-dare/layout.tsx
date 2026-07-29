import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wahrheit oder Pflicht',
  alternates: { canonical: '/games/truth-or-dare' },
};

export default function TruthOrDareLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
