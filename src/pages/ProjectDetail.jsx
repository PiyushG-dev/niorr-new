import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="notfound">
        <h1>404</h1>
        <p>Project not found.</p>
        <Link to="/">← Back home</Link>
      </div>
    );
  }

  const hasGallery = project.gallery && project.gallery.length > 0;
  const hasVideo = project.previewVideo && !hasGallery;

  return (
    <>
      <main>
        <section className="project">
          <div className="project__header">
            <h1 className="project__title">{project.title}</h1>
            <div className="project__header-nav">
              {prevProject && (
                <Link to={`/${prevProject.slug}`} className="project__nav-link">
                  ← prev project
                </Link>
              )}
              {nextProject && (
                <Link to={`/${nextProject.slug}`} className="project__nav-link">
                  next project →
                </Link>
              )}
            </div>
          </div>

          {project.description && (
            <p className="project__description">{project.description}</p>
          )}

          {/* Image gallery */}
          {hasGallery && (
            <div className="project__gallery">
              {project.gallery.map((src, i) => (
                <img key={i} src={src} alt="" loading="lazy" decoding="async" />
              ))}
            </div>
          )}

          {/* Single video */}
          {hasVideo && (
            <div className="project__gallery project__gallery--single">
              <video
                src={project.previewVideo}
                muted
                loop
                playsInline
                autoPlay
                controls
              />
            </div>
          )}

          {/* Preview image if no gallery or video */}
          {!hasGallery && !hasVideo && project.previewImg && (
            <div className="project__gallery project__gallery--single">
              <img src={project.previewImg} alt="" loading="lazy" decoding="async" />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
