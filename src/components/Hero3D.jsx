import React, { useEffect, useRef, useState } from 'react';

export default function Hero3D() {
  const containerRef = useRef(null);
  const [gradientParams, setGradientParams] = useState({
    crimsonX: 25,
    crimsonY: 30,
    sandX: 75,
    sandY: 65,
    angle: 135
  });

  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseTarget.current = { x: normX, y: normY };
    };

    // Continuous Hypnotic Motion Engine
    const animate = (time) => {
      const elapsed = time * 0.001; // seconds

      // Smooth Lerp tracking for mouse
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;

      const mx = mouseCurrent.current.x;
      const my = mouseCurrent.current.y;

      // Noticeable, flowing ambient breathing waves (~4.5s rhythm)
      const ambientCrimsonX = Math.sin(elapsed * 1.1) * 18;
      const ambientCrimsonY = Math.cos(elapsed * 0.9) * 16;
      
      const ambientSandX = Math.cos(elapsed * 0.95) * 18;
      const ambientSandY = Math.sin(elapsed * 1.2) * 16;
      
      const ambientAngle = Math.sin(elapsed * 0.8) * 25;

      // Layer ambient pulse + cursor tilt
      const crimsonX = 28 + ambientCrimsonX + mx * 18;
      const crimsonY = 32 + ambientCrimsonY + my * 18;

      const sandX = 72 + ambientSandX - mx * 18;
      const sandY = 64 + ambientSandY - my * 18;

      const angle = Math.round(135 + ambientAngle + mx * 22);

      setGradientParams({
        crimsonX: Math.round(crimsonX * 10) / 10,
        crimsonY: Math.round(crimsonY * 10) / 10,
        sandX: Math.round(sandX * 10) / 10,
        sandY: Math.round(sandY * 10) / 10,
        angle
      });

      animFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const { crimsonX, crimsonY, sandX, sandY, angle } = gradientParams;

  return (
    <section className="hero-section" id="hero" ref={containerRef}>
      {/* Full-Bleed Atmospheric Background with Seamless Mask Dissolve */}
      <div 
        className="hero-full-gradient-bg"
        style={{
          background: `
            radial-gradient(ellipse 95% 85% at ${crimsonX}% ${crimsonY}%, rgba(158, 62, 62, 0.32) 0%, rgba(158, 62, 62, 0.09) 45%, transparent 75%),
            radial-gradient(ellipse 95% 90% at ${sandX}% ${sandY}%, rgba(188, 166, 147, 0.28) 0%, rgba(188, 166, 147, 0.07) 50%, transparent 80%),
            linear-gradient(${angle}deg, #101013 0%, #161519 50%, #111113 100%)
          `
        }}
      />

      {/* Hero Content */}
      <div className="container hero-content-wrapper">
        <h1 className="hero-name">A. S</h1>
        <p className="hero-title">Full-Stack Web Developer</p>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 94vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 0 6rem 0;
          background: transparent;
        }

        .hero-full-gradient-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          will-change: background;
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.85) 70%,
            rgba(0, 0, 0, 0.4) 88%,
            rgba(0, 0, 0, 0) 100%
          );
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.85) 70%,
            rgba(0, 0, 0, 0.4) 88%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 3;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .hero-name {
          font-family: var(--font-jura);
          font-size: clamp(3.2rem, 8vw, 6.4rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #ffffff;
          line-height: 1.1;
          text-shadow: 0 8px 45px rgba(0, 0, 0, 0.85);
          margin-bottom: 1.25rem;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
          will-change: transform;
        }

        .hero-name:hover {
          color: var(--color-sand);
          transform: scale(1.02);
          text-shadow: 0 0 45px var(--color-sand-glow);
        }

        .hero-title {
          font-family: var(--font-jura);
          font-size: clamp(1rem, 2.2vw, 1.45rem);
          color: var(--color-sand);
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-shadow: 0 2px 25px rgba(0, 0, 0, 0.85);
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 75vh;
            padding: 6rem 0 3.5rem 0;
          }
          .hero-name {
            font-size: clamp(2.8rem, 10vw, 4rem);
            margin-bottom: 0.85rem;
          }
          .hero-title {
            font-size: 0.95rem;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </section>
  );
}
