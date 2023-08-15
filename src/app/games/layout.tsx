import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GamesLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 lg:p-24 overflow-hidden">
      <div className="z-10 max-w-5xl w-full text-sm flex-col">
        <div className="fixed bottom-0 left-0 flex flex-col items-center justify-end h-32 w-full bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none pb-4">
          <Link
            className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto lg:p-0 px-4 pb-2 z-20"
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

          <div className="text-sm justify-around flex items-center">
            <Link className="p-2 mr-6 link" href="/privacy">
              Datenschutz
            </Link>
            App by{' '}
            <a
              className="p-2 link"
              href="https://github.com/AmazingTurtle"
              target="_blank"
              rel="noopener noreferrer"
            >
              Felix Faust
            </a>
            {' & '}
            <a
              className="p-2 link"
              href="https://www.linkedin.com/in/julian-dik-146845187/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Julian Dik
            </a>
          </div>
        </div>
      </div>

      <div className="-mx-4 -mt-2 mb-0">
        <Link href="/" className="block p-4">
          &lt;- Zurück zur Startseite
        </Link>
      </div>
      <div className="flex grow pb-32">{children}</div>
    </main>
  );
}
