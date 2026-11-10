import React, { useState, useEffect, useRef } from 'react';

export default function LifecycleInstallFlow() {
  const [activeStep, setActiveStep] = useState(0); // 0: idle, 1: register, 2: install/cache, 3: active, 4: ready
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef([]);

  const clearAllTimers = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const runInstallSimulation = () => {
    if (isRunning) return;
    clearAllTimers();
    setIsRunning(true);
    setActiveStep(1); // Step 1: Register

    const t1 = setTimeout(() => {
      setActiveStep(2); // Step 2: Install & cache

      const t2 = setTimeout(() => {
        setActiveStep(3); // Step 3: Active

        const t3 = setTimeout(() => {
          setActiveStep(4); // Step 4: Handle requests
          setIsRunning(false);
        }, 2200);
        timerRef.current.push(t3);
      }, 2200);
      timerRef.current.push(t2);
    }, 2000);
    timerRef.current.push(t1);
  };

  const reset = () => {
    clearAllTimers();
    setIsRunning(false);
    setActiveStep(0);
  };

  return (
    <div className="my-6 p-4 sm:p-6 rounded-xl bg-[#EAE5DA]/45 shadow-sm">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#8A7059]/25">
        <div>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
            Initial Installation & Activation Sequence
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={runInstallSimulation}
            disabled={isRunning}
            className="px-5 py-2.5 rounded-md bg-[#8A7059] hover:bg-[#78604B] text-white text-xs sm:text-sm font-mono font-medium tracking-wide transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Simulating...</span>
              </>
            ) : activeStep === 4 ? (
              <>
                <span>↺</span>
                <span>Replay Install</span>
              </>
            ) : (
              <>
                <span>▶</span>
                <span>Simulate First Install</span>
              </>
            )}
          </button>

          {activeStep > 0 && !isRunning && (
            <button
              type="button"
              onClick={reset}
              className="px-3.5 py-2.5 rounded-md border border-[#8A7059]/40 text-[#6E5844] hover:bg-[#8A7059]/10 text-xs font-mono transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Conveyor Belt Flowchart */}
      <div className="w-full overflow-x-auto py-4">
        <svg
          viewBox="0 0 1140 145"
          className="w-full min-w-[980px] h-auto select-none"
        >
          <defs>
            <marker
              id="belt-arrow-head"
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
              id="belt-arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#8A7059" />
            </marker>

            <filter id="vivid-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#8A7059" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* 1. Box: Install PWA (Bronze) */}
          {/* ============================================================== */}
          <g>
            <rect
              x="15"
              y="40"
              width="135"
              height="60"
              rx="10"
              fill="#8A7059"
            />
            <text
              x="82"
              y="75"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="15"
              fontWeight="600"
            >
              Install PWA
            </text>
          </g>

          {/* Arrow 1: Install -> sw.js */}
          <line
            x1="150"
            y1="70"
            x2="190"
            y2="70"
            stroke="#232D2D"
            strokeWidth="2"
            markerEnd="url(#belt-arrow-head)"
          />

          {/* ============================================================== */}
          {/* 2. Box: sw.js file */}
          {/* ============================================================== */}
          <g>
            <rect
              x="195"
              y="45"
              width="115"
              height="50"
              rx="8"
              fill="#F5F2EB"
              stroke="#232D2D"
              strokeWidth="2"
            />
            <text
              x="252"
              y="75"
              textAnchor="middle"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="600"
            >
              sw.js file
            </text>
          </g>

          {/* Arrow 2: sw.js -> Register */}
          <line
            x1="310"
            y1="70"
            x2="355"
            y2="70"
            stroke={activeStep === 1 ? '#8A7059' : '#232D2D'}
            strokeWidth={activeStep === 1 ? '3' : '2'}
            markerEnd={activeStep === 1 ? 'url(#belt-arrow-active)' : 'url(#belt-arrow-head)'}
            className="transition-colors duration-300"
          />

          {/* ============================================================== */}
          {/* 3. Box: Register Service Worker */}
          {/* ============================================================== */}
          <g filter={activeStep === 1 ? 'url(#vivid-glow)' : 'none'}>
            <rect
              x="360"
              y="40"
              width="170"
              height="60"
              rx="10"
              fill={activeStep === 1 ? '#8A7059' : '#F5F2EB'}
              stroke={activeStep === 1 ? '#8A7059' : '#232D2D'}
              strokeWidth={activeStep === 1 ? '3' : '2'}
              className="transition-all duration-300"
            />
            <text
              x="445"
              y="75"
              textAnchor="middle"
              fill={activeStep === 1 ? '#FFFFFF' : '#232D2D'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="600"
            >
              Register Service Worker
            </text>
            {activeStep === 1 && (
              <text
                x="445"
                y="26"
                textAnchor="middle"
                fill="#352f2aff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight="700"
                className="animate-pulse"
              >
                Registering
              </text>
            )}
          </g>

          {/* Arrow 3: Register -> Install and cache files */}
          <line
            x1="530"
            y1="70"
            x2="570"
            y2="70"
            stroke={activeStep === 2 ? '#8A7059' : '#232D2D'}
            strokeWidth={activeStep === 2 ? '3' : '2'}
            markerEnd={activeStep === 2 ? 'url(#belt-arrow-active)' : 'url(#belt-arrow-head)'}
            className="transition-colors duration-300"
          />

          {/* ============================================================== */}
          {/* 4. Box: Install and cache files (Event 1) */}
          {/* ============================================================== */}
          <g filter={activeStep === 2 ? 'url(#vivid-glow)' : 'none'}>
            <rect
              x="575"
              y="40"
              width="175"
              height="60"
              rx="10"
              fill={activeStep >= 2 ? '#384545' : '#F5F2EB'}
              stroke={activeStep === 2 ? '#8A7059' : activeStep >= 2 ? '#384545' : '#232D2D'}
              strokeWidth={activeStep === 2 ? '3' : '2'}
              className="transition-all duration-300"
            />
            <text
              x="662"
              y="75"
              textAnchor="middle"
              fill={activeStep >= 2 ? '#FFFFFF' : '#232D2D'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="600"
            >
              Install and cache files
            </text>

            {/* Event 1 Badge (No tick mark) */}
            {activeStep === 2 && (
              <text
                x="662"
                y="26"
                textAnchor="middle"
                fill="#352f2aff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight="700"
                className="animate-pulse"
              >
                Event 1: Caching Assets
              </text>
            )}
            {activeStep > 2 && (
              <text
                x="662"
                y="26"
                textAnchor="middle"
                fill="#096c4bff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight="600"
              >
                Cached
              </text>
            )}
          </g>

          {/* Arrow 4: Install -> Active */}
          <line
            x1="750"
            y1="70"
            x2="790"
            y2="70"
            stroke={activeStep === 3 ? '#8A7059' : '#232D2D'}
            strokeWidth={activeStep === 3 ? '3' : '2'}
            markerEnd={activeStep === 3 ? 'url(#belt-arrow-active)' : 'url(#belt-arrow-head)'}
            className="transition-colors duration-300"
          />

          {/* ============================================================== */}
          {/* 5. Box: Active (Event 2) */}
          {/* ============================================================== */}
          <g filter={activeStep === 3 || activeStep === 4 ? 'url(#vivid-glow)' : 'none'}>
            <rect
              x="795"
              y="40"
              width="115"
              height="60"
              rx="10"
              fill={activeStep >= 3 ? '#384545' : '#F5F2EB'}
              stroke={activeStep === 3 ? '#8A7059' : activeStep >= 3 ? '#384545' : '#232D2D'}
              strokeWidth={activeStep === 3 ? '3' : '2'}
              className="transition-all duration-300"
            />
            <text
              x="852"
              y="75"
              textAnchor="middle"
              fill={activeStep >= 3 ? '#FFFFFF' : '#232D2D'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="15"
              fontWeight="600"
            >
              Active
            </text>

            {/* Event 2 Badge while actively firing */}
            {activeStep === 3 && (
              <text
                x="852"
                y="26"
                textAnchor="middle"
                fill="#352f2aff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight="700"
                className="animate-pulse"
              >
                Event 2: Activating
              </text>
            )}
          </g>

          {/* Arrow 5: Active -> Handle HTTP requests */}
          <line
            x1="910"
            y1="70"
            x2="950"
            y2="70"
            stroke={activeStep === 4 ? '#10B981' : '#232D2D'}
            strokeWidth={activeStep === 4 ? '3' : '2'}
            markerEnd={activeStep === 4 ? 'url(#belt-arrow-active)' : 'url(#belt-arrow-head)'}
            className="transition-colors duration-300"
          />

          {/* ============================================================== */}
          {/* 6. Box: Handle HTTP requests */}
          {/* ============================================================== */}
          <g filter={activeStep === 4 ? 'url(#vivid-glow)' : 'none'}>
            <rect
              x="955"
              y="40"
              width="170"
              height="60"
              rx="10"
              fill={activeStep === 4 ? '#384545' : '#F5F2EB'}
              stroke={activeStep === 4 ? '#10B981' : '#232D2D'}
              strokeWidth={activeStep === 4 ? '3' : '2'}
              className="transition-all duration-300"
            />
            <text
              x="1040"
              y="75"
              textAnchor="middle"
              fill={activeStep === 4 ? '#FFFFFF' : '#232D2D'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="600"
            >
              Handle HTTP requests
            </text>
            {activeStep === 4 && (
              <text
                x="1040"
                y="26"
                textAnchor="middle"
                fill="#096c4bff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight="600"
              >
                Ready for traffic
              </text>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
