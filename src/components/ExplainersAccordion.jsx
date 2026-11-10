import React, { useState } from 'react';
import { explainersData } from '../data/portfolioData';

export default function ExplainersAccordion({ onNavigate }) {
  // Default first one open or null
  const [openId, setOpenId] = useState('pwa');

  const toggleRow = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleOpenLink = (e, link) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate(link);
    } else {
      window.location.pathname = link;
    }
  };

  return (
    <div className="border-t border-[#8A7059]/25">
      {explainersData.map((item) => {
        const isOpen = openId === item.id;
        const isAvailable = item.available;

        return (
          <div
            key={item.id}
            className="border-b border-[#8A7059]/25 transition-colors"
          >
            {/* Header row (clickable toggle) */}
            <button
              type="button"
              onClick={() => toggleRow(item.id)}
              className="group w-full flex items-center justify-between gap-4 py-3.5 sm:py-4 px-3 sm:px-4 text-left transition-colors hover:bg-[#8A7059]/10 focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5 sm:gap-4.5 pr-2">
                <span className="font-mono text-xs font-semibold text-[#8A7059] tracking-widest shrink-0 w-6">
                  {item.number}
                </span>

                <span className="text-sm sm:text-base md:text-[17px] font-semibold text-[#232D2D] leading-snug">
                  {item.title}
                </span>
              </div>

              {/* Accordion indicator icon */}
              <div className="shrink-0 pl-2">
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-[#384545] text-[#F5F2EB] border border-[#384545] shadow-sm transition-all duration-200 ${
                    isOpen ? 'bg-[#232D2D] rotate-180' : 'group-hover:bg-[#232D2D]'
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

            {/* Expandable Body */}
            {isOpen && (
              <div className="px-3 sm:px-4 pb-5 pt-1 pl-12 sm:pl-14 pr-4 sm:pr-6 animate-fadeIn">
                <p className="text-[13.5px] sm:text-[14.5px] text-[#283535] leading-relaxed max-w-3xl mb-3.5">
                  {item.description}
                </p>

                {isAvailable ? (
                  <button
                    type="button"
                    onClick={(e) => handleOpenLink(e, item.link)}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#232D2D] hover:text-[#8A7059] transition-colors cursor-pointer"
                  >
                    <span>Explore</span>
                    <span className="font-mono text-sm transition-transform duration-200 transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                ) : (
                  <span className="inline-block text-xs font-mono tracking-wider text-[#8A7059] italic">
                    In development • Check back soon
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

