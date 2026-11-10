import React from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page2_5_VlansTrunking({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="2-5-vlans-trunking"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* SECTION 1: VLAN FUNDAMENTALS */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Virtual LANs (VLANs)
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          A virtual LAN is when a single, physical switch is divided into multiple virtual switches using software, grouped based on department/functionality. For example, for a college campus :
        </p>

        <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed font-mono text-sm sm:text-base">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span><strong className="text-[#232D2D]">Ports 1 to 10 :</strong> VLAN 10 – Students department</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span><strong className="text-[#232D2D]">Ports 11 – 20 :</strong> VLAN 20 – Faculty department</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span><strong className="text-[#232D2D]">Ports 21 – 30 :</strong> VLAN 30 – Administration</span>
          </li>
        </ul>

        <div className="pt-4 space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
            Advantages :
          </h3>
          <ul className="space-y-2.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Privacy :</strong> A host within VLAN 10 cannot communicate with a host in VLAN 20 without going through an external router.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Isolation :</strong> If a host within VLAN 20 sends a broadcast message, it remains confined within VLAN 20. Hosts outside VLAN 20 will not receive it.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Cost-effective and easier to implement.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 2: PORT TYPES */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          There are two types of VLAN ports :
        </h2>

        {/* Access Port */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Access Port
          </h3>
          <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Handles a single VLAN</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Connects directly to end devices</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Clean packets can be sent without any tags</span>
            </li>
          </ul>
        </div>

        {/* Trunk Port */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Trunk Port
          </h3>
          <ul className="space-y-2 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Handles multiple VLANs</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Connects a switch – switch or switch – router</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Packets need to be tagged with an IEEE 802.1Q tag so that the switch can identify which VLAN the packet is coming from</span>
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 3: IMPLEMENTATIONS (INTER-VLAN ROUTING) */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Implementations
        </h2>

        {/* Legacy Inter-VLAN */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Legacy Inter-VLAN
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            This implementation used separate cables for each VLAN. It allows the transmission of clean, untagged packets but it isn’t scalable.
          </p>
        </div>

        {/* Router-On-A-Stick */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Router-On-A-Stick
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            Here, a switch is connected to a router using a single cable. The router’s physical interface is divided into sub-interfaces to handle each VLAN. For example :
          </p>
          <ul className="space-y-1.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed font-mono text-sm sm:text-base">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Gig0/0.10 handles VLAN 10</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Gig0/0.20 handles VLAN 20</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>Gig0/0.30 handles VLAN 30</span>
            </li>
          </ul>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            Here however, packets need to be tagged with an IEEE 802.1Q tag so that the switch can identify which VLAN the packet belongs to.
          </p>
        </div>

        {/* Layer-3 Switch */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Layer-3 Switch
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            This is the most modern implementation, where instead of having a router, you have a switch enabled with a router chip that handles all the inter-VLAN routing using Switched Virtual Interfaces (SVI).
          </p>
        </div>
      </section>

      {/* SECTION 4: IEEE 802.1Q TAG FORMAT */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          IEEE 802.1Q tag format
        </h2>

        {/* Tag Format Visual Strip */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[640px] flex items-stretch h-14 sm:h-16 text-xs sm:text-sm font-semibold select-none rounded-lg overflow-hidden border border-[#384545]/20 shadow-xs">
            <div className="w-[30%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
              TPID (16 bits)
            </div>
            <div className="w-[24%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
              PCP (3 bits)
            </div>
            <div className="w-[20%] bg-[#384545] text-white flex items-center justify-center tracking-wider">
              DEI (1 bit)
            </div>
            <div className="w-[26%] bg-[#8A7059] text-white flex items-center justify-center tracking-wider">
              VID (12 bits)
            </div>
          </div>
        </div>

        {/* Field Explanations */}
        <div className="space-y-3 pt-2">
          <div className="text-base sm:text-lg text-[#283535] leading-relaxed">
            <strong className="text-[#232D2D]">TPID</strong> – Tag Protocol ID
          </div>

          <div className="space-y-1.5">
            <div className="text-base sm:text-lg text-[#283535] leading-relaxed">
              <strong className="text-[#232D2D]">PCP</strong> – Priority Code Point (levels 0 to 7)
            </div>
            <ul className="space-y-1 pl-4 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Level 0 or 1 – packet is of low priority</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Level 5 or 6 – packet is of high priority</span>
              </li>
            </ul>
          </div>

          <div className="space-y-1.5">
            <div className="text-base sm:text-lg text-[#283535] leading-relaxed">
              <strong className="text-[#232D2D]">DEI</strong> – Drop Eligible Indicator
            </div>
            <ul className="space-y-1 pl-4 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>If it is set to 1 : In case the network faces a congestion, the packet will allow itself to be dropped.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>If it is set to 0 : the packet cannot be dropped</span>
              </li>
            </ul>
          </div>

          <div className="text-base sm:text-lg text-[#283535] leading-relaxed">
            <strong className="text-[#232D2D]">VID</strong> – VLAN Identifier
          </div>
        </div>
      </section>

      {/* SECTION 5: ENTERPRISE WALKTHROUGH */}
      <section className="mt-14 sm:mt-18 pt-10 border-t border-[#8A7059]/25 space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Walkthrough
          </h2>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            System A within VLAN 10 in one building wants to send a packet to System B within VLAN 20 in the other building.
          </p>
        </div>

        {/* Enterprise Walkthrough Diagram */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[700px] p-6 sm:p-8 rounded-xl bg-[#FAF8F5] border border-[#8A7059]/25 shadow-xs space-y-4">
            <div className="grid grid-cols-2 gap-8">
              {/* BUILDING 1 (Solid Warm Bronze box) */}
              <div className="rounded-2xl bg-[#856b54] p-6 sm:p-7 flex flex-col items-center space-y-5 shadow-sm">
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-white">
                  BUILDING 1
                </span>

                {/* System A */}
                <div className="w-full max-w-[260px] py-2.5 px-4 rounded-lg bg-[#38761D] text-white text-center font-mono text-xs sm:text-sm font-bold shadow-xs">
                  System A (VLAN 10)
                </div>

                {/* Arrow down */}
                <svg className="w-6 h-8 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l-5-5m5 5l5-5" />
                </svg>

                {/* Access Layer */}
                <div className="w-full max-w-[260px] py-2.5 px-4 rounded-lg bg-[#384545] text-white text-center font-mono text-xs sm:text-sm font-semibold shadow-xs">
                  Access Layer
                </div>

                {/* Arrow down */}
                <svg className="w-6 h-8 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l-5-5m5 5l5-5" />
                </svg>

                {/* Distribution Layer */}
                <div className="w-full max-w-[260px] py-2.5 px-4 rounded-lg bg-[#384545] text-white text-center font-mono text-xs sm:text-sm font-semibold shadow-xs">
                  Distribution Layer
                </div>
              </div>

              {/* BUILDING 2 (Solid Dark Slate box) */}
              <div className="rounded-2xl bg-[#384545] p-6 sm:p-7 flex flex-col items-center space-y-5 shadow-sm">
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-white">
                  BUILDING 2
                </span>

                {/* System B */}
                <div className="w-full max-w-[260px] py-2.5 px-4 rounded-lg bg-[#38761D] text-white text-center font-mono text-xs sm:text-sm font-bold shadow-xs">
                  System B (VLAN 20)
                </div>

                {/* Arrow up */}
                <svg className="w-6 h-8 text-[#38BDF8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 0l-5 5m5-5l5 5" />
                </svg>

                {/* Access Layer */}
                <div className="w-full max-w-[260px] py-2.5 px-4 rounded-lg bg-[#856b54] text-white text-center font-mono text-xs sm:text-sm font-semibold shadow-xs">
                  Access Layer
                </div>

                {/* Arrow up */}
                <svg className="w-6 h-8 text-[#38BDF8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 0l-5 5m5-5l5 5" />
                </svg>

                {/* Distribution Layer */}
                <div className="w-full max-w-[260px] py-2.5 px-4 rounded-lg bg-[#856b54] text-white text-center font-mono text-xs sm:text-sm font-semibold shadow-xs">
                  Distribution Layer
                </div>
              </div>
            </div>

            {/* Connecting Path Between Buildings & Core Layer */}
            <div className="grid grid-cols-2 gap-8 px-8 my-1">
              <div className="flex flex-col items-center">
                <svg className="w-6 h-10 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m0 0l-5-5m5 5l5-5" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-6 h-10 text-[#38BDF8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V2m0 0l-5 5m5-5l5 5" />
                </svg>
              </div>
            </div>

            {/* CORE LAYER across bottom */}
            <div className="w-full py-4 rounded-xl bg-[#232D2D] text-white text-center font-mono text-sm sm:text-base font-bold tracking-widest uppercase shadow-md">
              CORE LAYER
            </div>
          </div>
        </div>

        {/* SENDER'S END */}
        <div className="space-y-6 pt-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Sender’s end (System A)
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            <strong>System A</strong> sends the packet to the Access Layer.
          </p>

          <div className="space-y-8 sm:space-y-10 pt-2">
            {/* Access Layer */}
            <div className="space-y-2.5 pl-4 sm:pl-5 border-l-2 border-[#8A7059]/40">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Access Layer
              </h4>
              <ul className="space-y-1.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Receives the packet.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Attaches an IEEE 802.1Q tag containing the ID of <strong>VLAN 10.</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Sends it to the distribution layer.</span>
                </li>
              </ul>
            </div>

            {/* Distribution Layer */}
            <div className="space-y-2.5 pl-4 sm:pl-5 border-l-2 border-[#8A7059]/40">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Distribution Layer
              </h4>
              <ul className="space-y-1.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Looks at the IEEE 802.1Q tag to figure out which VLAN the packet came from (in this case <strong>VLAN 10</strong>) and removes the tag.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Looks at the destination IP address and consults its routing table.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>It checks with the ACL (Access Control List) to see if a transmission of a packet from <strong>VLAN 10</strong> to the destination IP address is permitted or not.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>If permitted, it sends the clean packet to the Core Layer.</span>
                </li>
              </ul>
            </div>

            {/* Core Layer */}
            <div className="space-y-2.5 pl-4 sm:pl-5 border-l-2 border-[#8A7059]/40">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Core Layer
              </h4>
              <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
                Receives the packet, looks at the destination IP address, and just forwards it to the respective Distribution Layer.
              </p>
            </div>
          </div>
        </div>

        {/* RECEIVER'S END */}
        <div className="space-y-6 pt-10 border-t border-[#8A7059]/20">
          <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
            Receiver’s end (System B)
          </h3>

          <div className="space-y-8 sm:space-y-10 pt-2">
            {/* Distribution Layer */}
            <div className="space-y-2.5 pl-4 sm:pl-5 border-l-2 border-[#8A7059]/40">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Distribution Layer
              </h4>
              <ul className="space-y-1.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Receives the packet from the Core Layer.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Looks at the destination address and identifies which VLAN it belongs to (in this case <strong>VLAN 20</strong>) and attaches an IEEE 802.1Q tag containing the ID of <strong>VLAN 20.</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Sends it to the Access Layer.</span>
                </li>
              </ul>
            </div>

            {/* Access Layer */}
            <div className="space-y-2.5 pl-4 sm:pl-5 border-l-2 border-[#8A7059]/40">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Access Layer
              </h4>
              <ul className="space-y-1.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Receives the packet.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Looks at the IEEE 802.1Q tag to identify which VLAN it needs to send the packet to (in this case <strong>VLAN 20</strong>).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Looks at the destination MAC address to identify the actual system in the VLAN that is supposed to receive the packet (in this case <strong>System B</strong>).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Peels off the IEEE 802.1Q tag and forwards the clean packet to <strong>System B</strong> in <strong>VLAN 20.</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </NetworkPageLayout>
  );
}

