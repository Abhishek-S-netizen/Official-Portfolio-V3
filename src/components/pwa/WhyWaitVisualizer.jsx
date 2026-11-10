import React, { useState } from 'react';

export default function WhyWaitVisualizer() {
  // Main view: 'without-wait' | 'with-wait'
  const [mainView, setMainView] = useState('with-wait');
  // Sub-state for 'with-wait': 'active-window' | 'closed-window'
  const [subState, setSubState] = useState('active-window');

  return (
    <div className="my-6 p-4 sm:p-6 rounded-xl bg-[#EAE5DA]/45 shadow-sm">
      {/* Top Controls: Prominent Master View Toggles & Sub-State Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#8A7059]/25">
        {/* Prominent Master View Toggles */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMainView('without-wait')}
            className={`px-5 py-2.5 rounded-md text-sm transition-all ${mainView === 'without-wait'
              ? 'bg-[#384545] text-[#F5F2EB] shadow-md font-semibold'
              : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/40 hover:bg-[#8A7059]/15 font-medium'
              }`}
          >
            1. Without Wait
          </button>

          <button
            type="button"
            onClick={() => setMainView('with-wait')}
            className={`px-5 py-2.5 rounded-md text-sm transition-all ${mainView === 'with-wait'
              ? 'bg-[#384545] text-[#F5F2EB] shadow-md font-semibold'
              : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/40 hover:bg-[#8A7059]/15 font-medium'
              }`}
          >
            2. With Wait
          </button>
        </div>

        {/* Sub-State Toggle for "With Wait" */}
        {mainView === 'with-wait' && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#6E5844] font-semibold uppercase tracking-wider hidden md:inline">
              Simulate:
            </span>
            <button
              type="button"
              onClick={() => setSubState('active-window')}
              className={`px-3.5 py-2 rounded-md text-xs font-mono transition-all ${subState === 'active-window'
                ? 'bg-[#8A7059] text-white shadow-sm font-semibold'
                : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/30 hover:bg-[#8A7059]/10'
                }`}
            >
              A. Application Window Active
            </button>

            <button
              type="button"
              onClick={() => setSubState('closed-window')}
              className={`px-3.5 py-2 rounded-md text-xs font-mono transition-all ${subState === 'closed-window'
                ? 'bg-[#8A7059] text-white shadow-sm font-semibold'
                : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/30 hover:bg-[#8A7059]/10'
                }`}
            >
              B. Application Window Closed
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto py-2">
        {/* ============================================================== */}
        {/* 1. WITHOUT WAIT DIAGRAM (Preserved Exactly) */}
        {/* ============================================================== */}
        {mainView === 'without-wait' && (
          <svg
            viewBox="0 0 900 240"
            className="w-full min-w-[820px] max-h-[300px] h-auto select-none"
          >
            <defs>
              <marker
                id="ww-arrow-black"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#232D2D" />
              </marker>

              <marker
                id="ww-arrow-red"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#DC2626" />
              </marker>
            </defs>

            {/* Left Tan Container: Active Application Window */}
            <rect
              x="15"
              y="12"
              width="435"
              height="205"
              rx="10"
              fill="#DDCFBF"
              stroke="#8A7059"
              strokeWidth="2"
            />

            {/* Header pill inside tan box */}
            <rect
              x="115"
              y="24"
              width="225"
              height="32"
              rx="8"
              fill="#384545"
            />
            <text
              x="227"
              y="45"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="600"
            >
              Application window open
            </text>

            {/* User enters data (Bronze) */}
            <rect
              x="30"
              y="74"
              width="125"
              height="50"
              rx="8"
              fill="#8A7059"
            />
            <text
              x="92"
              y="96"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="600"
            >
              Application : User
            </text>
            <text
              x="92"
              y="112"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="600"
            >
              enters data
            </text>

            {/* Arrow: User -> SW_v1 with generous breathing room */}
            <line
              x1="155"
              y1="99"
              x2="238"
              y2="99"
              stroke="#232D2D"
              strokeWidth="2"
              markerEnd="url(#ww-arrow-black)"
            />
            <text
              x="197"
              y="88"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="11"
              fontWeight="600"
            >
              Forward data
            </text>

            {/* SW_v1 (Contains request) */}
            <rect
              x="248"
              y="74"
              width="168"
              height="50"
              rx="8"
              fill="#DDCFBF"
              stroke="#232D2D"
              strokeWidth="2"
            />
            <text
              x="332"
              y="96"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="700"
            >
              SW_v1
            </text>
            <text
              x="332"
              y="112"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="11"
              fontWeight="500"
            >
              (Handling request)
            </text>

            {/* SW_v2 is being installed */}
            <rect
              x="115"
              y="155"
              width="225"
              height="32"
              rx="8"
              fill="#384545"
            />
            <text
              x="227"
              y="176"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="600"
            >
              SW_v2 is being installed
            </text>

            {/* Dashed Arrow right from SW_v2 to SW_v2 tries to become active */}
            <line
              x1="340"
              y1="171"
              x2="480"
              y2="171"
              stroke="#232D2D"
              strokeWidth="2"
              strokeDasharray="5 5"
              markerEnd="url(#ww-arrow-black)"
            />

            {/* SW_v2 tries to become active */}
            <rect
              x="490"
              y="148"
              width="175"
              height="48"
              rx="8"
              fill="#384545"
            />
            <text
              x="577"
              y="169"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="600"
            >
              SW_v2 tries to become
            </text>
            <text
              x="577"
              y="185"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="600"
            >
              active
            </text>

            {/* Dashed Arrow UP from SW_v2 colliding into line */}
            <line
              x1="577"
              y1="148"
              x2="577"
              y2="118"
              stroke="#DC2626"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#ww-arrow-red)"
            />

            {/* Interrupted Highway between SW_v1 and Web Server */}
            <line
              x1="416"
              y1="99"
              x2="510"
              y2="99"
              stroke="#232D2D"
              strokeWidth="2"
            />
            <text
              x="577"
              y="103"
              textAnchor="middle"
              fill="#DC2626"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              Flow Interrupted
            </text>
            <line
              x1="644"
              y1="99"
              x2="718"
              y2="99"
              stroke="#232D2D"
              strokeWidth="2"
              markerEnd="url(#ww-arrow-black)"
            />

            {/* Arrow UP from collision to SW_v1 deactivated */}
            <line
              x1="577"
              y1="88"
              x2="577"
              y2="64"
              stroke="#DC2626"
              strokeWidth="2"
              markerEnd="url(#ww-arrow-red)"
            />

            {/* SW_v1 deactivated (Request lost) */}
            <rect
              x="490"
              y="14"
              width="175"
              height="44"
              rx="8"
              fill="#F5F2EB"
              stroke="#DC2626"
              strokeWidth="2"
            />
            <text
              x="577"
              y="34"
              textAnchor="middle"
              fill="#DC2626"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              SW_v1 deactivated
            </text>
            <text
              x="577"
              y="48"
              textAnchor="middle"
              fill="#DC2626"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="11"
              fontWeight="600"
            >
              (Request lost)
            </text>

            {/* Web Server (Right) */}
            <rect
              x="726"
              y="74"
              width="135"
              height="50"
              rx="8"
              fill="#384545"
            />
            <text
              x="793"
              y="104"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="600"
            >
              Web server
            </text>
          </svg>
        )}

        {/* ============================================================== */}
        {/* 2. WITH WAIT DIAGRAM (Taller, Longer, Unsquashed Crisp Geometry) */}
        {/* ============================================================== */}
        {mainView === 'with-wait' && (
          <svg
            viewBox="0 0 1000 340"
            className="w-full min-w-[920px] max-h-[380px] h-auto select-none"
          >
            <defs>
              <marker
                id="w-arrow-black"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#232D2D" />
              </marker>

              {/* Dedicated Bronze Arrowhead Marker */}
              <marker
                id="w-arrow-bronze"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#8A7059" />
              </marker>
            </defs>

            {/* Left Tan Box (Generously taller & wider) */}
            <rect
              x="20"
              y="15"
              width="475"
              height="245"
              rx="10"
              fill="#DDCFBF"
              stroke="#8A7059"
              strokeWidth="2"
            />

            {/* ========================================================== */}
            {/* ACTIVE SESSION GROUP */}
            {/* ========================================================== */}
            <g
              className="transition-opacity duration-300"
              style={{ opacity: subState === 'closed-window' ? 0.15 : 1 }}
            >
              {/* Application window open */}
              <rect
                x="140"
                y="28"
                width="235"
                height="34"
                rx="8"
                fill="#384545"
              />
              <text
                x="257"
                y="50"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight="600"
              >
                Application window open
              </text>

              {/* User enters data */}
              <rect
                x="35"
                y="80"
                width="130"
                height="52"
                rx="8"
                fill="#8A7059"
              />
              <text
                x="100"
                y="111"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight="600"
              >
                User enters data
              </text>

              {/* Arrows between User and Worker Box with ample breathing room */}
              {/* Forward data -> */}
              <line
                x1="165"
                y1="93"
                x2="257"
                y2="93"
                stroke="#232D2D"
                strokeWidth="2"
                markerEnd="url(#w-arrow-black)"
              />
              <text
                x="211"
                y="84"
                textAnchor="middle"
                fill="#232D2D"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="11"
                fontWeight="600"
              >
                Forward data
              </text>

              {/* <- Response */}
              <line
                x1="257"
                y1="118"
                x2="173"
                y2="118"
                stroke="#232D2D"
                strokeWidth="2"
                markerEnd="url(#w-arrow-black)"
              />
              <text
                x="211"
                y="132"
                textAnchor="middle"
                fill="#232D2D"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="11"
                fontWeight="600"
              >
                Response
              </text>

              {/* Web Server & Network arrows */}
              {/* Request -> Web server */}
              <line
                x1="452"
                y1="93"
                x2="600"
                y2="93"
                stroke="#232D2D"
                strokeWidth="2"
                markerEnd="url(#w-arrow-black)"
              />
              <text
                x="526"
                y="84"
                textAnchor="middle"
                fill="#232D2D"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="11.5"
                fontWeight="600"
              >
                Request
              </text>

              {/* Response <- Web server */}
              <line
                x1="600"
                y1="118"
                x2="460"
                y2="118"
                stroke="#232D2D"
                strokeWidth="2"
                markerEnd="url(#w-arrow-black)"
              />
              <text
                x="526"
                y="132"
                textAnchor="middle"
                fill="#232D2D"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="11.5"
                fontWeight="600"
              >
                Response
              </text>

              {/* Web Server */}
              <rect
                x="610"
                y="80"
                width="145"
                height="52"
                rx="8"
                fill="#384545"
              />
              <text
                x="682"
                y="111"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="14"
                fontWeight="600"
              >
                Web server
              </text>

              {/* SW_v2 is being installed */}
              <rect
                x="140"
                y="195"
                width="235"
                height="34"
                rx="8"
                fill="#384545"
              />
              <text
                x="257"
                y="217"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight="600"
              >
                SW_v2 is being installed
              </text>

              {/* Dashed line to SW_v2 waits */}
              <line
                x1="375"
                y1="212"
                x2="550"
                y2="212"
                stroke="#232D2D"
                strokeWidth="2"
                strokeDasharray="5 5"
                markerEnd="url(#w-arrow-black)"
              />
            </g>

            {/* ========================================================== */}
            {/* WORKER BOX (Dynamically swapped text on restart!) */}
            {/* ========================================================== */}
            <rect
              x="267"
              y="80"
              width="185"
              height="52"
              rx="8"
              fill={subState === 'closed-window' ? '#384545' : '#DDCFBF'}
              stroke={subState === 'closed-window' ? '#10B981' : '#232D2D'}
              strokeWidth="2"
              className="transition-colors duration-300"
            />
            {subState === 'active-window' ? (
              <>
                <text
                  x="360"
                  y="102"
                  textAnchor="middle"
                  fill="#232D2D"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="13"
                  fontWeight="700"
                >
                  SW_v1
                </text>
                <text
                  x="360"
                  y="120"
                  textAnchor="middle"
                  fill="#232D2D"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="11"
                  fontWeight="500"
                >
                  (Handling request)
                </text>
              </>
            ) : (
              <>
                <text
                  x="360"
                  y="102"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="13"
                  fontWeight="700"
                >
                  New SW_v2
                </text>
                <text
                  x="360"
                  y="120"
                  textAnchor="middle"
                  fill="#5eead4"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="11"
                  fontWeight="700"
                >
                  Active
                </text>
              </>
            )}

            {/* ========================================================== */}
            {/* SW_v2 WAITS (The Waiting Room) */}
            {/* ========================================================== */}
            <rect
              x="560"
              y="186"
              width="170"
              height="52"
              rx="8"
              fill="#384545"
            />
            <text
              x="645"
              y="217"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13.5"
              fontWeight="600"
            >
              SW_v2 waits
            </text>

            {/* ========================================================== */}
            {/* SHUTDOWN & RESTART PATHWAY */}
            {/* ========================================================== */}
            <g
              className="transition-opacity duration-300"
              style={{ opacity: subState === 'active-window' ? 0.15 : 1 }}
            >
              {/* Bronze Line down from Tan Box -> Bronze Arrowhead! */}
              <path
                d="M 257 260 L 257 293 L 285 293"
                fill="none"
                stroke="#8A7059"
                strokeWidth="2"
                markerEnd="url(#w-arrow-bronze)"
              />

              {/* Application window closed (Bronze) */}
              <rect
                x="295"
                y="274"
                width="205"
                height="38"
                rx="8"
                fill="#8A7059"
              />
              <text
                x="397"
                y="298"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="12.5"
                fontWeight="600"
              >
                Application window closed
              </text>

              {/* On restart arrow: From closed box (x=500, y=293) -> right to x=645 -> up into SW_v2 waits */}
              <path
                d="M 500 293 L 645 293 L 645 246"
                fill="none"
                stroke="#232D2D"
                strokeWidth="2"
                markerEnd="url(#w-arrow-black)"
              />
              <text
                x="568"
                y="284"
                textAnchor="middle"
                fill="#232D2D"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="11.5"
                fontWeight="600"
              >
                On restart
              </text>

              {/* Activate and replace loop: Long, completely straight 22px vertical stem ending cleanly at worker box bottom! */}
              <path
                d="M 645 186 L 645 160 L 360 160 L 360 140"
                fill="none"
                stroke="#232D2D"
                strokeWidth="2"
                markerEnd="url(#w-arrow-black)"
              />
              <text
                x="502"
                y="152"
                textAnchor="middle"
                fill="#232D2D"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="11.5"
                fontWeight="600"
              >
                Activate and replace
              </text>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
