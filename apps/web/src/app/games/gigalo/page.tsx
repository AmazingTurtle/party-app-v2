import { ColorTransition } from '@/_components/color-transition';

export default function GigaloPage() {
  return (
    <div className="flex w-full grow items-center text-left">
      <ColorTransition targetColor={'#230505'} />
      <div className="w-full">
        <div className="py-8 text-center text-2xl">
          Das Spiel Gigalo gibt es leider noch nicht.
        </div>
      </div>
    </div>
  );
}
