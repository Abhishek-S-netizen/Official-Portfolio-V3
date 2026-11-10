import React, { useState, useEffect, useRef } from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page2_1_FlowErrorControl({ onBackToIndex, onNavigatePage }) {
  const [activeTab, setActiveTab] = useState('utopian');

  // ==========================================
  // 1. SIMPLEX (UTOPIAN) PROTOCOL STATE
  // ==========================================
  const [utopianRunning, setUtopianRunning] = useState(false);
  const [utopianCount, setUtopianCount] = useState(0);

  useEffect(() => {
    if (!utopianRunning) return;
    const interval = setInterval(() => {
      setUtopianCount((c) => c + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, [utopianRunning]);

  const handleResetUtopian = () => {
    setUtopianRunning(false);
    setUtopianCount(0);
  };

  // ==========================================
  // 2. STOP-AND-WAIT STATE
  // ==========================================
  const [sawStep, setSawStep] = useState(0);
  const [sawRunning, setSawRunning] = useState(false);
  const sawTimers = useRef([]);

  const clearSaw = () => {
    sawTimers.current.forEach(clearTimeout);
    sawTimers.current = [];
  };

  const handleStartSaw = () => {
    clearSaw();
    setSawRunning(true);
    setSawStep(1);

    sawTimers.current.push(setTimeout(() => setSawStep(2), 2400));
    sawTimers.current.push(setTimeout(() => setSawStep(3), 3800));
    sawTimers.current.push(setTimeout(() => setSawStep(4), 6200));
    sawTimers.current.push(setTimeout(() => setSawStep(5), 7600));
    sawTimers.current.push(setTimeout(() => setSawStep(6), 9400));
    sawTimers.current.push(setTimeout(() => setSawStep(7), 11800));
    sawTimers.current.push(
      setTimeout(() => {
        setSawStep(8);
        setSawRunning(false);
      }, 12800)
    );
  };

  const handleResetSaw = () => {
    clearSaw();
    setSawStep(0);
    setSawRunning(false);
  };

  // ==========================================
  // 3. STOP-AND-WAIT ARQ STATE
  // ==========================================
  // Steps:
  // 0: idle
  // 1: frame0_moving (2.4s)
  // 2: frame0_received (1.2s)
  // 3: ack0_moving (1.8s)
  // 4: ack0_lost (2.0s)
  // 5: countdown_clock (6-second countdown 00:06 -> 00:00)
  // 6: timer_out_message ("Timer ran out. No ACK received. Sender assumes frame was lost and retransmits the same frame again", 2.6s)
  // 7: retransmit_moving (Frame A0 (Retransmitted) moves across wire, 2.4s)
  // 8: duplicate_detected_hold ("Duplicate detected" text, holds 1.4s)
  // 9: duplicate_smooth_fade (Smooth fade up into space with "Duplicate : Discarded", 1.8s)
  // 10: ack0_resend (Receiver re-sends ACK 0 safely, 2.4s)
  // 11: complete (ACK received : Complete)
  const [arqStep, setArqStep] = useState(0);
  const [arqCountdown, setArqCountdown] = useState(6);
  const [arqRunning, setArqRunning] = useState(false);
  const arqTimers = useRef([]);
  const arqIntervalRef = useRef(null);

  const clearArq = () => {
    arqTimers.current.forEach(clearTimeout);
    arqTimers.current = [];
    if (arqIntervalRef.current) clearInterval(arqIntervalRef.current);
    setArqCountdown(6);
  };

  const handleStartArq = () => {
    clearArq();
    setArqRunning(true);
    setArqStep(1);

    arqTimers.current.push(setTimeout(() => setArqStep(2), 2400));
    arqTimers.current.push(setTimeout(() => setArqStep(3), 3800));
    arqTimers.current.push(setTimeout(() => setArqStep(4), 5600));

    // Step 5: Start 6-second countdown
    arqTimers.current.push(
      setTimeout(() => {
        setArqStep(5);
        setArqCountdown(6);
        let sec = 6;
        arqIntervalRef.current = setInterval(() => {
          sec -= 1;
          setArqCountdown(sec);
          if (sec <= 0) {
            clearInterval(arqIntervalRef.current);
            // Step 6: Show explanatory message
            setArqStep(6);
          }
        }, 1000);
      }, 7600)
    );

    // Step 7: Retransmit starts after 2.6s explanatory pause (7.6s + 6s + 2.6s = 16.2s)
    arqTimers.current.push(setTimeout(() => setArqStep(7), 16200));

    // Step 8: Retransmitted frame arrives at Receiver -> "Duplicate detected" hold (16.2s + 2.4s = 18.6s)
    arqTimers.current.push(setTimeout(() => setArqStep(8), 18600));

    // Step 9: Smooth fade up into space with "Duplicate : Discarded" (18.6s + 1.4s = 20.0s)
    arqTimers.current.push(setTimeout(() => setArqStep(9), 20000));

    // Step 10: Receiver re-sends ACK 0 (20.0s + 1.8s = 21.8s)
    arqTimers.current.push(setTimeout(() => setArqStep(10), 21800));

    // Step 11: ACK 0 safely reaches sender (21.8s + 2.4s = 24.2s)
    arqTimers.current.push(
      setTimeout(() => {
        setArqStep(11);
        setArqRunning(false);
      }, 24200)
    );
  };

  const handleResetArq = () => {
    clearArq();
    setArqStep(0);
    setArqRunning(false);
  };

  // ==========================================
  // 4. GO-BACK-N STATE
  // ==========================================
  // Steps:
  // 0: idle
  // 1: send_1 (moves 2.4s) -> slot 1 filled
  // 2: send_2 (moves 2.4s) -> slot 2 filled
  // 3: send_3 (moves 2.4s) -> slot 3 filled
  // 4: send_4_lost (moves, stops, lifts up, red text "Corrupted and lost", disappears, 2.8s)
  // 5: send_5_moving (Frame 5 travels across wire only, 2.4s)
  // 6: send_5_discarded (Frame 5 arrives at receiver! Lifts up & smoothly fades with "Discarded : not in order", 1.8s)
  // 7: send_6_moving (Frame 6 travels across wire only, 2.4s)
  // 8: send_6_discarded (Frame 6 arrives at receiver! Lifts up & smoothly fades with "Discarded : not in order", 1.8s)
  // 9: pause_text ("Sender needs to retransmit everything from Frame 4 again just because one frame was lost", 3.0s)
  // 10: rewind_amber (Sender frames 4, 5, 6 turn amber orange, 1.4s)
  // 11: resend_4 (amber 4 moves 2.4s -> slot 4 filled)
  // 12: resend_5 (amber 5 moves 2.4s -> slot 5 filled)
  // 13: resend_6 (amber 6 moves 2.4s -> slot 6 filled)
  // 14: complete
  const [gbnStep, setGbnStep] = useState(0);
  const [gbnReceivedSlots, setGbnReceivedSlots] = useState([]);
  const [gbnRunning, setGbnRunning] = useState(false);
  const gbnTimers = useRef([]);

  const clearGbn = () => {
    gbnTimers.current.forEach(clearTimeout);
    gbnTimers.current = [];
    setGbnReceivedSlots([]);
  };

  const handleStartGbn = () => {
    clearGbn();
    setGbnRunning(true);
    setGbnStep(1); // Frame 1 moving

    // 1 -> Arrives at 2400ms: Slot 1 filled, Frame 2 starts moving
    gbnTimers.current.push(
      setTimeout(() => {
        setGbnReceivedSlots([1]);
        setGbnStep(2);
      }, 2400)
    );

    // 2 -> Arrives at 4800ms: Slot 2 filled, Frame 3 starts moving
    gbnTimers.current.push(
      setTimeout(() => {
        setGbnReceivedSlots([1, 2]);
        setGbnStep(3);
      }, 4800)
    );

    // 3 -> Arrives at 7200ms: Slot 3 filled, Frame 4 starts moving
    gbnTimers.current.push(
      setTimeout(() => {
        setGbnReceivedSlots([1, 2, 3]);
        setGbnStep(4);
      }, 7200)
    );

    // 4 -> Frame 4 lost mid-wire by 10000ms. Frame 5 starts moving across
    gbnTimers.current.push(setTimeout(() => setGbnStep(5), 10200));

    // 5 -> Frame 5 reaches receiver at 12600ms. Now show smooth discard fade
    gbnTimers.current.push(setTimeout(() => setGbnStep(6), 12600));

    // 6 -> Discard finishes at 14400ms. Frame 6 starts moving across
    gbnTimers.current.push(setTimeout(() => setGbnStep(7), 14400));

    // 7 -> Frame 6 reaches receiver at 16800ms. Now show smooth discard fade
    gbnTimers.current.push(setTimeout(() => setGbnStep(8), 16800));

    // 8 -> Discard finishes at 18600ms. Explanatory pause text appears
    gbnTimers.current.push(setTimeout(() => setGbnStep(9), 18600));

    // 9 -> After 3.2s pause, Sender frames turn amber orange at 21800ms
    gbnTimers.current.push(setTimeout(() => setGbnStep(10), 21800));

    // 10 -> Retransmit Frame 4 starts at 23200ms
    gbnTimers.current.push(setTimeout(() => setGbnStep(11), 23200));

    // 11 -> Frame 4 arrives at 25600ms: Slot 4 filled, Retransmit Frame 5 starts
    gbnTimers.current.push(
      setTimeout(() => {
        setGbnReceivedSlots([1, 2, 3, 4]);
        setGbnStep(12);
      }, 25600)
    );

    // 12 -> Frame 5 arrives at 28000ms: Slot 5 filled, Retransmit Frame 6 starts
    gbnTimers.current.push(
      setTimeout(() => {
        setGbnReceivedSlots([1, 2, 3, 4, 5]);
        setGbnStep(13);
      }, 28000)
    );

    // 13 -> Frame 6 arrives at 30400ms: Slot 6 filled, Complete!
    gbnTimers.current.push(
      setTimeout(() => {
        setGbnReceivedSlots([1, 2, 3, 4, 5, 6]);
        setGbnStep(14);
        setGbnRunning(false);
      }, 30400)
    );
  };

  const handleResetGbn = () => {
    clearGbn();
    setGbnStep(0);
    setGbnRunning(false);
  };

  // ==========================================
  // 5. SELECTIVE REPEAT STATE
  // ==========================================
  const [srStep, setSrStep] = useState(0);
  const [srReceivedSlots, setSrReceivedSlots] = useState([]);
  const [srBufferedSlots, setSrBufferedSlots] = useState([]);
  const [srRunning, setSrRunning] = useState(false);
  const srTimers = useRef([]);

  const clearSr = () => {
    srTimers.current.forEach(clearTimeout);
    srTimers.current = [];
    setSrReceivedSlots([]);
    setSrBufferedSlots([]);
  };

  const handleStartSr = () => {
    clearSr();
    setSrRunning(true);
    setSrStep(1); // Frame 1 moving

    srTimers.current.push(
      setTimeout(() => {
        setSrReceivedSlots([1]);
        setSrStep(2);
      }, 2400)
    );

    srTimers.current.push(
      setTimeout(() => {
        setSrReceivedSlots([1, 2]);
        setSrStep(3);
      }, 4800)
    );

    srTimers.current.push(
      setTimeout(() => {
        setSrReceivedSlots([1, 2, 3]);
        setSrStep(4);
      }, 7200)
    );

    srTimers.current.push(setTimeout(() => setSrStep(5), 10200));

    srTimers.current.push(
      setTimeout(() => {
        setSrBufferedSlots([5]);
        setSrStep(6);
      }, 12600)
    );

    srTimers.current.push(
      setTimeout(() => {
        setSrBufferedSlots([5, 6]);
        setSrStep(7);
      }, 15000)
    );

    srTimers.current.push(setTimeout(() => setSrStep(8), 18400));
    srTimers.current.push(setTimeout(() => setSrStep(9), 19800));

    srTimers.current.push(
      setTimeout(() => {
        setSrReceivedSlots([1, 2, 3, 4, 5, 6]);
        setSrBufferedSlots([]);
        setSrStep(10);
        setSrRunning(false);
      }, 22200)
    );
  };

  const handleResetSr = () => {
    clearSr();
    setSrStep(0);
    setSrRunning(false);
  };

  // Cleanup on tab switch or unmount
  useEffect(() => {
    return () => {
      clearSaw();
      clearArq();
      clearGbn();
      clearSr();
    };
  }, [activeTab]);

  return (
    <NetworkPageLayout
      pageId="2-1-flow-error-control"
      subtitle="Delimiting frames, line flow regulation, and sliding window recovery (ARQ)."
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* ========================================================= */}
      {/* SECTION 1: FRAMING                                        */}
      {/* ========================================================= */}
      <section className="mb-14 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#232D2D]">
            Framing
          </h2>
        </div>

        <div className="space-y-6 text-base sm:text-lg text-[#283535] leading-relaxed">
          {/* 1. Byte Count / Character Count */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-[#232D2D]">
              Byte Count / Character Count
            </h3>
            <ul className="space-y-1.5 pl-2 list-none">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>A header field will contain the number of bytes the frame is holding.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#8A7059]">Disadvantage :</strong> Any amount of noise can flip this count and corrupt it, breaking synchronization.
                </span>
              </li>
            </ul>
          </div>

          {/* 2. Byte Stuffing */}
          <div className="space-y-2 pt-2">
            <h3 className="text-lg sm:text-xl font-semibold text-[#232D2D]">
              Byte Stuffing
            </h3>
            <ul className="space-y-1.5 pl-2 list-none">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>The frame starts and ends with a 1-byte flag.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  Sometimes this 1-byte flag may show up as part of the user data. In that case, an escape byte is inserted before it, so that it is not mistaken for a flag.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>When the receiver reads the user data, it will automatically remove the escape byte.</span>
              </li>
            </ul>
          </div>

          {/* 3. Bit Stuffing */}
          <div className="space-y-2 pt-2">
            <h3 className="text-lg sm:text-xl font-semibold text-[#232D2D]">
              Bit Stuffing
            </h3>
            <ul className="space-y-1.5 pl-2 list-none">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>The frame starts and ends with an 8-bit pattern (01111110).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  Again, this pattern may show up as part of the user data. So, the sender continuously monitors the user data and the moment it encounters five consecutive 1’s, it stuffs a 0.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>When the receiver reads the user data, it will automatically remove the stuffed zeroes.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <hr className="border-[#8A7059]/25 mb-14" />

      {/* SECTION 2: FLOW & ERROR CONTROL */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#232D2D]">
          Flow & Error Control
        </h2>
        <p className="mt-2 text-sm sm:text-base font-mono text-[#8A7059]">
          Select a protocol to explore its transmission rules and watch the live simulator.
        </p>
      </div>

      {/* Tab Switcher for 5 Protocols */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 rounded-md bg-[#EAE5DA]/70 border border-[#8A7059]/25">
          {[
            { id: 'utopian', label: '1. Simplex (Utopian)' },
            { id: 'stop-wait', label: '2. Stop-And-Wait' },
            { id: 'arq', label: '3. Stop-And-Wait ARQ' },
            { id: 'gbn', label: '4. Go-Back-N' },
            { id: 'selective-repeat', label: '5. Selective Repeat' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] sm:min-w-fit px-4 py-2.5 rounded-md font-medium text-xs sm:text-sm transition-all duration-200 select-none cursor-pointer ${isActive
                  ? 'bg-[#384545] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'text-[#6E5844] hover:bg-[#8A7059]/15 hover:text-[#232D2D]'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* TAB 1: SIMPLEX (UTOPIAN) PROTOCOL                         */}
      {/* ========================================================= */}
      {activeTab === 'utopian' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="p-6 sm:p-8 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/25">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#232D2D] mb-3">
              Simplex (Utopian) Protocol
            </h2>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed mb-4">
              The sender can keep sending frames for as long as it wants while the receiver has an infinite buffer to keep receiving frames.
            </p>
            <div className="pt-3 border-t border-[#8A7059]/20 flex items-start gap-2.5 sm:text-lg sm:text-base text-[#283535]">
              <strong className="text-[#283535] uppercase tracking-wider font-mono text-xs sm:text-lg mt-0.5">
                Disadvantage :
              </strong>
              <span>Not how the real-world works. No receiver has an infinite buffer to keep accommodating frames forever.</span>
            </div>
          </div>

          <div className="p-4 sm:p-10 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/30 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#8A7059]/20">
              <div className="flex items-center gap-3">
                {!utopianRunning ? (
                  <button
                    type="button"
                    onClick={() => setUtopianRunning(true)}
                    className="px-5 py-2.5 rounded-md bg-[#384545] text-[#FAF8F5] text-sm font-semibold hover:bg-[#2B3636] shadow-sm transition-all cursor-pointer"
                  >
                    ▶ Start Transmission
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setUtopianRunning(false)}
                    className="px-5 py-2.5 rounded-md bg-[#8A7059] text-[#FAF8F5] text-sm font-semibold hover:bg-[#735C47] shadow-sm transition-all cursor-pointer"
                  >
                    ⏸ Pause
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetUtopian}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono text-[#8A7059] hover:text-[#232D2D] transition-colors cursor-pointer"
                >
                  ↺ Reset
                </button>
              </div>

              <div className="font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-xl text-[#384545] font-semibold">
                Receiver Buffer: <span className="font-bold text-[#8A7059]">{utopianCount}</span> frames (Infinite capacity)
              </div>
            </div>

            <span className="sm:hidden font-mono text-[11px] text-[#8A7059] tracking-wider uppercase block">
              ← Scroll horizontally to explore simulation →
            </span>

            {/* Transmission Visualizer */}
            <div className="overflow-x-auto py-2 -mx-2 px-2">
              <div className="relative py-16 px-4 sm:px-12 flex items-center justify-between min-h-[160px] min-w-[560px]">
                <div className="flex flex-col items-center gap-3 z-10">
                  <div className="w-28 sm:w-32 py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-base sm:text-lg shadow-md">
                    Sender
                  </div>
                  <div className="flex items-center gap-1.5 opacity-70">
                    <div className="w-6 h-5 rounded bg-[#8A7059]" />
                    <div className="w-6 h-5 rounded bg-[#8A7059]" />
                    <div className="w-6 h-5 rounded bg-[#8A7059]" />
                  </div>
                </div>

                {/* Wire Conduit & Full-Size Smooth Gliding Frames */}
                <div className="flex-1 relative h-1 bg-[#384545] mx-4 sm:mx-8">
                  {utopianRunning && (
                    <>
                      {[0, 1.2, 2.4, 3.6].map((delay, idx) => (
                        <div
                          key={idx}
                          className="absolute top-1/2 -translate-y-1/2 w-14 h-8 rounded-lg bg-[#8A7059] shadow-md border border-white/40 flex items-center justify-center animate-utopianGlide"
                          style={{
                            animationDelay: `-${delay}s`
                          }}
                        >
                          <span className="w-2 h-2 rounded-full bg-white/70" />
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="flex flex-col items-center gap-3 z-10">
                  <div className="w-28 sm:w-32 py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-base sm:text-lg shadow-md">
                    Receiver
                  </div>
                  <div className="flex items-center gap-1.5 opacity-70">
                    <div className="w-6 h-5 rounded bg-[#8A7059]" />
                    <div className="w-6 h-5 rounded bg-[#8A7059]" />
                    <div className="w-6 h-5 rounded bg-[#8A7059]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* TAB 2: STOP-AND-WAIT PROTOCOL                             */}
      {/* ========================================================= */}
      {activeTab === 'stop-wait' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="p-6 sm:p-8 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/25">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#232D2D] mb-3">
              Stop-And-Wait Protocol
            </h2>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed mb-4">
              Here, the sender transmits a frame, and then waits for an acknowledgement from the receiver.
            </p>
            <div className="pt-3 border-t border-[#8A7059]/20 space-y-2 sm:text-lg sm:text-base text-[#283535]">
              <strong className="text-[#283535] uppercase tracking-wider font-mono text-xs sm:text-lg block">
                Disadvantages:
              </strong>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>
                    If the frame sent by the sender or the acknowledgment sent by the receiver is lost/corrupted during transmission, the sender and receiver are basically left waiting on each other (deadlock).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>The sender also sits idle when waiting for an acknowledgement.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 sm:p-10 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/30 shadow-sm space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#8A7059]/20">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={sawRunning}
                  onClick={handleStartSaw}
                  className={`px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm transition-all cursor-pointer ${sawRunning
                    ? 'bg-[#384545]/40 text-white cursor-not-allowed'
                    : 'bg-[#384545] text-[#FAF8F5] hover:bg-[#2B3636]'
                    }`}
                >
                  ▶ Run Simulation
                </button>

                <button
                  type="button"
                  onClick={handleResetSaw}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono text-[#8A7059] hover:text-[#232D2D] transition-colors cursor-pointer"
                >
                  ↺ Reset
                </button>
              </div>

              <div className="font-mono text-xs sm:text-sm text-[#8A7059]">
                {sawStep === 0 && 'Click "Run Simulation" to observe Stop-and-Wait deadlock'}
                {sawStep === 1 && 'Frame A transmitting →'}
                {sawStep === 2 && 'Frame A arrived safely'}
                {sawStep === 3 && '← ACK for A transmitting back'}
                {sawStep === 4 && 'ACK received. Preparing Frame B...'}
                {sawStep === 5 && 'Frame B transmitting →'}
                {sawStep === 6 && 'Frame B corrupted and lost mid-wire'}
                {sawStep >= 7 && 'DEADLOCK REACHED'}
              </div>
            </div>

            {/* Deadlock Text MOVED ABOVE THE DIAGRAM (Clean article typography, NO box, NO icon) */}
            {sawStep >= 8 && (
              <div className="text-center py-2 space-y-1.5 animate-fadeIn max-w-2xl mx-auto">
                <h4 className="text-base sm:text-lg font-bold text-[#232D2D] tracking-wider">
                  DEADLOCK
                </h4>
                <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                  Frame B has been lost/corrupted. The sender is now waiting for a response thinking the frame has been sent. The receiver is still waiting for the sender to transmit a frame.
                </p>
              </div>
            )}

            <span className="sm:hidden font-mono text-[11px] text-[#8A7059] tracking-wider uppercase block">
              ← Scroll horizontally to explore simulation →
            </span>

            {/* Transmission Visualizer Stage */}
            <div className="overflow-x-auto py-2 -mx-2 px-2">
              <div className="relative pt-12 pb-12 px-4 sm:px-12 flex items-center justify-between min-h-[200px] min-w-[560px]">
              <div className="flex flex-col items-center gap-3 z-10 w-28 sm:w-36 flex-shrink-0">
                <div className="h-6 flex items-center justify-center">
                  {sawStep === 4 && (
                    <span className="font-bold text-xs text-emerald-800 animate-fadeIn">
                      ACK received
                    </span>
                  )}
                  {sawStep >= 8 && (
                    <span className="font-bold text-xs text-[#8A7059] animate-fadeIn">
                      Waiting for ACK...
                    </span>
                  )}
                </div>

                <div className="w-full py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-base sm:text-lg shadow-md">
                  Sender
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-16 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${sawStep >= 5 ? 'opacity-20 bg-gray-400 text-gray-700' : 'bg-[#8A7059] text-white'
                      }`}
                  >
                    B
                  </div>
                  <div
                    className={`w-16 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${sawStep >= 1 ? 'opacity-20 bg-gray-400 text-gray-700' : 'bg-[#8A7059] text-white'
                      }`}
                  >
                    A
                  </div>
                </div>
              </div>

              <div className="flex-1 relative h-1 bg-[#384545] mx-4 sm:mx-8">
                {sawStep === 1 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-24 h-9 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame A
                  </div>
                )}

                {sawStep === 3 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-24 h-9 rounded-lg bg-[#384545] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md animate-travelBackward">
                    ACK for A
                  </div>
                )}

                {sawStep === 5 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-24 h-9 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelToCenter">
                    Frame B
                  </div>
                )}

                {sawStep === 6 && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 animate-floatAndFade">
                    <span className="font-bold text-xs text-red-600 tracking-wide">
                      Corrupted and lost
                    </span>
                    <div className="w-24 h-9 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md">
                      Frame B
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-3 z-10 w-28 sm:w-36 flex-shrink-0">
                <div className="h-6 flex items-center justify-center">
                  {sawStep === 2 && (
                    <span className="font-bold text-xs text-emerald-800 animate-fadeIn">
                      Frame received
                    </span>
                  )}
                  {sawStep >= 8 && (
                    <span className="font-bold text-xs text-[#8A7059] animate-fadeIn">
                      Waiting for sender...
                    </span>
                  )}
                </div>

                <div className="w-full py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-base sm:text-lg shadow-md">
                  Receiver
                </div>

                <div className="min-h-[32px] flex items-center justify-center">
                  {sawStep >= 2 ? (
                    <div className="w-16 h-8 rounded-lg bg-[#8A7059] text-white text-xs font-bold flex items-center justify-center">
                      A
                    </div>
                  ) : (
                    <div className="w-16 h-8 rounded-lg border-2 border-dashed border-[#8A7059]/30" />
                  )}
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* TAB 3: STOP-AND-WAIT ARQ                                  */}
      {/* ========================================================= */}
      {activeTab === 'arq' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="p-6 sm:p-8 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/25">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#232D2D] mb-3">
              Stop-And-Wait ARQ
            </h2>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed mb-4">
              It borrows the concept of normal Stop-And-Wait and adds two new features : A timeout and a 1-bit sequence number.
            </p>
            <div className="space-y-3 sm:text-lg sm:text-base text-[#283535] leading-relaxed">
              <p>
                Once the sender has sent a frame with a sequence number (say 0), it waits for a response from the receiver only for a certain timeout period. Once the timeout period expires, the sender just assumes the frame was lost/destroyed and retransmits with the same sequence number.
              </p>
              <p>
                When the frame reaches the receiver, it checks the sequence number, and if it matches a frame already with the receiver (meaning the one sent was a duplicate), it discards the new frame. Otherwise, it will accept it.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#8A7059]/20 flex items-start gap-2.5 sm:text-lg sm:text-base text-[#283535]">
              <strong className="text-[#283535] uppercase tracking-wider font-mono text-xs sm:text-lg mt-0.5">
                Disadvantage :
              </strong>
              <span>Inefficient</span>
            </div>
          </div>

          <div className="p-4 sm:p-10 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/30 shadow-sm space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#8A7059]/20">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={arqRunning}
                  onClick={handleStartArq}
                  className={`px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm transition-all cursor-pointer ${arqRunning
                    ? 'bg-[#384545]/40 text-white cursor-not-allowed'
                    : 'bg-[#384545] text-[#FAF8F5] hover:bg-[#2B3636]'
                    }`}
                >
                  ▶ Run ARQ Simulation
                </button>

                <button
                  type="button"
                  onClick={handleResetArq}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono text-[#8A7059] hover:text-[#232D2D] transition-colors cursor-pointer"
                >
                  ↺ Reset
                </button>
              </div>

              <div className="font-mono text-xs sm:text-sm text-[#8A7059]">
                {arqStep === 0 && 'Ready to send Frame A (Seq 0)'}
                {arqStep === 1 && 'Transmitting Frame A 0 →'}
                {arqStep === 2 && 'Frame 0 received'}
                {arqStep === 3 && '← Returning ACK 0'}
                {arqStep === 4 && 'ACK 0 lost mid-wire'}
                {arqStep === 5 && `⏱ Timeout countdown: 00:0${arqCountdown}`}
                {arqStep === 6 && 'Timer expired'}
                {arqStep === 7 && 'Retransmitting Frame A 0 →'}
                {arqStep === 8 && 'Duplicate detected at receiver'}
                {arqStep === 9 && 'Duplicate discarded'}
                {arqStep === 10 && '← Re-sending ACK 0'}
                {arqStep === 11 && 'ACK received : Complete'}
              </div>
            </div>

            {/* Explanatory Message Held Upon Timeout Expiry */}
            {arqStep === 6 && (
              <div className="text-center py-2 animate-fadeIn">
                <p className="text-base sm:text-lg font-bold text-[#8A7059] tracking-wide">
                  Timer ran out. No ACK received. Sender assumes frame was lost and retransmits again.
                </p>
              </div>
            )}

            <span className="sm:hidden font-mono text-[11px] text-[#8A7059] tracking-wider uppercase block">
              ← Scroll horizontally to explore simulation →
            </span>

            {/* Transmission Visualizer Stage */}
            <div className="overflow-x-auto py-2 -mx-2 px-2">
              <div className="relative pt-12 pb-12 px-4 sm:px-12 flex items-center justify-between min-h-[220px] min-w-[560px]">
              <div className="flex flex-col items-center gap-3 z-10 w-32 sm:w-44 flex-shrink-0">
                <div className="h-6 flex items-center justify-center whitespace-nowrap">
                  {arqStep === 5 && (
                    <span className="font-mono font-bold text-xs sm:text-sm text-red-600 animate-pulse">
                      ⏱ 00:0{arqCountdown}
                    </span>
                  )}
                  {arqStep === 11 && (
                    <span className="font-bold text-xs text-emerald-800 animate-fadeIn">
                      ACK received : Complete
                    </span>
                  )}
                </div>

                <div className="w-full py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-base sm:text-lg shadow-md">
                  Sender
                </div>

                <div className="w-20 h-8 rounded-lg bg-[#8A7059] text-white text-xs font-bold flex items-center justify-center">
                  A 0
                </div>
              </div>

              <div className="flex-1 relative h-1 bg-[#384545] mx-4 sm:mx-8">
                {arqStep === 1 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-24 h-9 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    A 0
                  </div>
                )}

                {arqStep === 3 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-24 h-9 rounded-lg bg-[#384545] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md animate-travelBackToCenter">
                    ACK 0
                  </div>
                )}

                {arqStep === 4 && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 animate-floatAndFade">
                    <span className="font-bold text-xs text-red-600 tracking-wide">
                      ACK lost
                    </span>
                    <div className="w-24 h-9 rounded-lg bg-[#384545] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md">
                      ACK 0
                    </div>
                  </div>
                )}

                {arqStep === 7 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-36 h-9 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward whitespace-nowrap px-2">
                    A0 (Retransmitted)
                  </div>
                )}

                {arqStep === 10 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-24 h-9 rounded-lg bg-[#384545] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md animate-travelBackward">
                    ACK 0 (Safe)
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-3 z-10 w-32 sm:w-44 flex-shrink-0 relative">
                {/* Step 8: Hold "Duplicate detected" */}
                {arqStep === 8 && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 animate-fadeIn">
                    <span className="font-bold text-xs text-amber-800 whitespace-nowrap mb-1">
                      Duplicate detected
                    </span>
                    <div className="w-36 h-9 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md whitespace-nowrap px-2">
                      A0 (Retransmitted)
                    </div>
                  </div>
                )}

                {/* Step 9: Smooth fade up into space (no tacky rotation) with red text */}
                {arqStep === 9 && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 animate-smoothFadeUp">
                    <span className="font-bold text-xs text-red-600 whitespace-nowrap mb-1">
                      Duplicate : Discarded
                    </span>
                    <div className="w-36 h-9 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md whitespace-nowrap px-2">
                      A0 (Retransmitted)
                    </div>
                  </div>
                )}

                <div className="h-6 flex items-center justify-center whitespace-nowrap">
                  {arqStep === 2 && (
                    <span className="font-bold text-xs text-emerald-800 animate-fadeIn">
                      Frame 0 received
                    </span>
                  )}
                </div>

                <div className="w-full py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-base sm:text-lg shadow-md">
                  Receiver
                </div>

                <div className="min-h-[32px] flex items-center justify-center">
                  {arqStep >= 2 && (
                    <div className="w-20 h-8 rounded-lg bg-[#8A7059] text-white text-xs font-bold flex items-center justify-center">
                      A 0
                    </div>
                  )}
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* TAB 4: GO-BACK-N (SLIDING WINDOW)                         */}
      {/* ========================================================= */}
      {activeTab === 'gbn' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="p-6 sm:p-8 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/25">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#232D2D] mb-3">
              Go-Back-N (Sliding Window)
            </h2>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed mb-4">
              The sender transmits frames, but the receiver will only ever accept the frames in the exact specific order. Any kind of error will trigger the receiver to drop all the frames and require a complete retransmission of the whole thing.
            </p>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed mb-4">
              This is because the window for the sender allows it to send (n-1) frames, but the window for the receiver allows it to receive only 1 frame. In simple terms, the receiver has no memory to keep track of the frames.
            </p>

            <div className="space-y-3 pt-2 text-base sm:text-lg text-[#283535] leading-relaxed">
              <p className="font-semibold text-[#232D2D]">For example :</p>
              <p>Sender sends frames 1, 2, 3, 4, 5, and 6</p>
              <p>1, 2, and 3 reach the receiver, 4 is lost during transmission, and 5 and 6 reach the receiver.</p>
              <p>
                Even though only one frame is lost (Frame 4), and the others have reached safely, the receiver will drop everything after the first lost frame, meaning it will drop 5 and 6, and the sender will have to retransmit frames 4, 5, and 6 all over again.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-10 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/30 shadow-sm space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#8A7059]/20">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={gbnRunning}
                  onClick={handleStartGbn}
                  className={`px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm transition-all cursor-pointer ${gbnRunning
                    ? 'bg-[#384545]/40 text-white cursor-not-allowed'
                    : 'bg-[#384545] text-[#FAF8F5] hover:bg-[#2B3636]'
                    }`}
                >
                  ▶ Run Go-Back-N Simulation
                </button>

                <button
                  type="button"
                  onClick={handleResetGbn}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono text-[#8A7059] hover:text-[#232D2D] transition-colors cursor-pointer"
                >
                  ↺ Reset
                </button>
              </div>

              <div className="font-mono text-xs sm:text-sm text-[#8A7059]">
                {gbnStep === 0 && 'Ready to send frames 1, 2, 3, 4, 5, 6'}
                {gbnStep === 1 && 'Frame 1 transmitting →'}
                {gbnStep === 2 && 'Frame 2 transmitting →'}
                {gbnStep === 3 && 'Frame 3 transmitting →'}
                {gbnStep === 4 && 'Frame 4 lost mid-wire'}
                {gbnStep === 5 && 'Frame 5 transmitting across wire →'}
                {gbnStep === 6 && 'Frame 5 out of order → Discarded by receiver'}
                {gbnStep === 7 && 'Frame 6 transmitting across wire →'}
                {gbnStep === 8 && 'Frame 6 out of order → Discarded by receiver'}
                {gbnStep === 9 && ''}
                {gbnStep === 10 && 'Rewinding window: Frames 4, 5, 6'}
                {gbnStep === 11 && 'Retransmitting Frame 4 →'}
                {gbnStep === 12 && 'Retransmitting Frame 5 →'}
                {gbnStep === 13 && 'Retransmitting Frame 6 →'}
                {gbnStep === 14 && 'All frames 1–6 delivered and acknowledged in order'}
              </div>
            </div>

            {/* Explanatory Message Above Diagram Held Before Amber Retransmit */}
            {gbnStep === 9 && (
              <div className="text-center py-2 animate-fadeIn">
                <p className="text-base sm:text-lg font-bold text-[#8A7059] tracking-wide">
                  Sender needs to retransmit everything from Frame 4 again just because one frame was lost
                </p>
              </div>
            )}

            <span className="sm:hidden font-mono text-[11px] text-[#8A7059] tracking-wider uppercase block">
              ← Scroll horizontally to explore simulation →
            </span>

            {/* Transmission Visualizer Stage */}
            <div className="overflow-x-auto py-2 -mx-2 px-2">
              <div className="relative pt-12 pb-12 px-2 sm:px-8 flex items-center justify-between min-h-[260px] min-w-[620px]">
              <div className="flex flex-col items-center gap-3 z-10 w-36 sm:w-44 flex-shrink-0">
                <div className="w-full py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-sm sm:text-base shadow-md">
                  Sender
                </div>

                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EAE5DA]/60 border border-[#8A7059]/25">
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    const isAcked = (num <= 3 && gbnStep >= 4) || (num >= 4 && gbnStep === 14);
                    const isAmberRetransmit = num >= 4 && gbnStep >= 10 && gbnStep < 14;
                    return (
                      <div
                        key={num}
                        className={`w-6 sm:w-7 h-7 sm:h-8 rounded flex items-center justify-center font-bold text-xs transition-colors duration-300 ${isAmberRetransmit
                          ? 'bg-amber-600 text-white animate-pulse'
                          : isAcked
                            ? 'bg-[#384545] text-white'
                            : 'bg-[#8A7059] text-white'
                          }`}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
                <span className="font-mono text-[10px] text-[#8A7059]">
                  Sender Window: (n-1) frames
                </span>
              </div>

              {/* Wire Conduit: strictly ONE frame traveling at any given moment! */}
              <div className="flex-1 relative h-1 bg-[#384545] mx-3 sm:mx-6">
                {gbnStep === 1 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 1
                  </div>
                )}

                {gbnStep === 2 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 2
                  </div>
                )}

                {gbnStep === 3 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 3
                  </div>
                )}

                {gbnStep === 4 && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 animate-floatAndFade">
                    <span className="font-bold text-xs text-red-600 tracking-wide">
                      Corrupted and lost
                    </span>
                    <div className="w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md">
                      Frame 4
                    </div>
                  </div>
                )}

                {/* Step 5: Frame 5 traveling across wire ONLY */}
                {gbnStep === 5 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 5
                  </div>
                )}

                {/* Step 7: Frame 6 traveling across wire ONLY */}
                {gbnStep === 7 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 6
                  </div>
                )}

                {/* Step 11: Retransmitted Frame 4 (amber) */}
                {gbnStep === 11 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 4
                  </div>
                )}

                {/* Step 12: Retransmitted Frame 5 (amber) */}
                {gbnStep === 12 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 5
                  </div>
                )}

                {/* Step 13: Retransmitted Frame 6 (amber) */}
                {gbnStep === 13 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 6
                  </div>
                )}
              </div>

              {/* Receiver Node */}
              <div className="flex flex-col items-center gap-3 z-10 w-36 sm:w-44 flex-shrink-0 relative">
                {/* Step 6: Frame 5 arrives at receiver, lifts up and smoothly fades into space */}
                {gbnStep === 6 && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center animate-smoothFadeUp z-20">
                    <span className="font-bold text-xs text-red-600 whitespace-nowrap mb-1">
                      Discarded : not in order
                    </span>
                    <div className="w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md">
                      Frame 5
                    </div>
                  </div>
                )}

                {/* Step 8: Frame 6 arrives at receiver, lifts up and smoothly fades into space */}
                {gbnStep === 8 && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center animate-smoothFadeUp z-20">
                    <span className="font-bold text-xs text-red-600 whitespace-nowrap mb-1">
                      Discarded : not in order
                    </span>
                    <div className="w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md">
                      Frame 6
                    </div>
                  </div>
                )}

                <div className="w-full py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-sm sm:text-base shadow-md">
                  Receiver
                </div>

                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EAE5DA]/60 border border-[#8A7059]/25">
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    const isAccepted = gbnReceivedSlots.includes(num);
                    return (
                      <div
                        key={num}
                        className={`w-6 sm:w-7 h-7 sm:h-8 rounded flex items-center justify-center font-bold text-xs transition-colors duration-300 ${isAccepted
                          ? 'bg-[#8A7059] text-white shadow-sm'
                          : 'border border-dashed border-[#8A7059]/40 text-[#8A7059]/50'
                          }`}
                      >
                        {isAccepted ? num : `[${num}]`}
                      </div>
                    );
                  })}
                </div>
                <span className="font-mono text-[10px] text-[#8A7059]">
                  Receiver Window: 1 frame (No memory)
                </span>
              </div>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* TAB 5: SELECTIVE REPEAT (SLIDING WINDOW)                  */}
      {/* ========================================================= */}
      {activeTab === 'selective-repeat' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="p-6 sm:p-8 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/25">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#232D2D] mb-3">
              Selective Repeat (Sliding Window)
            </h2>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Here, once the sender transmits the frames to the receiver, it will only need to retransmit the lost/corrupted frames because here both the sender and the receiver have a window of (n-1) frames, so the receiver can keep track of the frames.
            </p>
          </div>

          <div className="p-4 sm:p-10 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/30 shadow-sm space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#8A7059]/20">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={srRunning}
                  onClick={handleStartSr}
                  className={`px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm transition-all cursor-pointer ${srRunning
                    ? 'bg-[#384545]/40 text-white cursor-not-allowed'
                    : 'bg-[#384545] text-[#FAF8F5] hover:bg-[#2B3636]'
                    }`}
                >
                  ▶ Run Selective Repeat Simulation
                </button>

                <button
                  type="button"
                  onClick={handleResetSr}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono text-[#8A7059] hover:text-[#232D2D] transition-colors cursor-pointer"
                >
                  ↺ Reset
                </button>
              </div>

              <div className="font-mono text-xs sm:text-sm text-[#8A7059]">
                {srStep === 0 && 'Ready to send frames 1, 2, 3, 4, 5, 6'}
                {srStep === 1 && 'Frame 1 transmitting →'}
                {srStep === 2 && 'Frame 2 transmitting →'}
                {srStep === 3 && 'Frame 3 transmitting →'}
                {srStep === 4 && 'Frame 4 lost mid-wire'}
                {srStep === 5 && 'Frame 5 transmitting →'}
                {srStep === 6 && 'Frame 6 transmitting →'}
                {srStep === 7 && ''}
                {srStep === 8 && 'Timeout ONLY on Frame 4'}
                {srStep === 9 && 'Retransmitting ONLY Frame 4 →'}
                {srStep === 10 && 'Frame 4 slotted in.'}
              </div>
            </div>

            {/* Explanatory Message Above Diagram Held Before Amber Retransmit */}
            {srStep === 7 && (
              <div className="text-center py-2 animate-fadeIn">
                <p className="text-base sm:text-lg font-bold text-[#8A7059] tracking-wide">
                  Sender only needs to retransmit the missing Frame 4.
                </p>
              </div>
            )}

            <span className="sm:hidden font-mono text-[11px] text-[#8A7059] tracking-wider uppercase block">
              ← Scroll horizontally to explore simulation →
            </span>

            {/* Transmission Visualizer Stage */}
            <div className="overflow-x-auto py-2 -mx-2 px-2">
              <div className="relative pt-12 pb-12 px-2 sm:px-8 flex items-center justify-between min-h-[260px] min-w-[620px]">
              <div className="flex flex-col items-center gap-3 z-10 w-36 sm:w-44 flex-shrink-0">
                <div className="w-full py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-sm sm:text-base shadow-md">
                  Sender
                </div>

                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EAE5DA]/60 border border-[#8A7059]/25">
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    const isAmberRetransmit = num === 4 && srStep >= 8 && srStep < 10;
                    const isAcked = (num !== 4 && srStep >= 4) || (num === 4 && srStep === 10);
                    return (
                      <div
                        key={num}
                        className={`w-6 sm:w-7 h-7 sm:h-8 rounded flex items-center justify-center font-bold text-xs transition-colors duration-300 ${isAmberRetransmit
                          ? 'bg-amber-600 text-white animate-pulse'
                          : isAcked
                            ? 'bg-[#384545] text-white'
                            : 'bg-[#8A7059] text-white'
                          }`}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
                <span className="font-mono text-[10px] text-[#8A7059]">
                  Sender Window: (n-1) frames
                </span>
              </div>

              <div className="flex-1 relative h-1 bg-[#384545] mx-3 sm:mx-6">
                {srStep === 1 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 1
                  </div>
                )}

                {srStep === 2 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 2
                  </div>
                )}

                {srStep === 3 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 3
                  </div>
                )}

                {srStep === 4 && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 animate-floatAndFade">
                    <span className="font-bold text-xs text-red-600 tracking-wide">
                      Corrupted and lost
                    </span>
                    <div className="w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md">
                      Frame 4
                    </div>
                  </div>
                )}

                {srStep === 5 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 5
                  </div>
                )}

                {srStep === 6 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-[#8A7059] text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 6
                  </div>
                )}

                {srStep === 9 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-md animate-travelForward">
                    Frame 4
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-3 z-10 w-36 sm:w-44 flex-shrink-0">
                <div className="w-full py-3 rounded-xl bg-[#384545] text-white font-semibold text-center text-sm sm:text-base shadow-md">
                  Receiver
                </div>

                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EAE5DA]/60 border border-[#8A7059]/25">
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    const isDelivered = srReceivedSlots.includes(num);
                    const isBuffered = srBufferedSlots.includes(num);
                    const isMissing = num === 4 && srStep >= 4 && srStep < 10;
                    return (
                      <div
                        key={num}
                        className={`w-6 sm:w-7 h-7 sm:h-8 rounded flex items-center justify-center font-bold text-xs transition-colors duration-300 ${isDelivered
                          ? 'bg-[#8A7059] text-white shadow-sm'
                          : isBuffered
                            ? 'bg-[#384545] text-white ring-2 ring-emerald-500'
                            : isMissing
                              ? 'border-2 border-dashed border-red-400 text-red-500 bg-red-50'
                              : 'border border-dashed border-[#8A7059]/40 text-[#8A7059]/50'
                          }`}
                        title={isBuffered ? `Frame ${num} buffered in memory` : ''}
                      >
                        {isMissing ? '?' : num}
                      </div>
                    );
                  })}
                </div>
                <span className="font-mono text-[10px] text-[#8A7059]">
                  Receiver Window: (n-1) frames (Buffers out-of-order)
                </span>
              </div>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: ERROR DETECTION (CRC)                          */}
      {/* ========================================================= */}
      <section className="mt-16 sm:mt-20 pt-10 sm:pt-14 border-t border-[#8A7059]/25 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#232D2D]">
            Error Detection (CRC)
          </h2>
          <span className="px-3 py-0.5 rounded-full bg-[#8A7059]/15 text-[#8A7059] border border-[#8A7059]/30 font-mono text-xs font-bold uppercase tracking-wider">
            Coming Soon
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#6E5844] font-mono leading-relaxed">
          Cyclic Redundancy Check (CRC-32) polynomial division, generator polynomials, and Frame Check Sequence (FCS) verification.
        </p>
      </section>
    </NetworkPageLayout>
  );
}
