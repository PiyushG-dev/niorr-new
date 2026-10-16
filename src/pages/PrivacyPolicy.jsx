import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <main>
        <article className="legal">
          <header className="legal__head">
            <span className="eyebrow">Legal</span>
            <h1 className="legal__title">Privacy Policy</h1>
          </header>

          <section className="legal__section">
            <h2>Data controller</h2>
            <p>
              <strong>55b Productions S.L.</strong>, Tax ID B22959779, Calle San Mateo nº8, 3-B, 28004 Madrid,
              Spain. Contact:{' '}
              <a href="mailto:contact@55bproductions.com">contact@55bproductions.com</a>.
            </p>
          </section>

          <section className="legal__section">
            <h2>What data we collect</h2>
            <p>The personal data we may collect through this website is limited to:</p>
            <ul className="legal__list">
              <li>
                <strong>Email correspondence</strong>: when you contact us at{' '}
                <a href="mailto:contact@55bproductions.com">contact@55bproductions.com</a>{' '}
                — typically your email address, name and message.
              </li>
              <li>
                <strong>Newsletter signup</strong>: when you subscribe via the footer form, we collect your
                email address and your explicit consent to receive marketing emails. The form is processed by
                our relay provider{' '}
                <a href="https://formspree.io" target="_blank" rel="noopener">Formspree</a>{' '}
                (Formspree, Inc.) which forwards the submission to our inbox.
              </li>
              <li>
                <strong>Studio 55 application</strong>: when you apply via the Studio 55 form, we collect
                your first name, last name, Instagram handle, email and (optionally) a favorite song.
                Submissions are processed by Formspree and forwarded to our inbox.
              </li>
              <li>
                <strong>Audience analytics</strong>: see our{' '}
                <Link to="/cookies">Cookies Policy</Link>. Analytics cookies are only set after you give
                consent via our cookie banner.
              </li>
            </ul>
          </section>

          <section className="legal__section">
            <h2>Newsletter</h2>
            <p>
              If you subscribe to our newsletter, we will use your email address solely to send you news,
              event announcements and content from 55b. You can withdraw your consent at any time by replying
              "UNSUBSCRIBE" to any of our emails or by writing to{' '}
              <a href="mailto:contact@55bproductions.com">contact@55bproductions.com</a>. Subscriber addresses
              are kept until you unsubscribe, plus three (3) years for proof of consent.
            </p>
          </section>

          <section className="legal__section">
            <h2>Why we process your data</h2>
            <ul className="legal__list">
              <li>To respond to your inquiry and manage our business relationship.</li>
              <li>To comply with our legal obligations.</li>
            </ul>
            <p>
              The legal basis is our legitimate interest in answering legitimate inquiries (Article 6(1)(f)
              GDPR) and, where applicable, your consent (Article 6(1)(a) GDPR).
            </p>
          </section>

          <section className="legal__section">
            <h2>How long we keep your data</h2>
            <p>
              Email correspondence is kept for up to three (3) years after our last meaningful contact, unless
              a longer retention is required by law or by an ongoing contractual relationship.
            </p>
          </section>

          <section className="legal__section">
            <h2>Recipients</h2>
            <p>
              Your data is processed only by the 55b Productions team. We do not sell or rent your personal
              data. Our website is hosted by Vercel Inc. (United States); data transfers outside the European
              Economic Area are covered by the Standard Contractual Clauses adopted by the European Commission.
            </p>
          </section>

          <section className="legal__section">
            <h2>Your rights</h2>
            <p>
              Under the GDPR (Regulation (EU) 2016/679) and Spanish data protection law (LOPDGDD), you have
              the right to access, rectify, erase, restrict, or object to the processing of your personal
              data, as well as the right to data portability and to withdraw your consent at any time. To
              exercise these rights, write to{' '}
              <a href="mailto:contact@55bproductions.com">contact@55bproductions.com</a>.
            </p>
            <p>
              You also have the right to lodge a complaint with the Spanish Data Protection Agency (Agencia
              Española de Protección de Datos —{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>) if you believe
              your rights are not being respected.
            </p>
          </section>

          <section className="legal__section">
            <h2>Security</h2>
            <p>
              We apply reasonable technical and organisational measures to protect your data against loss,
              misuse, unauthorised access, or disclosure.
            </p>
          </section>

          <section className="legal__section">
            <h2>Updates</h2>
            <p>
              This policy may be updated to reflect changes to the website or to applicable law. The latest
              version is always available on this page.
            </p>
          </section>

          <p className="legal__meta">Last updated: 04 May 2026</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
