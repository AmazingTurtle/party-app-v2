import type { Metadata } from 'next';
import Link from 'next/link';
import { ColorTransition } from '@/_components/color-transition';

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Provider and contact information for The Party App.',
  alternates: { canonical: '/imprint' },
};

export default function ImprintPage() {
  return (
    <>
      <ColorTransition targetColor="#2b778e" />
      <div className="-mx-4 -mt-2 mb-0">
        <Link href="/" className="block p-4">
          ← Back to the home page
        </Link>
      </div>

      <article className="legal-container">
        <h1>Imprint</h1>

        <section>
          <h2>Information according to § 5 DDG</h2>
          <p>
            Felix Faust
            <br />
            Freiherr-vom-Stein-Straße 44
            <br />
            51545 Waldbröl
            <br />
            Germany
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Phone: <a href="tel:+4915115146363">+49 151 15146363</a>
            <br />
            Email:{' '}
            <a href="mailto:imprint@turtledev.net">imprint@turtledev.net</a>
          </p>
        </section>

        <section>
          <h2>VAT ID</h2>
          <p>
            VAT identification number according to § 27a German VAT Act:
            <br />
            DE447883460
          </p>
        </section>
      </article>
    </>
  );
}
