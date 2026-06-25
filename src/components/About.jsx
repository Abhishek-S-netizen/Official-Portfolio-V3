import React from 'react';
import './About.css';

const education = [
  {
    level: "Bachelor's Degree (Hons.)",
    degree: "Computer Science (Data Analytics)",
    institution: "Rajagiri College of Social Sciences",
  },
  {
    level: "12th Grade",
    degree: "Higher Secondary Education",
    institution: "Naipunya Public School Kochi",
  },
  {
    level: "10th Grade",
    degree: "Secondary Education",
    institution: "Naipunya Public School Kochi",
  },
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About Me</h2>

      <div className="about-text">
        <p>
          I'm a third-year Computer Science student with a passion for building web
          applications that are both functional and enjoyable to use. I enjoy turning
          ideas into real products, with a particular focus on creating clean, intuitive
          experiences that don't feel overcomplicated.
        </p>
        <p>
          Many of my projects are inspired by my interest in cars and the automotive
          world, allowing me to combine two things I genuinely enjoy: technology and
          automobiles. Through these projects, I've developed a strong appreciation for
          thoughtful design, usability, and attention to detail.
        </p>
        <p>
          I've always admired Porsche for its minimalist approach to design and
          engineering. That philosophy has influenced the way I build software —
          favoring simplicity, functionality, and purposeful design over unnecessary
          complexity. I'm constantly learning, exploring new technologies, and looking
          for better ways to create products that are both useful and well-crafted.
        </p>
      </div>

      {/* Education Panel */}
      <div className="education-panel">
        <div className="education-grid">
          {education.map((edu, i) => (
            <div className="edu-card" key={i}>
              <span className="edu-level">{edu.level}</span>
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institution">{edu.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
