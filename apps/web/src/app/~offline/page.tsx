import Link from 'next/link';
import { WifiOff } from 'lucide-react';
import { RouteTint } from '@/_components/route-tint/route-tint';

export default function OfflinePage() {
  return (
    <main className="status-main">
      <RouteTint darkColor="#304354" lightColor="#d8e3ec" />
      <div className="status-panel">
        <span className="status-panel__icon">
          <WifiOff aria-hidden="true" />
        </span>
        <h1>Du bist gerade offline</h1>
        <p>
          Bereits geladene Spiele funktionieren weiterhin. Für neue Inhalte
          brauchst du wieder eine Internetverbindung.
        </p>
        <Link className="button" href="/">
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
