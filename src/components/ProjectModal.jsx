import React, { useState } from 'react';

export default function ProjectModal({ project, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  if (!project) return null;

  const handleSmoothClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  };

  return (
    <div 
      className={`modal-backdrop ${isClosing ? 'closing' : ''}`} 
      onClick={handleSmoothClose}
    >
      <div 
        className={`modal-dialog ${isClosing ? 'closing' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={handleSmoothClose}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-split-layout">
          {/* Left Column: Uncropped Image Preview */}
          <div className="modal-media-col">
            <div className="modal-img-frame">
              <img src={project.image} alt={project.title} />
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="modal-content-col">
            <h2 className="modal-title">{project.title}</h2>
            
            <p className="modal-tech-line">
              {project.tech.join(' · ')}
            </p>

            <p className="modal-desc">
              {project.description || project.tagline}
            </p>

            <div className="modal-actions-row">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-btn-live"
                >
                  <i className="fa-solid fa-globe"></i>
                  <span>Live Site</span>
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-btn-github"
                >
                  <i className="fa-brands fa-github"></i>
                  <span>GitHub Repo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 12, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: modalFadeIn 0.38s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-backdrop.closing {
          opacity: 0;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-dialog {
          position: relative;
          width: 100%;
          max-width: 960px;
          background: #17171a;
          border: 1px solid var(--border-medium);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.9), 0 0 35px var(--color-sand-glow);
          max-height: 88vh;
          overflow-y: auto;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: modalSlideUp 0.38s cubic-bezier(0.16, 1, 0.3, 1);
          scrollbar-width: thin;
          scrollbar-color: rgba(188, 166, 147, 0.25) transparent;
        }

        .modal-dialog::-webkit-scrollbar {
          width: 6px;
        }
        .modal-dialog::-webkit-scrollbar-track {
          background: transparent;
          margin: 12px 0;
        }
        .modal-dialog::-webkit-scrollbar-thumb {
          background: rgba(188, 166, 147, 0.25);
          border-radius: 999px;
        }
        .modal-dialog::-webkit-scrollbar-thumb:hover {
          background: var(--color-sand);
        }

        .modal-dialog.closing {
          transform: translateY(20px) scale(0.96);
          opacity: 0;
        }

        @keyframes modalSlideUp {
          from { transform: translateY(28px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .modal-close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(28, 28, 31, 0.85);
          border: 1px solid var(--border-medium);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          font-size: 1rem;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          background: var(--color-crimson);
          border-color: var(--color-crimson-bright);
          transform: rotate(90deg) scale(1.08);
        }

        .modal-split-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2.25rem;
          padding: 2.5rem 2.5rem;
          align-items: center;
        }

        .modal-media-col {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        /* Uncropped image frame with contain fit */
        .modal-img-frame {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #0f0f11;
          border: 1px solid var(--border-subtle);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 230px;
        }

        .modal-img-frame img {
          width: 100%;
          height: auto;
          max-height: 320px;
          object-fit: contain;
          display: block;
        }

        .modal-content-col {
          display: flex;
          flex-direction: column;
          padding-right: 0.5rem;
        }

        .modal-title {
          font-family: var(--font-jura);
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
        }

        .modal-tech-line {
          font-family: var(--font-mono);
          font-size: 0.88rem;
          color: var(--color-sand);
          margin-bottom: 1.35rem;
          line-height: 1.5;
        }

        .modal-desc {
          font-size: 0.98rem;
          color: #cfcac3;
          line-height: 1.75;
          margin-bottom: 2rem;
          text-align: justify;
          text-justify: inter-word;
        }

        .modal-actions-row {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          flex-wrap: wrap;
        }

        /* Live Site Button: Desert Sand (#BCA693) background with dark text */
        .modal-btn-live {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.7rem 1.6rem;
          background: var(--color-sand);
          color: #121214;
          border-radius: 999px;
          font-family: var(--font-jura);
          font-weight: 700;
          font-size: 0.92rem;
          letter-spacing: 0.03em;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 15px var(--color-sand-glow);
        }

        .modal-btn-live:hover {
          background: var(--color-sand-light);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(188, 166, 147, 0.45);
        }

        /* GitHub Repo Button: Sadu Crimson (#9E3E3E) background with white text */
        .modal-btn-github {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.7rem 1.6rem;
          background: var(--color-crimson);
          color: #ffffff;
          border-radius: 999px;
          font-family: var(--font-jura);
          font-weight: 700;
          font-size: 0.92rem;
          letter-spacing: 0.03em;
          border: 1px solid var(--color-crimson-bright);
          transition: all var(--transition-fast);
          box-shadow: 0 4px 15px var(--color-crimson-glow);
        }

        .modal-btn-github:hover {
          background: var(--color-crimson-bright);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(189, 74, 74, 0.55);
        }

        @media (max-width: 850px) {
          .modal-split-layout {
            grid-template-columns: 1fr;
            padding: 2rem 1.75rem;
            gap: 1.5rem;
          }
          .modal-content-col {
            padding-right: 0;
          }
          .modal-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}
