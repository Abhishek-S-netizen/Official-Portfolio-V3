import React from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page2_2_PointToPoint({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="2-2-point-to-point"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* SECTION 1: HDLC FUNDAMENTALS & MODES */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          High-Level Data Link Control
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          HDLC is a bit-oriented protocol that handles communication over multipoint links. It uses the Stop-And-Wait protocol.
        </p>

        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#232D2D]">
            It consists of two transfer modes :
          </h2>
          <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Normal Response Mode :</strong> One primary station and a bunch of secondary stations. The primary station initiates the communication, and the secondary stations can only respond.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Asynchronous Balanced Mode :</strong> Any station can act as a primary or secondary station.
              </span>
            </li>
          </ul>
        </div>

        {/* Three Types of Frames */}
        <div className="pt-4 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            The three types of frames in HDLC
          </h2>
          <div className="space-y-3 text-base sm:text-lg text-[#283535] leading-relaxed">
            <div>
              <h3 className="font-bold text-[#232D2D]">I-Frame</h3>
              <p className="pl-3 border-l-2 border-[#8A7059]/40 text-[#6E5844] font-bold">
                Information Frame : Holds the user data.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#232D2D]">S-Frame</h3>
              <p className="pl-3 border-l-2 border-[#8A7059]/40 text-[#6E5844] font-bold">
                Supervisory Frame : Contains control information.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#232D2D]">U-Frame</h3>
              <p className="pl-3 border-l-2 border-[#8A7059]/40 text-[#6E5844] font-bold">
                Unnumbered Frame : Contains system and link management information.
              </p>
            </div>
          </div>
        </div>

        {/* Four Types of S-Frames */}
        <div className="pt-4 space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
            Additionally, there are four types of S-Frames :
          </h3>
          <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Receive Ready :</strong> Received frame, ready for next frame.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Receive Not Ready :</strong> Received frame, buffer full, cannot receive any more frames.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Reject :</strong> Received frames are corrupted, retransmit everything again.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Selective Reject :</strong> Only retransmit the corrupted frames.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: FRAME STRUCTURE DIAGRAMS                       */}
      {/* ========================================================= */}
      <section className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#8A7059]/25 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl text-[#232D2D]">
            HDLC Frame Architectures
          </h2>
          <span className="sm:hidden inline-flex items-center gap-1.5 text-xs font-mono text-[#8A7059] px-2.5 py-1 rounded-md w-fit font-bold">
            <span className="text-[13px]">⇄</span>
            <span>Swipe horizontally to view full frame</span>
          </span>
        </div>

        <div className="space-y-12">
          {/* 1. I-FRAME DIAGRAM */}
          <div className="space-y-3">
            <div className="font-semibold text-base sm:text-lg text-[#232D2D]">
              I-Frame (Information Frame)
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[680px] flex items-stretch h-14 sm:h-16 text-xs sm:text-sm font-semibold select-none shadow-xs rounded-lg overflow-hidden border border-[#384545]/20">
                <div className="w-[14%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  FLAG
                </div>
                <div className="w-[14%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                  ADDRESS
                </div>
                <div className="w-[14%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  CONTROL
                </div>
                <div className="flex-1 bg-[#222222] text-[#ffffff] border-x border-[#384545]/30 flex items-center justify-center tracking-wider font-bold">
                  USER INFORMATION
                </div>
                <div className="w-[14%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                  FCS
                </div>
                <div className="w-[14%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  FLAG
                </div>
              </div>
            </div>
          </div>

          {/* 2. S-FRAME DIAGRAM */}
          <div className="space-y-3">
            <div className="font-semibold text-base sm:text-lg text-[#232D2D]">
              S-Frame (Supervisory Frame)
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[500px] max-w-[700px] flex items-stretch h-14 sm:h-16 text-xs sm:text-sm font-semibold select-none shadow-xs rounded-lg overflow-hidden border border-[#384545]/20">
                <div className="w-[20%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  FLAG
                </div>
                <div className="w-[20%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                  ADDRESS
                </div>
                <div className="w-[20%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  CONTROL
                </div>
                <div className="w-[20%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                  FCS
                </div>
                <div className="w-[20%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  FLAG
                </div>
              </div>
            </div>
          </div>

          {/* 3. U-FRAME DIAGRAM */}
          <div className="space-y-3">
            <div className="font-semibold text-base sm:text-lg text-[#232D2D]">
              U-Frame (Unnumbered Frame)
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[680px] flex items-stretch h-14 sm:h-16 text-xs sm:text-sm font-semibold select-none shadow-xs rounded-lg overflow-hidden border border-[#384545]/20">
                <div className="w-[14%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  FLAG
                </div>
                <div className="w-[14%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                  ADDRESS
                </div>
                <div className="w-[14%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  CONTROL
                </div>
                <div className="flex-1 bg-[#222222] text-[#FFFFFF] border-x border-[#384545]/30 flex items-center justify-center tracking-wider font-bold">
                  MANAGEMENT INFORMATION
                </div>
                <div className="w-[14%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                  FCS
                </div>
                <div className="w-[14%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                  FLAG
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: FIELD BREAKDOWN                                */}
      {/* ========================================================= */}
      <section className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#8A7059]/25 space-y-6">
        <ul className="space-y-4 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Flag :</strong> Holds the 8-bit flag that delimits the frame (01111110).
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <div>
              <span>
                <strong className="text-[#232D2D]">Address Field :</strong> Always contains the address of the secondary station.
              </span>
              <ul className="mt-2 space-y-1.5 pl-4 list-none text-sm sm:text-base text-[#6E5844]">
                <li className="flex items-start gap-2">
                  <span className="text-[#8A7059] font-bold">-</span>
                  <span className="font-bold">If the frame is created by a primary station : “to address”</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8A7059] font-bold">-</span>
                  <span className="font-bold">If the frame is created by a secondary station : “from address”</span>
                </li>
              </ul>
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Control Field :</strong> Control information for flow and error control.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">User Information field :</strong> User data.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Management Information field :</strong> Management data.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">FCS :</strong> Frame Check Sequence.
            </span>
          </li>
        </ul>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: CONTROL FIELD BREAKDOWN                        */}
      {/* ========================================================= */}
      <section className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#8A7059]/25 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl text-[#232D2D]">
              Control Field Breakdown
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#6E5844] font-mono leading-relaxed">
              How the 8-bit control field is organized across the three HDLC frame types.
            </p>
          </div>
          <span className="sm:hidden inline-flex items-center gap-1.5 text-xs font-mono text-[#8A7059] px-2.5 py-1 rounded-md w-fit shrink-0 font-bold">
            <span className="text-[13px]">⇄</span>
            <span>Swipe horizontally to inspect 8 bits</span>
          </span>
        </div>

        <div className="space-y-16">
          {/* 1. CONTROL FIELD IN AN I-FRAME */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Control field in an I-Frame
            </h3>
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[620px] max-w-[760px]">
                {/* The 8-bit strip */}
                <div className="grid grid-cols-8 h-14 sm:h-16 rounded-lg overflow-hidden border border-[#384545]/30 shadow-xs font-semibold text-sm sm:text-base">
                  {/* Bit 0 */}
                  <div className="bg-[#384545] text-white flex items-center justify-center font-bold">
                    0
                  </div>
                  {/* Bits 1, 2, 3: N(S) */}
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] border-r border-[#384545]/20 flex items-center justify-center" />
                  {/* Bit 4: P/F Bit */}
                  <div className="bg-[#8A7059] text-white flex items-center justify-center font-bold px-1 text-center text-xs sm:text-sm">
                    P/F Bit
                  </div>
                  {/* Bits 5, 6, 7: N(R) */}
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] flex items-center justify-center" />
                </div>

                {/* Callout Annotations Below matching mockup */}
                <div className="grid grid-cols-8 pt-3 text-xs sm:text-sm text-[#283535]">
                  {/* Pointer for Bit 0 */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-[#384545]/40" />
                    <span className="mt-1 text-center font-mono leading-tight text-[#232D2D] font-medium">
                      Indicates it’s an I-Frame
                    </span>
                  </div>

                  {/* Bracket for N(S) across cols 2, 3, 4 */}
                  <div className="col-span-3 px-2 flex flex-col items-center">
                    <svg width="100%" height="12" viewBox="0 0 100 12" preserveAspectRatio="none" className="text-[#384545]/60">
                      <path d="M 2 2 L 2 6 Q 2 10 8 10 L 44 10 Q 50 10 50 12 Q 50 10 56 10 L 92 10 Q 98 10 98 6 L 98 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="mt-1.5 text-center font-mono leading-tight text-[#232D2D]">
                      <strong className="block text-[#232D2D]">N(S) – 3 bits</strong>
                      <span>Sequence number of the frame</span>
                    </span>
                  </div>

                  {/* Blank spacer for P/F */}
                  <div />

                  {/* Bracket for N(R) across cols 6, 7, 8 */}
                  <div className="col-span-3 px-2 flex flex-col items-center">
                    <svg width="100%" height="12" viewBox="0 0 100 12" preserveAspectRatio="none" className="text-[#384545]/60">
                      <path d="M 2 2 L 2 6 Q 2 10 8 10 L 44 10 Q 50 10 50 12 Q 50 10 56 10 L 92 10 Q 98 10 98 6 L 98 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="mt-1.5 text-center font-mono leading-tight text-[#232D2D]">
                      <strong className="block text-[#232D2D]">N(R) – 3 bits</strong>
                      <span>Acknowledgement number</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CONTROL FIELD IN AN S-FRAME */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Control field in an S-Frame
            </h3>
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[620px] max-w-[760px]">
                {/* The 8-bit strip */}
                <div className="grid grid-cols-8 h-14 sm:h-16 rounded-lg overflow-hidden border border-[#384545]/30 shadow-xs font-semibold text-sm sm:text-base">
                  {/* Bit 0 & 1: 1 0 */}
                  <div className="bg-[#384545] text-white border-r border-white/20 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="bg-[#384545] text-white flex items-center justify-center font-bold">
                    0
                  </div>
                  {/* Bits 2, 3: Code */}
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] border-r border-[#384545]/20 flex items-center justify-center" />
                  {/* Bit 4: P/F Bit */}
                  <div className="bg-[#8A7059] text-white flex items-center justify-center font-bold px-1 text-center text-xs sm:text-sm">
                    P/F Bit
                  </div>
                  {/* Bits 5, 6, 7: N(R) */}
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] flex items-center justify-center" />
                </div>

                {/* Callout Annotations Below */}
                <div className="grid grid-cols-8 pt-3 text-xs sm:text-sm text-[#283535]">
                  {/* Bracket for Bits 0 & 1 */}
                  <div className="col-span-2 px-2 flex flex-col items-center">
                    <svg width="100%" height="12" viewBox="0 0 70 12" preserveAspectRatio="none" className="text-[#384545]/60">
                      <path d="M 2 2 L 2 6 Q 2 10 6 10 L 29 10 Q 35 10 35 12 Q 35 10 41 10 L 64 10 Q 68 10 68 6 L 68 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="mt-1.5 text-center font-mono leading-tight text-[#232D2D] font-medium">
                      Indicates it’s an S-Frame
                    </span>
                  </div>

                  {/* Bracket for Code across cols 3, 4 */}
                  <div className="col-span-2 px-2 flex flex-col items-center">
                    <svg width="100%" height="12" viewBox="0 0 70 12" preserveAspectRatio="none" className="text-[#384545]/60">
                      <path d="M 2 2 L 2 6 Q 2 10 6 10 L 29 10 Q 35 10 35 12 Q 35 10 41 10 L 64 10 Q 68 10 68 6 L 68 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="mt-1.5 text-center font-mono leading-tight text-[#232D2D]">
                      <strong className="block text-[#232D2D]">Code – 2 bits</strong>
                      <span>Indicates the type of S-Frame</span>
                    </span>
                  </div>

                  {/* Blank spacer for P/F */}
                  <div />

                  {/* Bracket for N(R) across cols 6, 7, 8 */}
                  <div className="col-span-3 px-2 flex flex-col items-center">
                    <svg width="100%" height="12" viewBox="0 0 100 12" preserveAspectRatio="none" className="text-[#384545]/60">
                      <path d="M 2 2 L 2 6 Q 2 10 8 10 L 44 10 Q 50 10 50 12 Q 50 10 56 10 L 92 10 Q 98 10 98 6 L 98 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="mt-1.5 text-center font-mono leading-tight text-[#232D2D]">
                      <strong className="block text-[#232D2D]">N(R) – 3 bits</strong>
                      <span>Acknowledgement number</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CONTROL FIELD IN A U-FRAME */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Control field in a U-Frame
            </h3>
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[620px] max-w-[760px]">
                {/* The 7-cell strip per mockup */}
                <div className="grid grid-cols-7 h-14 sm:h-16 rounded-lg overflow-hidden border border-[#384545]/30 shadow-xs font-semibold text-sm sm:text-base">
                  {/* Bits 0 & 1: 1 1 */}
                  <div className="bg-[#384545] text-white border-r border-white/20 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="bg-[#384545] text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  {/* Code - 2 bits */}
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] border-r border-[#384545]/20 flex items-center justify-center" />
                  {/* P/F Bit */}
                  <div className="bg-[#8A7059] text-white flex items-center justify-center font-bold px-1 text-center text-xs sm:text-sm">
                    P/F Bit
                  </div>
                  {/* Code - 2 bits */}
                  <div className="bg-[#999999] border-r border-[#384545]/100 flex items-center justify-center" />
                  <div className="bg-[#999999] flex items-center justify-center" />
                </div>

                {/* Callout Annotations Below */}
                <div className="grid grid-cols-7 pt-3 text-xs sm:text-sm text-[#283535]">
                  {/* Bracket for Bits 0 & 1 */}
                  <div className="col-span-2 px-2 flex flex-col items-center">
                    <svg width="100%" height="12" viewBox="0 0 70 12" preserveAspectRatio="none" className="text-[#384545]/60">
                      <path d="M 2 2 L 2 6 Q 2 10 6 10 L 29 10 Q 35 10 35 12 Q 35 10 41 10 L 64 10 Q 68 10 68 6 L 68 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="mt-1.5 text-center font-mono leading-tight text-[#232D2D] font-medium">
                      Indicates it’s a U-Frame
                    </span>
                  </div>

                  {/* Bracket for first Code bits */}
                  <div className="col-span-2 px-2 flex flex-col items-center">
                    <svg width="100%" height="12" viewBox="0 0 70 12" preserveAspectRatio="none" className="text-[#384545]/60">
                      <path d="M 2 2 L 2 6 Q 2 10 6 10 L 29 10 Q 35 10 35 12 Q 35 10 41 10 L 64 10 Q 68 10 68 6 L 68 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="mt-1.5 text-center font-mono leading-tight text-[#232D2D] font-medium">
                      Code – 2 bits
                    </span>
                  </div>

                  {/* Blank spacer for P/F */}
                  <div />

                  {/* Bracket for second Code bits */}
                  <div className="col-span-2 px-2 flex flex-col items-center">
                    <svg width="100%" height="12" viewBox="0 0 70 12" preserveAspectRatio="none" className="text-[#384545]/60">
                      <path d="M 2 2 L 2 6 Q 2 10 6 10 L 29 10 Q 35 10 35 12 Q 35 10 41 10 L 64 10 Q 68 10 68 6 L 68 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="mt-1.5 text-center font-mono leading-tight text-[#232D2D] font-medium">
                      Code – 2 bits
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P/F BIT COMMON EXPLANATION */}
        <div className="pt-8 border-t border-[#8A7059]/20 space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            P/F Bit
          </h3>
          <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>A single bit that only has meaning if set to “1”.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>If the frame is moving from a primary to a secondary station, it means “poll”.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>If the frame is moving from a secondary to a primary station, it means “finish”.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: POINT-TO-POINT PROTOCOL (PPP)                  */}
      {/* ========================================================= */}
      <section className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-[#8A7059]/25 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Point-to-Point Protocol (PPP)
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          PPP is a byte-oriented protocol that determines the format of the frame and the exchange of data between devices. It has no flow control.
        </p>

        {/* PPP Frame Diagram */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div className="font-semibold text-base sm:text-lg text-[#232D2D]">
              PPP Frame Format
            </div>
            <span className="sm:hidden inline-flex items-center gap-1.5 text-xs font-mono text-[#8A7059]  px-2.5 py-1 rounded-md w-fit font-bold">
              <span className="text-[13px]">⇄</span>
              <span>Swipe horizontally to view full frame</span>
            </span>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[720px] flex items-stretch h-14 sm:h-16 text-xs sm:text-sm font-semibold select-none shadow-xs rounded-lg overflow-hidden border border-[#384545]/20">
              <div className="w-[12%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                FLAG
              </div>
              <div className="w-[12%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                ADDRESS
              </div>
              <div className="w-[12%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                CONTROL
              </div>
              <div className="w-[13%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                PROTOCOL
              </div>
              <div className="flex-1 bg-[#222222] text-[#ffffff] border-x border-[#384545]/30 flex items-center justify-center tracking-wider font-bold">
                PAYLOAD
              </div>
              <div className="w-[12%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
                FCS
              </div>
              <div className="w-[12%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
                FLAG
              </div>
            </div>
          </div>
        </div>

        {/* PPP Field Explanations */}
        <div className="pt-2">
          <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Flag :</strong> Holds the 1-byte flag that delimits the frame.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Address Field :</strong> Set to a constant value of 11111111.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Control Field :</strong> Set to a constant value of 00000011.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Protocol Field :</strong> Indicates whether the frame contains user data or other information.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Payload :</strong> User data or other information.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">FCS :</strong> Frame Check Sequence.
              </span>
            </li>
          </ul>
        </div>

        {/* Protocols used by PPP */}
        <div className="pt-8 border-t border-[#8A7059]/20 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Some protocols used by PPP
          </h3>

          {/* Link Control Protocol */}
          <div className="space-y-2">
            <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Link Control Protocol
            </h4>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Link Control Protocol establishes, maintains, manages, configures and terminates the links.
            </p>
          </div>

          {/* Password Authentication Protocol */}
          <div className="space-y-2 pt-2">
            <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Password Authentication Protocol
            </h4>
            <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>User sends a username and password.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>System verifies the username and password and decides whether to grant or deny access.</span>
              </li>
            </ul>
          </div>

          {/* Challenge Handshake Authentication Protocol */}
          <div className="space-y-2 pt-2">
            <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Challenge Handshake Authentication Protocol
            </h4>
            <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>System sends a challenge packet to the user which contains a challenge value.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>The user combines the challenge value with a password and sends the result back to the system.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>The system also combines the challenge value with the password and verifies if it matches the one sent by the user. If it does, access is granted; otherwise, access is denied.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </NetworkPageLayout>
  );
}

