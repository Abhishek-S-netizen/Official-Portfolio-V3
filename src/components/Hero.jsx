import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const heroImageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroImageRef.current) {
        heroImageRef.current.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-container">
      <img
        id="hero-image"
        ref={heroImageRef}
        className="hero-parallax"
        src="/Black_Forest_2.jpg"
        alt="Black Forest"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-name">
          <span>ABHISHEK</span>
          <span>SUBRAMANIAN</span>
        </h1>
        <p className="hero-role">Web Developer</p>
        <button className="hero-cta" onClick={scrollToAbout}>
          Discover More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
