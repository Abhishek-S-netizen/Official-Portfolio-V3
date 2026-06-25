import React from 'react';
import './Certifications.css';

const certifications = [
  {
    title: 'Introduction to HTML, CSS, & JavaScript',
    issuer: 'IBM',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/B8JPGWB3S26A',
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/ZXBERQTPK4FL',
  },
  {
    title: 'Python 101 for Data Science',
    issuer: 'Cognitive Class',
    credentialUrl: 'https://courses.cognitiveclass.ai/certificates/c9bb963a393e4955a0aa4b3b01d85c39',
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="certs-section">
      <div className="certs-inner">
        <h2 className="section-title">Certifications</h2>
        <div className="certs-panel">
          <div className="certs-grid">
            {certifications.map((cert, i) => (
              <div className="cert-card" key={i}>
                <div className="cert-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-credential-link"
                >
                  Show Credential →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
