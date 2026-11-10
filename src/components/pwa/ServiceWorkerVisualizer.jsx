import React, { useState, useEffect, useRef } from 'react';

export default function ServiceWorkerVisualizer() {
  // Scenarios: 'online' | 'offline' | 'sync'
  const [activeScenario, setActiveScenario] = useState('online');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef([]);

  const clearAllTimers = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const scenarioSteps = {
    online: [
      {
        step: 0,
        title: 'Ready: Online Mode',
        desc: 'Device is connected to the Internet. Notice that the Offline subsystem is deeply dimmed. Click "Next Step" or "Auto-Play" to trace the network flow.',
        activeNode: null,
        activePath: null,
        duration: 0,
      },
      {
        step: 1,
        title: 'Step 1 of 5: PWA dispatches HTTP Request',
        desc: 'The user triggers an action in the PWA. The request is intercepted by the Service Worker before reaching the open internet.',
        activeNode: 'pwa',
        activePath: 'pwa-to-sw',
        duration: 3500,
      },
      {
        step: 2,
        title: 'Step 2 of 5: Service Worker forwards to Web Server',
        desc: 'The Service Worker verifies that internet connectivity is active and forwards the request down to the Web Server.',
        activeNode: 'sw',
        activePath: 'sw-to-server',
        duration: 3500,
      },
      {
        step: 3,
        title: 'Step 3 of 5: Web Server processes request',
        desc: 'The request has arrived at the Web Server. The server is querying its database and generating the response payload.',
        activeNode: 'server',
        activePath: null,
        duration: 2500, // deliberate dwell pause
      },
      {
        step: 4,
        title: 'Step 4 of 5: Web Server streams Response',
        desc: 'Processing complete. The Web Server sends the HTTP response back up to the Service Worker.',
        activeNode: 'sw',
        activePath: 'server-to-sw',
        duration: 3500,
      },
      {
        step: 5,
        title: 'Step 5 of 5: Service Worker fulfills Request',
        desc: 'The Service Worker delivers the fresh data back to the PWA screen and caches a copy for offline resilience.',
        activeNode: 'pwa',
        activePath: 'sw-to-pwa',
        duration: 3500,
      },
    ],
    offline: [
      {
        step: 0,
        title: 'Ready: Offline Mode',
        desc: 'Internet is disconnected. The Web Server and its communication channels are completely greyed out. Let\'s see how the Service Worker handles requests.',
        activeNode: null,
        activePath: null,
        duration: 0,
      },
      {
        step: 1,
        title: 'Step 1 of 5: PWA dispatches Request',
        desc: 'The user interacts with the app while offline. The PWA sends a request for resources to the Service Worker.',
        activeNode: 'pwa',
        activePath: 'pwa-to-sw',
        duration: 3500,
      },
      {
        step: 2,
        title: 'Step 2 of 5: Diverted to Local Cache',
        desc: 'The Service Worker detects NO internet. Instead of failing with a browser network error, it diverts upward into the Local Cache.',
        activeNode: 'sw',
        activePath: 'sw-to-cache',
        duration: 3500,
      },
      {
        step: 3,
        title: 'Step 3 of 5: Local Cache retrieves assets',
        desc: 'The request has arrived at Local Cache. It instantly accesses pre-cached HTML, CSS, JavaScript, and data with 0ms network latency.',
        activeNode: 'cache',
        activePath: null,
        duration: 2500, // deliberate dwell pause
      },
      {
        step: 4,
        title: 'Step 4 of 5: Local Cache streams assets to Service Worker',
        desc: 'Local Cache returns the retrieved resources back to the Service Worker.',
        activeNode: 'sw',
        activePath: 'cache-to-sw',
        duration: 3500,
      },
      {
        step: 5,
        title: 'Step 5 of 5: App continues working offline',
        desc: 'The Service Worker serves the cached assets to the user. The application remains fully functional with zero internet connection.',
        activeNode: 'pwa',
        activePath: 'sw-to-pwa',
        duration: 3500,
      },
    ],
    sync: [
      {
        step: 0,
        title: 'Ready: Offline POST Action & Sync',
        desc: 'Tests what happens when a user POST request or action occurs while offline, and how it safely synchronizes once back online.',
        activeNode: null,
        activePath: null,
        duration: 0,
      },
      {
        step: 1,
        title: 'Step 1 of 6: POST request dispatched while OFFLINE',
        desc: 'A POST request is forwarded while the device has no internet connection.',
        activeNode: 'pwa',
        activePath: 'pwa-to-sw',
        duration: 3500,
      },
      {
        step: 2,
        title: 'Step 2 of 6: Service Worker queues request in Local Cache',
        desc: 'Because the device is offline, the Service Worker intercepts the request and persists the payload into Local Cache / IndexedDB.',
        activeNode: 'cache',
        activePath: 'sw-to-cache',
        duration: 3500,
      },
      {
        step: 3,
        title: 'Step 3 of 6: Internet Restored — Service Worker retrieves queued request',
        desc: 'Connectivity is re-established. The browser triggers a sync event, and the Service Worker pulls the pending request back from storage.',
        activeNode: 'sw',
        activePath: 'cache-to-sw',
        duration: 3500,
      },
      {
        step: 4,
        title: 'Step 4 of 6: Forwarding queued POST request to Web Server',
        desc: 'Now online, the Service Worker safely flushes its holding queue and synchronizes the pending request down to the Web Server.',
        activeNode: 'sw',
        activePath: 'sw-to-server',
        duration: 3500,
      },
      {
        step: 5,
        title: 'Step 5 of 6: Web Server processes POST request',
        desc: 'Web Server receives the synced payload and commits the request to the production database.',
        activeNode: 'server',
        activePath: null,
        duration: 2500, // deliberate dwell pause
      },
      {
        step: 6,
        title: 'Step 6 of 6: Server confirms & sync complete',
        desc: 'The Web Server confirms successful sync. Both local cache and remote server are now perfectly aligned.',
        activeNode: 'pwa',
        activePath: 'server-to-sw',
        duration: 3500,
      },
    ],
  };

  const currentStepsList = scenarioSteps[activeScenario];
  const maxStep = currentStepsList.length - 1;
  const currentInfo = currentStepsList[currentStep] || currentStepsList[0];

  const switchScenario = (scenario) => {
    clearAllTimers();
    setIsPlaying(false);
    setActiveScenario(scenario);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    clearAllTimers();
    setIsPlaying(false);
    setCurrentStep((prev) => (prev < maxStep ? prev + 1 : 0));
  };

  const handlePrevStep = () => {
    clearAllTimers();
    setIsPlaying(false);
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleAutoPlay = () => {
    if (isPlaying) {
      clearAllTimers();
      setIsPlaying(false);
      return;
    }

    clearAllTimers();
    setIsPlaying(true);

    let nextStepIndex = currentStep >= maxStep ? 1 : currentStep + 1;
    setCurrentStep(nextStepIndex);

    const scheduleNext = (idx) => {
      const stepItem = currentStepsList[idx];
      const waitTime = stepItem ? stepItem.duration : 3500;

      const t = setTimeout(() => {
        const next = idx + 1;
        if (next <= maxStep) {
          setCurrentStep(next);
          scheduleNext(next);
        } else {
          setIsPlaying(false);
        }
      }, waitTime);
      timerRef.current.push(t);
    };

    scheduleNext(nextStepIndex);
  };

  // Deep dimming (0.15) for inactive sections
  // In sync scenario: Offline stays fully lit through Step 3 while packet returns from Cache to SW.
  // At Step 4, as transmission to Web Server begins, Offline dims and Online brightens.
  const isOfflineZoneDimmed =
    activeScenario === 'online' || (activeScenario === 'sync' && currentStep >= 4);
  const isOnlineZoneDimmed =
    activeScenario === 'offline' || (activeScenario === 'sync' && currentStep < 4);

  return (
    <div className="my-6 p-4 sm:p-6 rounded-xl bg-[#EAE5DA]/45 shadow-sm">
      {/* Dynamic CSS: Run EXACTLY ONCE with 'forwards' so the dot NEVER loops or flicks back! */}
      <style>{`
        @keyframes travelOnce {
          0% { offset-distance: 0%; opacity: 0; }
          6% { opacity: 1; }
          94% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        .motion-pwa-to-sw {
          offset-path: path("M 172 200 L 285 200");
          animation: travelOnce 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .motion-sw-to-pwa {
          offset-path: path("M 285 240 L 172 240");
          animation: travelOnce 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .motion-sw-to-cache {
          offset-path: path("M 400 170 L 400 105 L 620 105");
          animation: travelOnce 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .motion-cache-to-sw {
          offset-path: path("M 725 155 L 725 178 L 505 178");
          animation: travelOnce 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .motion-sw-to-server {
          offset-path: path("M 400 270 L 400 335 L 620 335");
          animation: travelOnce 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .motion-server-to-sw {
          offset-path: path("M 725 280 L 725 262 L 505 262");
          animation: travelOnce 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6 pb-6 border-b border-[#8A7059]/25">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
            Service Worker Request & Lifecycle Interceptor
          </h3>
        </div>

        {/* Stepper Buttons & Run Simulation */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 0 || isPlaying}
            className="px-3.5 py-2 rounded-md bg-[#F5F2EB] border border-[#8A7059]/30 text-[#384545] hover:bg-[#8A7059]/10 text-xs font-mono font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Previous Step"
          >
            ← Prev
          </button>

          <span className="font-mono text-xs text-[#8A7059] px-2 font-bold">
            {currentStep} / {maxStep}
          </span>

          <button
            type="button"
            onClick={handleNextStep}
            disabled={isPlaying}
            className="px-3.5 py-2 rounded-md bg-[#F5F2EB] border border-[#8A7059]/30 text-[#384545] hover:bg-[#8A7059]/10 text-xs font-mono font-medium transition-all"
            title="Next Step"
          >
            Next Step →
          </button>

          <button
            type="button"
            onClick={handleAutoPlay}
            className="px-4 py-2 rounded-md bg-[#8A7059] hover:bg-[#78604B] text-white text-xs font-mono font-medium tracking-wide transition-all shadow-md flex items-center gap-1.5"
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-md bg-white animate-ping" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <span>▶</span>
                <span>Run Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs & Pacing Hint */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => switchScenario('online')}
            className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all ${activeScenario === 'online'
              ? 'bg-[#384545] text-[#F5F2EB] shadow-sm font-semibold'
              : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/30 hover:bg-[#8A7059]/10'
              }`}
          >
            1. Online GET Request
          </button>

          <button
            type="button"
            onClick={() => switchScenario('offline')}
            className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all ${activeScenario === 'offline'
              ? 'bg-[#384545] text-[#F5F2EB] shadow-sm font-semibold'
              : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/30 hover:bg-[#8A7059]/10'
              }`}
          >
            2. Offline GET Request
          </button>

          <button
            type="button"
            onClick={() => switchScenario('sync')}
            className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all ${activeScenario === 'sync'
              ? 'bg-[#384545] text-[#F5F2EB] shadow-sm font-semibold'
              : 'bg-[#F5F2EB] text-[#384545] border border-[#8A7059]/30 hover:bg-[#8A7059]/10'
              }`}
          >
            3. Offline POST Action & Sync
          </button>
        </div>

        <span className="text-xs font-mono text-[#222222] font-bold">
          Use "Next Step →" to walk through at your own pace
        </span>
      </div>

      {/* Descriptive Step Banner (Titles + Network Status) */}
      <div className="mb-6 px-4 py-3 rounded-md bg-[#F5F2EB] border border-[#8A7059]/35 shadow-inner flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-mono text-xs sm:text-sm font-bold text-[#232D2D]">
          {currentInfo.title}
        </h4>

        {activeScenario === 'sync' && (
          <span
            className={`text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-300 shrink-0 ${currentStep >= 3 ? 'text-emerald-700' : 'text-amber-700'
              }`}
          >
            {currentStep >= 3 ? 'ONLINE CONNECTED' : 'OFFLINE MODE'}
          </span>
        )}
      </div>

      {/* Main Diagram Canvas */}
      <div className="w-full flex justify-center overflow-x-auto py-2">
        <svg
          viewBox="0 0 920 480"
          className="w-full max-w-[880px] h-auto select-none"
        >
          <defs>
            <marker
              id="sw-arrow-head"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#232D2D" />
            </marker>

            <filter id="sw-active-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#8A7059" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* OFFLINE MASTER GROUP (Top Right) */}
          {/* ============================================================== */}
          <g
            className="transition-opacity duration-500"
            style={{ opacity: isOfflineZoneDimmed ? 0.15 : 1 }}
          >
            {/* Outer Frame: y=25 to y=205 (height 180). Bottom border is at y=205 */}
            <rect
              x="320"
              y="25"
              width="540"
              height="180"
              rx="18"
              fill="none"
              stroke="#384545"
              strokeWidth="2"
            />
            <text
              x="340"
              y="54"
              fill="#232D2D"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="16"
              fontWeight="700"
              letterSpacing="0.05em"
            >
              OFFLINE
            </text>

            {/* Local Cache Box: y=55 to y=155 (height 100) */}
            <rect
              x="620"
              y="55"
              width="210"
              height="100"
              rx="10"
              fill="#647d7dff"
              filter={currentInfo.activeNode === 'cache' ? 'url(#sw-active-glow)' : 'none'}
              className="transition-all duration-300"
            />
            <text
              x="725"
              y="105"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="18"
              fontWeight="600"
            >
              Local Cache
            </text>

            {/* Processing / Serving indicator inside Local Cache */}
            {activeScenario === 'offline' && currentStep === 3 && (
              <text
                x="725"
                y="130"
                textAnchor="middle"
                fill="#ffffffff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="15"
                fontWeight="600"
                className="animate-pulse"
              >
                Accessing Cache...
              </text>
            )}

            {activeScenario === 'sync' && currentStep >= 2 && currentStep <= 3 && (
              <text
                x="725"
                y="130"
                textAnchor="middle"
                fill="#F5F2EB"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="15"
                fontWeight="500"
              >
                Serving current UI safely
              </text>
            )}

            {/* Arrow: SW -> Local Cache (Request) */}
            <g>
              <path
                d="M 400 170 L 400 105 L 615 105"
                fill="none"
                stroke={currentInfo.activePath === 'sw-to-cache' ? '#6D8686' : '#232D2D'}
                strokeWidth={currentInfo.activePath === 'sw-to-cache' ? '3' : '2'}
                markerEnd="url(#sw-arrow-head)"
                className="transition-colors duration-300"
              />
              <text
                x="530"
                y="95"
                textAnchor="middle"
                fill={currentInfo.activePath === 'sw-to-cache' ? '#6D8686' : '#232D2D'}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight={currentInfo.activePath === 'sw-to-cache' ? '700' : '500'}
              >
                Request
              </text>
            </g>

            {/* Arrow: Local Cache -> SW (Response) */}
            {/* Exactly 27px clearance from bottom frame border (y=205 - 178 = 27px) */}
            <g>
              <path
                d="M 725 155 L 725 178 L 510 178"
                fill="none"
                stroke={currentInfo.activePath === 'cache-to-sw' ? '#6D8686' : '#232D2D'}
                strokeWidth={currentInfo.activePath === 'cache-to-sw' ? '3' : '2'}
                markerEnd="url(#sw-arrow-head)"
                className="transition-colors duration-300"
              />
              <text
                x="625"
                y="171"
                textAnchor="middle"
                fill={currentInfo.activePath === 'cache-to-sw' ? '#6D8686' : '#232D2D'}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight={currentInfo.activePath === 'cache-to-sw' ? '700' : '500'}
              >
                Response
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* ONLINE MASTER GROUP (Bottom Right) */}
          {/* ============================================================== */}
          <g
            className="transition-opacity duration-500"
            style={{ opacity: isOnlineZoneDimmed ? 0.15 : 1 }}
          >
            {/* Outer Frame: y=235 to y=435 (height 200). Top border is at y=235 */}
            <rect
              x="320"
              y="235"
              width="540"
              height="200"
              rx="18"
              fill="none"
              stroke="#8A7059"
              strokeWidth="2"
            />
            <text
              x="340"
              y="412"
              fill="#8A7059"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="16"
              fontWeight="700"
              letterSpacing="0.05em"
            >
              ONLINE
            </text>

            {/* Web Server Box */}
            <rect
              x="620"
              y="280"
              width="210"
              height="110"
              rx="10"
              fill="#A3836B"
              filter={currentInfo.activeNode === 'server' ? 'url(#sw-active-glow)' : 'none'}
              className="transition-all duration-300"
            />
            <text
              x="725"
              y="335"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="18"
              fontWeight="600"
            >
              Web Server
            </text>

            {/* Processing / Querying indicator inside Web Server */}
            {activeScenario === 'online' && currentStep === 3 && (
              <text
                x="725"
                y="360"
                textAnchor="middle"
                fill="#000000ff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="15"
                fontWeight="600"
                className="animate-pulse"
              >
                Processing Request...
              </text>
            )}

            {activeScenario === 'sync' && currentStep === 5 && (
              <text
                x="725"
                y="360"
                textAnchor="middle"
                fill="#000000ff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="15"
                fontWeight="600"
                className="animate-pulse"
              >
                Committing Update...
              </text>
            )}

            {activeScenario === 'sync' && currentStep >= 6 && (
              <text
                x="725"
                y="360"
                textAnchor="middle"
                fill="#000000ff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="15"
                fontWeight="500"
              >
                Synced with update
              </text>
            )}

            {/* Arrow: SW -> Web Server (Request) */}
            <g>
              <path
                d="M 400 270 L 400 335 L 615 335"
                fill="none"
                stroke={currentInfo.activePath === 'sw-to-server' ? '#A3836B' : '#232D2D'}
                strokeWidth={currentInfo.activePath === 'sw-to-server' ? '3' : '2'}
                markerEnd="url(#sw-arrow-head)"
                className="transition-colors duration-300"
              />
              <text
                x="530"
                y="355"
                textAnchor="middle"
                fill={currentInfo.activePath === 'sw-to-server' ? '#A3836B' : '#232D2D'}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight={currentInfo.activePath === 'sw-to-server' ? '700' : '500'}
              >
                Request
              </text>
            </g>

            {/* Arrow: Web Server -> SW (Response) */}
            {/* Exactly 27px clearance from top frame border (y=262 - 235 = 27px) */}
            <g>
              <path
                d="M 725 280 L 725 262 L 510 262"
                fill="none"
                stroke={currentInfo.activePath === 'server-to-sw' ? '#A3836B' : '#232D2D'}
                strokeWidth={currentInfo.activePath === 'server-to-sw' ? '3' : '2'}
                markerEnd="url(#sw-arrow-head)"
                className="transition-colors duration-300"
              />
              <text
                x="625"
                y="255"
                textAnchor="middle"
                fill={currentInfo.activePath === 'server-to-sw' ? '#A3836B' : '#232D2D'}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="13"
                fontWeight={currentInfo.activePath === 'server-to-sw' ? '700' : '500'}
              >
                Response
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* PWA BOX (Far Left) */}
          {/* ============================================================== */}
          <g filter={currentInfo.activeNode === 'pwa' ? 'url(#sw-active-glow)' : 'none'}>
            <rect
              x="50"
              y="170"
              width="120"
              height="100"
              rx="10"
              fill="#8A7059"
              className="transition-all duration-300"
            />
            <text
              x="110"
              y="228"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="18"
              fontWeight="600"
            >
              PWA
            </text>
          </g>

          {/* ============================================================== */}
          {/* SERVICE WORKER BOX (Center) */}
          {/* ============================================================== */}
          <g filter={currentInfo.activeNode === 'sw' ? 'url(#sw-active-glow)' : 'none'}>
            <rect
              x="285"
              y="170"
              width="220"
              height="100"
              rx="10"
              fill="#384545"
              className="transition-all duration-300"
            />
            <text
              x="395"
              y="225"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="18"
              fontWeight="600"
            >
              Service Worker
            </text>

            {/* Offline Holding Queue Badge inside Service Worker */}
            {activeScenario === 'sync' && currentStep >= 2 && currentStep <= 3 && (
              <g className="animate-pulse">
                <rect
                  x="298"
                  y="235"
                  width="194"
                  height="22"
                  rx="6"
                  fill="#D97706"
                />
                <text
                  x="395"
                  y="250"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="12"
                  fontWeight="700"
                >
                  Storing Queued Update (Offline)
                </text>
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* STRAIGHT ARROWS: PWA <-> SERVICE WORKER */}
          {/* ============================================================== */}
          {/* Request: PWA -> SW */}
          <g>
            <line
              x1="172"
              y1="200"
              x2="280"
              y2="200"
              stroke={currentInfo.activePath === 'pwa-to-sw' ? '#8A7059' : '#232D2D'}
              strokeWidth={currentInfo.activePath === 'pwa-to-sw' ? '3' : '2'}
              markerEnd="url(#sw-arrow-head)"
              className="transition-colors duration-300"
            />
            <text
              x="226"
              y="190"
              textAnchor="middle"
              fill={currentInfo.activePath === 'pwa-to-sw' ? '#8A7059' : '#232D2D'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight={currentInfo.activePath === 'pwa-to-sw' ? '700' : '500'}
            >
              Request
            </text>
          </g>

          {/* Response: SW -> PWA */}
          <g>
            <line
              x1="280"
              y1="240"
              x2="176"
              y2="240"
              stroke={currentInfo.activePath === 'sw-to-pwa' ? '#384545' : '#232D2D'}
              strokeWidth={currentInfo.activePath === 'sw-to-pwa' ? '3' : '2'}
              markerEnd="url(#sw-arrow-head)"
              className="transition-colors duration-300"
            />
            <text
              x="226"
              y="262"
              textAnchor="middle"
              fill={currentInfo.activePath === 'sw-to-pwa' ? '#384545' : '#232D2D'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight={currentInfo.activePath === 'sw-to-pwa' ? '700' : '500'}
            >
              Response
            </text>
          </g>

          {/* ============================================================== */}
          {/* HARDWARE-ACCELERATED PACKET (Continuous physical flow along path) */}
          {/* Render with unique key per step so it runs ONCE and never loops back */}
          {/* ============================================================== */}
          {currentInfo.activePath === 'pwa-to-sw' && (
            <g key={`pwa-sw-${currentStep}`} className="motion-pwa-to-sw">
              <circle cx="0" cy="0" r="8" fill="#8A7059" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>
          )}

          {currentInfo.activePath === 'sw-to-pwa' && (
            <g key={`sw-pwa-${currentStep}`} className="motion-sw-to-pwa">
              <circle cx="0" cy="0" r="8" fill="#384545" />
              <circle cx="0" cy="0" r="4" fill="#5eead4" />
            </g>
          )}

          {currentInfo.activePath === 'sw-to-cache' && (
            <g key={`sw-cache-${currentStep}`} className="motion-sw-to-cache">
              <circle cx="0" cy="0" r="8" fill="#6D8686" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>
          )}

          {currentInfo.activePath === 'cache-to-sw' && (
            <g key={`cache-sw-${currentStep}`} className="motion-cache-to-sw">
              <circle cx="0" cy="0" r="8" fill="#6D8686" />
              <circle cx="0" cy="0" r="4" fill="#5eead4" />
            </g>
          )}

          {currentInfo.activePath === 'sw-to-server' && (
            <g key={`sw-srv-${currentStep}`} className="motion-sw-to-server">
              <circle cx="0" cy="0" r="8" fill="#A3836B" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>
          )}

          {currentInfo.activePath === 'server-to-sw' && (
            <g key={`srv-sw-${currentStep}`} className="motion-server-to-sw">
              <circle cx="0" cy="0" r="8" fill="#A3836B" />
              <circle cx="0" cy="0" r="4" fill="#5eead4" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
