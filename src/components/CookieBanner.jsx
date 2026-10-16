import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('55b-cookie-consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 1200);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('55b-cookie-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('55b-cookie-consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" id="cookieBanner">
      <p className="cookie-banner__text">
        We use analytics cookies to understand how the site is used.{' '}
        <Link to="/cookies">Learn more</Link>.
      </p>
      <div className="cookie-banner__actions">
        <button className="cookie-banner__btn" onClick={reject}>Reject</button>
        <button className="cookie-banner__btn cookie-banner__btn--primary" onClick={accept}>Accept</button>
      </div>
    </div>
  );
}
