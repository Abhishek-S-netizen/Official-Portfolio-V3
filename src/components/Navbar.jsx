import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        {/* Brand & Socials on Left */}
        <div className="nav-left">
          <a href="#" className="nav-brand">
            A.S
          </a>
          <div className="nav-socials">
            <a
              href="https://github.com/Abhishek-S-netizen"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-subramanian-64811b31a/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Desktop Navigation Items on Right */}
        <nav className="nav-links desktop-only">
          <a href="#about" className="nav-link">About</a>
          <a href="#technologies" className="nav-link">Technologies</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#certifications" className="nav-link">Certifications</a>

          <button
            type="button"
            onClick={onOpenContact}
            className="nav-link contact-pill"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="hamburger-btn mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-items">
          <a href="#about" className="mobile-nav-link" onClick={handleNavLinkClick}>
            About
          </a>
          <a href="#technologies" className="mobile-nav-link" onClick={handleNavLinkClick}>
            Technologies
          </a>
          <a href="#projects" className="mobile-nav-link" onClick={handleNavLinkClick}>
            Projects
          </a>
          <a href="#certifications" className="mobile-nav-link" onClick={handleNavLinkClick}>
            Certifications
          </a>



          <button
            type="button"
            onClick={() => {
              handleNavLinkClick();
              onOpenContact();
            }}
            className="mobile-contact-pill"
          >
            Get in Touch
          </button>
        </div>
      </div>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 0.75rem 0;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(18, 18, 20, 0.5);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(188, 166, 147, 0.08);
        }

        .navbar-wrapper.scrolled {
          padding: 0.55rem 0;
          background: rgba(17, 17, 19, 0.92);
          border-bottom: 1px solid rgba(188, 166, 147, 0.16);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 1.15rem;
        }

        .nav-brand {
          font-family: var(--font-jura);
          font-size: 1.55rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #ffffff;
          transition: color 0.3s ease;
        }

        .nav-brand:hover {
          color: var(--color-sand);
        }

        .nav-socials {
          display: flex;
          align-items: center;
          gap: 0.95rem;
          border-left: 1px solid rgba(188, 166, 147, 0.2);
          padding-left: 1.15rem;
        }

        .social-icon-btn {
          color: var(--text-muted);
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(0);
          will-change: transform;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease, filter 0.35s ease;
        }

        .social-icon-btn:hover {
          color: var(--color-sand);
          transform: translateY(-3px) translateZ(0);
          filter: drop-shadow(0 4px 10px var(--color-sand-glow));
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }

        .nav-link {
          font-family: var(--font-jura);
          font-size: 0.98rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #d1cdc7;
          position: relative;
          background: transparent;
          cursor: pointer;
          transform: translateZ(0);
          will-change: transform;
          transition: color 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: var(--color-sand);
          transform: translateY(-1px) translateZ(0);
        }



        /* Contact Pill */
        .contact-pill {
          padding: 0.45rem 1.15rem;
          background: rgba(188, 166, 147, 0.14);
          border: none;
          border-radius: 999px;
          color: var(--color-sand);
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: background 0.3s ease, color 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .contact-pill:hover {
          background: var(--color-crimson);
          color: #ffffff;
          box-shadow: 0 4px 16px var(--color-crimson-glow);
          transform: translateY(-2px) translateZ(0);
        }

        /* Hamburger button for mobile */
        .hamburger-btn {
          background: transparent;
          border: none;
          color: var(--color-sand);
          font-size: 1.35rem;
          cursor: pointer;
          padding: 0.4rem;
          display: none;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast);
        }

        .hamburger-btn:hover {
          color: #ffffff;
        }

        .mobile-only {
          display: none;
        }

        /* Mobile Navigation Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(18, 18, 20, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border-medium);
          padding: 0;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, padding 0.35s ease;
        }

        .mobile-nav-drawer.open {
          max-height: 420px;
          opacity: 1;
          padding: 1.75rem 1.5rem 2.25rem;
        }

        .mobile-nav-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
        }

        .mobile-nav-link {
          font-family: var(--font-jura);
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #e5e1da;
          transition: color var(--transition-fast);
        }

        .mobile-nav-link:hover {
          color: var(--color-sand);
        }



        .mobile-contact-pill {
          width: 100%;
          max-width: 260px;
          padding: 0.75rem;
          background: var(--color-crimson);
          color: #ffffff;
          border: none;
          border-radius: 999px;
          font-family: var(--font-jura);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-align: center;
          box-shadow: 0 4px 15px var(--color-crimson-glow);
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
