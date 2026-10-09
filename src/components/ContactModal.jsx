import React, { useState } from 'react';

// ============================================================================
// 🔑 WEB3FORMS CONFIGURATION
// Paste your Web3Forms Access Key here (from your current portfolio account):
// ============================================================================
const WEB3FORMS_ACCESS_KEY = "e0f5b2ba-4819-43fd-80c7-29e42eccbc6f";

export default function ContactModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  if (!isOpen) return null;

  const emailAddress = "abhisheksubramanian06@gmail.com";

  const handleSmoothClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
      setTimeout(() => {
        setIsSubmitting(false);
        setStatus({
          type: 'success',
          text: 'Message received! (Replace YOUR_WEB3FORMS_ACCESS_KEY_HERE with your key).'
        });
        setTimeout(() => {
          handleSmoothClose();
          setStatus({ type: '', text: '' });
          setFormData({ name: '', email: '', message: '' });
        }, 2200);
      }, 900);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully.'
        });
        setTimeout(() => {
          handleSmoothClose();
          setStatus({ type: '', text: '' });
          setFormData({ name: '', email: '', message: '' });
        }, 2200);
      } else {
        setStatus({
          type: 'error',
          text: result.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        text: 'Failed to send message. Please copy my direct email above.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`contact-backdrop ${isClosing ? 'closing' : ''}`}
      onClick={handleSmoothClose}
    >
      <div
        className={`contact-dialog ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="contact-close-btn"
          onClick={handleSmoothClose}
          aria-label="Close contact dialog"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="contact-header">
          <div className="contact-badge">GET IN TOUCH</div>
          <h2 className="contact-title">Let's Build Something Exceptional</h2>
          <p className="contact-sub">
            Available for software engineering roles, automotive tech, and full-stack projects.
          </p>
        </div>

        {/* Compact Quick Actions Bar */}
        <div className="quick-actions-bar">
          <div className="email-info">
            <i className="fa-regular fa-envelope email-icon"></i>
            <span className="email-text">{emailAddress}</span>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="copy-email-btn"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <i className="fa-solid fa-check"></i>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <i className="fa-regular fa-copy"></i>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Live Web3Forms Powered Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>YOUR NAME</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Alex Henderson"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>YOUR EMAIL</label>
            <input
              type="email"
              name="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>MESSAGE</label>
            <textarea
              rows="3"
              name="message"
              placeholder="Tell me about your project, team, or opportunity..."
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {status.text ? (
            <div className={`status-message ${status.type}`}>
              {status.text}
            </div>
          ) : (
            <button
              type="submit"
              className="submit-message-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </>
              )}
            </button>
          )}
        </form>
      </div>

      <style>{`
        .contact-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 12, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 210;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fadeIn 0.38s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-backdrop.closing {
          opacity: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Clean Self-Contained Modal with Zero Clutter */
        .contact-dialog {
          position: relative;
          width: 100%;
          max-width: 490px;
          background: #17171a;
          border: 1px solid var(--border-medium);
          border-radius: 18px;
          padding: 1.75rem 2rem 1.65rem;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.9), 0 0 35px var(--color-sand-glow);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: slideUp 0.38s cubic-bezier(0.16, 1, 0.3, 1);
          max-height: 94vh;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: rgba(188, 166, 147, 0.18) transparent;
        }

        /* Ultra-subtle custom scrollbar for small screen heights */
        .contact-dialog::-webkit-scrollbar {
          width: 4px;
        }
        .contact-dialog::-webkit-scrollbar-track {
          background: transparent;
          margin: 12px 0;
        }
        .contact-dialog::-webkit-scrollbar-thumb {
          background: rgba(188, 166, 147, 0.2);
          border-radius: 999px;
        }
        .contact-dialog::-webkit-scrollbar-thumb:hover {
          background: var(--color-sand);
        }

        .contact-dialog.closing {
          transform: translateY(20px) scale(0.96);
          opacity: 0;
        }

        @keyframes slideUp {
          from { transform: translateY(26px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .contact-close-btn {
          position: absolute;
          top: 1.15rem;
          right: 1.15rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(28, 28, 31, 0.85);
          border: 1px solid var(--border-medium);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          font-size: 0.9rem;
          cursor: pointer;
        }

        .contact-close-btn:hover {
          background: var(--color-crimson);
          border-color: var(--color-crimson-bright);
          transform: rotate(90deg);
        }

        .contact-header {
          padding-right: 2rem;
        }

        .contact-badge {
          font-family: var(--font-jura);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-sand);
          letter-spacing: 0.14em;
          margin-bottom: 0.25rem;
        }

        .contact-title {
          font-family: var(--font-jura);
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.3rem;
          letter-spacing: 0.02em;
          line-height: 1.25;
        }

        .contact-sub {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          line-height: 1.45;
        }

        .quick-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #111113;
          border: 1px solid var(--border-subtle);
          padding: 0.45rem 0.75rem;
          border-radius: 8px;
          margin-bottom: 1.1rem;
          gap: 0.6rem;
          min-width: 0;
        }

        .email-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: clamp(0.72rem, 2.7vw, 0.82rem);
          color: var(--color-sand);
          min-width: 0;
          flex: 1;
        }

        .email-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .email-icon {
          color: var(--color-crimson);
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .copy-email-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(188, 166, 147, 0.1);
          border: 1px solid var(--border-medium);
          padding: 0.3rem 0.65rem;
          border-radius: 5px;
          font-size: 0.74rem;
          font-family: var(--font-jura);
          font-weight: 700;
          color: var(--color-sand);
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
          white-space: nowrap;
        }

        .copy-email-btn:hover {
          background: var(--color-sand);
          color: #121214;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.28rem;
        }

        .form-group label {
          font-family: var(--font-jura);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--color-sand);
        }

        .form-group input, .form-group textarea {
          background: #111113;
          border: 1px solid var(--border-subtle);
          border-radius: 7px;
          padding: 0.55rem 0.85rem;
          color: #ffffff;
          font-family: inherit;
          font-size: 0.86rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          resize: none;
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--color-sand);
          outline: none;
          box-shadow: 0 0 10px var(--color-sand-glow);
        }

        .submit-message-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.68rem;
          background: var(--color-crimson);
          color: #ffffff;
          border-radius: 8px;
          font-family: var(--font-jura);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          border: 1px solid var(--color-crimson-bright);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 15px var(--color-crimson-glow);
          margin-top: 0.15rem;
        }

        .submit-message-btn:hover:not(:disabled) {
          background: var(--color-crimson-bright);
          transform: translateY(-2px);
        }

        .submit-message-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .status-message {
          padding: 0.7rem;
          border-radius: 8px;
          font-size: 0.84rem;
          text-align: center;
          line-height: 1.45;
        }

        .status-message.success {
          background: rgba(188, 166, 147, 0.15);
          border: 1px solid var(--color-sand);
          color: var(--color-sand-light);
        }

        .status-message.error {
          background: rgba(158, 62, 62, 0.15);
          border: 1px solid var(--color-crimson);
          color: #ff9999;
        }

        @media (max-width: 600px) {
          .contact-backdrop {
            padding: 0.75rem;
          }
          .contact-dialog {
            padding: 1.4rem 1.05rem 1.25rem;
          }
          .contact-title {
            font-size: 1.25rem;
          }
          .quick-actions-bar {
            padding: 0.4rem 0.6rem;
            gap: 0.45rem;
          }
          .email-info {
            font-size: 0.74rem;
            gap: 0.4rem;
          }
          .copy-email-btn {
            padding: 0.28rem 0.55rem;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </div>
  );
}
