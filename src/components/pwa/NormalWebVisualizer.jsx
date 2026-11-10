import React, { useState, useEffect, useRef } from 'react';

export default function NormalWebVisualizer() {
  // state: 'idle' | 'requesting' | 'processing' | 'responding' | 'completed'
  const [phase, setPhase] = useState('idle');
  const timerRef = useRef([]);

  const clearAllTimers = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const startSimulation = () => {
    clearAllTimers();
    setPhase('requesting');

    // Phase 1: Request travels over 3.0s
    const t1 = setTimeout(() => {
      setPhase('processing');

      // Phase 2: Processing at Web Server (2.0s)
      const t2 = setTimeout(() => {
        setPhase('responding');

        // Phase 3: Response travels back over 3.0s
        const t3 = setTimeout(() => {
          setPhase('completed');

          const t4 = setTimeout(() => {
            setPhase('idle');
          }, 3500);
          timerRef.current.push(t4);
        }, 3000);
        timerRef.current.push(t3);
      }, 2000);
      timerRef.current.push(t2);
    }, 3000);
    timerRef.current.push(t1);
  };

  const reset = () => {
    clearAllTimers();
    setPhase('idle');
  };

  return (
    <div className="my-6 p-4 sm:p-6 rounded-xl bg-[#EAE5DA]/45 shadow-sm">
      <style>{`
        @keyframes travelNormReq {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes travelNormResp {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .motion-norm-req {
          offset-path: path("M 165 48 L 478 48");
          animation: travelNormReq 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .motion-norm-resp {
          offset-path: path("M 478 82 L 165 82");
          animation: travelNormResp 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#8A7059]/25">
        <div>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
            Standard Web Application Communication
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={startSimulation}
            disabled={phase !== 'idle' && phase !== 'completed'}
            className="px-5 py-2.5 rounded-md bg-[#384545] hover:bg-[#2B3636] text-[#F5F2EB] text-xs sm:text-sm font-mono font-medium tracking-wide transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 flex items-center gap-2"
          >
            {phase === 'idle' || phase === 'completed' ? (
              <>
                <span>▶</span>
                <span>Send Request</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Simulating...</span>
              </>
            )}
          </button>

          {phase !== 'idle' && phase !== 'completed' && (
            <button
              type="button"
              onClick={reset}
              className="px-3.5 py-2.5 rounded-xl border border-[#8A7059]/40 text-[#6E5844] hover:bg-[#8A7059]/10 text-xs font-mono transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Diagram Canvas (Compact & proportionate) */}
      <div className="w-full flex justify-center overflow-x-auto py-2">
        <svg
          viewBox="0 0 720 130"
          className="w-full max-w-[680px] h-auto select-none"
        >
          <defs>
            <marker
              id="norm-arrow-right"
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
              id="norm-arrow-left"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#232D2D" />
            </marker>

            <filter id="norm-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#8A7059" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Left Box: PWA (Bronze) */}
          <g filter={phase === 'requesting' || phase === 'completed' ? 'url(#norm-glow)' : 'none'}>
            <rect
              x="40"
              y="25"
              width="125"
              height="80"
              rx="10"
              fill="#8A7059"
              className="transition-all duration-300"
            />
            <text
              x="102"
              y="72"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="17"
              fontWeight="600"
            >
              Web App
            </text>
          </g>

          {/* Right Box: Web Server (Slate) */}
          <g filter={phase === 'processing' ? 'url(#norm-glow)' : 'none'}>
            <rect
              x="480"
              y="25"
              width="200"
              height="80"
              rx="10"
              fill="#384545"
              className="transition-all duration-300"
            />
            <text
              x="580"
              y={phase === 'processing' ? '68' : '72'}
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="17"
              fontWeight="600"
            >
              Web Server
            </text>
            {phase === 'processing' && (
              <text
                x="580"
                y="88"
                textAnchor="middle"
                fill="#5eead4"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="15"
                fontWeight="500"
              >
                Processing...
              </text>
            )}
          </g>

          {/* Top Line Track: Request */}
          <g>
            <line
              x1="165"
              y1="48"
              x2="478"
              y2="48"
              stroke={phase === 'requesting' ? '#8A7059' : '#232D2D'}
              strokeWidth={phase === 'requesting' ? '3' : '2'}
              markerEnd="url(#norm-arrow-right)"
              className="transition-colors duration-300"
            />
            <text
              x="322"
              y="38"
              textAnchor="middle"
              fill={phase === 'requesting' ? '#8A7059' : '#232D2D'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight={phase === 'requesting' ? '700' : '500'}
            >
              Request →
            </text>

            {/* Hardware-accelerated gliding packet */}
            {phase === 'requesting' && (
              <g key="norm-req-packet" className="motion-norm-req">
                <circle cx="0" cy="0" r="8" fill="#8A7059" />
                <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
              </g>
            )}
          </g>

          {/* Bottom Line Track: Response */}
          <g>
            <line
              x1="478"
              y1="82"
              x2="167"
              y2="82"
              stroke={phase === 'responding' ? '#384545' : '#232D2D'}
              strokeWidth={phase === 'responding' ? '3' : '2'}
              markerEnd="url(#norm-arrow-left)"
              className="transition-colors duration-300"
            />
            <text
              x="322"
              y="104"
              textAnchor="middle"
              fill={phase === 'responding' ? '#384545' : '#232D2D'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight={phase === 'responding' ? '700' : '500'}
            >
              ← Response
            </text>

            {/* Hardware-accelerated gliding packet */}
            {phase === 'responding' && (
              <g key="norm-resp-packet" className="motion-norm-resp">
                <circle cx="0" cy="0" r="8" fill="#384545" />
                <circle cx="0" cy="0" r="4" fill="#5eead4" />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
