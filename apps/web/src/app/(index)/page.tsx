import type { Metadata } from 'next';
import { GameLink } from '@/_components/launcher/game-link';
import { RouteTint } from '@/_components/route-tint/route-tint';
import { publishedGameIds } from '@/games/game-catalog';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <RouteTint darkColor="#14353a" lightColor="#c9eef1" />
      <section className="launcher" aria-labelledby="launcher-heading">
        <div className="launcher__intro">
          <p className="launcher__eyebrow">Partyspiele</p>
          <h1 id="launcher-heading">Wähle ein Spiel</h1>
        </div>
        <div className="launcher__grid">
          {publishedGameIds.map((gameId) => (
            <GameLink key={gameId} gameId={gameId} />
          ))}
        </div>
      </section>
    </>
  );
}
