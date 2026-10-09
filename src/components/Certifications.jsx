import React from 'react';

export default function Certifications() {
  const certifications = [
    {
      title: "INTRODUCTION TO HTML, CSS, & JAVASCRIPT",
      issuer: "IBM",
      url: "https://www.coursera.org/account/accomplishments/verify/B8JPGWB3S26A"
    },
    {
      title: "PYTHON FOR DATA SCIENCE, AI & DEVELOPMENT",
      issuer: "IBM",
      url: "https://www.coursera.org/account/accomplishments/verify/ZXBERQTPK4FL"
    },
    {
      title: "PYTHON 101 FOR DATA SCIENCE",
      issuer: "Cognitive Class",
      url: "https://courses.cognitiveclass.ai/certificates/c9bb963a393e4955a0aa4b3b01d85c39"
    }
  ];

  return (
    <section className="cert-section" id="certifications">
      <div className="container">
        <h2 className="section-title">Certifications</h2>

        <div className="cert-grid">
          {certifications.map((cert, idx) => (
            <div key={idx} className="cert-card">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>

              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-link"
              >
                <span>SHOW CREDENTIAL</span>
                <i className="fa-solid fa-arrow-right-long"></i>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cert-section {
          padding: 5rem 0 7rem 0;
          position: relative;
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* Clean Architectural Plaque Cards without Award Icons */
        .cert-card {
          background: #18181b;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.75rem 1.6rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transform: translateZ(0);
          will-change: transform, box-shadow;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cert-card:hover {
          transform: translateY(-4px) translateZ(0);
          background: #1e1e23;
          border-color: var(--color-sand);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45), 0 0 16px var(--color-sand-glow);
        }

        .cert-title {
          font-family: var(--font-jura);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #f2efe9;
          margin-bottom: 0.6rem;
          line-height: 1.4;
          min-height: 42px;
        }

        .cert-issuer {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-dim);
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .cert-link {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-jura);
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--color-sand);
          transition: color 0.25s ease, gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-link:hover {
          color: #ffffff;
          gap: 0.7rem;
        }

        .cert-card:hover .cert-link {
          color: var(--color-sand-light);
        }

        @media (max-width: 900px) {
          .cert-grid {
            grid-template-columns: 1fr;
          }
          .cert-title {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
