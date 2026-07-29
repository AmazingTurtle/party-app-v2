import Link from 'next/link';

export function LegalLinks() {
  return (
    <nav className="legal-links" aria-label="Legal">
      <Link className="link" href="/imprint">
        Imprint
      </Link>
      <Link className="link" href="/privacy">
        Privacy Policy
      </Link>
    </nav>
  );
}
