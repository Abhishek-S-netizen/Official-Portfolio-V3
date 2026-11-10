import React from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page1_2_Topologies({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="1-2-topologies"
      subtitle="Performance, reliability, security, geographical scales, and the 4 physical topologies."
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* Article Body */}
      <div className="space-y-12 text-base sm:text-lg text-[#283535] leading-relaxed">
        {/* SECTION 1: NETWORK CRITERIA */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Network Criteria
          </h2>

          {/* Performance */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Performance
            </h3>
            <ul className="space-y-2 pl-2 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Performance of a network is usually measured using throughput and delay.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Ideally, you want to increase throughput and reduce delay. But in reality, increasing the number of packets being sent into the network (increasing throughput) will increase traffic which will in turn increase delay, so it’s important to find a good balance.</span>
              </li>
            </ul>
          </div>

          {/* Reliability */}
          <div className="space-y-2 pt-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Reliability
            </h3>
            <ul className="space-y-2 pl-2 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Reliability of a network is measured by checking how robust the overall network is to failures.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>It also checks how long the network will take to recover in case it does encounter a failure.</span>
              </li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-2 pt-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
              Security
            </h3>
            <ul className="space-y-2 pl-2 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Security involves proper authorization and authentication.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Unauthorized access to data should be prevented.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Data loss should be prevented, and backups should be kept in case such an event occurs</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-4 border-t border-[#8A7059]/25" />

        {/* SECTION 2: TYPES OF NETWORKS */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Types of Networks
          </h2>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-md border border-[#8A7059]/30 bg-[#EAE5DA]/30 shadow-sm">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b-2 border-[#8A7059] bg-[#EAE5DA]/70 font-mono text-xs sm:text-sm text-[#232D2D]">
                  <th className="py-4 px-4 sm:px-6 font-bold uppercase tracking-wider w-1/4">
                    Personal Area Network
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-bold uppercase tracking-wider w-1/4">
                    Local Area Network
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-bold uppercase tracking-wider w-1/4">
                    Metropolitan Area Network
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-bold uppercase tracking-wider w-1/4">
                    Wide Area Network
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8A7059]/20 text-[#283535]">
                {/* Row 1: Range */}
                <tr className="hover:bg-[#8A7059]/5 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#232D2D]">
                    Range : ~ 10 meters
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#232D2D]">
                    Range : ~ 2 km
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#232D2D]">
                    Range : ~5-50 km
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#232D2D]">
                    Range : spans towns, countries or even the world
                  </td>
                </tr>

                {/* Row 2: Medium */}
                <tr className="hover:bg-[#8A7059]/5 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs sm:text-sm text-[#8A7059] font-medium">
                    Mostly wireless
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs sm:text-sm text-[#8A7059] font-medium">
                    Mostly wired
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs sm:text-sm text-[#8A7059] font-medium">
                    Can be either
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs sm:text-sm text-[#8A7059] font-medium">
                    Can be either
                  </td>
                </tr>

                {/* Row 3: Use Case */}
                <tr className="hover:bg-[#8A7059]/5 transition-colors leading-relaxed">
                  <td className="py-4 px-4 sm:px-6 align-top">
                    Mainly used to connect personal devices such as smartphones and tablets. Mostly used for data sharing.
                  </td>
                  <td className="py-4 px-4 sm:px-6 align-top">
                    Connects computers and devices within a building like a school or hospital.
                  </td>
                  <td className="py-4 px-4 sm:px-6 align-top">
                    Connects computers across a city or between nearby cities.
                  </td>
                  <td className="py-4 px-4 sm:px-6 align-top">
                    Connects multiple LANs using radiowaves or satellites.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-4 border-t border-[#8A7059]/25" />

        {/* SECTION 3: NETWORK TOPOLOGIES */}
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              Network Topologies
            </h2>
          </div>

          {/* 1. MESH TOPOLOGY */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Mesh Topology
            </h3>
            <p>
              Each node is connected to every other node in the network. If there are n nodes:
            </p>
            <ul className="space-y-2 pl-2 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>If it's unidirectional communication : requires <strong>n(n-1)</strong> physical links.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>If it's bidirectional communication : requires <strong>(n(n-1)) / 2</strong> physical links.</span>
              </li>
            </ul>

            {/* Mesh Diagram */}
            <div className="my-6 p-6 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 flex justify-center">
              <svg viewBox="0 0 460 360" className="w-full max-w-[420px] h-auto select-none">
                {/* Connecting Lines between all 5 nodes */}
                {/* Node positions: A(140, 120), B(140, 240), C(320, 80), D(280, 180), E(330, 290) */}
                <line x1="140" y1="120" x2="140" y2="240" stroke="#232D2D" strokeWidth="2" />
                <line x1="140" y1="120" x2="320" y2="80" stroke="#232D2D" strokeWidth="2" />
                <line x1="140" y1="120" x2="280" y2="180" stroke="#232D2D" strokeWidth="2" />
                <line x1="140" y1="120" x2="330" y2="290" stroke="#232D2D" strokeWidth="2" />

                <line x1="140" y1="240" x2="320" y2="80" stroke="#232D2D" strokeWidth="2" />
                <line x1="140" y1="240" x2="280" y2="180" stroke="#232D2D" strokeWidth="2" />
                <line x1="140" y1="240" x2="330" y2="290" stroke="#232D2D" strokeWidth="2" />

                <line x1="320" y1="80" x2="280" y2="180" stroke="#232D2D" strokeWidth="2" />
                <line x1="320" y1="80" x2="330" y2="290" stroke="#232D2D" strokeWidth="2" />

                <line x1="280" y1="180" x2="330" y2="290" stroke="#232D2D" strokeWidth="2" />

                {/* 5 Nodes */}
                <circle cx="140" cy="120" r="22" fill="#384545" />
                <circle cx="140" cy="240" r="22" fill="#384545" />
                <circle cx="320" cy="80" r="22" fill="#384545" />
                <circle cx="280" cy="180" r="22" fill="#384545" />
                <circle cx="330" cy="290" r="22" fill="#384545" />
              </svg>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#232D2D]">Advantages</h4>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Easy fault isolation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>If one link experiences a failure, it will not bring down the entire network.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Privacy.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#232D2D]">Disadvantages</h4>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>A lot of cabling and hardware required.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. STAR TOPOLOGY */}
          <div className="space-y-4 pt-6 border-t border-[#8A7059]/20">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Star Topology
            </h3>
            <p>
              Each node is connected to a central hub. The nodes are not connected to each other. If one device wants to send data to another, it first passes the data to the central hub, which will then send the data to the receiving device.
            </p>

            {/* Star Diagram */}
            <div className="my-6 p-6 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 flex justify-center">
              <svg viewBox="0 0 480 380" className="w-full max-w-[440px] h-auto select-none">
                {/* Spokes from central hub to 6 nodes */}
                {/* Hub center: (240, 190) */}
                <line x1="120" y1="100" x2="240" y2="190" stroke="#232D2D" strokeWidth="2" />
                <line x1="240" y1="70" x2="240" y2="190" stroke="#232D2D" strokeWidth="2" />
                <line x1="360" y1="100" x2="240" y2="190" stroke="#232D2D" strokeWidth="2" />

                <line x1="120" y1="280" x2="240" y2="190" stroke="#232D2D" strokeWidth="2" />
                <line x1="240" y1="310" x2="240" y2="190" stroke="#232D2D" strokeWidth="2" />
                <line x1="360" y1="280" x2="240" y2="190" stroke="#232D2D" strokeWidth="2" />

                {/* Central Hub Box */}
                <rect x="160" y="155" width="160" height="70" rx="14" fill="#8A7059" />
                <text
                  x="240"
                  y="196"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="13"
                  fontWeight="700"
                  letterSpacing="0.04em"
                >
                  CENTRAL HUB
                </text>

                {/* 6 Peripheral Nodes */}
                <circle cx="120" cy="100" r="22" fill="#384545" />
                <circle cx="240" cy="70" r="22" fill="#384545" />
                <circle cx="360" cy="100" r="22" fill="#384545" />
                <circle cx="120" cy="280" r="22" fill="#384545" />
                <circle cx="240" cy="310" r="22" fill="#384545" />
                <circle cx="360" cy="280" r="22" fill="#384545" />
              </svg>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#232D2D]">Advantages</h4>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Easy fault isolation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Easy to install and reconfigure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Less expensive than mesh.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>If one link experiences a failure, it won’t bring down the entire network.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#232D2D]">Disadvantages</h4>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>If the central hub experiences a failure, the entire network is dead, because every node depends on the central hub.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. BUS TOPOLOGY */}
          <div className="space-y-4 pt-6 border-t border-[#8A7059]/20">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Bus Topology
            </h3>
            <p>
              Consists of a single, long cable called the backbone. Each node is connected to this backbone using droplines and taps.
            </p>
            <ul className="space-y-2 pl-2 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Droplines are the connections between the node and the backbone.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Taps are the actual connectors that cut through the sheath of the backbone so that it comes in contact with the metallic wire underneath.</span>
              </li>
            </ul>

            {/* Bus Diagram */}
            <div className="my-6 p-6 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 flex justify-center">
              <svg viewBox="0 0 540 340" className="w-full max-w-[500px] h-auto select-none">
                {/* Droplines from top nodes to backbone */}
                <line x1="120" y1="90" x2="120" y2="160" stroke="#232D2D" strokeWidth="2" />
                <line x1="270" y1="90" x2="270" y2="160" stroke="#232D2D" strokeWidth="2" />
                <line x1="420" y1="90" x2="420" y2="160" stroke="#232D2D" strokeWidth="2" />

                {/* Droplines from bottom nodes to backbone */}
                <line x1="195" y1="250" x2="195" y2="195" stroke="#232D2D" strokeWidth="2" />
                <line x1="345" y1="250" x2="345" y2="195" stroke="#232D2D" strokeWidth="2" />

                {/* Horizontal Backbone Cable */}
                <rect x="25" y="160" width="490" height="38" rx="10" fill="#8A7059" />
                <text
                  x="270"
                  y="184"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="13"
                  fontWeight="700"
                  letterSpacing="0.05em"
                >
                  BACKBONE
                </text>

                {/* Taps (piercing connector circles on the backbone edges) */}
                <circle cx="120" cy="160" r="9" fill="#6D8686" />
                <circle cx="270" cy="160" r="9" fill="#6D8686" />
                <circle cx="420" cy="160" r="9" fill="#6D8686" />
                <circle cx="195" cy="198" r="9" fill="#6D8686" />
                <circle cx="345" cy="198" r="9" fill="#6D8686" />

                {/* Nodes: 3 Top, 2 Bottom */}
                <circle cx="120" cy="90" r="22" fill="#384545" />
                <circle cx="270" cy="90" r="22" fill="#384545" />
                <circle cx="420" cy="90" r="22" fill="#384545" />
                <circle cx="195" cy="250" r="22" fill="#384545" />
                <circle cx="345" cy="250" r="22" fill="#384545" />
              </svg>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#232D2D]">Advantages</h4>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Less cabling required.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Easy to install.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#232D2D]">Disadvantages</h4>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Difficult fault isolation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Difficult reconfiguration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>If the main cable experiences a failure, the entire network is dead.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Signals become weaker as they travel down the backbone, hence, there is a limit to the number of taps a backbone can handle.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4. RING TOPOLOGY */}
          <div className="space-y-4 pt-6 border-t border-[#8A7059]/20">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Ring Topology
            </h3>
            <p>
              Each node is connected to the nodes on either side of it. A signal is circulated among the nodes until it finally reaches the destination node.
            </p>
            <p>
              Each node is incorporated with something called a repeater. So, if a node receives a signal that isn’t intended for it, it uses its repeater to regenerate the signal and pass it along to the next node.
            </p>

            {/* Ring Diagram */}
            <div className="my-6 p-6 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 flex justify-center">
              <svg viewBox="0 0 460 380" className="w-full max-w-[420px] h-auto select-none">
                {/* Hexagonal Loop Links */}
                {/* Nodes at: 1(160, 90), 2(300, 90), 3(360, 190), 4(300, 290), 5(160, 290), 6(100, 190) */}
                <line x1="160" y1="90" x2="300" y2="90" stroke="#232D2D" strokeWidth="2" />
                <line x1="300" y1="90" x2="360" y2="190" stroke="#232D2D" strokeWidth="2" />
                <line x1="360" y1="190" x2="300" y2="290" stroke="#232D2D" strokeWidth="2" />
                <line x1="300" y1="290" x2="160" y2="290" stroke="#232D2D" strokeWidth="2" />
                <line x1="160" y1="290" x2="100" y2="190" stroke="#232D2D" strokeWidth="2" />
                <line x1="100" y1="190" x2="160" y2="90" stroke="#232D2D" strokeWidth="2" />

                {/* 6 Nodes forming the loop */}
                <circle cx="160" cy="90" r="22" fill="#384545" />
                <circle cx="300" cy="90" r="22" fill="#384545" />
                <circle cx="360" cy="190" r="22" fill="#384545" />
                <circle cx="300" cy="290" r="22" fill="#384545" />
                <circle cx="160" cy="290" r="22" fill="#384545" />
                <circle cx="100" cy="190" r="22" fill="#384545" />
              </svg>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#232D2D]">Advantages</h4>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Easy to install and reconfigure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Easy fault isolation.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#232D2D]">Disadvantages</h4>
              <ul className="space-y-1.5 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>In a simple ring, if one of the links or nodes experiences a failure, the entire network goes down.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </NetworkPageLayout>
  );
}
