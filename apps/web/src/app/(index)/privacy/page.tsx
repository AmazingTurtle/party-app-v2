import type { Metadata } from 'next';
import Link from 'next/link';
import { ColorTransition } from '@/_components/color-transition';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How The Party App handles technical request data and local browser storage.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <ColorTransition targetColor="#2b778e" />
      <div className="-mx-4 -mt-2 mb-0">
        <Link href="/" className="block p-4">
          ← Back to the home page
        </Link>
      </div>

      <article className="legal-container">
        <h1>Privacy Policy</h1>
        <p>Last updated: July 28, 2026</p>

        <section>
          <h2>Controller</h2>
          <p>
            Felix Faust is responsible for the processing described on this
            page. The postal address and other provider details are available in
            the <Link href="/imprint">imprint</Link>. For privacy questions,
            email{' '}
            <a href="mailto:contact@turtledev.net">contact@turtledev.net</a>.
          </p>
        </section>

        <section>
          <h2>Hosting</h2>
          <p>
            This site is hosted by Vercel Inc. When you open it, Vercel may
            process technical request data such as your IP address, browser and
            device information, requested URL, referrer, timestamps, response
            status, and diagnostic data. This processing is necessary to deliver
            and protect the site. The legal basis is Article 6(1)(f) GDPR and
            the legitimate interest in operating a secure, reliable website.
          </p>
          <p>
            Vercel is based in the United States and may process data outside
            the European Economic Area. Details about its processing,
            international transfers, and subprocessors are available in{' '}
            <a
              href="https://vercel.com/legal/privacy-notice"
              target="_blank"
              rel="noreferrer"
            >
              Vercel&apos;s privacy notice
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Local app data</h2>
          <p>
            The service worker stores application files and visited pages in
            your browser so the app can remain usable offline. This cached data
            stays on your device and can be removed through your browser&apos;s
            site-data controls.
          </p>
          <p>
            The app does not create user accounts or send game answers to an
            application server. Fonts, images, and audio are served as local
            application assets.
          </p>
        </section>

        <section>
          <h2>No tracking or advertising</h2>
          <p>
            The current version does not use application analytics, advertising
            trackers, marketing cookies, contact forms, or profiling. If this
            changes, this policy must be updated before the new processing is
            enabled.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            Where the GDPR applies, you may have rights to access, correct,
            delete, restrict, or receive your personal data and to object to
            processing. You may also complain to a competent data-protection
            authority. Send privacy requests to{' '}
            <a href="mailto:contact@turtledev.net">contact@turtledev.net</a>.
          </p>
        </section>
      </article>
    </>
  );
}
