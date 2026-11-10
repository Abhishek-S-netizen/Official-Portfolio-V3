import React, { useState } from 'react';

export default function LifecycleRefreshFlow() {
  // mode: 'no-change' | 'update-available'
  const [mode, setMode] = useState('update-available');

  return (
    <div className="my-6 p-4 sm:p-6 rounded-xl bg-[#EAE5DA]/45 shadow-sm">
      {/* Top Header & Scenario Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#8A7059]/25">
        <div>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
            Service Worker Update & The "Waiting" Stage
          </h4>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('no-change')}
            className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${mode === 'no-change'
              ? 'bg-[#384545] text-[#F5F2EB] shadow-sm font-semibold'
              : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/30 hover:bg-[#8A7059]/10'
              }`}
          >
            Scenario A: No Changes Made
          </button>

          <button
            type="button"
            onClick={() => setMode('update-available')}
            className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${mode === 'update-available'
              ? 'bg-[#384545] text-[#F5F2EB] shadow-sm font-semibold'
              : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/30 hover:bg-[#8A7059]/10'
              }`}
          >
            Scenario B: New Version Available
          </button>
        </div>
      </div>

      {/* Explanatory Narrative Banner (Titles only, no description) */}
      <div className="mb-4 px-4 py-2.5 rounded-md bg-[#F5F2EB] border border-[#8A7059]/35 shadow-inner">
        <h5 className="font-mono text-xs sm:text-sm font-bold text-[#232D2D]">
          {mode === 'no-change'
            ? 'Page Refresh (No Changes Made)'
            : 'Page Refresh (New Version Available)'}
        </h5>
      </div>

      {/* SVG Canvas Recreating User's PowerPoint Horizontal Flowchart 2 (Scaled & Proportioned) */}
      <div className="w-full overflow-x-auto py-2">
        <svg
          viewBox="0 0 940 270"
          className="w-full min-w-[820px] max-h-[300px] h-auto select-none"
        >
          <defs>
            <marker
              id="ref-arrow-black"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#232D2D" />
            </marker>
          </defs>

          {/* ============================================================== */}
          {/* LEFT TRUNK: Refresh PWA -> sw.js -> Register */}
          {/* ============================================================== */}
          {/* Box 1: Refresh PWA (Bronze) */}
          <g>
            <rect
              x="15"
              y="100"
              width="125"
              height="52"
              rx="7"
              fill="#8A7059"
            />
            <text
              x="77"
              y="131"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="600"
            >
              Refresh PWA
            </text>
          </g>

          {/* Arrow 1: Refresh PWA -> sw.js file */}
          <line
            x1="140"
            y1="126"
            x2="173"
            y2="126"
            stroke="#232D2D"
            strokeWidth="2"
            markerEnd="url(#ref-arrow-black)"
          />

          {/* Box 2: sw.js file */}
          <g>
            <rect
              x="180"
              y="107"
              width="95"
              height="38"
              rx="7"
              fill="#F5F2EB"
              stroke="#232D2D"
              strokeWidth="2"
            />
            <text
              x="227"
              y="131"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12.5"
              fontWeight="600"
            >
              sw.js file
            </text>
          </g>

          {/* Arrow 2: sw.js file -> Register Service Worker */}
          <line
            x1="275"
            y1="126"
            x2="308"
            y2="126"
            stroke="#232D2D"
            strokeWidth="2"
            markerEnd="url(#ref-arrow-black)"
          />

          {/* Box 3: Register Service Worker */}
          <g>
            <rect
              x="315"
              y="100"
              width="155"
              height="52"
              rx="7"
              fill="#F5F2EB"
              stroke="#232D2D"
              strokeWidth="2"
            />
            <text
              x="392"
              y="131"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12.5"
              fontWeight="600"
            >
              Register Service Worker
            </text>
          </g>

          {/* ============================================================== */}
          {/* TOP FORK ARROW: "No changes made" */}
          {/* Rule: Greyed out ONLY when mode === 'update-available' */}
          {/* ============================================================== */}
          <g
            className="transition-opacity duration-300"
            style={{ opacity: mode === 'update-available' ? 0.15 : 1 }}
          >
            <path
              d="M 470 126 L 505 126 L 505 56 L 542 56"
              fill="none"
              stroke="#232D2D"
              strokeWidth="2"
              markerEnd="url(#ref-arrow-black)"
            />
            <text
              x="455"
              y="32"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="600"
            >
              No changes made
            </text>
          </g>

          {/* ============================================================== */}
          {/* TOP TIER NODES: Active -> Handle HTTP requests */}
          {/* Rule: ALWAYS ACTIVE in both scenarios! Never greyed out! */}
          {/* ============================================================== */}
          <g>
            {/* Box: Active (Dark Slate) */}
            <rect
              x="550"
              y="32"
              width="135"
              height="48"
              rx="7"
              fill="#384545"
            />
            <text
              x="617"
              y="61"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14.5"
              fontWeight="600"
            >
              Active
            </text>

            {/* Arrow: Active -> Handle HTTP requests */}
            <line
              x1="685"
              y1="56"
              x2="720"
              y2="56"
              stroke="#232D2D"
              strokeWidth="2"
              markerEnd="url(#ref-arrow-black)"
            />

            {/* Box: Handle HTTP requests (White with border) */}
            <rect
              x="728"
              y="32"
              width="155"
              height="48"
              rx="7"
              fill="#F5F2EB"
              stroke="#232D2D"
              strokeWidth="2"
            />
            <text
              x="805"
              y="61"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12.5"
              fontWeight="600"
            >
              Handle HTTP requests
            </text>
          </g>

          {/* ============================================================== */}
          {/* BOTTOM TIER & ON RESTART LOOP */}
          {/* Rule: Greyed out completely when mode === 'no-change' */}
          {/* ============================================================== */}
          <g
            className="transition-opacity duration-300"
            style={{ opacity: mode === 'no-change' ? 0.15 : 1 }}
          >
            {/* Arrow: Register -> Install and cache files */}
            <path
              d="M 470 126 L 505 126 L 505 196 L 542 196"
              fill="none"
              stroke="#232D2D"
              strokeWidth="2"
              markerEnd="url(#ref-arrow-black)"
            />
            <text
              x="455"
              y="240"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="600"
            >
              New version available
            </text>

            {/* Box: Install and cache files (Dark Slate) */}
            <rect
              x="550"
              y="172"
              width="150"
              height="48"
              rx="7"
              fill="#384545"
            />
            <text
              x="625"
              y="201"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12.5"
              fontWeight="600"
            >
              Install and cache files
            </text>

            {/* Arrow: Install -> Wait for all active windows... */}
            <line
              x1="700"
              y1="196"
              x2="733"
              y2="196"
              stroke="#232D2D"
              strokeWidth="2"
              markerEnd="url(#ref-arrow-black)"
            />

            {/* Box: Wait for all active windows to be closed (Dark Slate) */}
            <rect
              x="740"
              y="164"
              width="155"
              height="64"
              rx="7"
              fill="#384545"
            />
            <text
              x="817"
              y="193"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12.5"
              fontWeight="600"
            >
              Wait for all active
            </text>
            <text
              x="817"
              y="211"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12.5"
              fontWeight="600"
            >
              windows to be closed
            </text>

            {/* Arrow: On restart loop back up into Active */}
            <path
              d="M 817 164 L 817 105 L 617 105 L 617 86"
              fill="none"
              stroke="#232D2D"
              strokeWidth="2"
              markerEnd="url(#ref-arrow-black)"
            />
            <text
              x="717"
              y="97"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="11.5"
              fontWeight="600"
            >
              On restart activate new version
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
