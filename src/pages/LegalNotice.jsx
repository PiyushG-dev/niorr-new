import Footer from '../components/Footer';

export default function LegalNotice() {
  return (
    <>
      <main>
        <article className="legal">
          <header className="legal__head">
            <span className="eyebrow">Legal</span>
            <h1 className="legal__title">Legal Notice</h1>
          </header>

          <section className="legal__section">
            <h2>Publisher</h2>
            <p>
              This website is published by <strong>55b Productions S.L.</strong>, a company registered in Spain.
            </p>
            <ul className="legal__list">
              <li>Tax ID (CIF): B22959779</li>
              <li>VAT number: ESB22959779</li>
              <li>Registered office: Calle San Mateo nº8, 3-B, 28004 Madrid, Spain</li>
              <li>Share capital: €3,000</li>
              <li>
                Email:{' '}
                <a href="mailto:contact@55bproductions.com">contact@55bproductions.com</a>
              </li>
              <li>Directors of publication: Amaia Zubia and Jaime Benarroch, Co-founders</li>
            </ul>
          </section>

          <section className="legal__section">
            <h2>Hosting</h2>
            <p>
              The website is hosted by <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789,
              United States —{' '}
              <a href="https://vercel.com" target="_blank" rel="noopener">vercel.com</a>.
            </p>
          </section>

          <section className="legal__section">
            <h2>Intellectual property</h2>
            <p>
              All content on this website (texts, images, videos, logos, graphics, structure) is the exclusive
              property of 55b Productions S.L. or its licensors and is protected by intellectual property laws.
              Any reproduction, distribution, modification or use without prior written consent is prohibited.
            </p>
          </section>

          <section className="legal__section">
            <h2>Liability</h2>
            <p>
              55b Productions S.L. takes reasonable care to ensure that the information published on this
              website is accurate and up to date but cannot guarantee its completeness. Use of the website is
              at the user's own risk. Outbound links are provided for convenience and 55b Productions S.L. is
              not responsible for the content of third-party websites.
            </p>
          </section>

          <section className="legal__section">
            <h2>Applicable law</h2>
            <p>
              This legal notice is governed by Spanish law. Any dispute will be submitted to the competent
              Spanish courts.
            </p>
          </section>

          <p className="legal__meta">Last updated: 04 May 2026</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
