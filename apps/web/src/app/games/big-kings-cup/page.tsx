'use client';

import dynamic from 'next/dynamic';

const BigKingsCupGame = dynamic(() => import('./big-kings-cup-game'), {
  ssr: false,
});

export default function BigKingsCupPage() {
  return <BigKingsCupGame />;
}
