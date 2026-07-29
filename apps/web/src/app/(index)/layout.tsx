import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LegalLinks } from '@/_components/legal-links';

export default function IndexLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between overflow-hidden p-4 lg:p-24">
      <div className="z-10 w-full max-w-5xl flex-col text-sm">
        <div className="fixed bottom-0 left-0 flex h-48 w-full flex-col items-center justify-end bg-gradient-to-t from-white via-white pb-4 lg:static lg:h-auto lg:w-auto lg:bg-none dark:from-black dark:via-black">
          <Link
            className="pointer-events-none z-20 flex place-items-center gap-2 px-4 pb-2 lg:pointer-events-auto lg:p-0"
            href="/"
          >
            <Image
              src="/party-app.svg"
              alt="Party App Logo"
              className="invert dark:filter-none"
              width={240}
              height={26}
            />
          </Link>
          <LegalLinks />
        </div>
      </div>
      {children}
    </main>
  );
}
