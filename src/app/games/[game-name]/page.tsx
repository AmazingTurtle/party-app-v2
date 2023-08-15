'use client';

import { ColorTransition } from 'party/app/color-transition';

export default function Home({ params }: { params: { 'game-name': string } }) {
  return (
    <div className="text-left w-full grow flex items-center">
      <ColorTransition targetColor={'#0a1012'} />
      <div className="w-full">
        <div className="py-8 text-2xl text-center">
          Das Spiel {params['game-name']} gibt es leider noch nicht.
        </div>
      </div>
    </div>
  );
}
