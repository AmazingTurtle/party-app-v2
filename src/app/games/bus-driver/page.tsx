'use client';

import { ColorTransition } from 'party/app/color-transition';

export default function Home() {
  return (
    <div className="text-left w-full grow flex items-center">
      <ColorTransition targetColor={'#121004'} />
      <div className="w-full">
        <div className="py-8 text-2xl text-center">
          Busfahrer ist noch work in progress.
        </div>
      </div>
    </div>
  );
}
