import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-link" aria-label="The Party App">
          <Image
            src="/party-app.svg"
            alt=""
            className="brand-logo"
            width={240}
            height={26}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
