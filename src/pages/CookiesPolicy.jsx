import Footer from '../components/Footer';

export default function CookiesPolicy() {
  return (
    <>
      <main>
        <article className="legal">
          <header className="legal__head">
            <span className="eyebrow">Legal</span>
            <h1 className="legal__title">Cookies Policy</h1>
          </header>

          <section className="legal__section">
            <h2>What are cookies?</h2>
            <p>
              Cookies are small text files placed on your device by websites you visit. They are widely used
              to make websites work efficiently and to provide information to the website owners.
            </p>
          </section>

          <section className="legal__section">
            <h2>Cookies we use</h2>
            <p>
              We use a limited number of cookies on this website:
            </p>
            <ul className="legal__list">
              <li>
                <strong>Cookie consent</strong> (strictly necessary): a small cookie to store your response
                to our cookie consent banner. No personal data is collected.
              </li>
              <li>
                <strong>Analytics cookies</strong> (optional, requires your consent): we use privacy-friendly
                analytics to understand how visitors use our site — which pages are most visited, how long
                sessions last, and where visitors come from. These cookies do not identify you personally and
                the data is aggregated.
              </li>
            </ul>
          </section>

          <section className="legal__section">
            <h2>Managing cookies</h2>
            <p>
              You can control and/or delete cookies at any time using your browser settings. You can also
              withdraw your analytics consent at any time by clicking "Reject" on the cookie banner (clear
              your browser's local storage to see it again) or by adjusting your browser settings.
            </p>
            <p>
              Deleting cookies may affect your experience on this and other websites.
            </p>
          </section>

          <section className="legal__section">
            <h2>Third-party cookies</h2>
            <p>
              We do not use third-party advertising cookies. Any analytics data collected is processed in
              accordance with our{' '}
              <a href="/privacy">Privacy Policy</a>.
            </p>
          </section>

          <section className="legal__section">
            <h2>Updates to this policy</h2>
            <p>
              We may update this Cookies Policy from time to time. The date of the last revision is shown
              below.
            </p>
          </section>

          <p className="legal__meta">Last updated: 04 May 2026</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
