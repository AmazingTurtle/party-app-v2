import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-3xl font-semibold">Du bist gerade offline</h1>
      <p className="max-w-md opacity-80">
        Bereits geladene Spiele funktionieren weiterhin. Für neue Inhalte
        brauchst du wieder eine Internetverbindung.
      </p>
      <Link className="button" href="/">
        Zur Startseite
      </Link>
    </main>
  );
}
