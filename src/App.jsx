import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesPolicy from './pages/CookiesPolicy';
import ProjectDetail from './pages/ProjectDetail';
import EventPaywall from './pages/EventPaywall';
import NotFound from './pages/NotFound';

function Loader({ onDone }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      onDone();
    }, 1400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={`loader${hidden ? ' is-hidden' : ''}`} id="loader" aria-hidden="true">
      <img
        className="loader__logo"
        src="/logo.svg"
        alt="Logo"
      />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Let anchor scroll happen naturally
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const [loaderDone, setLoaderDone] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {isHome && <Loader onDone={() => setLoaderDone(true)} />}
      <div className="cursor" id="cursor" aria-hidden="true" />
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legal" element={<LegalNotice />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        {/* Event Paywall / Tickets routes */}
        <Route path="/events/:slug" element={<EventPaywall />} />
        <Route path="/tickets/:slug" element={<EventPaywall />} />
        {/* All agency project slugs */}
        <Route path="/essentials" element={<ProjectDetail />} />
        <Route path="/shades" element={<ProjectDetail />} />
        <Route path="/bottles-everywhere" element={<ProjectDetail />} />
        <Route path="/studio-55-maxims-de-paris" element={<ProjectDetail />} />
        <Route path="/dont-be-late" element={<ProjectDetail />} />
        <Route path="/mirar" element={<ProjectDetail />} />
        <Route path="/taxi" element={<ProjectDetail />} />
        <Route path="/romeo" element={<ProjectDetail />} />
        <Route path="/diesel-only-desire-the-house-of-desire" element={<ProjectDetail />} />
        <Route path="/diesel" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
