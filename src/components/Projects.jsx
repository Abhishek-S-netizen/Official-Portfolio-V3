import React, { useState } from 'react';
import './Projects.css';
import ProjectModal from './ProjectModal';

export const projectsData = [
  {
    id: 6,
    title: 'Porsche Showcase Platform',
    image: "/Porsche.png",
    description: 'A Porsche-inspired web platform, featuring dynamic content management and premium UI design.',
    techStack: ['Laravel', 'PHP', 'JavaScript', 'PostgreSQL', 'Cloudinary'],
    details: 'A Porsche-inspired web platform built using Laravel, PHP, PostgreSQL, and Cloudinary. The project combines dynamic vehicle content, custom content management, and immersive frontend animations to recreate selected aspects of the Porsche digital experience. Developed as a personal portfolio project inspired by the official Porsche website, it showcases both modern frontend development and scalable backend architecture.',
    comingSoon: true,
  },
  {
    id: 1,
    title: 'AutoVerse',
    image: '/AutoVerse.png',
    description: 'A full-stack automotive platform for car reviews, vehicle comparisons, wishlists, and rental services.',
    techStack: ['Laravel', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'Postgresql'],
    details: 'AutoVerse is a full-stack automotive platform developed using Laravel, PHP, and PostgreSQL. Designed for car enthusiasts, it enables users to explore detailed vehicle reviews, compare models, manage wishlists, and access rental services. The platform includes secure authentication, dedicated user and admin dashboards, and a responsive frontend built with HTML5, CSS3, JavaScript, and Bootstrap.',
    liveUrl: 'https://autoverse-main-gzfe0w.free.laravel.cloud/',
    githubUrl: 'https://github.com/Abhishek-S-netizen/AutoVerse',
  },
  {
    id: 2,
    title: 'CineMax',
    image: '/CineMax.png',
    description: 'A full-stack movie ticket booking system with seat locking concurrency control and ticket QR codes.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
    details: 'CineMax is a full-stack movie booking application featuring a modern React frontend and a Node.js/Express backend. Built with concurrency control using MongoDB TTL indexing, it secures temporary 5-minute seat locks to prevent double-booking. The platform generates client-side PDF tickets with functional QR codes and features a comprehensive administrative panel for analytics, user management, and showtimes CRUD operations.',
    liveUrl: 'https://cinemax-xi.vercel.app/',
    githubUrl: 'https://github.com/Abhishek-S-netizen/movie-ticket-booking-system',
  },
  {
    id: 3,
    title: 'Predictive Maintenance',
    image: '/Predictive_Maintenance.png',
    description: 'Predictive maintenance system for equipment failure detection and remaining useful life estimation.',
    techStack: ['Python', 'Machine Learning', 'Pandas', 'Scikit-Learn'],
    details: 'Developed a predictive maintenance system using Python, Scikit-Learn, XGBoost, and Streamlit to predict equipment failures and estimate Remaining Useful Life (RUL). The solution includes data preprocessing, feature engineering, model optimization, SHAP explainability, and an interactive dashboard for maintenance decision support.',
    liveUrl: 'https://predictive-maintenance-y7yvnhdeih7i624baocrwp.streamlit.app/',
    githubUrl: 'https://github.com/Abhishek-S-netizen/Predictive-Maintenance',
  },
  {
    id: 4,
    title: 'California House Price Prediction',
    image: '/California_House_Price_Prediction.png',
    description: 'End-to-end house price prediction platform featuring model training, evaluation, and deployment.',
    techStack: ['Python', 'Machine Learning', 'Pandas', 'Scikit-Learn'],
    details: 'Developed a house price prediction system using Python, Scikit-Learn, and Streamlit to estimate California housing values based on demographic and geographic features. The solution includes data preprocessing, feature encoding, model evaluation, feature importance analysis, and an interactive dashboard for real-time price prediction.',
    liveUrl: 'https://california-house-price-prediction-2mwj7awhmu5pcryygxjfuv.streamlit.app/',
    githubUrl: 'https://github.com/Abhishek-S-netizen/California-House-Price-Prediction',
  },
  {
    id: 5,
    title: 'Employee Attrition',
    image: '/IBM_Employee_Attrition.png',
    description: 'Machine learning-powered employee attrition prediction system built with Python and Streamlit.',
    techStack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-Learn'],
    details: 'Developed an employee attrition prediction system using Python, Scikit-Learn, and Streamlit to identify employees at risk of leaving an organization. The solution includes data preprocessing, exploratory data analysis, class imbalance handling with SMOTE, model evaluation, and an interactive dashboard for attrition insights and real-time prediction.',
    liveUrl: 'https://employeeattritionmodel-4ydjb9yfhahfpmegpvpbmo.streamlit.app/',
    githubUrl: 'https://github.com/Abhishek-S-netizen/Employee_Attrition_Model',
  },
];

const Projects = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <h2 className="section-title">Projects</h2>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-card-image">
                <img src={project.image} alt={project.title} draggable="false" />
              </div>
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
                <p className="project-card-stack">
                  {project.techStack.join(' · ')}
                </p>
                <button
                  className="project-details-btn"
                  onClick={() => setActiveModal(project)}
                >
                  Project Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModal && (
        <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
};

export default Projects;
