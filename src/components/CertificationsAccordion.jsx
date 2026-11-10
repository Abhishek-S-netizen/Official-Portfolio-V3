import React from 'react';
import { certificationsData } from '../data/portfolioData';

export default function CertificationsAccordion() {
  return (
    <div className="border-t border-[#8A7059]/30 pt-1 space-y-1 sm:space-y-1.5">
      {certificationsData.map((cert) => {
        const hasLink = Boolean(cert.credentialUrl);
        const RowTag = hasLink ? 'a' : 'div';
        const linkProps = hasLink
          ? {
            href: cert.credentialUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
          }
          : {};

        return (
          <RowTag
            key={cert.id}
            {...linkProps}
            className={`group w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-5 py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl transition-all ${hasLink
                ? 'cursor-pointer hover:bg-[#8A7059]/10'
                : 'hover:bg-[#8A7059]/5'
              }`}
          >
            {/* Left Side: Serial Number + Stacked Content */}
            <div className="flex items-start gap-3.5 sm:gap-4.5 pr-2">
              <span className="font-mono text-xs font-semibold text-[#8A7059] tracking-widest mt-0.5 shrink-0 w-6">
                {cert.number}
              </span>

              <div className="flex flex-col items-start gap-0.5">
                <span
                  className={`text-sm sm:text-base md:text-[17px] font-semibold text-[#232D2D] leading-snug transition-transform ${hasLink ? 'group-hover:translate-x-1' : ''
                    }`}
                >
                  {cert.title}
                </span>

                <span className="font-mono text-[11px] sm:text-xs text-[#6E5844] tracking-wide">
                  {cert.issuer}
                </span>

                {/* Mobile-only Date & Verify Link: Naturally stacked inside the same column, perfectly aligned! */}
                <div className="sm:hidden flex flex-col items-start gap-0.5 pt-1.5">
                  {cert.date && (
                    <span className="font-mono text-[11px] text-[#6E5844]">
                      {cert.date}
                    </span>
                  )}
                  {hasLink && (
                    <span className="font-mono text-[11px] font-semibold text-[#8A7059] inline-flex items-center gap-1 group-hover:underline">
                      <span>Verify credential</span>
                      <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop-only Right Side: Date + Circular Button */}
            <div className="hidden sm:flex items-center justify-end gap-3.5 shrink-0">
              {cert.date && (
                <span className="font-mono text-xs text-[#6E5844]">
                  {cert.date}
                </span>
              )}

              {hasLink && (
                <span
                  title="Verify Credential"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#384545] text-[#F5F2EB] border border-[#384545] group-hover:bg-[#8A7059] group-hover:border-[#8A7059] group-hover:text-white shadow-sm transition-all duration-200 shrink-0"
                >
                  <svg
                    className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H8M17 7V16"
                    />
                  </svg>
                </span>
              )}
            </div>
          </RowTag>
        );
      })}
    </div>
  );
}
