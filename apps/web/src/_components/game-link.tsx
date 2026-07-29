import Link from 'next/link';
import { GameLinkContent } from '@/_components/game-link-content';

export interface GameLinkProps {
  href: string;
  className: string;
  title: string;
  description: string;
}
export function GameLink({
  href,
  className,
  title,
  description,
}: GameLinkProps) {
  return (
    <Link href={href} className={`game-link relative h-32 ${className}`}>
      <GameLinkContent title={title} description={description} />
    </Link>
  );
}
