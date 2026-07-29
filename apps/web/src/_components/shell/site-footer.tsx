import { LegalLinks } from './legal-links';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>The Party App</span>
        <LegalLinks />
      </div>
    </footer>
  );
}
