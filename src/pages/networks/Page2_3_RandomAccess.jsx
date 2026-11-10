import React, { useState } from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page2_3_RandomAccess({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="2-3-random-access-mac"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* SECTION 1: OVERVIEW */}
      <section className="space-y-6">
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Random Access Methods don’t define any rules as to when a station can access the channel to transmit frames. It doesn’t offer priority to any particular station, nor does it have an algorithm which considers one station to be in control of the others.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Stations have complete freedom to send frames as and when they wish. Since all stations utilise a single channel, the chances of a frame collision (where frames sent from different stations end up smashing into each other on the channel) are very high.
        </p>
      </section>

      {/* SECTION 2: ALOHA PROTOCOLS */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-12">
        {/* Pure ALOHA */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232D2D]">
            Pure ALOHA
          </h2>
          <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>A station will utilise the channel to send a frame, whenever it has a frame to send.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Very high chance of collision.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Pure ALOHA also depends on the acknowledgement from the receiver to know whether a frame has been transmitted or not. If the receiver offers no response within a certain timeout period, the station assumes the frame encountered a collision and retransmits it.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>In order to reduce the chances of a collision a second time around, the station waits for a random amount of time before retransmitting the frame.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Each station also has a limit to the number of retransmissions it can make.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Throughput :</strong> G x e<sup>-2G</sup> (Max : 18.4%)
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Vulnerable time :</strong> 2 x T<sub className="text-sm font-semibold">fr</sub>
              </span>
            </li>
          </ul>
        </div>

        {/* Slotted ALOHA */}
        <div className="space-y-4 pt-6 border-t border-[#8A7059]/20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232D2D]">
            Slotted ALOHA
          </h2>
          <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Divides time into slots, and stations can only send frames at the beginning of a time slot. If it misses the time slot, it has to wait for the next one.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Reduces the chance of collision, more so than Pure ALOHA.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Throughput :</strong> G x e<sup>-G</sup> (Max : 36.8%). More than Pure ALOHA.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Vulnerable time :</strong> T<sub className="text-sm font-semibold">fr</sub>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 3: CARRIER SENSE MULTIPLE ACCESS (CSMA) */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232D2D]">
            Carrier Sense Multiple Access (CSMA)
          </h2>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            Carrier Sense Multiple Access allows the stations to first listen to the channel to check if it is idle or busy before sending out a frame.
          </p>
        </div>

        {/* Three Persistence Methods */}
        <div className="space-y-8">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Persistence Strategies
          </h3>

          {/* 1-persistent CSMA */}
          <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/25 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                1-persistent CSMA
              </h4>
            </div>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              The moment a station senses that the channel is free, it sends a frame. Chances of a collision are very high here because all the stations will be doing the exact same thing.
            </p>
          </div>

          {/* Non-persistent CSMA */}
          <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/25 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Non-persistent CSMA
              </h4>
            </div>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Here, if a station senses that the channel is idle, it will send a frame. If it senses that the channel is busy, it will wait for a random amount of time before sensing the channel again. This reduces the chance of collision.
            </p>
          </div>

          {/* p-persistent CSMA */}
          <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/25 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                p-persistent CSMA
              </h4>
            </div>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed font-semibold">
              Here, if a station senses that the channel is idle :
            </p>
            <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>It will send a frame with a probability p.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  It will then wait for the next time slot with a probability (q = 1-p) before sensing the channel again.
                </span>
              </li>
            </ul>
            <div className="pl-8 space-y-2 text-base sm:text-lg text-[#283535] leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-[#6E5844] font-mono text-sm">o</span>
                <span>If the channel is idle, go to Step 1.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#6E5844] font-mono text-sm">o</span>
                <span>If the channel is busy, act as if a collision has occurred, and use the backoff procedure.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CSMA/CD (WIRED) */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232D2D]">
            CSMA/CD (Wired)
          </h2>
          <div className="font-mono text-sm sm:text-base text-[#6E5844] font-medium">
            Carrier Sense Multiple Access with Collision Detection
          </div>
        </div>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Here, once a station sends a frame when the channel is idle, it will continue to listen to the channel to check whether a collision occurs or not.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          If a collision has occurred, the station will send out a jamming signal notifying other stations about the collision.
        </p>

        {/* Clean Visual Diagram for CSMA/CD Jamming Signal */}
        <div className="mt-4 p-6 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/20 shadow-xs space-y-3">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[620px] py-2 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
              <div className="px-4 py-3 rounded-lg bg-[#384545] text-white font-mono text-center flex-1">
                Transmit Frame & Listen to Wire
              </div>
              <span className="text-[#222222] font-bold text-lg">→</span>
              <div className="px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#8A7059]/40 text-[#232D2D] font-mono text-center flex-1">
                Collision Detected?
              </div>
              <span className="text-[#222222] font-bold text-lg">→</span>
              <div className="px-4 py-3 rounded-lg bg-[#8A7059] text-white font-mono text-center flex-1">
                Broadcast Jamming Signal & Abort
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CSMA/CA (WIRELESS) */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232D2D]">
            CSMA/CA (Wireless)
          </h2>
          <div className="font-mono text-sm sm:text-base text-[#6E5844] font-medium">
            Carrier Sense Multiple Access with Collision Avoidance
          </div>
        </div>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Here, in simple terms, a station basically takes all the precautions it can to avoid a collision.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Initially, when the station senses that the channel is idle, it does NOT transmit frames immediately. Instead, it waits for a certain period of time called the <strong className="text-[#232D2D]">Inter-Frame Space (IFS)</strong>. This is because a distant station may have already started transmitting and its signal may not have reached the current station yet. IFS basically gives time for that signal to reach the current station.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          After the IFS, there is again a chance of collision if multiple stations decide to transmit a frame at the same time. This is where the <strong className="text-[#232D2D]">contention window</strong> comes in.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          The contention window divides time into multiple slots, and each station chooses a random number of slots as its waiting time.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          In order to further prevent collision, each time a station senses a busy channel, it doubles the range of slots to choose from. For example :
        </p>

        <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>A station initially chooses from a range of 10 possible slots.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>After it has completed its slot-waiting-period, if it senses a busy channel, it doubles the range, i.e. 10 x 2 = 20 possible slots. The idea is that the bigger the range, the lower the chance of two stations picking the same number of slots.</span>
          </li>
        </ul>

        <p className="text-base sm:text-lg text-[#283535] leading-relaxed pt-2">
          Here too, once the station sends a frame, it waits for an acknowledgement from the receiver within a certain timeout period.
        </p>

        {/* Clean 4-Stage Visual Sequence for CSMA/CA */}
        <div className="mt-4 p-6 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/20 shadow-xs space-y-3">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[680px] py-2 grid grid-cols-4 gap-3 text-xs sm:text-sm font-semibold">
              <div className="p-3 rounded-lg bg-[#384545] text-white font-mono text-center">
                <div className="text-[10px] text-white/70 uppercase mb-0.5">Step 1</div>
                Sense Idle Line
              </div>
              <div className="p-3 rounded-lg bg-[#8A7059] text-white font-mono text-center">
                <div className="text-[10px] text-white/70 uppercase mb-0.5">Step 2</div>
                Wait IFS Period
              </div>
              <div className="p-3 rounded-lg bg-[#384545] text-white font-mono text-center">
                <div className="text-[10px] text-white/70 uppercase mb-0.5">Step 3</div>
                Contention Window
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#8A7059]/40 text-[#232D2D] font-mono text-center">
                <div className="text-[10px] text-[#8A7059] uppercase mb-0.5">Step 4</div>
                Transmit & Wait for ACK
              </div>
            </div>
          </div>
        </div>
      </section>
    </NetworkPageLayout>
  );
}

