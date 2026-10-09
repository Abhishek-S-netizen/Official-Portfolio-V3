import React from 'react';

export default function Technologies() {
  const techCategories = [
    {
      category: "FRONTEND",
      skills: [
        { name: "HTML5", icon: "fa-brands fa-html5", color: "#E34F26" },
        { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#1572B6" },
        { name: "JAVASCRIPT", icon: "fa-brands fa-js", color: "#F7DF1E" },
        { name: "REACT", icon: "fa-brands fa-react", color: "#61DAFB" },
        { name: "BOOTSTRAP", icon: "fa-brands fa-bootstrap", color: "#7952B3" },
      ]
    },
    {
      category: "BACKEND & LANGUAGES",
      skills: [
        { name: "LARAVEL", icon: "fa-brands fa-laravel", color: "#FF2D20" },
        { name: "PHP", icon: "fa-brands fa-php", color: "#777BB4" },
        { name: "PYTHON", icon: "fa-brands fa-python", color: "#3776AB" },
        { name: "JAVA", icon: "fa-brands fa-java", color: "#ED8B00" },
        { name: "C", icon: "fa-solid fa-c", color: "#A8B9CC" },
        { name: "POSTGRESQL", icon: "fa-solid fa-database", color: "#4169E1" },
      ]
    },
    {
      category: "TOOLS & PLATFORMS",
      skills: [
        { name: "GIT", icon: "fa-brands fa-git-alt", color: "#F05032" },
        { name: "GITHUB", icon: "fa-brands fa-github", color: "#ffffff" },
        { name: "VS CODE", icon: "fa-solid fa-code", color: "#007ACC" },
        { name: "TABLEAU", icon: "fa-solid fa-chart-simple", color: "#E97627" },
      ]
    }
  ];

  // Mouse tilt effect handler for individual pill
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section className="tech-section" id="technologies">
      <div className="container">
        <h2 className="section-title">Technologies</h2>

        <div className="tech-categories-list">
          {techCategories.map((cat, idx) => (
            <div key={idx} className="tech-group">
              <h3 className="category-label">{cat.category}</h3>
              <div className="skills-row">
                {cat.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="skill-pill"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="pill-gleam"></div>
                    <span 
                      className="skill-icon-box"
                      style={{ color: skill.color }}
                    >
                      <i className={skill.icon}></i>
                    </span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-section {
          padding: 6rem 0;
          position: relative;
          width: 100%;
        }

        .tech-categories-list {
          display: flex;
          flex-direction: column;
          gap: 3.25rem;
          width: 100%;
        }

        .category-label {
          font-family: var(--font-jura);
          font-size: 1.05rem;
          color: var(--color-sand);
          letter-spacing: 0.16em;
          margin-bottom: 1.25rem;
          font-weight: 700;
        }

        .skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.4rem;
          width: 100%;
        }

        /* Larger Pills with Peak Tactile Physics */
        .skill-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 1.15rem;
          background: #1c1c1f;
          padding: 0.95rem 1.95rem;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: transform 0.15s ease-out, border-color 0.25s, box-shadow 0.25s, background-color 0.25s;
          overflow: hidden;
          will-change: transform;
        }

        .skill-pill:hover {
          background: #232328;
          border-color: var(--color-sand);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px var(--color-sand-glow);
        }

        .pill-gleam {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle 80px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(188, 166, 147, 0.28),
            transparent 70%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }

        .skill-pill:hover .pill-gleam {
          opacity: 1;
        }

        .skill-icon-box {
          font-size: 1.55rem;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 6px rgba(0,0,0,0.6));
        }

        .skill-name {
          font-family: var(--font-jura);
          font-size: 1.02rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #f0ece6;
        }

        @media (max-width: 768px) {
          .skills-row {
            gap: 0.9rem;
          }
          .skill-pill {
            padding: 0.75rem 1.4rem;
            gap: 0.85rem;
          }
          .skill-icon-box {
            font-size: 1.3rem;
          }
          .skill-name {
            font-size: 0.92rem;
          }
        }
      `}</style>
    </section>
  );
}
