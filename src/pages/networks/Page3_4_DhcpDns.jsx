import React, { useState, useEffect, useRef } from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';
import styles from './Page3_4_DhcpDns.module.css';

export default function Page3_4_DhcpDns({ onBackToIndex, onNavigatePage }) {
  // Step state:
  // 0: DHCPDISCOVER
  // 1: DHCPOFFER
  // 2: DHCPREQUEST
  // 3: DHCPACK
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  const dnsRecords = [
    {
      type: 'A',
      label: 'A Record',
      definition: 'Translates a domain name to an IPv4 address.',
      sampleDomain: 'example.com',
      arrow: '→',
      resolvedValue: '93.184.216.34',
      format: '32-bit IPv4 Address',
    },
    {
      type: 'AAAA',
      label: 'AAAA Record',
      definition: 'Translates a domain name to a 128-bit IPv6 address.',
      sampleDomain: 'example.com',
      arrow: '→',
      resolvedValue: '2606:2800:220::1',
      format: '128-bit IPv6 Address',
    },
    {
      type: 'CNAME',
      label: 'CNAME',
      definition: 'Used for aliases.',
      sampleDomain: 'www.example.com',
      arrow: '→',
      resolvedValue: 'example.com',
      format: 'Canonical Alias Name',
    },
    {
      type: 'MX',
      label: 'MX Record',
      definition: 'Mail Exchanger',
      sampleDomain: 'example.com',
      arrow: '→',
      resolvedValue: 'mail.example.com',
      format: 'Mail Exchange Server',
    },
  ];

  // Auto-play timer loop (advances every 4.4s to match relaxed animation cadence)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));
        setAnimKey((prev) => prev + 1);
      }, 4400);
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
    {
      id: 0,
      label: 'DHCPDISCOVER',
      letter: 'D',
      desc: 'Client broadcasts looking for active servers',
    },
    {
      id: 1,
      label: 'DHCPOFFER',
      letter: 'O',
      desc: 'Servers respond with offers',
    },
    {
      id: 2,
      label: 'DHCPREQUEST',
      letter: 'R',
      desc: 'Client selects Server A and broadcasts request',
    },
    {
      id: 3,
      label: 'DHCPACK',
      letter: 'A',
      desc: 'Chosen Server A officially confirms the IP lease',
    },
  ];

  return (
    <NetworkPageLayout
      pageId="3-4-dhcp-dns"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* ============================================================== */}
      {/* SECTION 1: CORE THEORY & D-O-R-A PROCESS                      */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Dynamic Host Configuration Protocol (DHCP)
        </h2>

        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          DHCP is used for dynamic address allocation using the <strong className="text-[#8A7059]">D → O → R → A</strong> process :
        </p>

        <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed font-mono">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span><strong className="text-[#C85A17]">DHCPDISCOVER</strong></span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span><strong className="text-[#15803D]">DHCPOFFER</strong></span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span><strong className="text-[#00A3FF]">DHCPREQUEST</strong></span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span><strong className="text-[#15803D]">DHCPACK</strong></span>
          </li>
        </ul>
      </section>

      {/* ============================================================== */}
      {/* DETAILED NOTES & STEP-BY-STEP EXPLANATION                      */}
      {/* ============================================================== */}
      <div className="pt-6 space-y-8 text-base sm:text-lg text-[#283535] leading-relaxed">
        {/* Step 1 Explanatory Card */}
        <div className="p-6 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/20 space-y-2">
          <h4 className="text-xl font-bold text-[#232D2D] flex items-center gap-2">
            <span className="text-[#C85A17]">DHCPDISCOVER</span>
          </h4>
          <p>
            The client sends a broadcast message looking for an active DHCP server.
          </p>
        </div>

        {/* Step 2 Explanatory Card */}
        <div className="p-6 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/20 space-y-3">
          <h4 className="text-xl font-bold text-[#232D2D] flex items-center gap-2">
            <span className="text-[#15803D]">DHCPOFFER</span>
          </h4>
          <p>
            If there is an active DHCP server, it sends a broadcast response containing details like IP address, subnet mask, gateway, DNS, and lease time.
          </p>
          <ul className="space-y-1.5 pl-2 list-none text-base">
            <li className="flex items-start gap-2">
              <span className="text-[#8A7059] font-bold">•</span>
              <span><strong className="text-[#232D2D]">Lease time :</strong> The amount of time a client gets to use the IP address.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Multiple active servers can send their offers to the client.</span>
            </li>
          </ul>
        </div>

        {/* Step 3 Explanatory Card */}
        <div className="p-6 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/20 space-y-3">
          <h4 className="text-xl font-bold text-[#232D2D] flex items-center gap-2">
            <span className="text-[#00A3FF]">DHCPREQUEST</span>
          </h4>
          <p>
            The client chooses the best offer (usually the first one) and sends another broadcast message serving two purposes :
          </p>
          <ul className="space-y-1.5 pl-2 list-none text-base">
            <li className="flex items-start gap-2">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>To tell the other servers to withdraw their offers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Sends a confirmation to the chosen server.</span>
            </li>
          </ul>
        </div>

        {/* Step 4 Explanatory Card */}
        <div className="p-6 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/20 space-y-2">
          <h4 className="text-xl font-bold text-[#232D2D] flex items-center gap-2">
            <span className="text-[#15803D]">DHCPACK</span>
          </h4>
          <p>
            The chosen server sends back a broadcast acknowledgement confirming the connection.
          </p>
        </div>
      </div>


      {/* ============================================================== */}
      {/* SECTION 2: INTERACTIVE D-O-R-A STEPPER VISUALIZER             */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Interactive D-O-R-A Visualizer
        </h3>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Step through the four phases of dynamic address assignment.
        </p>

        {/* ============================================================== */}
        {/* UNIFIED SIDE-BY-SIDE DASHBOARD (Zero-Scroll Viewport)          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          {/* LEFT COLUMN: Vertical Stepper Controller & Playback (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-xl bg-[#8A7059]/10 border border-[#8A7059]/30 space-y-3">
              {/* Vertical Step Buttons Stack */}
              <div className="space-y-5">
                {steps.map((step) => {
                  const isActive = currentStep === step.id;
                  const isDone = currentStep > step.id;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleStepClick(step.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${isActive
                        ? 'bg-[#384545] text-[#F5F2EB]'
                        : isDone
                          ? 'bg-[#EAE5DA]/70 hover:bg-[#EAE5DA] text-[#232D2D] border-[#8A7059]/30'
                          : 'bg-white/70 hover:bg-white text-[#6E5844] border-black/10'
                        }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${isActive
                          ? 'bg-[#00A3FF] text-[#232D2D]'
                          : isDone
                            ? 'bg-[#384545] text-white'
                            : 'bg-black/10 text-[#6E5844]'
                          }`}
                      >
                        {step.letter}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-xs sm:text-sm font-bold tracking-tight truncate">
                          {step.label}
                        </div>
                        <div
                          className={`text-[11px] truncate font-bold ${isActive ? 'text-white/100' : 'text-[#6E5844]'
                            }`}
                        >
                          {step.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#8A7059]/20">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex-1 py-2 px-3 rounded-md font-mono text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${isPlaying
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
                  className="py-2 px-3 rounded-md font-mono text-xs sm:text-sm text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5 border border-[#8A7059]/30 transition-colors cursor-pointer"
                  title="Reset to DHCPDISCOVER"
                >
                  ↺ Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: In-Flight Inspector + Diagram (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Dynamic In-Flight Packet Inspector Card */}
            <div
              className={`p-4 sm:p-5 rounded-xl border transition-colors duration-500 shadow-md ${currentStep === 1 || currentStep === 3
                ? 'bg-[#856b54] text-[#F5F2EB] border-[#6E5844]'
                : 'bg-[#384545] text-[#F5F2EB] border-[#232D2D]'
                }`}
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/15">
                <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase font-bold text-white/100">
                  {steps[currentStep].label}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[12px] font-bold tracking-wide uppercase $`}
                >
                  {currentStep === 0 && 'Sender: Client (Broadcast)'}
                  {currentStep === 1 && 'Sender: Server A (Offer)'}
                  {currentStep === 2 && 'Sender: Client (Selecting A)'}
                  {currentStep === 3 && 'Sender: Server A (Final ACK)'}
                </span>
              </div>

              {/* Packet Header Fields Grid */}
              <div className="font-mono text-xs sm:text-sm space-y-2">
                {/* Row 1: Source & Destination IP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  <div>
                    <span className="font-bold text-white/70">Source Address : </span>
                    <span className="font-bold">
                      {currentStep === 0 && '0.0.0.0 (Unconfigured)'}
                      {currentStep === 1 && '192.168.1.1 (Server A)'}
                      {currentStep === 2 && '0.0.0.0 (Awaiting ACK)'}
                      {currentStep === 3 && '192.168.1.1 (Server A)'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-white/70">Destination Address : </span>
                    <span className="font-bold">255.255.255.255</span>
                  </div>
                </div>

                {/* Row 2: UDP Ports */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  <div>
                    <span className="font-bold text-white/70">Source Port Number : </span>
                    <span className="font-bold">
                      {currentStep === 0 || currentStep === 2 ? '68 (Client)' : '67 (Server)'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-white/70">Destination Port Number : </span>
                    <span className="font-bold">
                      {currentStep === 0 || currentStep === 2 ? '67 (Server)' : '68 (Client)'}
                    </span>
                  </div>
                </div>

                {/* Row 3: Offered / Requested Address */}
                <div className="pt-2 border-t border-white/10">
                  <span
                    className={`font-bold ${currentStep === 1 || currentStep === 3
                      ? 'text-black'
                      : 'text-[#34D399]'
                      }`}
                  >
                    {currentStep === 1 || currentStep === 3
                      ? 'Your Address (offered IP) : '
                      : 'Client Address (requested IP) : '}
                  </span>
                  <span className="font-extrabold text-white">
                    {currentStep === 0 && '(pending server offer)'}
                    {currentStep === 1 && '192.168.1.100 (Server A)'}
                    {currentStep === 2 && '192.168.1.100 (Requesting Server A)'}
                    {currentStep === 3 && '192.168.1.100 (Officially Leased)'}
                  </span>
                </div>

                {/* Row 4: Lease Time */}
                <div>
                  <span
                    className={`font-bold ${currentStep === 1 || currentStep === 3
                      ? 'text-black'
                      : 'text-[#34D399]'
                      }`}
                  >
                    Lease Time :{' '}
                  </span>
                  <span className="font-bold">
                    {currentStep === 0 ? '(empty)' : '3600 seconds (1 hour)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive SVG Diagram Canvas (Crisp Responsive Vector Graphic) */}
            <div className="rounded-xl border border-[#8A7059]/25 bg-[#FAF8F5] p-3 sm:p-4 shadow-sm overflow-hidden">
              <svg
                className="w-full h-auto text-[#232D2D] select-none"
                viewBox="0 0 960 440"
                fill="none"
              >
                {/* ========================================================== */}
                {/* TRANSMISSION WIRES                                         */}
                {/* ========================================================== */}
                {/* Wire 1: Client -> Switch */}
                <line
                  x1="190"
                  y1="240"
                  x2="380"
                  y2="240"
                  stroke="#232D2D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Wire 2: Switch -> Server A */}
                <line
                  x1="510"
                  y1="240"
                  x2="720"
                  y2="142"
                  stroke="#232D2D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Wire 3: Switch -> Server B */}
                <line
                  x1="510"
                  y1="240"
                  x2="720"
                  y2="240"
                  stroke="#232D2D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Wire 4: Switch -> Server C */}
                <line
                  x1="510"
                  y1="240"
                  x2="720"
                  y2="338"
                  stroke="#232D2D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* ========================================================== */}
                {/* NODES                                                      */}
                {/* ========================================================== */}

                {/* CLIENT (Warm Bronze #856b54) */}
                <rect
                  x="50"
                  y="205"
                  width="140"
                  height="70"
                  rx="10"
                  fill="#856b54"
                  stroke="#232D2D"
                  strokeWidth="2"
                />
                <text
                  x="120"
                  y="242"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-sans font-bold text-base fill-[#F5F2EB]"
                >
                  Client
                </text>

                {/* CENTRAL SWITCH (Muted Slate Teal #5B7B7A) */}
                <rect
                  x="380"
                  y="210"
                  width="130"
                  height="60"
                  rx="10"
                  fill="#5B7B7A"
                  stroke="#232D2D"
                  strokeWidth="2"
                />
                <text
                  x="445"
                  y="242"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-sans font-bold text-base fill-[#F5F2EB]"
                >
                  Switch
                </text>

                {/* SERVER A (Chosen server: Dark Slate normally, Cyan #00A3FF when chosen!) */}
                <rect
                  x="720"
                  y="110"
                  width="155"
                  height="65"
                  rx="10"
                  fill={currentStep >= 2 ? '#00A3FF' : '#384545'}
                  stroke="#232D2D"
                  strokeWidth="2"
                  className="transition-colors duration-500"
                />
                <text
                  x="797"
                  y="144"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`font-sans font-bold text-sm ${currentStep >= 2 ? 'fill-[#232D2D]' : 'fill-[#F5F2EB]'
                    }`}
                >
                  {currentStep >= 2 ? 'Server A' : 'Server A (Free)'}
                </text>

                {/* SERVER B (Competitor: Releases offer on Step 3) */}
                <rect
                  x="720"
                  y="208"
                  width="155"
                  height="65"
                  rx="10"
                  fill="#384545"
                  stroke="#232D2D"
                  strokeWidth="2"
                />
                <text
                  x="797"
                  y="242"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-sans font-bold text-sm fill-[#F5F2EB]"
                >
                  {currentStep >= 2 ? 'Server B (Released)' : 'Server B (Free)'}
                </text>

                {/* SERVER C (Occupied: No pool) */}
                <rect
                  x="720"
                  y="305"
                  width="155"
                  height="65"
                  rx="10"
                  fill="#384545"
                  stroke="#232D2D"
                  strokeWidth="2"
                />
                <text
                  x="797"
                  y="331"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-sans font-bold text-sm fill-[#F5F2EB]"
                >
                  Server C
                </text>
                <text
                  x="797"
                  y="351"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-sans text-xs fill-[#A8B2B2]"
                >
                  (Occupied)
                </text>

                {/* ========================================================== */}
                {/* DYNAMIC PACKET ANIMATIONS                                  */}
                {/* ========================================================== */}

                {/* STEP 1: DHCPDISCOVER (Orange broadcast Client -> Switch -> Servers) */}
                {currentStep === 0 && (
                  <g>
                    {/* Packet 1: Client to Switch */}
                    <g key={`disc-1-${animKey}`} className={styles.animDiscover1}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    </g>

                    {/* Packet 2: Switch to Server A */}
                    <g key={`disc-2a-${animKey}`} className={styles.animDiscover2A}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    </g>

                    {/* Packet 3: Switch to Server B */}
                    <g key={`disc-2b-${animKey}`} className={styles.animDiscover2B}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    </g>

                    {/* Packet 4: Switch to Server C */}
                    <g key={`disc-2c-${animKey}`} className={styles.animDiscover2C}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#C85A17" stroke="#232D2D" strokeWidth="1.5" />
                    </g>
                  </g>
                )}

                {/* STEP 2: DHCPOFFER (Green packets Servers A & B -> Switch -> Client) */}
                {currentStep === 1 && (
                  <g>
                    {/* Server A to Switch */}
                    <g key={`offer-sa-${animKey}`} className={styles.animOfferServerA}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#15803D" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-white">A</text>
                    </g>

                    {/* Server B to Switch */}
                    <g key={`offer-sb-${animKey}`} className={styles.animOfferServerB}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#15803D" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-white">B</text>
                    </g>

                    {/* Switch to Client: Offer A leads */}
                    <g key={`offer-ca-${animKey}`} className={styles.animOfferClientA}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#15803D" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-white">A</text>
                    </g>

                    {/* Switch to Client: Offer B follows in tandem */}
                    <g key={`offer-cb-${animKey}`} className={styles.animOfferClientB}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#15803D" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-white">B</text>
                    </g>
                  </g>
                )}

                {/* STEP 3: DHCPREQUEST (Cyan packets "A" Client -> Switch -> Servers) */}
                {currentStep === 2 && (
                  <g>
                    {/* Client to Switch */}
                    <g key={`req-1-${animKey}`} className={styles.animRequest1}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#00A3FF" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-[#232D2D]">A</text>
                    </g>

                    {/* Switch to Server A */}
                    <g key={`req-2a-${animKey}`} className={styles.animRequest2A}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#00A3FF" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-[#232D2D]">A</text>
                    </g>

                    {/* Switch to Server B */}
                    <g key={`req-2b-${animKey}`} className={styles.animRequest2B}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#00A3FF" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-[#232D2D]">A</text>
                    </g>

                    {/* Switch to Server C */}
                    <g key={`req-2c-${animKey}`} className={styles.animRequest2C}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#00A3FF" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-[#232D2D]">A</text>
                    </g>
                  </g>
                )}

                {/* STEP 4: DHCPACK (Green packet "A" Server A -> Switch -> Client) */}
                {currentStep === 3 && (
                  <g>
                    {/* Server A to Switch */}
                    <g key={`ack-1-${animKey}`} className={styles.animAck1}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#15803D" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-white">A</text>
                    </g>

                    {/* Switch to Client */}
                    <g key={`ack-2-${animKey}`} className={styles.animAck2}>
                      <rect x="-17" y="-17" width="34" height="34" rx="4" fill="#15803D" stroke="#232D2D" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" className="font-bold font-sans text-xs fill-white">A</text>
                    </g>
                  </g>
                )}

                {/* Disclaimer in Green Font (Matching User's Slide) */}
                <text
                  x="480"
                  y="420"
                  textAnchor="middle"
                  className="font-sans font-bold text-xs sm:text-sm fill-[#15803D]"
                >
                  For visualization purpose only
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: LEASE RENEWAL & REBINDING TIMERS (NOTE)             */}
      {/* ============================================================== */}
      <section className="mt-16 pt-10 border-t border-[#8A7059]/25 space-y-4">
        <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#232D2D]">
          Note
        </h4>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          When 50% of the lease time is complete, the client will send a unicast request to the chosen server to renew the lease time.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          If the server does not respond within 87.5% of the lease time, the client will send a broadcast message looking for other active servers.
        </p>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: DOMAIN NAME SYSTEM (DNS)                           */}
      {/* ============================================================== */}
      <section className="mt-20 pt-12 border-t border-[#8A7059]/25 space-y-7">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8A7059] font-semibold block mb-2">
            Protocol 02
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Domain Name System (DNS)
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#283535] leading-relaxed max-w-4xl">
          The internet’s phonebook. It translates human-readable names into their respective machine-readable IP addresses.
        </p>

        <div>
          <p className="text-base sm:text-lg font-semibold text-[#8A7059] font-mono mb-4">
            A few examples include :
          </p>

          {/* Record Cards Grid with Embedded Examples as Normal Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dnsRecords.map((rec) => (
              <div
                key={rec.type}
                className="bg-white/70 border border-[#8A7059]/25 hover:border-[#8A7059]/60 hover:bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#232D2D] mb-2">
                    {rec.label}
                  </h4>

                  <p className="text-sm sm:text-[14.5px] text-[#283535] leading-relaxed">
                    {rec.definition}
                  </p>
                </div>

                {/* Example rendered as normal text */}
                <div className="mt-5 pt-3.5 border-t border-[#8A7059]/15">
                  <div className="font-mono text-xs sm:text-[13px] flex items-center justify-between gap-1.5 text-[#283535]">
                    <span className="text-[#6E5844] truncate">{rec.sampleDomain}</span>
                    <span className="text-[#8A7059] font-bold shrink-0">→</span>
                    <span className="font-semibold text-[#232D2D] truncate">{rec.resolvedValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </NetworkPageLayout>
  );
}

