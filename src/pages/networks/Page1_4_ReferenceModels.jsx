import React, { useState, useEffect } from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page1_4_ReferenceModels({ onBackToIndex, onNavigatePage }) {
  const [activeLayerId, setActiveLayerId] = useState('application');
  const [animating, setAnimating] = useState(false);

  // Independent simulation states for TCP and UDP
  const [tcpSimulating, setTcpSimulating] = useState(false);
  const [tcpProgress, setTcpProgress] = useState(0);

  const [udpSimulating, setUdpSimulating] = useState(false);
  const [udpProgress, setUdpProgress] = useState(0);

  // TCP Animation loop (6.0 seconds for deliberate, observable sequential flow)
  useEffect(() => {
    let animFrame;
    if (tcpSimulating) {
      const startTime = performance.now();
      const duration = 6000;
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setTcpProgress(progress);
        if (progress < 1) {
          animFrame = requestAnimationFrame(animate);
        } else {
          setTcpSimulating(false);
        }
      };
      animFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [tcpSimulating]);

  // UDP Animation loop (5.5 seconds for distinct path traversal & overtake)
  useEffect(() => {
    let animFrame;
    if (udpSimulating) {
      const startTime = performance.now();
      const duration = 5500;
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setUdpProgress(progress);
        if (progress < 1) {
          animFrame = requestAnimationFrame(animate);
        } else {
          setUdpSimulating(false);
        }
      };
      animFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [udpSimulating]);

  // Encapsulation and Decapsulation animation state
  const [encapProgress, setEncapProgress] = useState(4); // 0 to 4 (default 4: full diagram visible)
  const [decapProgress, setDecapProgress] = useState(0); // 0 to 4 (decapsulation step tracking)
  const [encapMode, setEncapMode] = useState('idle'); // 'idle' | 'encapsulating' | 'decapsulating'

  useEffect(() => {
    let animFrame;
    if (encapMode === 'encapsulating') {
      const startTime = performance.now();
      const startP = encapProgress === 4 ? 0 : encapProgress;
      const duration = (4 - startP) * 3200; // 3.2s per row transition (movement + assembly + dwell hold)
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const p = Math.min(startP + (elapsed / duration) * (4 - startP), 4);
        setEncapProgress(p);
        if (p < 4) {
          animFrame = requestAnimationFrame(animate);
        } else {
          setEncapMode('idle');
        }
      };
      animFrame = requestAnimationFrame(animate);
    } else if (encapMode === 'decapsulating') {
      const startTime = performance.now();
      const startP = decapProgress === 4 ? 0 : decapProgress;
      const duration = (4 - startP) * 3200; // 3.2s per layer ascent (movement + header expansion + dwell hold)
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const p = Math.min(startP + (elapsed / duration) * (4 - startP), 4);
        setDecapProgress(p);
        if (p < 4) {
          animFrame = requestAnimationFrame(animate);
        } else {
          setEncapMode('idle');
        }
      };
      animFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [encapMode]);

  const handleStartEncapsulation = () => {
    setEncapMode('idle');
    setDecapProgress(0);
    setEncapProgress(0);
    setTimeout(() => {
      setEncapMode('encapsulating');
    }, 50);
  };

  const handleStartDecapsulation = () => {
    setEncapMode('idle');
    setEncapProgress(0);
    setDecapProgress(0);
    setTimeout(() => {
      setEncapMode('decapsulating');
    }, 50);
  };

  const handleResetEncap = () => {
    setEncapMode('idle');
    setEncapProgress(4);
    setDecapProgress(0);
  };

  const handleStartTcp = () => {
    setTcpProgress(0);
    setTcpSimulating(true);
  };

  const handleStartUdp = () => {
    setUdpProgress(0);
    setUdpSimulating(true);
  };

  // Helper for TCP packet coordinates (in-order sequential transmission along single channel)
  const getTcpPacketPos = (pktIndex) => {
    // Queue slots at Source: 3 at x=70, 2 at x=115, 1 at x=160
    const startX = pktIndex === 1 ? 160 : pktIndex === 2 ? 115 : 70;
    // Destination arrived slots (in-order: 3, 2, 1): 3 at x=700, 2 at x=745, 1 at x=790
    const endX = pktIndex === 1 ? 790 : pktIndex === 2 ? 745 : 700;

    // Time slots for sequential transmission
    const startP = pktIndex === 1 ? 0.05 : pktIndex === 2 ? 0.36 : 0.67;
    const endP = startP + 0.28;

    if (tcpProgress <= startP) return { x: startX, y: 122 };
    if (tcpProgress >= endP) return { x: endX, y: 122 };

    const u = (tcpProgress - startP) / 0.28;

    // Follow the conduit: horizontal to 200, up to 48, across to 660, down to 122, right to endX
    if (u < 0.10) {
      // Horizontal move into channel intake
      const sub = u / 0.10;
      return { x: startX + sub * (200 - startX), y: 122 };
    } else if (u < 0.25) {
      // Ascend vertically into main conduit
      const sub = (u - 0.10) / 0.15;
      return { x: 200, y: 122 - sub * (122 - 48) };
    } else if (u < 0.75) {
      // Glide horizontally across dedicated channel
      const sub = (u - 0.25) / 0.50;
      return { x: 200 + sub * (660 - 200), y: 48 };
    } else if (u < 0.90) {
      // Descend vertically into destination intake
      const sub = (u - 0.75) / 0.15;
      return { x: 660, y: 48 + sub * (122 - 48) };
    } else {
      // Settle into destination queue slot
      const sub = (u - 0.90) / 0.10;
      return { x: 660 + sub * (endX - 660), y: 122 };
    }
  };

  // Helper for UDP packet coordinates (divergent routes & out-of-order arrival: 2 arrives first, then 1, then 3)
  const getUdpPacketPos = (pktIndex) => {
    // Initial Source queue: 3 at x=70, 2 at x=115, 1 at x=160
    const startX = pktIndex === 1 ? 160 : pktIndex === 2 ? 115 : 70;
    // Destination arrival order: 2 arrives first (x=700), 1 second (x=745), 3 last (x=790)
    const endX = pktIndex === 2 ? 700 : pktIndex === 1 ? 745 : 790;

    // Route heights and start/finish timings
    // Packet 2: Express low-hop route (y=100) -> fastest transit
    // Packet 1: Standard route (y=66) -> medium transit
    // Packet 3: Congested multi-hop route (y=140) -> slowest transit
    const pathY = pktIndex === 2 ? 100 : pktIndex === 1 ? 66 : 140;
    const startP = pktIndex === 2 ? 0.05 : pktIndex === 1 ? 0.08 : 0.12;
    const endP = pktIndex === 2 ? 0.44 : pktIndex === 1 ? 0.72 : 0.96;

    if (udpProgress <= startP) return { x: startX, y: 142 };
    if (udpProgress >= endP) return { x: endX, y: 142 };

    const u = (udpProgress - startP) / (endP - startP);

    if (u < 0.18) {
      // Feeder ramp from source queue to intermediate route entry
      const sub = u / 0.18;
      const x = startX + sub * (250 - startX);
      const y = 142 + sub * (pathY - 142);
      return { x, y };
    } else if (u < 0.82) {
      // Intermediate route transit across network hops
      const sub = (u - 0.18) / 0.64;
      return { x: 250 + sub * (610 - 250), y: pathY };
    } else {
      // Collector ramp from intermediate route into destination queue
      const sub = (u - 0.82) / 0.18;
      const x = 610 + sub * (endX - 610);
      const y = pathY + sub * (142 - pathY);
      return { x, y };
    }
  };

  const handleSelectLayer = (id) => {
    if (id === activeLayerId) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveLayerId(id);
      setAnimating(false);
    }, 50);
  };

  const layers = [
    {
      id: 'application',
      number: 'Layer 07',
      name: 'Application Layer',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                This layer creates an interface and provides all these network services to the end-user applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <div>
                <span>Some protocols used include :</span>
                <ul className="mt-3 space-y-2 pl-4 list-none text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">HTTP</strong> (Hyper Text Transfer Protocol)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">HTTPS</strong> (Hyper Text Transfer Protocol Secure)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">DNS</strong> (Domain Name System)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">FTP</strong> (File Transfer Protocol)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">SMTP</strong> (Simple Mail Transfer Protocol)</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'presentation',
      number: 'Layer 06',
      name: 'Presentation Layer',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                The presentation layer is responsible for structuring the data in a format that the application layer can understand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Encryption / Decryption :</strong> It encrypts data at the sender’s end and decrypts it at the receiver’s end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Compression / Decompression :</strong> It compresses data at the sender’s end and decompresses it at the receiver’s end.
              </span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'session',
      number: 'Layer 05',
      name: 'Session Layer',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Responsible for creating, managing, and terminating sessions between applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <div>
                <span>
                  It also adds checkpoints to the data being exchanged so that transmission can smoothly resume in case the session gets interrupted.
                </span>
                <ul className="mt-3 space-y-2 pl-4 list-none text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span>It sets up a session between two applications.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span>Data exchange takes place between the two applications.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span>Continues to manage the session as the transmission happens and adds checkpoints.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span>Once the data exchange process is complete, it terminates the session.</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Why add checkpoints :</strong> When a session is interrupted, if checkpoints aren’t added to the data being exchanged, when the session resumes, the entire data would have to be transmitted all over again. With checkpoints, it can immediately pick up the transmission process from where it got interrupted.
              </span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'transport',
      number: 'Layer 04',
      name: 'Transport Layer',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                The Transport Layer also handles communication between the source and the destination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                It encapsulates the message from the application into a datagram (UDP) or a segment (TCP) at the source host, and sends it to the Transport Layer of the destination host which decapsulates it and sends the message to the application layer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                It can either use <strong>Transmission Control Protocol (TCP)</strong>, which is a connection-oriented protocol, or <strong>User Datagram Protocol (UDP)</strong> which is a connectionless protocol.
              </span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'network',
      number: 'Layer 03',
      name: 'Network Layer',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                This layer establishes a logical end-to-end connection between the source and the destination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <div>
                <span>The main protocol used is the IP (Internet Protocol) :</span>
                <ul className="mt-3 space-y-2 pl-4 list-none text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span>Defines the structure and format of the datagram and addresses.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span>Responsible for routing the datagram from the source to the destination, with each router forwarding the packet to the next router in its path.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span>Connectionless protocol with no error, flow or congestion control.</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <div>
                <span>Other protocols include :</span>
                <ul className="mt-3 space-y-2.5 pl-4 list-none text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">ICMP :</strong> Internet Control Message Protocol – Helps IP with reporting errors during transmission</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">IGMP :</strong> Internet Group Management Protocol – Helps IP with multitasking</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">DHCP :</strong> Dynamic Host Configuration Protocol – Helps IP get the network-layer address</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">ARP :</strong> Address Resolution Protocol – Helps IP get the link-layer address using the network-layer address</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'data-link',
      number: 'Layer 02',
      name: 'Data Link Layer',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                This layer is responsible for node-to-node communication.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Data Link Layer encapsulates the datagram coming from the Network Layer into a frame and passes it down to the Physical Layer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                The internet is made up of thousands of interconnected networks which creates millions of different pathways that a data frame can take to move from one node to another.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                A router is responsible for choosing the best possible route that a data frame can take to move from one node to the next.
              </span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'physical',
      number: 'Layer 01',
      name: 'Physical Layer',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                The physical layer is responsible for the transmission of raw bits. Below the physical layer lies the physical transmission media that actually transmits the data in the form of signals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                The Physical Layer receives the data frame from the Data Link Layer, converts it to electric or optical signals, and passes it to the transmission media.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Even though transmission takes place in the form of signals, the general practice is to take bits as the logical unit of the physical layer.
              </span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const currentLayer = layers.find((l) => l.id === activeLayerId) || layers[0];

  return (
    <NetworkPageLayout
      pageId="1-4-reference-models"
      subtitle="The 7-layer architecture, end-to-end abstractions, and protocol stack hierarchies."
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
        ISO/OSI 7-Layer Model
      </h2>
      {/* Interactive 7-Layer Model Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
        {/* Left Column: The 7-Layer Stack */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <span className="text-sm sm:text-base font-bold tracking-wide text-[#232D2D] mb-1.5 pl-1">
            Click to explore each layer
          </span>
          {layers.map((layer) => {
            const isActive = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => handleSelectLayer(layer.id)}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 relative flex items-center justify-center select-none shadow-sm ${isActive
                  ? 'bg-[#8A7059] text-[#FAF8F5] shadow-md ring-2 ring-[#8A7059]/40 scale-[1.02]'
                  : 'bg-[#384545] text-[#FAF8F5]/90 hover:bg-[#2C3737] hover:text-white'
                  }`}
              >
                <span className="absolute left-5 font-mono text-xs opacity-75 hidden sm:inline-block">
                  {layer.number}
                </span>
                <span className="font-medium text-center">{layer.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Animated Explanation Card */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/25 shadow-sm min-h-[460px] flex flex-col justify-start">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#8A7059]/20">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232D2D]">
                {currentLayer.name}
              </h2>
              <span className="font-mono text-sm sm:text-base font-bold text-[#232D2D]">
                {currentLayer.number}
              </span>
            </div>

            {/* Animated Content Body */}
            <div
              className={`transition-all duration-300 ease-out transform ${animating
                ? 'opacity-0 translate-y-2'
                : 'opacity-100 translate-y-0'
                }`}
            >
              {currentLayer.renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ISO/OSI TO TCP/IP PROTOCOL SUITE MAPPING */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#8A7059]/25 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          ISO/OSI vs. TCP/IP Protocol Suite
        </h2>

        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          The ISO/OSI 7-Layer model is purely a theoretical model. The real-world internet runs on the TCP/IP Protocol Suite. The bottom four layers (Physical, Data Link, Network and Transport) are the exact same as the ISO/OSI model, but it combines the Session, Presentation and Application layers of the ISO/OSI model into a single Application Layer.
        </p>

        {/* Side-by-Side Model Comparison Diagram */}
        <div className="my-8 p-4 sm:p-10 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 shadow-sm flex flex-col items-center">
          <span className="sm:hidden font-mono text-[11px] text-[#8A7059] tracking-wider uppercase mb-2 self-start">
            ← Scroll horizontally to explore →
          </span>
          <div className="overflow-x-auto w-full py-2">
            <svg viewBox="0 0 920 540" className="w-full min-w-[640px] max-w-[860px] mx-auto h-auto select-none font-sans">
            {/* Column Headers */}
            <text x="210" y="32" textAnchor="middle" fill="#384545" fontSize="14" fontWeight="700" letterSpacing="0.05em">
              ISO / OSI MODEL (7 LAYERS)
            </text>
            <text x="710" y="32" textAnchor="middle" fill="#8A7059" fontSize="14" fontWeight="700" letterSpacing="0.05em">
              TCP / IP PROTOCOL SUITE (5 LAYERS)
            </text>

            {/* CONVERGING CONNECTOR LINES (Session, Presentation, Application -> TCP/IP Application) */}
            <line x1="380" y1="84" x2="540" y2="152" stroke="#384545" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="380" y1="152" x2="540" y2="152" stroke="#384545" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="380" y1="220" x2="540" y2="152" stroke="#384545" strokeWidth="2.5" strokeLinecap="round" />

            {/* --- LEFT COLUMN: 7 OSI LAYERS (Deep Slate #384545, Width: 340) --- */}
            {/* Layer 7: Application (Top corners rounded, bottom sharp) */}
            <path
              d="M 40 70 A 10 10 0 0 1 50 60 L 370 60 A 10 10 0 0 1 380 70 L 380 108 L 40 108 Z"
              fill="#384545"
            />
            <text x="210" y="90" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Application Layer
            </text>

            {/* Layer 6: Presentation (Sharp rectangle) */}
            <rect x="40" y="128" width="340" height="48" fill="#384545" />
            <text x="210" y="158" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Presentation Layer
            </text>

            {/* Layer 5: Session (Sharp rectangle) */}
            <rect x="40" y="196" width="340" height="48" fill="#384545" />
            <text x="210" y="226" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Session Layer
            </text>

            {/* Layer 4: Transport (Sharp rectangle) */}
            <rect x="40" y="264" width="340" height="48" fill="#384545" />
            <text x="210" y="294" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Transport Layer
            </text>

            {/* Layer 3: Network (Sharp rectangle) */}
            <rect x="40" y="332" width="340" height="48" fill="#384545" />
            <text x="210" y="362" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Network Layer
            </text>

            {/* Layer 2: Data Link (Sharp rectangle) */}
            <rect x="40" y="400" width="340" height="48" fill="#384545" />
            <text x="210" y="430" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Data Link Layer
            </text>

            {/* Layer 1: Physical (Top corners sharp, bottom corners rounded) */}
            <path
              d="M 40 468 L 380 468 L 380 506 A 10 10 0 0 1 370 516 L 50 516 A 10 10 0 0 1 40 506 Z"
              fill="#384545"
            />
            <text x="210" y="498" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Physical Layer
            </text>

            {/* --- RIGHT COLUMN: 5 TCP/IP LAYERS (Warm Bronze #8A7059, Width: 340) --- */}
            {/* Combined Application Layer (Top corners rounded, bottom sharp) */}
            <path
              d="M 540 138 A 10 10 0 0 1 550 128 L 870 128 A 10 10 0 0 1 880 138 L 880 176 L 540 176 Z"
              fill="#8A7059"
            />
            <text x="710" y="158" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Application Layer
            </text>

            {/* Transport Layer (Sharp rectangle) */}
            <rect x="540" y="196" width="340" height="48" fill="#8A7059" />
            <text x="710" y="226" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Transport Layer
            </text>

            {/* Network Layer (Sharp rectangle) */}
            <rect x="540" y="264" width="340" height="48" fill="#8A7059" />
            <text x="710" y="294" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Network Layer
            </text>

            {/* Data Link Layer (Sharp rectangle) */}
            <rect x="540" y="332" width="340" height="48" fill="#8A7059" />
            <text x="710" y="362" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Data Link Layer
            </text>

            {/* Physical Layer (Top corners sharp, bottom corners rounded) */}
            <path
              d="M 540 400 L 880 400 L 880 438 A 10 10 0 0 1 870 448 L 550 448 A 10 10 0 0 1 540 438 Z"
              fill="#8A7059"
            />
            <text x="710" y="430" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
              Physical Layer
            </text>
          </svg>
          </div>
        </div>
      </section>

      {/* SECTION 3: TCP VS UDP */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#8A7059]/25 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Transmission Control Protocol (TCP) vs User Datagram Protocol (UDP)
        </h2>

        {/* Content Flow for TCP and UDP (Normal text content without box containers) */}
        <div className="space-y-10 my-8">
          {/* Transmission Control Protocol */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Transmission Control Protocol
            </h3>
            <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>This is a connection-oriented protocol.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>A logical connection/channel is established between the source and the destination before transmission of data segments.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Data segments are sent one after the other along this channel and reach the destination in the exact same order in which they were sent.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <div>
                  <span>It contains :</span>
                  <ul className="mt-2.5 space-y-2 pl-4 list-none text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span><strong className="text-[#232D2D]">Flow control :</strong> To prevent a fast sender from overwhelming a slow receiver</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span><strong className="text-[#232D2D]">Error control :</strong> To make sure data segments are transmitted and received without any errors</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span><strong className="text-[#232D2D]">Congestion control :</strong> To make sure data segments are not lost during congestion</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>This protocol is relatively slower than UDP.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Used for file transfers, emails etc.</span>
              </li>
            </ul>
          </div>

          {/* User Datagram Protocol */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              User Datagram Protocol
            </h3>
            <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>This is a connectionless protocol.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>No logical connection is established between the source and the destination. Datagrams can take any possible path they like.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>It’s not necessary that the datagrams reach the receiver in the exact same order in which they were sent.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Does not have flow control, error control, or congestion control.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>This protocol is faster than TCP.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Mainly used for live streaming and online gaming where speed is more important.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Visualizer Card */}
        <div className="my-8 p-6 sm:p-8 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 shadow-sm space-y-8">
          {/* Top Overview Bar */}
          <div className="pb-4 border-b border-[#8A7059]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#232D2D] mt-0.5">
                Ordered TCP vs. Out-of-Order UDP
              </h4>
            </div>
            <span className="sm:hidden font-mono text-[11px] text-[#8A7059] tracking-wider uppercase">
              ← Scroll horizontally to explore →
            </span>
          </div>

          {/* ======================================================== */}
          {/* SUB-PANEL 1: TCP SIMULATION                             */}
          {/* ======================================================== */}
          <div className="p-4 sm:p-6 rounded-md bg-[#FAF8F5]/80 border border-[#8A7059]/20 shadow-xs flex flex-col space-y-4">
            {/* TCP Header & Individual Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#8A7059]/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8A7059]" />
                <h5 className="font-mono text-sm font-bold uppercase tracking-wider text-[#384545]">
                  TCP — Logical Connection
                </h5>
              </div>

              <button
                type="button"
                onClick={handleStartTcp}
                disabled={tcpSimulating}
                className={`w-full sm:w-auto justify-center px-4 py-2 rounded-md font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm ${tcpSimulating
                  ? 'bg-[#8A7059]/40 text-white cursor-not-allowed'
                  : 'bg-[#8A7059] text-white hover:bg-[#735C47] active:scale-95'
                  }`}
              >
                <span>
                  {tcpSimulating
                    ? '● Sending TCP...'
                    : tcpProgress === 1
                      ? '↺ Replay TCP'
                      : '▶ Send TCP Segments'}
                </span>
              </button>
            </div>

            {/* TCP SVG Canvas */}
            <div className="overflow-x-auto py-2 -mx-1 px-1">
              <svg viewBox="0 0 860 185" className="w-full min-w-[620px] max-w-[820px] mx-auto h-auto select-none font-sans">
              {/* Source Host Card */}
              <rect x="40" y="24" width="135" height="38" rx="10" fill="#384545" />
              <text x="107" y="48" textAnchor="middle" fill="#FAF8F5" fontSize="14" fontWeight="600">
                Source
              </text>

              {/* Destination Host Card */}
              <rect x="685" y="24" width="135" height="38" rx="10" fill="#384545" />
              <text x="752" y="48" textAnchor="middle" fill="#FAF8F5" fontSize="14" fontWeight="600">
                Destination
              </text>

              {/* DEDICATED LOGICAL CONNECTION (Thinner, clean line matching user's diagram) */}
              <path
                d="M 195 122 L 205 122 Q 215 122 215 112 L 215 52 Q 215 42 225 42 L 635 42 Q 645 42 645 52 L 645 112 Q 645 122 655 122 L 665 122"
                fill="none"
                stroke="#384545"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Conduit Label */}
              <text x="430" y="32" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="700" letterSpacing="0.08em" fontFamily="monospace">
                DEDICATED LOGICAL CHANNEL
              </text>

              {/* Source Queue Tray Slots (Empty placeholders) */}
              <g opacity="0.45">
                <rect x="53" y="105" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="70" y="126" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">3</text>
                <rect x="98" y="105" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="115" y="126" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">2</text>
                <rect x="143" y="105" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="160" y="126" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">1</text>
              </g>

              {/* Destination Queue Tray Slots (Empty placeholders) */}
              <g opacity="0.45">
                <rect x="683" y="105" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="700" y="126" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">3</text>
                <rect x="728" y="105" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="745" y="126" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">2</text>
                <rect x="773" y="105" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="790" y="126" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">1</text>
              </g>

              {/* Animated TCP Segments [3], [2], [1] */}
              {/* Segment 3 */}
              {(() => {
                const pos = getTcpPacketPos(3);
                return (
                  <g transform={`translate(${pos.x - 17}, ${pos.y - 17})`}>
                    <rect width="34" height="34" rx="8" fill="#8A7059" className="shadow-md" />
                    <text x="17" y="22" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700">
                      3
                    </text>
                  </g>
                );
              })()}

              {/* Segment 2 */}
              {(() => {
                const pos = getTcpPacketPos(2);
                return (
                  <g transform={`translate(${pos.x - 17}, ${pos.y - 17})`}>
                    <rect width="34" height="34" rx="8" fill="#8A7059" className="shadow-md" />
                    <text x="17" y="22" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700">
                      2
                    </text>
                  </g>
                );
              })()}

              {/* Segment 1 */}
              {(() => {
                const pos = getTcpPacketPos(1);
                return (
                  <g transform={`translate(${pos.x - 17}, ${pos.y - 17})`}>
                    <rect width="34" height="34" rx="8" fill="#8A7059" className="shadow-md" />
                    <text x="17" y="22" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700">
                      1
                    </text>
                  </g>
                );
              })()}
            </svg>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SUB-PANEL 2: UDP SIMULATION                             */}
          {/* ======================================================== */}
          <div className="p-4 sm:p-6 rounded-md bg-[#FAF8F5]/80 border border-[#8A7059]/20 shadow-xs flex flex-col space-y-4">
            {/* UDP Header & Individual Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#8A7059]/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#384545]" />
                <h5 className="font-mono text-sm font-bold uppercase tracking-wider text-[#384545]">
                  UDP — Connectionless
                </h5>
              </div>

              <button
                type="button"
                onClick={handleStartUdp}
                disabled={udpSimulating}
                className={`w-full sm:w-auto justify-center px-4 py-2 rounded-md font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm ${udpSimulating
                  ? 'bg-[#384545]/40 text-white cursor-not-allowed'
                  : 'bg-[#384545] text-white hover:bg-[#2A3434] active:scale-95'
                  }`}
              >
                <span>
                  {udpSimulating
                    ? '● Sending UDP...'
                    : udpProgress === 1
                      ? '↺ Replay UDP'
                      : '▶ Send UDP Datagrams'}
                </span>
              </button>
            </div>

            {/* UDP SVG Canvas */}
            <div className="overflow-x-auto py-2 -mx-1 px-1">
              <svg viewBox="0 0 860 215" className="w-full min-w-[620px] max-w-[820px] mx-auto h-auto select-none font-sans">
              {/* Source Host Card */}
              <rect x="40" y="24" width="135" height="38" rx="10" fill="#384545" />
              <text x="107" y="48" textAnchor="middle" fill="#FAF8F5" fontSize="14" fontWeight="600">
                Source
              </text>

              {/* Destination Host Card */}
              <rect x="685" y="24" width="135" height="38" rx="10" fill="#384545" />
              <text x="752" y="48" textAnchor="middle" fill="#FAF8F5" fontSize="14" fontWeight="600">
                Destination
              </text>

              {/* 4 INDEPENDENT NETWORK ROUTES ACROSS INTERMEDIATE ROUTERS */}
              {/* Route 1: Standard Route (y = 66) */}
              <path d="M 195 142 C 220 142, 225 66, 250 66 L 610 66 C 635 66, 640 142, 665 142" fill="none" stroke="#384545" strokeWidth="2" strokeOpacity="0.55" />
              <text x="430" y="58" textAnchor="middle" fill="#384545" opacity="0.85" fontSize="10" fontWeight="600" fontFamily="monospace">
                Route A • Standard Path (Datagram 1)
              </text>
              <circle cx="380" cy="66" r="4.5" fill="#FAF8F5" stroke="#384545" strokeWidth="2" />
              <circle cx="480" cy="66" r="4.5" fill="#FAF8F5" stroke="#384545" strokeWidth="2" />

              {/* Route 2: Express Low-Latency Route (y = 100) */}
              <path d="M 195 142 C 220 142, 225 100, 250 100 L 610 100 C 635 100, 640 142, 665 142" fill="none" stroke="#8A7059" strokeWidth="2.5" strokeOpacity="0.85" />
              <text x="430" y="92" textAnchor="middle" fill="#8A7059" opacity="0.95" fontSize="10" fontWeight="700" fontFamily="monospace">
                Route B • Direct Link (Datagram 2 - Fastest)
              </text>
              <circle cx="430" cy="100" r="4.5" fill="#FAF8F5" stroke="#8A7059" strokeWidth="2" />

              {/* Route 3: Congested Multi-Hop Route (y = 138) */}
              <path d="M 195 142 C 220 142, 225 138, 250 138 L 610 138 C 635 138, 640 142, 665 142" fill="none" stroke="#384545" strokeWidth="2" strokeOpacity="0.55" />
              <text x="430" y="130" textAnchor="middle" fill="#384545" opacity="0.85" fontSize="10" fontWeight="600" fontFamily="monospace">
                Route C • Congested Route (Datagram 3 - Delayed)
              </text>
              <circle cx="340" cy="138" r="4.5" fill="#FAF8F5" stroke="#384545" strokeWidth="2" />
              <circle cx="430" cy="138" r="4.5" fill="#FAF8F5" stroke="#384545" strokeWidth="2" />
              <circle cx="520" cy="138" r="4.5" fill="#FAF8F5" stroke="#384545" strokeWidth="2" />

              {/* Route 4: Idle Alternative Route (y = 174) */}
              <path d="M 195 142 C 220 142, 225 174, 250 174 L 610 174 C 635 174, 640 142, 665 142" fill="none" stroke="#384545" strokeWidth="2" strokeOpacity="0.45" />
              <circle cx="430" cy="174" r="4.5" fill="#FAF8F5" stroke="#384545" strokeWidth="1.5" opacity="0.75" />

              {/* Source Queue Tray Slots (Empty placeholders) */}
              <g opacity="0.45">
                <rect x="53" y="125" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="70" y="146" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">3</text>
                <rect x="98" y="125" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="115" y="146" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">2</text>
                <rect x="143" y="125" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="160" y="146" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">1</text>
              </g>

              {/* Destination Queue Tray Slots (Empty placeholders showing expected arrival: 2, 1, 3) */}
              <g opacity="0.45">
                <rect x="683" y="125" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="700" y="146" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">2</text>
                <rect x="728" y="125" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="745" y="146" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">1</text>
                <rect x="773" y="125" width="34" height="34" rx="8" fill="#8A7059" fillOpacity="0.08" stroke="#8A7059" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="790" y="146" textAnchor="middle" fill="#8A7059" fontSize="11" fontWeight="600">3</text>
              </g>

              {/* Animated UDP Datagrams [3], [2], [1] */}
              {/* Datagram 3 (Congested Route) */}
              {(() => {
                const pos = getUdpPacketPos(3);
                return (
                  <g transform={`translate(${pos.x - 17}, ${pos.y - 17})`}>
                    <rect width="34" height="34" rx="8" fill="#8A7059" className="shadow-md" />
                    <text x="17" y="22" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700">
                      3
                    </text>
                  </g>
                );
              })()}

              {/* Datagram 2 (Express Route - Overtakes Datagram 1) */}
              {(() => {
                const pos = getUdpPacketPos(2);
                return (
                  <g transform={`translate(${pos.x - 17}, ${pos.y - 17})`}>
                    <rect width="34" height="34" rx="8" fill="#8A7059" className="shadow-md" />
                    <text x="17" y="22" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700">
                      2
                    </text>
                  </g>
                );
              })()}

              {/* Datagram 1 (Standard Route) */}
              {(() => {
                const pos = getUdpPacketPos(1);
                return (
                  <g transform={`translate(${pos.x - 17}, ${pos.y - 17})`}>
                    <rect width="34" height="34" rx="8" fill="#8A7059" className="shadow-md" />
                    <text x="17" y="22" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700">
                      1
                    </text>
                  </g>
                );
              })()}
            </svg>
            </div>
          </div>

          {/* User Requested Minimal Footer Note */}
          <div className="pt-2 flex justify-center">
            <span className="font-mono text-xs text-[#8A7059] text-center">
              Visualization purposes only
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: ENCAPSULATION AND DECAPSULATION */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#8A7059]/25 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Encapsulation and Decapsulation
        </h2>

        {/* Verbatim Content Flow for Sender and Receiver */}
        <div className="space-y-10 my-8 text-[#283535] text-base sm:text-lg leading-relaxed">
          {/* Sender’s end */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Sender’s end (Encapsulation)
            </h3>
            <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Application Layer :</strong> Generates the message. Passes it down to Transport Layer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Transport Layer :</strong> Adds a header to the message containing source/destination identifiers and sequence numbers. Creates a segment and passes it down to Network Layer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Network Layer :</strong> Adds a header containing source/destination IP addresses and information for error checking. Creates a datagram and passes it down to Data Link Layer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Data Link Layer :</strong> Adds a header containing link-layer (MAC) address of the destination/next hop as well as a trailer containing CRC-32 Frame Check Sequence for error checking. Creates a data frame and passes it down to Physical Layer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Physical Layer :</strong> Converts raw bits to signals for transmission along the physical media.
                </span>
              </li>
            </ul>
          </div>

          {/* Receiver’s end */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Receiver’s end (Decapsulation)
            </h3>
            <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  Each layer receives the packet, removes the headers and trailers, and sends the payload up to the next-higher layer until the message reaches the application layer.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Encapsulation & Decapsulation Visualizer Card */}
        <div className="my-8 p-6 sm:p-8 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 shadow-sm space-y-6">
          {/* Top Bar with Clean Header & Individual Controls */}
          <div className="pb-4 border-b border-[#8A7059]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
                Encapsulation & Decapsulation
              </h4>
              <span className="sm:hidden font-mono text-[11px] text-[#8A7059] tracking-wider uppercase mt-1 block">
                ← Scroll horizontally to explore →
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleStartEncapsulation}
                disabled={encapMode !== 'idle'}
                className={`px-4 py-2 rounded-md font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm ${encapMode === 'encapsulating'
                  ? 'bg-[#8A7059]/50 text-white cursor-not-allowed'
                  : 'bg-[#8A7059] text-white hover:bg-[#735C47] active:scale-95'
                  }`}
              >
                <span>
                  {encapMode === 'encapsulating' ? 'Encapsulating...' : '▶ Play  Encapsulation : Sender\'s end'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleStartDecapsulation}
                disabled={encapMode !== 'idle'}
                className={`px-4 py-2 rounded-md font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm ${encapMode === 'decapsulating'
                  ? 'bg-[#384545]/50 text-white cursor-not-allowed'
                  : 'bg-[#384545] text-white hover:bg-[#2A3434] active:scale-95'
                  }`}
              >
                <span>
                  {encapMode === 'decapsulating' ? 'Decapsulating...' : '▶ Play Decapsulation : Receiver\'s end'}
                </span>
              </button>

              {encapMode === 'idle' && (
                <button
                  type="button"
                  onClick={handleResetEncap}
                  className="px-3 py-2 rounded-xl font-mono text-xs font-semibold text-[#6E5844] hover:text-[#232D2D] hover:bg-[#8A7059]/10 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* SVG Visualizer Canvas */}
          <div className="overflow-x-auto py-2">
            <svg viewBox="0 0 1120 415" className="w-full min-w-[780px] max-w-[1060px] mx-auto h-auto select-none font-sans">
              {/* ======================================================== */}
              {/* LAYER INDICATORS ON THE LEFT                             */}
              {/* ======================================================== */}
              <g fontFamily="monospace" fontSize="12" fontWeight="700" fill="#6E5844" opacity="0.9">
                <text x="25" y="60">Layer 05 : Application</text>
                <text x="25" y="135">Layer 04 : Transport</text>
                <text x="25" y="210">Layer 03 : Network</text>
                <text x="25" y="285">Layer 02 : Data Link</text>
                <text x="25" y="360">Layer 01 : Physical</text>
              </g>

              {/* ======================================================== */}
              {/* 1. DECAPSULATION MODE RENDERING (Ascending L1 -> L5)     */}
              {/* ======================================================== */}
              {encapMode === 'decapsulating' && (() => {
                const q = decapProgress;

                // Stage 1: Physical -> Data Link (q in [0, 1])
                if (q <= 1.0) {
                  if (q < 0.35) {
                    // RAW BITS moves UP first from y=330 to y=255
                    const y = 330 - (q / 0.35) * (330 - 255);
                    return (
                      <g>
                        <rect x="220" y={y} width="860" height="48" rx="8" fill="#384545" />
                        <text x="650" y={y + 30} textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700" letterSpacing="0.05em">
                          RAW BITS
                        </text>
                      </g>
                    );
                  } else {
                    // At y=255, RAW BITS splits into data frame blocks (0.35 to 0.70), then holds settled until 1.0
                    const u = Math.min((q - 0.35) / 0.35, 1);
                    return (
                      <g>
                        <rect x="220" y="255" width="460" height="48" rx="8" fill="#384545" />
                        <text x="450" y="285" textAnchor="middle" fill="#FAF8F5" fontSize="12.5" fontWeight="600" opacity={u}>
                          HEADER H2 : Link Layer Address of Next Hop/Destination
                        </text>

                        <rect x="696" y="255" width="44" height="48" rx="8" fill="#384545" />
                        <text x="718" y="285" textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600" opacity={u}>H3</text>

                        <rect x="756" y="255" width="44" height="48" rx="8" fill="#384545" />
                        <text x="778" y="285" textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600" opacity={u}>H4</text>

                        <rect x="816" y="255" width="114" height="48" rx="8" fill="#8A7059" />
                        <text x="873" y="285" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700" opacity={u}>MESSAGE</text>

                        <rect x="946" y="255" width="134" height="48" rx="8" fill="#384545" />
                        <text x="1013" y="285" textAnchor="middle" fill="#FAF8F5" fontSize="12.5" fontWeight="600" opacity={u}>TRAILER : CRC</text>
                      </g>
                    );
                  }
                }

                // Stage 2: Data Link -> Network (q in [1, 2])
                if (q <= 2.0) {
                  if (q < 1.35) {
                    // Data frame payload [H3, H4, MESSAGE] moves UP first from y=255 to y=180
                    const sub = (q - 1.0) / 0.35;
                    const y = 255 - sub * (255 - 180);
                    return (
                      <g>
                        {/* H2 and Trailer fading out */}
                        <rect x="220" y="255" width="460" height="48" rx="8" fill="#384545" opacity={1 - sub} />
                        <rect x="946" y="255" width="134" height="48" rx="8" fill="#384545" opacity={1 - sub} />

                        {/* Payload moving up */}
                        <rect x="696" y={y} width="44" height="48" rx="8" fill="#384545" />
                        <text x="718" y={y + 30} textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600">H3</text>

                        <rect x="756" y={y} width="44" height="48" rx="8" fill="#384545" />
                        <text x="778" y={y + 30} textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600">H4</text>

                        <rect x="816" y={y} width="114" height="48" rx="8" fill="#8A7059" />
                        <text x="873" y={y + 30} textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">MESSAGE</text>
                      </g>
                    );
                  } else {
                    // At y=180, H3 expands into full datagram header (1.35 to 1.70), then holds settled until 2.0
                    const u = Math.min((q - 1.35) / 0.35, 1);
                    const wH3 = 44 + u * (670 - 44);
                    const xH4 = 756 + u * (906 - 756);
                    const xMsg = 816 + u * (966 - 816);
                    return (
                      <g>
                        <rect x="220" y="180" width={wH3} height="48" rx="8" fill="#384545" />
                        {u > 0.4 && (
                          <text x={220 + wH3 / 2} y="210" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="600" opacity={u}>
                            HEADER H3 : Source/Destination IP Address, TTL
                          </text>
                        )}

                        <rect x={xH4} y="180" width="44" height="48" rx="8" fill="#384545" />
                        <text x={xH4 + 22} y="210" textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600">H4</text>

                        <rect x={xMsg} y="180" width="114" height="48" rx="8" fill="#8A7059" />
                        <text x={xMsg + 57} y="210" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">MESSAGE</text>
                      </g>
                    );
                  }
                }

                // Stage 3: Network -> Transport (q in [2, 3])
                if (q <= 3.0) {
                  if (q < 2.35) {
                    // Segment payload [H4, MESSAGE] moves UP first from y=180 to y=105
                    const sub = (q - 2.0) / 0.35;
                    const y = 180 - sub * (180 - 105);
                    return (
                      <g>
                        {/* H3 fading out */}
                        <rect x="220" y="180" width="670" height="48" rx="8" fill="#384545" opacity={1 - sub} />

                        {/* Payload moving up */}
                        <rect x="906" y={y} width="44" height="48" rx="8" fill="#384545" />
                        <text x="928" y={y + 30} textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600">H4</text>

                        <rect x="966" y={y} width="114" height="48" rx="8" fill="#8A7059" />
                        <text x="1023" y={y + 30} textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">MESSAGE</text>
                      </g>
                    );
                  } else {
                    // At y=105, H4 expands into full transport header (2.35 to 2.70), then holds settled until 3.0
                    const u = Math.min((q - 2.35) / 0.35, 1);
                    const wH4 = 44 + u * (730 - 44);
                    return (
                      <g>
                        <rect x="220" y="105" width={wH4} height="48" rx="8" fill="#384545" />
                        {u > 0.4 && (
                          <text x={220 + wH4 / 2} y="135" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="600" opacity={u}>
                            HEADER H4 : Source/Destination Ports, Sequence Numbers
                          </text>
                        )}

                        <rect x="966" y="105" width="114" height="48" rx="8" fill="#8A7059" />
                        <text x="1023" y="135" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">MESSAGE</text>
                      </g>
                    );
                  }
                }

                // Stage 4: Transport -> Application (q in [3, 4])
                if (q <= 4.0) {
                  if (q < 3.35) {
                    // Message moves UP first from y=105 to y=30
                    const sub = (q - 3.0) / 0.35;
                    const y = 105 - sub * (105 - 30);
                    return (
                      <g>
                        {/* H4 fading out */}
                        <rect x="220" y="105" width="730" height="48" rx="8" fill="#384545" opacity={1 - sub} />

                        {/* Message moving up */}
                        <rect x="966" y={y} width="114" height="48" rx="8" fill="#8A7059" />
                        <text x="1023" y={y + 30} textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">MESSAGE</text>
                      </g>
                    );
                  } else {
                    // At y=30, Message expands back to full application message (3.35 to 3.70), then holds settled until 4.0
                    const u = Math.min((q - 3.35) / 0.35, 1);
                    const xMsg = 966 - u * (966 - 220);
                    const wMsg = 114 + u * (860 - 114);
                    return (
                      <g>
                        <rect x={xMsg} y="30" width={wMsg} height="48" rx="8" fill="#8A7059" />
                        <text x={xMsg + wMsg / 2} y="60" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700" letterSpacing="0.05em">
                          MESSAGE
                        </text>
                      </g>
                    );
                  }
                }

                return null;
              })()}

              {/* ======================================================== */}
              {/* 2. ENCAPSULATION & STATIC COMPLETE VIEW RENDERING        */}
              {/* ======================================================== */}
              {encapMode !== 'decapsulating' && (
                <>
                  {/* ROW 1: APPLICATION LAYER (MESSAGE) */}
                  <rect x="220" y="30" width="860" height="48" rx="8" fill="#8A7059" className="shadow-xs" />
                  <text x="650" y="60" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700" letterSpacing="0.05em">
                    MESSAGE
                  </text>

                  {/* ROW 2: TRANSPORT LAYER (H4 + MESSAGE) */}
                  {(() => {
                    const p = encapProgress;
                    if (p <= 0) return null;

                    if (p < 0.35) {
                      const y2 = 30 + (p / 0.35) * (105 - 30);
                      return (
                        <g opacity="0.95">
                          <rect x="220" y={y2} width="860" height="48" rx="8" fill="#8A7059" />
                          <text x="650" y={y2 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700">
                            MESSAGE
                          </text>
                        </g>
                      );
                    }

                    // Assembles 0.35 to 0.70, then holds settled until 1.0
                    const u2 = Math.min((p - 0.35) / 0.35, 1);
                    const xMsg = 220 + u2 * (966 - 220);
                    const wMsg = 860 - u2 * (860 - 114);
                    const wH4 = u2 * 730;

                    return (
                      <g>
                        <rect x="220" y="105" width={wH4} height="48" rx="8" fill="#384545" opacity={u2} />
                        {u2 > 0.35 && (
                          <text x={220 + wH4 / 2} y="135" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="600" opacity={u2}>
                            HEADER H4 : Source/Destination Ports, Sequence Numbers
                          </text>
                        )}

                        <rect x={xMsg} y="105" width={wMsg} height="48" rx="8" fill="#8A7059" />
                        <text x={xMsg + wMsg / 2} y="135" textAnchor="middle" fill="#FAF8F5" fontSize={wMsg < 200 ? 13 : 15} fontWeight="700">
                          MESSAGE
                        </text>
                      </g>
                    );
                  })()}

                  {/* ROW 3: NETWORK LAYER (H3 + H4 + MESSAGE) */}
                  {(() => {
                    const p = encapProgress;
                    if (p <= 1.0) return null;

                    if (p < 1.35) {
                      const y3 = 105 + ((p - 1.0) / 0.35) * (180 - 105);
                      return (
                        <g opacity="0.95">
                          <rect x="220" y={y3} width="730" height="48" rx="8" fill="#384545" />
                          <text x="585" y={y3 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="600">
                            HEADER H4 : Source/Destination Ports, Sequence Numbers
                          </text>
                          <rect x="966" y={y3} width="114" height="48" rx="8" fill="#8A7059" />
                          <text x="1023" y={y3 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">
                            MESSAGE
                          </text>
                        </g>
                      );
                    }

                    // Assembles 1.35 to 1.70, then holds settled until 2.0
                    const u3 = Math.min((p - 1.35) / 0.35, 1);
                    const xH4_3 = 220 + u3 * (906 - 220);
                    const wH4_3 = 730 - u3 * (730 - 44);
                    const wH3 = u3 * 670;

                    return (
                      <g>
                        <rect x="220" y="180" width={wH3} height="48" rx="8" fill="#384545" opacity={u3} />
                        {u3 > 0.35 && (
                          <text x={220 + wH3 / 2} y="210" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="600" opacity={u3}>
                            HEADER H3 : Source/Destination IP Address, TTL
                          </text>
                        )}

                        <rect x={xH4_3} y="180" width={wH4_3} height="48" rx="8" fill="#384545" />
                        <text x={xH4_3 + wH4_3 / 2} y="210" textAnchor="middle" fill="#FAF8F5" fontSize={wH4_3 < 100 ? 12 : 13} fontWeight="600">
                          {wH4_3 < 100 ? 'H4' : 'HEADER H4'}
                        </text>

                        <rect x="966" y="180" width="114" height="48" rx="8" fill="#8A7059" />
                        <text x="1023" y="210" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">
                          MESSAGE
                        </text>
                      </g>
                    );
                  })()}

                  {/* ROW 4: DATA LINK LAYER (H2 + H3 + H4 + MESSAGE + TRAILER) */}
                  {(() => {
                    const p = encapProgress;
                    if (p <= 2.0) return null;

                    if (p < 2.35) {
                      const y4 = 180 + ((p - 2.0) / 0.35) * (255 - 180);
                      return (
                        <g opacity="0.95">
                          <rect x="220" y={y4} width="670" height="48" rx="8" fill="#384545" />
                          <text x="555" y={y4 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="600">
                            HEADER H3 : Source/Destination IP Address, TTL
                          </text>
                          <rect x="906" y={y4} width="44" height="48" rx="8" fill="#384545" />
                          <text x="928" y={y4 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600">H4</text>
                          <rect x="966" y={y4} width="114" height="48" rx="8" fill="#8A7059" />
                          <text x="1023" y={y4 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">MESSAGE</text>
                        </g>
                      );
                    }

                    // Assembles 2.35 to 2.70, then holds settled until 3.0
                    const u4 = Math.min((p - 2.35) / 0.35, 1);
                    const xH3_4 = 220 + u4 * (696 - 220);
                    const wH3_4 = 670 - u4 * (670 - 44);
                    const xH4_4 = 906 - u4 * (906 - 756);
                    const xMsg4 = 966 - u4 * (966 - 816);
                    const wH2 = u4 * 460;
                    const wTrailer = u4 * 134;

                    return (
                      <g>
                        <rect x="220" y="255" width={wH2} height="48" rx="8" fill="#384545" opacity={u4} />
                        {u4 > 0.35 && (
                          <text x={220 + wH2 / 2} y="285" textAnchor="middle" fill="#FAF8F5" fontSize="12.5" fontWeight="600" opacity={u4}>
                            HEADER H2 : Link Layer Address of Next Hop/Destination
                          </text>
                        )}

                        <rect x={xH3_4} y="255" width={wH3_4} height="48" rx="8" fill="#384545" />
                        <text x={xH3_4 + wH3_4 / 2} y="285" textAnchor="middle" fill="#FAF8F5" fontSize={wH3_4 < 100 ? 12 : 13} fontWeight="600">
                          {wH3_4 < 100 ? 'H3' : 'HEADER H3'}
                        </text>

                        <rect x={xH4_4} y="255" width="44" height="48" rx="8" fill="#384545" />
                        <text x={xH4_4 + 22} y="285" textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600">H4</text>

                        <rect x={xMsg4} y="255" width="114" height="48" rx="8" fill="#8A7059" />
                        <text x={xMsg4 + 57} y="285" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">MESSAGE</text>

                        <rect x="946" y="255" width={wTrailer} height="48" rx="8" fill="#384545" opacity={u4} />
                        {u4 > 0.35 && (
                          <text x={946 + wTrailer / 2} y="285" textAnchor="middle" fill="#FAF8F5" fontSize="12.5" fontWeight="600" opacity={u4}>
                            TRAILER : CRC
                          </text>
                        )}
                      </g>
                    );
                  })()}

                  {/* ROW 5: PHYSICAL LAYER (RAW BITS) */}
                  {(() => {
                    const p = encapProgress;
                    if (p <= 3.0) return null;

                    if (p < 3.35) {
                      const y5 = 255 + ((p - 3.0) / 0.35) * (330 - 255);
                      return (
                        <g opacity="0.95">
                          <rect x="220" y={y5} width="460" height="48" rx="8" fill="#384545" />
                          <text x="450" y={y5 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="12.5" fontWeight="600">
                            HEADER H2 : Link Layer Address of Next Hop/Destination
                          </text>
                          <rect x="696" y={y5} width="44" height="48" rx="8" fill="#384545" />
                          <text x="718" y={y5 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600">H3</text>
                          <rect x="756" y={y5} width="44" height="48" rx="8" fill="#384545" />
                          <text x="778" y={y5 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="12" fontWeight="600">H4</text>
                          <rect x="816" y={y5} width="114" height="48" rx="8" fill="#8A7059" />
                          <text x="873" y={y5 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="13" fontWeight="700">MESSAGE</text>
                          <rect x="946" y={y5} width="134" height="48" rx="8" fill="#384545" />
                          <text x="1013" y={y5 + 30} textAnchor="middle" fill="#FAF8F5" fontSize="12.5" fontWeight="600">TRAILER : CRC</text>
                        </g>
                      );
                    }

                    // Merges 3.35 to 3.70, then holds settled until 4.0
                    const u5 = Math.min((p - 3.35) / 0.35, 1);
                    return (
                      <g>
                        <rect x="220" y="330" width="860" height="48" rx="8" fill="#384545" />
                        {u5 > 0.35 && (
                          <text x="650" y="360" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="700" letterSpacing="0.05em" opacity={u5}>
                            RAW BITS
                          </text>
                        )}
                      </g>
                    );
                  })()}
                </>
              )}
            </svg>
          </div>

          {/* Footer Note */}
          <div className="pt-2 flex justify-center">
            <span className="font-mono text-xs text-[#8A7059] text-center">
              Visualization purposes only
            </span>
          </div>
        </div>

        {/* INTERMEDIARY ROUTER SUBSECTION */}
        <div className="mt-12 pt-8 border-t border-[#8A7059]/20 space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Intermediary Router
            </h3>
            <p className="mt-2 text-base sm:text-lg text-[#283535] leading-relaxed">
              The intermediary router only goes up to the Network Layer. It does not touch the top two layers.
            </p>
          </div>

          {/* Decapsulation at Intermediary Router */}
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Decapsulation
            </h4>
            <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Physical Layer :</strong> Receives the raw bits and sends it up to the Data Link Layer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <div>
                  <span><strong className="text-[#232D2D]">Data Link Layer :</strong></span>
                  <ul className="mt-2 space-y-2 pl-4 list-none text-base">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span>First verifies the CRC-32 Frame Check Sequence (FCS). If there is an error, it discards the frame.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span>Then it checks if the destination MAC on the packet matches the router’s interface MAC. If it does, it removes the header and trailer and passes it up to the Network Layer.</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <div>
                  <span><strong className="text-[#232D2D]">Network Layer :</strong></span>
                  <ul className="mt-2 space-y-2 pl-4 list-none text-base">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span>Checks the destination IP address on the packet and consults its routing table to find the next best hop.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span>It decrements the TTL (Time-To-Live) by 1 and recalculates the checksum.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span>If the TTL reaches 0, an ICMP “Time Exceeded” message is sent back to the sender and the packet is discarded.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span>Once its work is done, it sends the packet back down to the Data Link Layer.</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* Encapsulation at Intermediary Router */}
          <div className="space-y-4 pt-2">
            <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Encapsulation
            </h4>
            <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <div>
                  <span><strong className="text-[#232D2D]">Data Link Layer :</strong></span>
                  <ul className="mt-2 space-y-2 pl-4 list-none text-base">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span>Receives the datagram from the Network Layer.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <div>
                        <span>Adds a new header with :</span>
                        <ul className="mt-1.5 space-y-1.5 pl-4 list-none text-sm sm:text-base">
                          <li className="flex items-start gap-2">
                            <span className="text-[#8A7059]">•</span>
                            <span>Destination MAC (either of the next hop or the destination host)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#8A7059]">•</span>
                            <span>Current router’s outgoing interface MAC</span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">-</span>
                      <span>Adds a trailer with the recalculated checksum and sends it down to physical layer.</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Physical Layer :</strong> Converts the bits into signals and transmits them along the physical media.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </NetworkPageLayout>
  );
}

