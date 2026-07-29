import type { Metadata } from 'next';
import { RouteTint } from '@/_components/route-tint/route-tint';

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Provider and contact information for The Party App.',
  alternates: { canonical: '/imprint' },
};

export default function ImprintPage() {
  return (
    <>
      <RouteTint darkColor="#28515a" lightColor="#cce8eb" />
      <div className="legal-page">
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
      </div>
    </>
  );
}
