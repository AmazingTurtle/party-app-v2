import { Construction } from 'lucide-react';
import { GameStage } from '@/_components/game-stage/game-stage';
import { RouteTint } from '@/_components/route-tint/route-tint';

export default function GigaloPage() {
  return (
    <>
      <RouteTint darkColor="#673c3a" lightColor="#f1d4d1" />
      <GameStage gameId="gigalo">
        <div className="status-panel border-0 shadow-none">
          <span className="status-panel__icon">
            <Construction aria-hidden="true" />
          </span>
          <p className="text-xl font-semibold text-[var(--text)]!">
            Das Spiel Gigalo gibt es leider noch nicht.
          </p>
        </div>
      </GameStage>
    </>
  );
}
