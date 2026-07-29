import { type ReactNode } from 'react';

export default function GamesLayout({ children }: { children: ReactNode }) {
  return (
    <main className="games-main">
      <div className="games-main__inner">
        <div className="games-main__content">{children}</div>
      </div>
    </main>
  );
}
