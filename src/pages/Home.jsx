import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import { projects } from '../data/projects';
import { events } from '../data/events';

function RosterSection() {
  const previewImgRef = useRef(null);
  const previewVideoRef = useRef(null);
  const [activeSlug, setActiveSlug] = useState(null);

  const handleMouseEnter = (project) => {
    setActiveSlug(project.slug);
    if (project.previewVideo) {
      if (previewImgRef.current) previewImgRef.current.classList.remove('is-visible');
      if (previewVideoRef.current) {
        previewVideoRef.current.src = project.previewVideo;
        previewVideoRef.current.play().catch(() => {});
        previewVideoRef.current.classList.add('is-visible');
      }
    } else if (project.previewImg) {
      if (previewVideoRef.current) {
        previewVideoRef.current.classList.remove('is-visible');
        previewVideoRef.current.pause();
        previewVideoRef.current.src = '';
      }
      if (previewImgRef.current) {
        previewImgRef.current.src = project.previewImg;
        previewImgRef.current.classList.add('is-visible');
      }
    }
  };

  const handleMouseLeave = () => {
    setActiveSlug(null);
    if (previewImgRef.current) previewImgRef.current.classList.remove('is-visible');
    if (previewVideoRef.current) {
      previewVideoRef.current.classList.remove('is-visible');
      previewVideoRef.current.pause();
      previewVideoRef.current.src = '';
    }
  };

  return (
    <section id="agency" className="roster reveal">
      <header className="roster__head">
        <h2>Agency</h2>
      </header>

      {/* Desktop layout */}
      <div className="roster__layout">
        <div className="roster__group">
          <ul className="roster__list">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/${project.slug}`}
                  className={activeSlug === project.slug ? 'is-active' : ''}
                  onMouseEnter={() => handleMouseEnter(project)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="roster__num">{project.num}.</span>{' '}
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="roster__preview" aria-hidden="true">
          <img ref={previewImgRef} id="rosterPreviewImg" alt="" />
          <video ref={previewVideoRef} id="rosterPreviewVideo" muted loop playsInline />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="roster__mobile">
        {projects.map((project) => (
          <div key={project.slug} className="roster__mobile-item">
            <Link to={`/${project.slug}`}>
              {project.previewVideo ? (
                <video
                  src={project.previewVideo}
                  muted
                  loop
                  playsInline
                  preload="none"
                  autoPlay
                />
              ) : project.previewImg ? (
                <img src={project.previewImg} alt="" loading="lazy" decoding="async" />
              ) : null}
              <span>{project.num}. {project.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobile = window.innerWidth <= 768;
    const src = isMobile
      ? 'https://res.cloudinary.com/x8piympo/video/upload/f_auto,q_auto:eco,c_limit,w_640/v1791673060/fvpdydht7xi5iewbidtj.webm'
      : 'https://res.cloudinary.com/x8piympo/video/upload/f_auto,q_auto:eco,c_limit,w_1280/v1791673053/ewja0uqicbd6ms6klztd.webm';
    const poster = isMobile
      ? 'https://res.cloudinary.com/x8piympo/video/upload/so_0,f_auto,q_auto,c_limit,w_640/v1791673060/fvpdydht7xi5iewbidtj.jpg'
      : 'https://res.cloudinary.com/x8piympo/video/upload/so_0,f_auto,q_auto,c_limit,w_1280/v1791673053/ewja0uqicbd6ms6klztd.jpg';

    video.poster = poster;
    video.src = src;
    video.play().catch(() => {});
  }, []);

  return (
    <>
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero__media">
            <video
              ref={videoRef}
              className="hero__video"
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
        </section>

        {/* About */}
        <section id="about" className="about reveal">
          <p className="about__quote">
            55b is a creative label working<br />
            across culture, beauty, and contemporary expression.
          </p>
        </section>

        {/* Events */}
        <section id="events" className="events reveal">
          <header className="events__head">
            <h2>Events</h2>
          </header>
          <ul className="events__list">
            {events.map((event) => (
              <li key={event.id} className="events__item">
                <Link to={`/events/${event.slug}`} className="events__media" aria-label={event.title}>
                  <img src={event.img} alt="" loading="lazy" decoding="async" />
                </Link>
                <h3 className="events__title">
                  <Link to={`/events/${event.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {event.title}
                  </Link>
                </h3>
                <span className="events__date">{event.date}</span>
                <Link
                  className="events__cta"
                  to={`/events/${event.slug}`}
                >
                  {event.ctaText}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Agency / Roster */}
        <RosterSection />

        {/* 55b for you */}
        <section id="venue" className="manifesto reveal">
          <header className="manifesto__head">
            <h2>55b for you</h2>
          </header>
          <div className="manifesto__grid">
            <div className="manifesto__media">
              <img
                src="https://55b.studio/assets/manifesto.jpg"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="manifesto__text">
              <p className="manifesto__quote">
                "From jazz to disco, we curate events and experiences around the world, where music, fashion, and visual culture meet a global community of creatives."
              </p>
              <p className="manifesto__lead">
                We work with labels, brands and venues bringing them our agency and event production services. Reach out if you'd like to work with us.
              </p>
              <a
                className="manifesto__cta"
                href="mailto:contact@55bproductions.com?subject=55b%20for%20you"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
