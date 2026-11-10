import React, { useState, useEffect } from 'react';
import { profileData } from '../../data/portfolioData';
import { networksChaptersData } from '../../data/networksRoadmapData';

export default function NetworksIndex({ onBack, onSelectPage, initialPageId }) {
  // If returning from a specific page, keep that page open; on initial load, start with all collapsed (null)
  const [openPageId, setOpenPageId] = useState(initialPageId || null);

  useEffect(() => {
    if (initialPageId) {
      // Small timeout to allow DOM to paint, then smoothly scroll to the active accordion
      const timer = setTimeout(() => {
        const el = document.getElementById(`page-${initialPageId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [initialPageId]);

  const togglePage = (id) => {
    setOpenPageId((prev) => (prev === id ? null : id));
  };

  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#232D2D] selection:bg-[#8A7059]/20 overflow-x-hidden">
      {/* Top fixed minimalist bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#8A7059]/25 px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 transition-colors">
        <div className="w-[88%] max-w-[1440px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#6E5844] hover:text-[#232D2D] transition-colors cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Portfolio</span>
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="w-[88%] max-w-[1440px] mx-auto px-2 sm:px-6 md:px-10 pt-24 sm:pt-28 pb-24">
        {/* Main Header */}
        <header className="mb-12 border-b border-[#8A7059]/25 pb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#232D2D] leading-[1.15]">
            Computer Networks &amp; Architecture
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#283535] max-w-5xl leading-relaxed">
            A four-chapter, foundational walkthrough of core computer networking concepts, protocols and architecture.
          </p>

          {/* Quick Chapter Navigation Links */}
          <div className="mt-8 pt-6 border-t border-[#8A7059]/20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-wrap">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6E5844] shrink-0">
              Jump to Chapter:
            </span>
            {networksChaptersData.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(ch.id)}
                className="font-mono text-xs sm:text-sm text-[#283535] hover:text-[#8A7059] underline underline-offset-4 decoration-[#8A7059]/40 hover:decoration-[#8A7059] transition-all text-left w-fit"
              >
                {ch.chapterNumber} • {ch.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </header>

        {/* ============================================================== */}
        {/* CHAPTER ACCORDION SECTIONS */}
        {/* ============================================================== */}
        <div className="space-y-24 sm:space-y-32">
          {networksChaptersData.map((chapter) => (
            <section
              key={chapter.id}
              id={chapter.id}
              className="scroll-mt-24"
            >
              {/* Chapter Header */}
              <div className="mb-6 pb-4 border-b-2 border-[#8A7059]">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#283535] tracking-widest uppercase">
                    Chapter {chapter.chapterNumber}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#232D2D]">
                  {chapter.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#283535]/80 font-mono">
                  {chapter.focus}
                </p>
              </div>

              {/* Pages Accordion Rows */}
              <div className="border-t border-[#8A7059]/40">
                {chapter.pages.map((page) => {
                  const isOpen = openPageId === page.id;
                  const isAvailable = page.available;

                  return (
                    <div
                      key={page.id}
                      id={`page-${page.id}`}
                      className="border-b border-[#8A7059]/40 transition-colors scroll-mt-24"
                    >
                      {/* Accordion Row Header */}
                      <button
                        type="button"
                        onClick={() => togglePage(page.id)}
                        className="group w-full flex items-center justify-between gap-4 py-4 px-3 sm:px-4 text-left transition-colors hover:bg-[#8A7059]/10 focus:outline-none cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3 sm:gap-5 pr-2 flex-wrap sm:flex-nowrap">
                          {/* Page Number */}
                          <span className="font-mono text-xs sm:text-sm font-bold text-[#8A7059] tracking-wider shrink-0 w-8">
                            {page.pageNumber}
                          </span>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                            <span className="text-base sm:text-lg font-semibold text-[#232D2D] leading-snug">
                              {page.title}
                            </span>

                            {!isAvailable && (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold uppercase w-fit bg-[#384545]/10 text-[#384545]/60">
                                {page.status}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Dropdown Arrow Icon & Subtle Hover-Reveal Cue */}
                        <div className="shrink-0 pl-2 flex items-center gap-3">
                          <span className="hidden sm:inline-block font-mono text-xs text-[#232D2D] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {isOpen ? 'Click to collapse' : 'Click to explore'}
                          </span>
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center bg-[#384545] text-[#F5F2EB] border border-[#384545] shadow-sm transition-all duration-200 ${isOpen ? 'bg-[#252F2F] rotate-180' : 'group-hover:bg-[#2A3535]'
                              }`}
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </span>
                        </div>
                      </button>

                      {/* Expandable Topics & Action Body with Smooth 200ms Transition */}
                      <div
                        className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 pb-6 pt-2 pl-11 sm:pl-16 pr-6">
                            <div className="mb-5">
                              <span className="text-xs font-mono uppercase tracking-wider text-[#8A7059] font-bold block mb-2.5">
                                Topics Covered:
                              </span>
                              <ul className="space-y-2 text-sm text-[#283535]">
                                {page.topics.map((t, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-[#8A7059] font-bold shrink-0 mt-0.5">•</span>
                                    <span className="leading-relaxed">{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Action Button */}
                            <div className="pt-3.5 border-t border-[#8A7059]/20 flex items-center">
                              {isAvailable ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onSelectPage) {
                                      onSelectPage(page.id);
                                    }
                                  }}
                                  className="group inline-flex items-center gap-2 px-4 py-1.5 sm:px-4.5 sm:py-2 rounded-lg border border-[#8A7059]/40 bg-[#8A7059]/5 hover:bg-[#8A7059]/15 hover:border-[#8A7059] text-[#232D2D] font-medium text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-xs"
                                >
                                  <span>Explore Topic</span>
                                  <span className="font-mono text-sm transition-transform duration-200 transform group-hover:translate-x-1 text-[#8A7059]">
                                    →
                                  </span>
                                </button>
                              ) : (
                                <span className="text-xs font-mono tracking-wider text-[#8A7059]/70 italic">
                                  In development • Check back soon
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Minimal Footer */}
        <footer className="mt-20 pt-8 border-t border-[#8A7059]/25 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A7059]">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-[#232D2D] transition-colors"
          >
            ← Back to Portfolio
          </button>
          <span>Computer Networks & Architecture | {profileData.firstName} {profileData.lastName}</span>
        </footer>
      </main>
    </div>
  );
}
