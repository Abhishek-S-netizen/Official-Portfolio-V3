import React, { useState, useRef } from 'react';
import porscheImg from '../../images/Porsche.png';
import autoVerseImg from '../../images/AutoVerse.png';
import cineMaxImg from '../../images/CineMax.png';
import ppeImg from '../../images/PPE_Detection.png';
import predictiveMaintenanceImg from '../../images/Predictive_Maintenance.png';

export default function ProjectsCarousel({ onSelectProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  // Curated 5 Flagship Showcase Projects
  const projects = [
    {
      id: 'porsche-showcase',
      title: 'Porsche Showcase Platform',
      tagline: 'A Porsche-inspired web platform, featuring dynamic content management and premium UI design.',
      description: 'A Porsche-inspired web platform built using Laravel, PHP, PostgreSQL, and Cloudinary. The project combines dynamic vehicle content, custom content management, and immersive frontend animations to recreate selected aspects of the Porsche digital experience. Developed as a personal portfolio project inspired by the official Porsche website, it showcases both modern frontend development and scalable backend architecture.',
      tech: ['Laravel', 'PHP', 'JavaScript', 'PostgreSQL', 'Cloudinary'],
      image: porscheImg,
      githubUrl: 'https://github.com/Abhishek-S-netizen/porsche-inspired-cms'
    },
    {
      id: 'autoverse',
      title: 'AutoVerse',
      tagline: 'A full-stack automotive platform for car reviews, vehicle comparisons, wishlists, and rental services.',
      description: 'AutoVerse is a full-stack automotive platform developed using Laravel, PHP, and PostgreSQL. Designed for car enthusiasts, it enables users to explore detailed vehicle reviews, compare models, manage wishlists, and access rental services. The platform includes secure authentication, dedicated user and admin dashboards, and a responsive frontend built with HTML5, CSS3, JavaScript, and Bootstrap.',
      tech: ['Laravel', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'Postgresql'],
      image: autoVerseImg,
      githubUrl: 'https://github.com/Abhishek-S-netizen/AutoVerse'
    },
    {
      id: 'cinemax',
      title: 'CineMax',
      tagline: 'A full-stack movie ticket booking system with seat locking concurrency control and ticket QR codes.',
      description: 'CineMax is a full-stack movie booking application featuring a modern React frontend and a Node.js/Express backend. Built with concurrency control using MongoDB TTL indexing, it secures temporary 5-minute seat locks to prevent double-booking. The platform generates client-side PDF tickets with functional QR codes and features a comprehensive administrative panel for analytics, user management, and showtimes CRUD operations.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
      image: cineMaxImg,
      liveUrl: 'https://cinemax-xi.vercel.app/',
      githubUrl: 'https://github.com/Abhishek-S-netizen/movie-ticket-booking-system'
    },
    {
      id: 'ppe-detection',
      title: 'PPE Detection (YOLO)',
      tagline: 'Real-time Personal Protective Equipment detection identifying safety helmets, vests, and eyewear.',
      description: 'A real-time deep learning computer vision model trained using YOLOv8 and OpenCV. Features instant multi-class detection for safety helmets, high-visibility vests, and protective gear on construction sites with high-precision confidence scoring and automated workplace compliance alerts.',
      tech: ['Python', 'YOLOv8', 'Computer Vision', 'OpenCV', 'PyTorch'],
      image: ppeImg,
      liveUrl: 'https://ppe-safety-monitor-m2mkaj7emw3n4th9qqfax7.streamlit.app/',
      githubUrl: 'https://github.com/Abhishek-S-netizen/PPE-safety-monitor'
    },
    {
      id: 'predictive-maintenance',
      title: 'Predictive Maintenance',
      tagline: 'Predictive maintenance system using XGBoost to predict equipment failures and Remaining Useful Life.',
      description: 'Developed a predictive maintenance system using Python, Scikit-Learn, XGBoost, and Streamlit to predict equipment failures and estimate Remaining Useful Life (RUL). The solution includes data preprocessing, feature engineering, model optimization, SHAP explainability, and an interactive dashboard for maintenance decision support.',
      tech: ['Python', 'Machine Learning', 'Pandas', 'Scikit-Learn'],
      image: predictiveMaintenanceImg,
      liveUrl: 'https://predictive-maintenance-y7yvnhdeih7i624baocrwp.streamlit.app/',
      githubUrl: 'https://github.com/Abhishek-S-netizen/Predictive-Maintenance'
    }
  ];

  const total = projects.length;

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) nextProject();
    else if (diff < -40) prevProject();
    isDragging.current = false;
  };

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    const diff = dragStartX.current - e.clientX;
    if (diff > 40) nextProject();
    else if (diff < -40) prevProject();
    isDragging.current = false;
  };

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header-row">
          <h2 className="section-title">Projects</h2>

          {/* Sadu Crimson Navigation Pill */}
          <div className="carousel-nav-controls">
            <button
              type="button"
              onClick={prevProject}
              className="carousel-btn"
              aria-label="Previous project"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <span className="carousel-counter">
              0{activeIndex + 1} <span>/ 0{total}</span>
            </span>
            <button
              type="button"
              onClick={nextProject}
              className="carousel-btn"
              aria-label="Next project"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* 3D Ring Stage */}
        <div
          className="stage-3d-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div className="stage-3d-ring">
            {projects.map((proj, idx) => {
              let offset = idx - activeIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              let cardClass = 'center-card';
              if (offset === 1) cardClass = 'right-card';
              if (offset === -1) cardClass = 'left-card';
              if (Math.abs(offset) > 1) cardClass = 'hidden-card';

              return (
                <div
                  key={proj.id}
                  className={`project-card-3d ${cardClass}`}
                  onClick={() => {
                    if (offset !== 0) setActiveIndex(idx);
                  }}
                >
                  <div className="card-media-box">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="card-media-img"
                      loading="lazy"
                    />
                    <div className="card-media-overlay"></div>
                  </div>

                  <div className="card-body">
                    <h3 className="card-title">{proj.title}</h3>
                    <p className="card-tagline">{proj.tagline}</p>

                    <div className="card-tech-stack">
                      {proj.tech.map((t, tIdx) => (
                        <span key={tIdx} className="tech-tag-item">
                          {t}
                          {tIdx < proj.tech.length - 1 && <span className="tech-dot">•</span>}
                        </span>
                      ))}
                    </div>

                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn-project-details"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject && onSelectProject(proj);
                        }}
                      >
                        <span>Project Details</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Subtle, Classy GitHub Repository Redirect Link */}
        <div className="github-archive-wrap">
          <a
            href="https://github.com/Abhishek-S-netizen"
            target="_blank"
            rel="noopener noreferrer"
            className="github-archive-link"
          >
            <span className="archive-link-text">
              Explore more repositories on GitHub
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .projects-section {
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .section-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          width: 100%;
          gap: 1rem;
        }

        .carousel-nav-controls {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: var(--color-crimson);
          border: 1px solid var(--color-crimson-bright);
          padding: 0.55rem 1.35rem;
          border-radius: 999px;
          box-shadow: 0 6px 20px var(--color-crimson-glow);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .carousel-btn {
          background: transparent;
          color: #ffffff;
          font-size: 0.95rem;
          padding: 0.25rem 0.45rem;
          border-radius: 50%;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.22);
          transform: scale(1.15);
        }

        .carousel-counter {
          font-family: var(--font-jura);
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .carousel-counter span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        /* 3D Ring Stage */
        .stage-3d-wrapper {
          position: relative;
          width: 100%;
          min-height: 640px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1350px;
          perspective-origin: 50% 50%;
          user-select: none;
          cursor: grab;
          margin-bottom: 2.5rem;
        }

        .stage-3d-wrapper:active {
          cursor: grabbing;
        }

        .stage-3d-ring {
          position: relative;
          width: 100%;
          max-width: 560px;
          height: 600px;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-card-3d {
          position: absolute;
          width: 100%;
          background: #18181b;
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.65s cubic-bezier(0.2, 0.85, 0.2, 1), opacity 0.65s cubic-bezier(0.2, 0.85, 0.2, 1), filter 0.65s cubic-bezier(0.2, 0.85, 0.2, 1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.75);
          will-change: transform, opacity;
        }

        /* Center Card: Clean, unhighlighted border matching overall palette */
        .project-card-3d.center-card {
          transform: translate3d(0, 0, 0) scale(1) rotateY(0deg);
          z-index: 10;
          opacity: 1;
          border-color: var(--border-subtle);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
        }

        .project-card-3d.right-card {
          transform: translate3d(82%, 0, -160px) scale(0.82) rotateY(-25deg);
          z-index: 5;
          opacity: 0.55;
          filter: brightness(0.65);
          cursor: pointer;
        }

        .project-card-3d.right-card:hover {
          opacity: 0.88;
          filter: brightness(0.88);
        }

        .project-card-3d.left-card {
          transform: translate3d(-82%, 0, -160px) scale(0.82) rotateY(25deg);
          z-index: 5;
          opacity: 0.55;
          filter: brightness(0.65);
          cursor: pointer;
        }

        .project-card-3d.left-card:hover {
          opacity: 0.88;
          filter: brightness(0.88);
        }

        .project-card-3d.hidden-card {
          transform: translate3d(0, 0, -350px) scale(0.5);
          opacity: 0;
          pointer-events: none;
          z-index: 1;
        }

        .card-media-box {
          position: relative;
          width: 100%;
          height: 275px;
          overflow: hidden;
          background: #101012;
        }

        .card-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .project-card-3d.center-card:hover .card-media-img {
          transform: scale(1.04);
        }

        .card-media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(24, 24, 27, 0.95) 100%);
        }

        .card-body {
          padding: 1.75rem 2rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-family: var(--font-jura);
          font-size: 1.55rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.65rem;
          letter-spacing: 0.02em;
        }

        .card-tagline {
          font-size: 0.96rem;
          color: #bdb8b0;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          min-height: 48px;
        }

        .card-tech-stack {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
          font-family: var(--font-mono);
          font-size: 0.84rem;
          color: var(--color-sand);
        }

        .tech-tag-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tech-dot {
          color: var(--color-crimson);
          font-size: 0.7rem;
        }

        .card-footer {
          display: flex;
          align-items: center;
        }

        .btn-project-details {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1.55rem;
          background: rgba(188, 166, 147, 0.08);
          border: 1px solid var(--border-medium);
          border-radius: 999px;
          color: var(--color-sand);
          font-family: var(--font-jura);
          font-size: 0.94rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          transition: all var(--transition-fast);
        }

        .btn-project-details:hover {
          background: var(--color-crimson);
          border-color: var(--color-crimson-bright);
          color: #ffffff;
          box-shadow: 0 4px 15px var(--color-crimson-glow);
          transform: translateY(-2px);
        }

        .carousel-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          margin-bottom: 2rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #333338;
          transition: all 0.3s;
          border: none;
        }

        .dot.active {
          width: 32px;
          background: var(--color-crimson);
          box-shadow: 0 0 10px var(--color-crimson-glow);
        }

        /* Subtle Minimalist GitHub Link */
        .github-archive-wrap {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          padding: 0 1rem;
          width: 100%;
        }

        .github-archive-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-jura);
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: var(--text-muted);
          transition: all var(--transition-fast);
          padding: 0.55rem 1.35rem;
          border-radius: 999px;
          background: rgba(188, 166, 147, 0.06);
          text-decoration: none;
        }

        .archive-link-text {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          white-space: nowrap;
        }

        .archive-link-text i {
          font-size: 0.8rem;
          color: var(--color-crimson);
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .github-archive-link:hover {
          color: var(--color-sand);
          background: rgba(188, 166, 147, 0.14);
          transform: translateY(-2px);
        }

        .github-archive-link:hover i {
          transform: translate(2px, -2px);
          color: var(--color-sand);
        }

        /* Responsive Mobile Behavior */
        @media (max-width: 900px) {
          .stage-3d-ring {
            max-width: 440px;
            height: 520px;
          }
          .card-media-box {
            height: 220px;
          }
          .project-card-3d.right-card {
            transform: translate3d(70%, 0, -140px) scale(0.8) rotateY(-22deg);
          }
          .project-card-3d.left-card {
            transform: translate3d(-70%, 0, -140px) scale(0.8) rotateY(22deg);
          }
        }

        @media (max-width: 600px) {
          .section-header-row {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .section-title {
            font-size: 1.85rem;
            margin-bottom: 0;
          }

          .carousel-nav-controls {
            padding: 0.4rem 0.95rem;
            gap: 0.75rem;
          }

          .carousel-counter {
            font-size: 0.88rem;
          }

          .stage-3d-wrapper {
            min-height: 490px;
            perspective: 850px;
          }

          .stage-3d-ring {
            max-width: 300px;
            height: 460px;
          }

          .project-card-3d {
            border-radius: 14px;
          }

          .card-media-box {
            height: 160px;
          }

          .card-body {
            padding: 1.25rem 1.25rem 1.4rem;
          }

          .card-title {
            font-size: 1.18rem;
            margin-bottom: 0.4rem;
          }

          .card-tagline {
            font-size: 0.84rem;
            line-height: 1.45;
            min-height: auto;
            margin-bottom: 0.85rem;
          }

          .card-tech-stack {
            font-size: 0.74rem;
            gap: 0.35rem;
            margin-bottom: 1.15rem;
          }

          .btn-project-details {
            padding: 0.5rem 1.1rem;
            font-size: 0.84rem;
          }

          .project-card-3d.right-card {
            display: block;
            transform: translate3d(62%, 0, -110px) scale(0.75) rotateY(-22deg);
            opacity: 0.45;
          }

          .project-card-3d.left-card {
            display: block;
            transform: translate3d(-62%, 0, -110px) scale(0.75) rotateY(22deg);
            opacity: 0.45;
          }

          .github-archive-link {
            font-size: 0.82rem;
            padding: 0.45rem 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}
