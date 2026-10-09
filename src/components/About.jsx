import React from 'react';

export default function About() {
  const education = [
    {
      badge: "BACHELOR'S DEGREE (HONS.)",
      title: "Computer Science (Data Analytics)",
      institution: "Rajagiri College of Social Sciences"
    },
    {
      badge: "12TH GRADE",
      title: "Higher Secondary Education",
      institution: "Naipunnya Public School Kochi"
    },
    {
      badge: "10TH GRADE",
      title: "Secondary Education",
      institution: "Naipunnya Public School Kochi"
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-bio">
          <p>
            I'm a third-year Computer Science student with a passion for building web applications that are both functional and enjoyable to use. I enjoy turning ideas into real products, with a particular focus on creating clean, intuitive experiences that don't feel overcomplicated.
          </p>
          <p>
            Many of my projects are inspired by my interest in cars and the automotive world, allowing me to combine two things I genuinely enjoy: technology and automobiles. Through these projects, I've developed a strong appreciation for thoughtful design, usability, and attention to detail.
          </p>
          <p>
            I've always admired Porsche for its minimalist approach to design and engineering. That philosophy has influenced the way I build software — favoring simplicity, functionality, and purposeful design over unnecessary complexity. I'm constantly learning, exploring new technologies, and looking for better ways to create products that are both useful and well-crafted.
          </p>
        </div>

        {/* Education Cards Grid: Desert Sand background, Crimson headings, Charcoal text */}
        <div className="education-grid">
          {education.map((item, idx) => (
            <div key={idx} className="education-card">
              <span className="edu-badge">{item.badge}</span>
              <h3 className="edu-title">{item.title}</h3>
              <p className="edu-institution">{item.institution}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 6rem 0;
          position: relative;
        }

        .about-bio {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          margin-bottom: 3.75rem;
        }

        .about-bio p {
          font-size: 1.08rem;
          color: #d1cdc7;
          line-height: 1.85;
          letter-spacing: 0.01em;
          width: 100%;
          text-align: justify;
          text-justify: inter-word;
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          width: 100%;
        }

        /* 3 Boxes: Desert Sand background with buttery smooth physics */
        .education-card {
          background-color: var(--color-sand);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 14px;
          padding: 2.1rem 1.95rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transform: translateZ(0);
          will-change: transform, box-shadow;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
          position: relative;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .education-card:hover {
          transform: translateY(-5px) translateZ(0);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 20px var(--color-sand-glow);
          filter: brightness(1.02);
        }

        /* Headings: Extra bold Sadu Crimson (#9E3E3E) in Jura */
        .edu-badge {
          font-family: var(--font-jura);
          font-size: 0.92rem;
          letter-spacing: 0.12em;
          color: var(--color-crimson);
          text-transform: uppercase;
          font-weight: 800;
          margin-bottom: 0.65rem;
        }

        /* Rest of font: Charcoal Black (#121214) */
        .edu-title {
          font-family: var(--font-jura);
          font-size: 1.25rem;
          font-weight: 700;
          color: #121214;
          margin-bottom: 0.45rem;
          line-height: 1.35;
        }

        .edu-institution {
          font-family: var(--font-body);
          font-size: 0.94rem;
          font-weight: 500;
          color: #2b2b30;
        }

        @media (max-width: 900px) {
          .education-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
