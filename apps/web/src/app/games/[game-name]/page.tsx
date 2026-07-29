import type { Metadata } from 'next';
import { Construction } from 'lucide-react';
import { RouteTint } from '@/_components/route-tint/route-tint';

export interface MissingGamePageProps {
  params: Promise<{
    'game-name': string;
  }>;
}

export async function generateMetadata({
  params,
}: MissingGamePageProps): Promise<Metadata> {
  const { 'game-name': gameName } = await params;

  return {
    title: `Unbekanntes Spiel: ${gameName}`,
    robots: { index: false, follow: false },
  };
}

export default async function MissingGamePage({
  params,
}: MissingGamePageProps) {
  const { 'game-name': gameName } = await params;

  return (
    <>
      <RouteTint darkColor="#304354" lightColor="#d8e3ec" />
      <div className="status-panel">
        <span className="status-panel__icon">
          <Construction aria-hidden="true" />
        </span>
        <h1>Spiel nicht verfügbar</h1>
        <p>Das Spiel {gameName} gibt es leider noch nicht.</p>
      </div>
    </>
  );
}
