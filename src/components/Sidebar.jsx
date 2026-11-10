import React, { useState, useEffect } from 'react';
import { profileData } from '../data/portfolioData';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'technologies', label: 'Technologies' },
  { id: 'projects', label: 'Projects & works' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact me' },
];

export default function Sidebar({ activeSection, onSelectSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Desktop Minimalist Left Rail (Pure Typography - No Brown Box) */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:top-[60px] lg:left-8 lg:w-[220px] select-none z-30">
        {/* Navigation List */}
        <nav aria-label="Main Navigation">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSelectSection(item.id)}
                    className={`group flex items-center gap-2.5 py-1.5 text-[15px] transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-[#232D2D] font-bold translate-x-1'
                        : 'text-[#6E5844] font-medium hover:text-[#232D2D] hover:translate-x-0.5'
                    }`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-4 bg-[#8A7059]'
                          : 'w-1 bg-[#8A7059]/30 group-hover:bg-[#8A7059]/60'
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Footer: A.S. | LinkedIn & GitHub */}
        <div className="mt-8 pt-4 border-t border-[#8A7059]/25 flex items-center justify-between px-0.5">
          <span className="text-sm font-semibold tracking-tight text-[#232D2D]">
            {profileData.initials}
          </span>
          <div className="flex items-center gap-1.5">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 rounded-lg text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1.5 rounded-lg text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile & Tablet Sticky Top Header (Solid Opaque Parchment - No Bleed-through) */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#F5F2EB] border-b border-[#8A7059]/20 transition-all">
        <div className="flex items-center justify-between px-5 py-3">
          {/* Left: Initials + Social Links */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-base tracking-tight text-[#232D2D]">
              {profileData.initials}
            </span>
            <span className="text-[#8A7059]/40 select-none font-mono text-xs" aria-hidden="true">
              |
            </span>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1 rounded-md text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1 rounded-md text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>

          {/* Right: Minimalist Icon-Only Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="p-2 -mr-1 rounded-md text-[#232D2D] hover:text-[#8A7059] transition-colors focus:outline-none"
          >
            <div className="w-5 h-3.5 flex flex-col justify-between items-end" aria-hidden="true">
              <span
                className={`h-0.5 bg-current transition-all duration-200 origin-center ${
                  mobileMenuOpen ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'
                }`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-150 ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : 'w-3.5 opacity-100 scale-100'
                }`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-200 origin-center ${
                  mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Smooth Gliding Dropdown Menu */}
        <div
          className={`grid transition-[grid-template-rows] duration-200 ease-out ${
            mobileMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden bg-[#F5F2EB]">
            <div className="px-6 py-5 border-t border-[#8A7059]/15 shadow-lg">
              <nav aria-label="Mobile Navigation Drawer">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSection(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between py-2 text-left transition-colors ${
                            isActive
                              ? 'text-[#232D2D] font-bold text-base'
                              : 'text-[#6E5844] hover:text-[#232D2D] font-medium text-base'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={`h-1.5 rounded-full transition-all duration-200 ${
                                isActive ? 'w-3.5 bg-[#8A7059]' : 'w-1 bg-[#8A7059]/30'
                              }`}
                            />
                            <span>{item.label}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom quick row inside menu */}
              <div className="mt-5 pt-4 border-t border-[#8A7059]/20 flex items-center justify-between text-xs font-mono text-[#6E5844]">
                <span>{profileData.firstName} {profileData.lastName}</span>
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#232D2D] hover:text-[#8A7059] font-semibold transition-colors"
                >
                  <span>Resume</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
