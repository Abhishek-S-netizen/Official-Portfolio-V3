import React, { useEffect, useMemo } from 'react';
import { networksChaptersData } from '../data/networksRoadmapData';

/**
 * Reusable layout shell for all Computer Networks explainer pages.
 * Handles:
 * - Window scroll-to-top on mount
 * - Sticky top navbar with Back button and chapter badge
 * - Main container with responsive max-width
 * - Standardized page header (Chapter pill badge & main h1 title)
 * - Automated Previous / Next bottom navigation footer derived from networksRoadmapData
 */
export default function NetworkPageLayout({
  pageId,
  title,
  chapterNumber,
  chapterTitle,
  subtitle,
  prevPage,
  nextPage,
  onBackToIndex,
  onNavigatePage,
  children,
}) {
  // Always scroll to top upon loading or switching pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pageId]);

  // Derive page metadata and neighbor links from networksRoadmapData
  const meta = useMemo(() => {
    const allPages = [];
    networksChaptersData.forEach((ch) => {
      ch.pages.forEach((p) => {
        allPages.push({
          ...p,
          chapterNumber: ch.chapterNumber,
          chapterTitle: ch.title,
        });
      });
    });

    const index = allPages.findIndex(
      (p) => p.id === pageId || p.pageNumber === pageId
    );

    if (index === -1) {
      return {
        current: null,
        prev: null,
        next: null,
      };
    }

    return {
      current: allPages[index],
      prev: index > 0 ? allPages[index - 1] : null,
      next: index < allPages.length - 1 ? allPages[index + 1] : null,
    };
  }, [pageId]);

  const activeChapterNum =
    chapterNumber || meta.current?.chapterNumber || '01';
  const activeChapterTitle =
    chapterTitle || meta.current?.chapterTitle || 'Computer Networks';
  const activePageNum = meta.current?.pageNumber || '';
  const activeTitle = title || meta.current?.title || '';

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#232D2D] selection:bg-[#8A7059]/20 font-sans overflow-x-hidden">
      {/* Top sticky navbar */}
      <nav className="sticky top-0 z-30 bg-[#F5F2EB] border-b border-[#8A7059]/25 px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 transition-colors">
        <div className="w-[88%] max-w-[1440px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToIndex}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#6E5844] hover:text-[#232D2D] transition-colors cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Networks Index</span>
          </button>

          <span className="font-mono text-xs text-[#8A7059] tracking-widest uppercase hidden sm:inline-block">
            Chapter {activeChapterNum} {activePageNum && `• Page ${activePageNum}`}
          </span>
        </div>
      </nav>

      {/* Main Content Container (Full Width, Standard Explainer Shell) */}
      <main className="w-[88%] max-w-[1440px] mx-auto px-2 sm:px-6 md:px-10 py-12 sm:py-16 pb-24">
        {/* Document Header */}
        <header className="mb-12 border-b border-[#8A7059]/25 pb-8 sm:pb-10">
          <div className="inline-block py-0.5 rounded font-mono text-xs uppercase tracking-widest text-[#384545] font-semibold mb-3">
            Chapter {activeChapterNum} • {activeChapterTitle}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#232D2D] leading-[1.15]">
            {activeTitle}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-[#6E5844] mt-3 font-mono">
              {subtitle}
            </p>
          )}
        </header>

        {/* Page Body Content */}
        {children}

        {/* Standardized Bottom Navigation Footer */}
        <footer className="mt-20 pt-8 border-t border-[#8A7059]/25 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A7059]">
          {/* Previous Page Link */}
          {prevPage !== undefined ? (
            prevPage ? (
              <button
                type="button"
                onClick={prevPage.onClick || (() => onNavigatePage && onNavigatePage(prevPage.id))}
                className="hover:text-[#232D2D] transition-colors cursor-pointer"
              >
                ← Previous: {prevPage.label || `Page ${prevPage.pageNumber} (${prevPage.title})`}
              </button>
            ) : (
              <span />
            )
          ) : meta.prev ? (
            <button
              type="button"
              onClick={() => onNavigatePage && onNavigatePage(meta.prev.id)}
              className="hover:text-[#232D2D] transition-colors cursor-pointer font-bold text-[#4D3B2D]"
            >
              ← Previous: Page {meta.prev.pageNumber} ({meta.prev.title})
            </button>
          ) : (
            <span />
          )}

          {/* Central Index Return Link */}
          <button
            type="button"
            onClick={onBackToIndex}
            className="hover:text-[#232D2D] transition-colors cursor-pointer"
          >
            <span className="text=[#4D3B2D]">Networks Index</span>
          </button>

          {/* Next Page Link */}
          {nextPage !== undefined ? (
            nextPage ? (
              nextPage.isAvailable !== false ? (
                <button
                  type="button"
                  onClick={nextPage.onClick || (() => onNavigatePage && onNavigatePage(nextPage.id))}
                  className="hover:text-[#232D2D] transition-colors cursor-pointer font-bold text-[#8A7059]"
                >
                  Next: {nextPage.label || `Page ${nextPage.pageNumber} (${nextPage.title})`} →
                </button>
              ) : (
                <span className="text-[#6E5844] font-semibold">
                  Next: {nextPage.label || `Page ${nextPage.pageNumber} (${nextPage.title})`} →
                </span>
              )
            ) : (
              <span />
            )
          ) : meta.next ? (
            meta.next.available ? (
              <button
                type="button"
                onClick={() => onNavigatePage && onNavigatePage(meta.next.id)}
                className="hover:text-[#232D2D] transition-colors cursor-pointer font-bold text-[#4D3B2D]"
              >
                Next: Page {meta.next.pageNumber} ({meta.next.title}) →
              </button>
            ) : (
              <span className="text-[#6E5844] font-bold">
                Next: Page {meta.next.pageNumber} ({meta.next.title}) →
              </span>
            )
          ) : (
            <span />
          )}
        </footer>
      </main>
    </div>
  );
}

