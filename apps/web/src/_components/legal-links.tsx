import Link from 'next/link';

export function LegalLinks() {
  return (
    <nav className="flex items-center gap-4 text-sm" aria-label="Legal">
      <Link className="link p-2" href="/imprint">
        Imprint
      </Link>
      <Link className="link p-2" href="/privacy">
        Privacy Policy
      </Link>
    </nav>
  );
}
