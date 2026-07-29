import type { Metadata } from 'next';
import { ColorTransition } from '@/_components/color-transition';

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
    <div className="flex w-full grow items-center text-left">
      <ColorTransition targetColor={'#0a1012'} />
      <div className="w-full">
        <div className="py-8 text-center text-2xl">
          Das Spiel {gameName} gibt es leider noch nicht.
        </div>
      </div>
    </div>
  );
}
