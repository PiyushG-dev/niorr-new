import { useState } from 'react';
import { Link } from 'react-router-dom';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [msg, setMsg] = useState({ text: '', state: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !consent) return;
    setMsg({ text: 'Subscribing…', state: '' });
    // Simulate success (would use Formspree in production)
    setTimeout(() => {
      setMsg({ text: 'You\'re subscribed!', state: 'success' });
      setEmail('');
      setConsent(false);
    }, 800);
  };

  return (
    <form className="newsletter" id="newsletter" onSubmit={handleSubmit}>
      <div className="newsletter__row">
        <input
          className="newsletter__input"
          type="email"
          placeholder="your@email.com"
          required
          autoComplete="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="newsletter__btn" type="submit">Subscribe</button>
      </div>
      <label className="newsletter__consent">
        <input
          type="checkbox"
          required
          name="consent"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        <span>I agree to receive emails from 55b.</span>
      </label>
      {msg.text && (
        <p className={`newsletter__msg ${msg.state}`} role="status" aria-live="polite">
          {msg.text}
        </p>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__inner">
        <div className="footer__cols">
          <div className="footer__col">
            <span className="eyebrow">Studio</span>
            <p>Madrid based, available worldwide.</p>
          </div>
          <div className="footer__col">
            <span className="eyebrow">Socials</span>
            <ul>
              <li>
                <a href="https://www.instagram.com/with55b/" target="_blank" rel="noopener">Instagram</a>
              </li>
              <li>
                <a href="https://youtube.com/@55bjazz?si=3mNmx4BLYBs7DQD3" target="_blank" rel="noopener">YouTube</a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <span className="eyebrow">Contact</span>
            <a href="mailto:contact@55bproductions.com">contact@55bproductions.com</a>
          </div>
          <div className="footer__col">
            <span className="eyebrow">Newsletter</span>
            <NewsletterForm />
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            <span>© 2026 55b.</span>
            <span className="footer__rights">All rights reserved.</span>
            <span className="footer__credit">
              Powered by{' '}
              <a href="mailto:tidianebazile@icloud.com?subject=What%27s%20your%20project%3F">
                Tidiane Bazile
              </a>
            </span>
          </div>
          <div className="footer__legal">
            <Link to="/legal">Legal Notice</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
