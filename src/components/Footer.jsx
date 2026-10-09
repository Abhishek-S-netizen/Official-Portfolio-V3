import React from 'react';

export default function Footer({ onOpenContact }) {
  return (
    <footer className="footer-wrap">
      <div className="container footer-content">
        <div className="footer-top">
          <div>
            <div className="footer-brand">A. S</div>
            <p className="footer-desc">
              Inspired by the Porsche 911 Turbo S Sadu Edition palette.
            </p>
          </div>

          <div className="footer-actions">
            <button
              type="button"
              onClick={onOpenContact}
              className="footer-contact-btn"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} A.S • Engineered with React & Modern CSS
          </p>

          <div className="footer-social-icons">
            <a
              href="https://github.com/Abhishek-S-netizen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-subramanian-64811b31a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          background: #0e0e10;
          border-top: 1px solid var(--border-subtle);
          padding: 4.5rem 0 3rem 0;
        }

        .footer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
        }

        .footer-brand {
          font-family: var(--font-jura);
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .footer-desc {
          color: var(--text-dim);
          font-size: 0.92rem;
          max-width: 440px;
        }

        /* Borderless pill and no arrow */
        .footer-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1.85rem;
          background: rgba(188, 166, 147, 0.14);
          color: var(--color-sand);
          border: none;
          border-radius: 999px;
          font-family: var(--font-jura);
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          transform: translateZ(0);
          will-change: transform;
          transition: background 0.3s ease, color 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .footer-contact-btn:hover {
          background: var(--color-crimson);
          color: #ffffff;
          box-shadow: 0 4px 18px var(--color-crimson-glow);
          transform: translateY(-2px) translateZ(0);
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background: rgba(188, 166, 147, 0.1);
          margin-bottom: 2rem;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .copyright-text {
          font-family: var(--font-jura);
          font-size: 0.85rem;
          color: var(--text-dim);
        }

        .footer-social-icons {
          display: flex;
          align-items: center;
          gap: 1.35rem;
        }

        .footer-social-icons a {
          color: var(--text-muted);
          font-size: 1.15rem;
          transform: translateZ(0);
          will-change: transform;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
        }

        .footer-social-icons a:hover {
          color: var(--color-sand);
          transform: translateY(-2px) translateZ(0);
        }

        @media (max-width: 600px) {
          .footer-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
        }
      `}</style>
    </footer>
  );
}
