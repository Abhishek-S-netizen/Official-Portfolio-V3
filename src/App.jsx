import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero3D from './components/Hero3D.jsx';
import About from './components/About.jsx';
import Technologies from './components/Technologies.jsx';
import ProjectsCarousel from './components/ProjectsCarousel.jsx';
import Certifications from './components/Certifications.jsx';
import Footer from './components/Footer.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import ContactModal from './components/ContactModal.jsx';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="portfolio-app">
      {/* Top Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* 1. Hero with Interactive 3D Tactile Element */}
        <Hero3D />

        {/* 2. About Section with Education Cards */}
        <About />

        {/* 3. Technologies Section with 3.5D Tilt Physics */}
        <Technologies />

        {/* 4. Projects Showcase with 3D Revolving Ring */}
        <ProjectsCarousel onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Certifications Section */}
        <Certifications />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Modals */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}
