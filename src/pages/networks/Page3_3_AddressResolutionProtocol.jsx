import React, { useState, useEffect, useRef } from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';
import styles from './Page3_3_AddressResolutionProtocol.module.css';

export default function Page3_3_AddressResolutionProtocol({ onBackToIndex, onNavigatePage }) {
  // Step state:
  // 0: Start (Initial knowledge, Node B MAC empty)
  // 1: Broadcast ARP Request (Orange packets moving A -> B, C, D)
  // 2: Process Packets (Node B matches; Nodes C & D discard)
  // 3: Unicast Response (Green packet moving B -> A; Node B MAC resolved)
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  // Auto-play timer loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));
        setAnimKey((prev) => prev + 1);
      }, 2200);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  const handleStepClick = (stepIndex) => {
    setIsPlaying(false);
    setCurrentStep(stepIndex);
    setAnimKey((prev) => prev + 1);
  };

  const steps = [
    { id: 0, label: 'Start' },
    { id: 1, label: 'Broadcast ARP Request' },
    { id: 2, label: 'Process Packets' },
    { id: 3, label: 'Unicast Response' },
  ];

  return (
    <NetworkPageLayout
      pageId="3-3-arp"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* ============================================================== */}
      {/* SECTION 1: THE CORE PROBLEM & PURPOSE */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          The Data Link Layer handles node-to-node transmission of data frames. The issue is, an IP address is only available at the Network Layer. The Data Link Layer uses something called a link-layer or MAC address to forward data.
        </p>

        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          For data transmission to be possible at the Data Link Layer, the sender requires :
        </p>

        <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>Sender’s MAC address (already known)</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>Sender’s IP address (already known)</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              Receiver’s MAC address <strong className="text-[#C85A17] font-semibold">(unknown)</strong>
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>Receiver’s IP address (already known)</span>
          </li>
        </ul>

        <div className="pt-2">
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed font-semibold">
            The Address Resolution Protocol maps the 32-bit IPv4 address to a 48-bit MAC address.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: PROCESS & INTERACTIVE STEPPER VISUALIZER */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Process
          </h2>
          <span className="sm:hidden inline-flex items-center gap-1.5 text-xs font-mono text-[#8A7059] bg-[#8A7059]/10 px-2.5 py-1 rounded-md w-fit">
            <span className="text-[13px]">⇄</span>
            <span>Swipe horizontally to view full simulation</span>
          </span>
        </div>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Consider an example where <strong className="text-[#232D2D]">Node A</strong> wants to send data to <strong className="text-[#00A3FF]">Node B</strong>. <strong className="text-[#232D2D]">Node A</strong> knows its own IP and MAC address as well as the IP address of <strong className="text-[#00A3FF]">Node B</strong>.
        </p>

        {/* Interactive Stepper Controller with Flow Arrows & Auto Play */}
        <div className="pt-4 pb-2">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-[#8A7059]/10 border border-[#8A7059]/30">
            {/* Stepper Buttons Flow */}
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
              {steps.map((step, idx) => {
                const isActive = currentStep === step.id;
                const isDone = currentStep > step.id;
                return (
                  <React.Fragment key={step.id}>
                    <button
                      type="button"
                      onClick={() => handleStepClick(step.id)}
                      className={`px-3 sm:px-4 py-2 rounded-md font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${isActive
                        ? 'bg-[#384545] text-[#F5F2EB] scale-102'
                        : isDone
                          ? 'bg-[#384545]/20 text-[#232D2D] hover:bg-[#384545]/30'
                          : 'bg-white/60 text-[#6E5844] hover:bg-white hover:text-[#232D2D]'
                        }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${isActive
                          ? 'bg-[#00A3FF] text-white'
                          : isDone
                            ? 'bg-[#384545] text-white'
                            : 'bg-black/10 text-[#6E5844]'
                          }`}
                      >
                        {step.id + 1}
                      </span>
                      <span>{step.label}</span>
                    </button>

                    {idx < steps.length - 1 && (
                      <span className="text-[#8A7059] font-bold text-sm hidden sm:inline-block px-0.5">
                        →
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Controls: Play/Pause & Reset */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-md font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${isPlaying
                  ? 'bg-[#C85A17] text-white shadow-sm'
                  : 'bg-[#8A7059] hover:bg-[#78604B] text-white shadow-sm'
                  }`}
              >
                <span>{isPlaying ? '⏸ Pause' : '▶ Auto Play'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(0);
                  setAnimKey((prev) => prev + 1);
                }}
                className="px-3 py-2 rounded-xl font-mono text-xs sm:text-sm text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5 transition-colors cursor-pointer"
                title="Reset to Start"
              >
                ↺ Reset
              </button>
            </div>
          </div>
        </div>

        {/* Interactive SVG Diagram Canvas (Crisp Vector Graphic Mirroring Slide) */}
        <div className="py-6 overflow-x-auto pb-4">
          <div className="min-w-[860px] w-full max-w-5xl mx-auto">
            <svg
              className="w-full h-auto text-[#232D2D] select-none"
              viewBox="0 0 920 490"
              fill="none"
            >
              {/* ========================================================== */}
              {/* TOP CACHE / ADDRESS STATE BLOCK */}
              {/* ========================================================== */}
              <rect
                x="200"
                y="15"
                width="520"
                height="125"
                rx="14"
                fill="#384545"
                stroke="#232D2D"
                strokeWidth="2"
                className="shadow-sm"
              />

              <g className="font-mono text-xs sm:text-sm fill-[#F5F2EB]">
                <text x="230" y="44" className="font-bold">
                  Node A - IP address :
                </text>
                <text x="430" y="44" className="font-semibold fill-[#A8B2B2]">
                  192.168.1.10
                </text>

                <text x="230" y="70" className="font-bold">
                  Node A - MAC address :
                </text>
                <text x="430" y="70" className="font-semibold fill-[#A8B2B2]">
                  00:1A:2B:3C:4D:5E
                </text>

                <text x="230" y="96" className="font-bold">
                  Node B - IP address :
                </text>
                <text x="430" y="96" className="font-bold fill-[#00A3FF]">
                  192.168.1.20
                </text>

                <text x="230" y="122" className="font-bold">
                  Node B - MAC address :
                </text>
                {currentStep === 3 ? (
                  <text
                    x="430"
                    y="122"
                    className="font-extrabold fill-[#34D399] tracking-wider"
                  >
                    70:85:C2:A1:B3:99 (Resolved)
                  </text>
                ) : (
                  <text x="430" y="122" className="italic font-normal fill-[#8A9595]">
                    (unknown — awaiting ARP Reply)
                  </text>
                )}
              </g>

              {/* ========================================================== */}
              {/* TOPOLOGY TRANSMISSION LINES */}
              {/* ========================================================== */}
              {/* Line A -> B */}
              <line
                x1="190"
                y1="310"
                x2="560"
                y2="215"
                stroke="#232D2D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Line A -> C */}
              <line
                x1="190"
                y1="310"
                x2="560"
                y2="310"
                stroke="#232D2D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Line A -> D */}
              <line
                x1="190"
                y1="310"
                x2="560"
                y2="405"
                stroke="#232D2D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* ========================================================== */}
              {/* NODE A (Sender - Warm Bronze #856b54) */}
              {/* ========================================================== */}
              <rect
                x="50"
                y="275"
                width="140"
                height="70"
                rx="10"
                fill="#856b54"
                strokeWidth="2"
              />
              <text
                x="120"
                y="312"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-sans font-bold text-base fill-[#F5F2EB]"
              >
                Node A
              </text>

              {/* ========================================================== */}
              {/* NODE B (Target - Dark Slate with Cyan text) */}
              {/* ========================================================== */}
              <rect
                x="560"
                y="180"
                width="140"
                height="70"
                rx="10"
                fill="#384545"
                strokeWidth={currentStep === 2 ? '3' : '2'}
                className={currentStep === 2 ? 'transition-all duration-300' : ''}
              />
              <text
                x="630"
                y="217"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-sans font-bold text-base fill-[#00A3FF]"
              >
                Node B
              </text>

              {/* ========================================================== */}
              {/* NODE C (Bystander - Dark Slate) */}
              {/* ========================================================== */}
              <rect
                x="560"
                y="275"
                width="140"
                height="70"
                rx="10"
                fill="#384545"
                strokeWidth="2"
              />
              <text
                x="630"
                y="312"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-sans font-bold text-base fill-[#F5F2EB]"
              >
                Node C
              </text>

              {/* ========================================================== */}
              {/* NODE D (Bystander - Dark Slate) */}
              {/* ========================================================== */}
              <rect
                x="560"
                y="370"
                width="140"
                height="70"
                rx="10"
                fill="#384545"
                strokeWidth="2"
              />
              <text
                x="630"
                y="407"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-sans font-bold text-base fill-[#F5F2EB]"
              >
                Node D
              </text>

              {/* ========================================================== */}
              {/* DYNAMIC PACKET ANIMATIONS & CALLOUTS */}
              {/* ========================================================== */}

              {/* STEP 1: Broadcast ARP Request Traveling Outward */}
              {currentStep === 1 && (
                <g>
                  {/* Packet along A -> B */}
                  <g key={`arp-b-${currentStep}-${animKey}`} className={styles.motionArpToB}>
                    <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    {/* Outward arrow tilted along wire */}
                    <g transform="translate(0, -25) rotate(-14.4)">
                      <line x1="-14" y1="0" x2="14" y2="0" stroke="#6E5844" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="10,-4 18,0 10,4" fill="#6E5844" />
                    </g>
                  </g>

                  {/* Packet along A -> C */}
                  <g key={`arp-c-${currentStep}-${animKey}`} className={styles.motionArpToC}>
                    <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    <g transform="translate(0, -25)">
                      <line x1="-14" y1="0" x2="14" y2="0" stroke="#6E5844" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="10,-4 18,0 10,4" fill="#6E5844" />
                    </g>
                  </g>

                  {/* Packet along A -> D */}
                  <g key={`arp-d-${currentStep}-${animKey}`} className={styles.motionArpToD}>
                    <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    <g transform="translate(0, -25) rotate(14.4)">
                      <line x1="-14" y1="0" x2="14" y2="0" stroke="#6E5844" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="10,-4 18,0 10,4" fill="#6E5844" />
                    </g>
                  </g>
                </g>
              )}

              {/* STEP 2: Process Packets (Node B matches; Nodes C & D discard) */}
              {currentStep === 2 && (
                <g>
                  {/* Node B Match Indicator */}
                  <text
                    x="720"
                    y="222"
                    className="font-sans font-bold text-sm sm:text-base fill-[#15803D]"
                  >
                    Address match
                  </text>

                  {/* Node C Discard */}
                  <g>
                    <text
                      x="720"
                      y="280"
                      className="font-sans font-bold text-xs sm:text-sm fill-[#232D2D]"
                    >
                      Address not a match
                    </text>
                    <path d="M 720 292 L 760 292" stroke="#6E5844" strokeWidth="2" strokeLinecap="round" />
                    <polygon points="756,289 763,292 756,295" fill="#6E5844" />
                    <g key={`discard-c-${currentStep}-${animKey}`} className={styles.motionArpDiscardC}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    </g>
                  </g>

                  {/* Node D Discard */}
                  <g>
                    <text
                      x="720"
                      y="375"
                      className="font-sans font-bold text-xs sm:text-sm fill-[#232D2D]"
                    >
                      Address not a match
                    </text>
                    <path d="M 720 387 L 760 387" stroke="#6E5844" strokeWidth="2" strokeLinecap="round" />
                    <polygon points="756,384 763,387 756,390" fill="#6E5844" />
                    <g key={`discard-d-${currentStep}-${animKey}`} className={styles.motionArpDiscardD}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    </g>
                  </g>
                </g>
              )}

              {/* STEP 3: Unicast Response (Green Packet Traveling B -> A) */}
              {currentStep === 3 && (
                <g>
                  {/* Green Packet traveling backward along B -> A line */}
                  <g key={`arp-return-${currentStep}-${animKey}`} className={styles.motionArpReturn}>
                    <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#15803D" stroke="#232D2D" strokeWidth="1.5" />
                    {/* Backward arrow pointing toward Node A along wire */}
                    <g transform="translate(0, -25) rotate(-14.4)">
                      <line x1="14" y1="0" x2="-14" y2="0" stroke="#6E5844" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="-10,-4 -18,0 -10,4" fill="#6E5844" />
                    </g>
                  </g>
                </g>
              )}

              {/* Disclaimer in Green Font (Matching User's Slide) */}
              <text
                x="460"
                y="475"
                textAnchor="middle"
                className="font-sans font-bold text-xs sm:text-sm fill-[#15803D]"
              >
                For visualization purposes only
              </text>
            </svg>
          </div>
        </div>

        {/* Process Explanatory Text (Verbatim from User Notes) */}
        <div className="pt-4 space-y-4 text-base sm:text-lg text-[#283535] leading-relaxed">
          <p>
            First <strong className="text-[#232D2D]">Node A</strong> broadcasts a packet (an <strong className="text-[#C85A17]">ARP request</strong>) to the entire network, containing the IP address of <strong className="text-[#00A3FF]">Node B</strong> as well as its own IP and MAC address.
          </p>
          <p>
            All the nodes in the network receive a copy of the packet. Each node checks if the address on the packet matches their own, and if it doesn't, it silently discards it.
          </p>
          <p>
            When <strong className="text-[#00A3FF]">Node B</strong> receives the packet, its address will match. <strong className="text-[#00A3FF]">Node B</strong> then sends a unicast response back to <strong className="text-[#232D2D]">Node A</strong> containing its MAC address.
          </p>
          <p>
            <strong className="text-[#232D2D]">Node A</strong> receives the response, saves the IP-to-MAC reference in its cache, and then proceeds to transmit the actual data.
          </p>
        </div>
      </section>
    </NetworkPageLayout>
  );
}

