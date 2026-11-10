import React, { useState } from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page3_2_Ipv6Addressing({ onBackToIndex, onNavigatePage }) {
  // Compression state: 0 = Full, 1 = Leading Zeroes Removed, 2 = Compressed with ::
  const [compressionStep, setCompressionStep] = useState(0);

  // Address representations
  const fullAddress = '2001:0db8:0000:0000:0042:0000:8a2e:0370';
  const leadingZeroesRemoved = '2001:db8:0:0:42:0:8a2e:370';
  const fullyCompressed = '2001:db8::42:0:8a2e:370';

  const getCurrentAddress = () => {
    if (compressionStep === 1) return leadingZeroesRemoved;
    if (compressionStep === 2) return fullyCompressed;
    return fullAddress;
  };

  return (
    <NetworkPageLayout
      pageId="3-2-ipv6"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* ============================================================== */}
      {/* SECTION 1: IPV6 FOUNDATIONS */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          IPv6
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          IPv6 uses a 128-bit address and was created because of the limited address space of IPv4.
        </p>

        <div className="pt-2">
          <span className="font-mono text-sm sm:text-base text-[#6E5844] font-semibold tracking-wide">
            Address space : 2<sup className="text-xs">128</sup> ; so address depletion is impossible.
          </span>
        </div>

        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          <strong>The base header size of an IPv6 packet is a fixed 40 bytes and does not contain fragmentation or checksum.</strong>
        </p>

        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          It also has built-in security with IPSec (Secure IP) and does not have a broadcast address. IPv6 can use a DHCP server for dynamic address allocation, but hosts can create their own addresses as well.
        </p>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: NOTATION & INTERACTIVE COMPRESSION */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Notation
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          IPv6 uses the hexadecimal colon notation, where there are 8 blocks of four digits. Leading zeroes can be removed, and a continuous block of zeroes can be abbreviated to a double colon (::), although you can only do this once.
        </p>

        {/* Interactive Notation Compression Widget */}
        <div className="pt-4 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 p-1 rounded-md bg-[#384545]/10 border border-[#8A7059]/25 w-fit">
              <button
                type="button"
                onClick={() => setCompressionStep(0)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all cursor-pointer ${compressionStep === 0
                  ? 'bg-[#384545] text-[#F5F2EB] shadow-sm'
                  : 'text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5'
                  }`}
              >
                Full (Initial)
              </button>
              <button
                type="button"
                onClick={() => setCompressionStep(1)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all cursor-pointer ${compressionStep === 1
                  ? 'bg-[#384545] text-[#F5F2EB] shadow-sm'
                  : 'text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5'
                  }`}
              >
                Remove leading zeroes
              </button>
              <button
                type="button"
                onClick={() => setCompressionStep(2)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all cursor-pointer ${compressionStep === 2
                  ? 'bg-[#384545] text-white shadow-sm'
                  : 'text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5'
                  }`}
              >
                Abbreviate continuous zeroes (::)
              </button>
            </div>
          </div>

          {/* Address Display Box */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#8A7059]/10 border-2 border-[#8A7059]/30 text-center space-y-4 transition-all duration-300">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#232D2D] block">
              {compressionStep === 0 && 'Step 1: Full 128-Bit Address (8 blocks of 4 hex digits)'}
              {compressionStep === 1 && 'Step 2: Leading Zeroes Dropped in Each Block'}
              {compressionStep === 2 && 'Step 3: Continuous Run of Zeroes Replaced by ::'}
            </span>

            <div className="py-2">
              <span className="font-mono text-xl sm:text-3xl md:text-4xl font-bold text-[#232D2D] tracking-wide break-all select-all">
                {getCurrentAddress()}
              </span>
            </div>

            {/* Warning Callout when double colon is active */}
            {compressionStep === 2 && (
              <div className="pt-4 border-t border-[#8A7059]/25 animate-fadeIn space-y-1">
                <p className="font-sans text-sm sm:text-base font-semibold text-[#232D2D]">
                  You can only do this once.
                </p>
                <p className="font-sans font-bold text-xs sm:text-sm text-[#232D2D]">
                  Using "::" more than once would make it impossible to determine how many zero blocks were omitted in each location.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: TYPES OF ADDRESSES */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Types of addresses
        </h2>

        <ul className="space-y-4 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Unicast :</strong> If a host sends a frame, only the intended recipient receives it.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Anycast :</strong> A group of hosts share the same address; when a host sends a frame, it is unicasted to the most reachable host.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Multicast :</strong> A group of hosts share the same address; when a host sends a frame, all the hosts receive a copy of it (equivalent of broadcast).
            </span>
          </li>
        </ul>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: IPV6 HEADER STRUCTURE */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          IPv6 Header Structure
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Fixed 40-byte base header layout organized into 32-bit (4-byte) horizontal rows :
        </p>

        {/* IPv6 Header Diagram (Crisp Vector SVG mirroring slide) */}
        <div className="py-4 overflow-x-auto">
          <div className="min-w-[760px] w-full max-w-4xl mx-auto">
            <svg
              className="w-full h-auto text-[#232D2D] select-none"
              viewBox="0 0 840 310"
              fill="none"
            >
              {/* Top Ruler Bracket */}
              <path
                d="M 20 48 L 20 30 L 820 30 L 820 48"
                stroke="#232D2D"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="420"
                y="22"
                textAnchor="middle"
                className="font-sans text-xs sm:text-sm font-semibold fill-[#232D2D]"
              >
                Measured in bits
              </text>

              {/* Ruler Bit Marks: 0, 4, 12, 16, 24, 32 */}
              <text x="20" y="60" textAnchor="start" className="font-mono text-xs font-bold fill-[#232D2D]">0</text>
              <text x="120" y="60" textAnchor="middle" className="font-mono text-xs font-bold fill-[#232D2D]">4</text>
              <text x="320" y="60" textAnchor="middle" className="font-mono text-xs font-bold fill-[#232D2D]">12</text>
              <text x="420" y="60" textAnchor="middle" className="font-mono text-xs font-bold fill-[#232D2D]">16</text>
              <text x="620" y="60" textAnchor="middle" className="font-mono text-xs font-bold fill-[#232D2D]">24</text>
              <text x="820" y="60" textAnchor="end" className="font-mono text-xs font-bold fill-[#232D2D]">32</text>

              {/* Row 1: Dark Slate (#384545) */}
              {/* VERSION: 4 bits (0 to 4 = 100px) */}
              <rect x="20" y="68" width="100" height="46" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="70" y="94" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                VERSION
              </text>

              {/* TRAFFIC CLASS: 8 bits (4 to 12 = 200px) */}
              <rect x="120" y="68" width="200" height="46" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="220" y="94" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                TRAFFIC CLASS
              </text>

              {/* FLOW LABEL: 20 bits (12 to 32 = 500px) */}
              <rect x="320" y="68" width="500" height="46" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="570" y="94" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                FLOW LABEL
              </text>

              {/* Row 2: Warm Bronze (#856b54) */}
              {/* PAYLOAD LENGTH: 16 bits (0 to 16 = 400px) */}
              <rect x="20" y="118" width="400" height="46" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="220" y="144" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                PAYLOAD LENGTH
              </text>

              {/* NEXT HEADER: 8 bits (16 to 24 = 200px) */}
              <rect x="420" y="118" width="200" height="46" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="520" y="144" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                NEXT HEADER
              </text>

              {/* HOP COUNT: 8 bits (24 to 32 = 200px) */}
              <rect x="620" y="118" width="200" height="46" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="720" y="144" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                HOP COUNT
              </text>

              {/* Row 3: Dark Slate (#384545) */}
              {/* SOURCE IP ADDRESS: 128 bits (16 bytes) */}
              <rect x="20" y="168" width="800" height="52" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="420" y="197" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-widest">
                SOURCE IP ADDRESS
              </text>

              {/* Row 4: Dark Slate (#384545) */}
              {/* DESTINATION IP ADDRESS: 128 bits (16 bytes) */}
              <rect x="20" y="224" width="800" height="52" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="420" y="253" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-widest">
                DESTINATION IP ADDRESS
              </text>
            </svg>
          </div>
        </div>
      </section>
    </NetworkPageLayout>
  );
}
