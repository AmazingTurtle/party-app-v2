import Image from 'next/image';
import { ColorTransition } from 'party/_components/color-transition';
import { GameLink } from 'party/_components/game-link';

export default function Home() {
  return (
    <>
      <ColorTransition targetColor={'#0a1012'} />
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] px-2 py-8">
        <Image
          className="relative drop-shadow-[0_0_0.6rem_#00000040] invert dark:filter-none"
          src="/party-app.svg"
          alt="Next.js Logo"
          width={544}
          height={60}
          priority
        />
      </div>

      <div className="mb-48 grid text-center lg:max-w-5xl w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-8 lg:mt-0 gap-4">
        <GameLink
          href="/games/never-have-i-ever"
          className="game-never"
          title="Ich hab noch nie"
          description="Der Klassiker unter den Trinkspielen. Einfach, schnell und lustig."
        />

        <GameLink
          href="/games/truth-or-dare"
          className="game-truth-or-dare"
          title="Wahrheit oder Pflicht"
          description="Das Spiel für die etwas Mutigeren unter euch."
        />

        <GameLink
          href="/games/big-kings-cup"
          className="game-kings-cup"
          title="Big Kings Cup"
          description="Das ultimative Trinkspiel für die ganze Party."
        />

        <GameLink
          href="/games/gigalo"
          className="game-gigalo"
          title="Gigalo"
          description="Definitiv nicht Picolo. Aber auch ein tolles Trinkspiel."
        />

        <GameLink
          href="/games/bus-driver"
          className="game-bus-driver"
          title="Bus Fahrer"
          description="Bist du Meister im Trinken? Finde es heraus."
        />

        <GameLink
          href="/games/five-seconds"
          className="game-five-seconds"
          title="5 Sekunden Regel"
          description="Beantworte die Fragen in 5 Sekunden. Klingt einfach? Ist es nicht."
        />
      </div>
    </>
  );
}
