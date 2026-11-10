import React from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page2_4_ControlledAccess({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="2-4-controlled-channelization"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* SECTION 1: CONTROLLED ACCESS */}
      <section className="space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Controlled Access
          </h2>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            Controlled Access Methods allow stations to discuss among themselves about who will get the right to utilise the channel to transmit the data. A station cannot utilise the channel unless it is authorized by all the other stations.
          </p>
        </div>

        {/* 1. RESERVATION */}
        <div className="space-y-3 pt-6 border-t border-[#8A7059]/20">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Reservation
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            A station makes a reservation before it utilises the channel to send frames. Time is divided into intervals where each data frame will be preceded by a reservation frame. Each station gets its own mini-slot to make reservations.
          </p>
        </div>

        {/* 2. POLLING */}
        <div className="space-y-6 pt-6 border-t border-[#8A7059]/20">
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Polling
            </h3>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Polling consists of a primary workstation that governs the communication and a bunch of secondary workstations that follow the instructions given by the primary one. The primary workstation has two possible actions :
            </p>
          </div>

          {/* select */}
          <div className="space-y-3">
            <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              select
            </h4>
            <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>This is done when the primary workstation wants to send data.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>While the primary workstation may be ready to transmit the data, it doesn’t know whether the destination station is ready to receive it.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>The primary station needs to let the destination station know about the transmission so that it is ready to receive the frame, and this is done by sending a <strong>select frame</strong> which also contains the address of the destination station.</span>
              </li>
            </ul>

            {/* Select Flowchart Strip */}
            <div className="mt-3 p-4 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/20 overflow-x-auto">
              <div className="min-w-[580px] flex items-center justify-between text-xs font-mono font-semibold">
                <div className="p-2.5 rounded bg-[#384545] text-white text-center flex-1">
                  Primary sends SELECT (Dest Addr)
                </div>
                <svg className="w-5 h-5 text-[#8A7059] mx-2 shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#8A7059]/40 text-[#232D2D] text-center flex-1">
                  Secondary replies with ACK (Ready)
                </div>
                <svg className="w-5 h-5 text-[#8A7059] mx-2 shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="p-2.5 rounded bg-[#8A7059] text-white text-center flex-1">
                  Primary transmits Data Frame
                </div>
              </div>
            </div>
          </div>

          {/* poll */}
          <div className="space-y-3 pt-2">
            <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              poll
            </h4>
            <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>This is done when the primary workstation is ready to receive data. It polls each secondary station to check if they have any data to send :</span>
              </li>
            </ul>

            <div className="pl-6 space-y-2 text-base sm:text-lg text-[#283535] leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-[#6E5844] font-mono text-sm">o</span>
                <span>If a secondary station has no data to send, it sends back a negative acknowledgement.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#6E5844] font-mono text-sm">o</span>
                <span>If a secondary station has data to send, it responds by sending the respective frame.</span>
              </div>
            </div>

            <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed pt-2">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>The primary workstation :</span>
              </li>
            </ul>

            <div className="pl-6 space-y-2 text-base sm:text-lg text-[#283535] leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-[#6E5844] font-mono text-sm">o</span>
                <span>If it receives a negative acknowledgement from a secondary station, it will just move on and poll the next one.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#6E5844] font-mono text-sm">o</span>
                <span>If it receives a frame from a secondary station, it accepts the frame and sends back an acknowledgement.</span>
              </div>
            </div>

            {/* Poll Flow Visual */}
            <div className="mt-3 p-4 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/20 overflow-x-auto space-y-2">
              <div className="min-w-[580px] flex items-center justify-between text-xs font-mono font-semibold">
                <div className="w-[30%] p-2 rounded bg-[#384545] text-white text-center">
                  Primary POLLS Station A
                </div>
                <svg className="w-5 h-5 text-[#8A7059] mx-2 shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="w-[30%] p-2 rounded bg-[#FAF8F5] border border-[#8A7059]/40 text-[#6E5844] text-center">
                  Station A sends NAK (No Data)
                </div>
                <svg className="w-5 h-5 text-[#8A7059] mx-2 shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="w-[30%] p-2 rounded bg-[#EAE5DA] text-[#232D2D] text-center">
                  Primary Polls Next Station
                </div>
              </div>
              <div className="min-w-[580px] flex items-center justify-between text-xs font-mono font-semibold">
                <div className="w-[30%] p-2 rounded bg-[#384545] text-white text-center">
                  Primary POLLS Station B
                </div>
                <svg className="w-5 h-5 text-[#8A7059] mx-2 shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="w-[30%] p-2 rounded bg-[#8A7059] text-white text-center">
                  Station B sends Data Frame
                </div>
                <svg className="w-5 h-5 text-[#8A7059] mx-2 shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="w-[30%] p-2 rounded bg-[#384545] text-white text-center">
                  Primary sends ACK
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TOKEN PASSING */}
        <div className="space-y-5 pt-6 border-t border-[#8A7059]/20">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Token Passing
          </h3>
          <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Here, each station is connected to the ones on either side of it to form a ring.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>A token is passed along the ring, and whichever station holds the token can utilise the channel to send data.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>There is a limit to the amount of time a station can hold a token.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>If a station holding the token has no data to send, it passes the token on to the next station.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>No station can utilise the channel unless it is holding the token.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Precautions need to be taken to make sure the token itself isn’t lost or destroyed.</span>
            </li>
          </ul>

          {/* Token Ring Visual Representation */}
          <div className="pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8A7059] font-semibold mb-3">
              Token Ring Architecture
            </div>
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/20 flex flex-col items-center justify-center">
              <div className="grid grid-cols-3 gap-4 sm:gap-6 items-center text-center max-w-md w-full font-mono text-xs sm:text-sm">
                <div className="col-start-2 p-3 rounded-lg bg-[#384545] text-white font-bold shadow-xs">
                  Station 1
                </div>
                <div className="col-start-1 row-start-2 p-3 rounded-lg bg-[#384545] text-white font-bold shadow-xs">
                  Station 4
                </div>
                <div className="col-start-2 row-start-2 p-3 rounded-full bg-[#8A7059] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center aspect-square mx-auto w-24 h-24">
                  <div className="text-center">
                    <div className="text-[10px] text-white/80">TOKEN</div>
                    <div className="text-base">↻</div>
                  </div>
                </div>
                <div className="col-start-3 row-start-2 p-3 rounded-lg bg-[#384545] text-white font-bold shadow-xs">
                  Station 2
                </div>
                <div className="col-start-2 row-start-3 p-3 rounded-lg bg-[#384545] text-white font-bold shadow-xs">
                  Station 3
                </div>
              </div>
              <p className="text-xs text-[#6E5844] mt-4 font-mono text-center">
                Direction of Token Circulation: 1 → 2 → 3 → 4 → 1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CHANNELIZATION PROTOCOLS */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Channelization Protocols
          </h2>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            Channelization protocols basically involve dividing the bandwidth between various stations in terms of time, frequency or code.
          </p>
        </div>

        {/* FDMA */}
        <div className="space-y-4 pt-6 border-t border-[#8A7059]/20">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Frequency Division Multiple Access (FDMA)
          </h3>
          <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>The bandwidth is divided in such a way that each station gets its own band to utilise to transmit data.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>To prevent crosstalk, guard bands are placed between these individual bands.</span>
            </li>
          </ul>

          {/* FDMA Visual Spectrum */}
          <div className="pt-2">
            {/* Mobile: Clean Vertical Frequency Ladder (Zero horizontal scroll, perfectly readable) */}
            <div className="md:hidden rounded-xl overflow-hidden border border-[#8A7059]/25 bg-[#FAF8F5] shadow-xs">
              <div className="px-3.5 py-2.5 text-[11px] font-mono uppercase tracking-wider text-[#8A7059] font-bold border-b border-[#8A7059]/20 flex items-center justify-between bg-[#F5F2EB]/60">
                <span>Frequency Spectrum</span>
                <span className="text-[#6E5844]">↑ Higher Frequency</span>
              </div>
              <div className="p-3 space-y-1.5">
                <div className="px-3.5 py-2.5 rounded-lg bg-[#8A7059] text-white flex items-center justify-between text-xs font-mono font-semibold shadow-xs">
                  <span>Station 4</span>
                  <span className="text-[11px] bg-black/15 px-2 py-0.5 rounded font-mono">
                    Band f<sub className="text-[10px] ml-0.5">4</sub>
                  </span>
                </div>
                <div className="py-1 px-3 rounded bg-[#EAE5DA] text-[#6E5844] text-[10px] font-mono font-bold uppercase tracking-widest text-center">
                  — Guard Band —
                </div>
                <div className="px-3.5 py-2.5 rounded-lg bg-[#384545] text-white flex items-center justify-between text-xs font-mono font-semibold shadow-xs">
                  <span>Station 3</span>
                  <span className="text-[11px] bg-black/20 px-2 py-0.5 rounded font-mono">
                    Band f<sub className="text-[10px] ml-0.5">3</sub>
                  </span>
                </div>
                <div className="py-1 px-3 rounded bg-[#EAE5DA] text-[#6E5844] text-[10px] font-mono font-bold uppercase tracking-widest text-center">
                  — Guard Band —
                </div>
                <div className="px-3.5 py-2.5 rounded-lg bg-[#8A7059] text-white flex items-center justify-between text-xs font-mono font-semibold shadow-xs">
                  <span>Station 2</span>
                  <span className="text-[11px] bg-black/15 px-2 py-0.5 rounded font-mono">
                    Band f<sub className="text-[10px] ml-0.5">2</sub>
                  </span>
                </div>
                <div className="py-1 px-3 rounded bg-[#EAE5DA] text-[#6E5844] text-[10px] font-mono font-bold uppercase tracking-widest text-center">
                  — Guard Band —
                </div>
                <div className="px-3.5 py-2.5 rounded-lg bg-[#384545] text-white flex items-center justify-between text-xs font-mono font-semibold shadow-xs">
                  <span>Station 1</span>
                  <span className="text-[11px] bg-black/20 px-2 py-0.5 rounded font-mono">
                    Band f<sub className="text-[10px] ml-0.5">1</sub>
                  </span>
                </div>
              </div>
              <div className="px-3.5 pb-2.5 text-[10px] font-mono text-[#6E5844] text-center">
                ↓ Lower Frequency
              </div>
            </div>

            {/* Desktop & Tablet: Horizontal Continuous Spectrum Bar */}
            <div className="hidden md:block">
              <div className="w-full flex items-stretch h-14 rounded-lg overflow-hidden border border-[#384545]/20 text-xs font-mono font-semibold shadow-xs">
                <div className="flex-1 bg-[#384545] text-white flex items-center justify-center px-2 text-center">
                  Station 1 (Band f<sub className="text-[10px] ml-0.5">1</sub>)
                </div>
                <div className="w-14 bg-[#EAE5DA] text-[#6E5844] flex items-center justify-center text-[10px] uppercase font-bold text-center px-1 tracking-wider">
                  Guard
                </div>
                <div className="flex-1 bg-[#8A7059] text-white flex items-center justify-center px-2 text-center">
                  Station 2 (Band f<sub className="text-[10px] ml-0.5">2</sub>)
                </div>
                <div className="w-14 bg-[#EAE5DA] text-[#6E5844] flex items-center justify-center text-[10px] uppercase font-bold text-center px-1 tracking-wider">
                  Guard
                </div>
                <div className="flex-1 bg-[#384545] text-white flex items-center justify-center px-2 text-center">
                  Station 3 (Band f<sub className="text-[10px] ml-0.5">3</sub>)
                </div>
                <div className="w-14 bg-[#EAE5DA] text-[#6E5844] flex items-center justify-center text-[10px] uppercase font-bold text-center px-1 tracking-wider">
                  Guard
                </div>
                <div className="flex-1 bg-[#8A7059] text-white flex items-center justify-center px-2 text-center">
                  Station 4 (Band f<sub className="text-[10px] ml-0.5">4</sub>)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TDMA */}
        <div className="space-y-3 pt-6 border-t border-[#8A7059]/20">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Time Division Multiple Access (TDMA)
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            Here, the bandwidth remains one single band, but each station gets a time slot during which it is allowed to access the bandwidth to transmit data.
          </p>
        </div>

        {/* CDMA */}
        <div className="space-y-3 pt-6 border-t border-[#8A7059]/20">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Code Division Multiple Access (CDMA)
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            Always allows the continuous flow of data from all stations on a single channel. Each station has a unique <strong>orthogonal code / chip sequence / Walsh code</strong>, so that signals from other stations cancel out to zero at the receiver.
          </p>
        </div>
      </section>
    </NetworkPageLayout>
  );
}