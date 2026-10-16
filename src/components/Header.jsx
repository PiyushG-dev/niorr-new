import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const isDarkPage = location.pathname.startsWith('/events') || location.pathname.startsWith('/tickets');

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      if (isHome) {
        const heroHeight = window.innerHeight;
        setIsOverDark(scrollY < heroHeight - 80);
      } else if (isDarkPage) {
        setIsOverDark(true);
      } else {
        setIsOverDark(false);
        setIsScrolled(true);
      }
    };

    if (isDarkPage) {
      setIsOverDark(true);
      setIsScrolled(window.scrollY > 40);
    } else if (!isHome) {
      setIsScrolled(true);
      setIsOverDark(false);
    } else {
      setIsOverDark(true);
      setIsScrolled(false);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, isDarkPage]);

  // Close nav on route change
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  const headerClass = [
    'site-header',
    isDarkPage ? 'is-dark-page' : '',
    isScrolled ? 'is-scrolled' : '',
    isOverDark && !isScrolled ? 'is-over-dark' : '',
  ].filter(Boolean).join(' ');

  const scrollToSection = (e, sectionId) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setNavOpen(false);
    } else {
      setNavOpen(false);
    }
  };

  return (
    <header className={headerClass}>
      <Link to="/" className="brand" aria-label="Logo">
        <img src="/logo.svg" alt="Logo" />
      </Link>

      <button
        className={`nav-toggle${navOpen ? ' is-open' : ''}`}
        id="navToggle"
        aria-label="Menu"
        aria-expanded={navOpen}
        onClick={() => setNavOpen(v => !v)}
      >
        <span />
        <span />
      </button>

      <nav className={`nav${navOpen ? ' is-open' : ''}`} id="primaryNav" aria-label="Primary">
        <a href={isHome ? '#about' : '/#about'} onClick={e => scrollToSection(e, 'about')}>About</a>
        <a href={isHome ? '#events' : '/#events'} onClick={e => scrollToSection(e, 'events')}>Events</a>
        <a href={isHome ? '#agency' : '/#agency'} onClick={e => scrollToSection(e, 'agency')}>Agency</a>
        <a href={isHome ? '#venue' : '/#venue'} onClick={e => scrollToSection(e, 'venue')}>55b for you</a>
        <a href={isHome ? '#contact' : '/#contact'} onClick={e => scrollToSection(e, 'contact')}>Contact</a>
      </nav>
    </header>
  );
}
