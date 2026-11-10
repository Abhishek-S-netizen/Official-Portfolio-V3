import React, { useState } from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page3_1_Ipv4Structure({ onBackToIndex, onNavigatePage }) {
  // Interactive Class Switcher state
  const [selectedClass, setSelectedClass] = useState('A');

  // Interactive CIDR prefix slider state (defaults to user example /26)
  const [cidrPrefix, setCidrPrefix] = useState(26);

  const getSubnetMask = (prefix) => {
    const octets = [];
    for (let i = 0; i < 4; i++) {
      const n = Math.min(Math.max(prefix - i * 8, 0), 8);
      octets.push(256 - Math.pow(2, 8 - n));
    }
    return octets.join('.');
  };

  const hostBits = 32 - cidrPrefix;
  const totalAddresses = Math.pow(2, hostBits);
  const usableHosts = totalAddresses > 2 ? totalAddresses - 2 : totalAddresses;
  const prefixPercent = (cidrPrefix / 32) * 100;
  const suffixPercent = (hostBits / 32) * 100;

  const classData = {
    A: {
      name: 'Class A',
      prefixSlash: '/8',
      prefixLength: 8,
      variablePrefixBits: 7,
      hostBits: 24,
      leadingBits: '0',
      prefixPercent: 25,
      suffixPercent: 75,
      hasSplit: true,
      networksPower: '7',
      networksCount: '128 networks',
      hostsPower: '24',
      hostsCount: '16,777,214 usable hosts',
      subnetMask: '255.0.0.0',
      firstOctetRange: '0 – 127',
      role: 'Designed for a tiny number of massive organizations with vast host populations.'
    },
    B: {
      name: 'Class B',
      prefixSlash: '/16',
      prefixLength: 16,
      variablePrefixBits: 14,
      hostBits: 16,
      leadingBits: '10',
      prefixPercent: 50,
      suffixPercent: 50,
      hasSplit: true,
      networksPower: '14',
      networksCount: '16,384 networks',
      hostsPower: '16',
      hostsCount: '65,534 usable hosts',
      subnetMask: '255.255.0.0',
      firstOctetRange: '128 – 191',
      role: 'Designed for medium-to-large sized enterprises, university campuses, and ISPs.'
    },
    C: {
      name: 'Class C',
      prefixSlash: '/24',
      prefixLength: 24,
      variablePrefixBits: 21,
      hostBits: 8,
      leadingBits: '110',
      prefixPercent: 75,
      suffixPercent: 25,
      hasSplit: true,
      networksPower: '21',
      networksCount: '2,097,152 networks',
      hostsPower: '8',
      hostsCount: '254 usable hosts',
      subnetMask: '255.255.255.0',
      firstOctetRange: '192 – 223',
      role: 'Designed for millions of small local business and residential networks.'
    },
    D: {
      name: 'Class D',
      prefixSlash: 'None',
      leadingBits: '1110',
      hasSplit: false,
      label: 'Multicast',
      firstOctetRange: '224 – 239',
      role: 'No prefix or suffix. Identifies multicast groups.'
    },
    E: {
      name: 'Class E',
      prefixSlash: 'None',
      leadingBits: '1111',
      hasSplit: false,
      label: 'Reserved for future use',
      firstOctetRange: '240 – 255',
      role: 'No prefix or suffix. Reserved for future use.'
    }
  };

  const current = classData[selectedClass];

  return (
    <NetworkPageLayout
      pageId="3-1-ipv4-structure"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* ============================================================== */}
      {/* SECTION 1: IPV4 ADDRESS FUNDAMENTALS */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          IPv4 Address
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          An IP address is a 32-bit, unique identifier of a device’s connection to the network.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          An IP address identifies one and only connection. If a device is connected to two networks, it will have two IP addresses.
        </p>

        <div className="pt-2">
          <span className="font-mono text-sm sm:text-base text-[#6E5844] font-semibold tracking-wide">
            Address space : 2<sup className="text-xs">32</sup>
          </span>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: STRUCTURE */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Structure
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          The IPv4 address is divided into two parts :
        </p>

        <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Prefix</strong> – Identifies the network, <span className="font-semibold text-[#384545]">n</span> bits
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Suffix</strong> – Identifies the node/device, <span className="font-semibold text-[#384545]">(32 - n)</span> bits
            </span>
          </li>
        </ul>

        <p className="text-base sm:text-lg text-[#283535] leading-relaxed pt-2">
          Prefixes can either be of fixed-length (classful addressing) or variable length (classless addressing).
        </p>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: CLASSFUL ADDRESSING */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Classful Addressing
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          To cater to varying sizes of networks, three fixed-length prefixes were created, divided into five classes.
        </p>

        <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Class A - /8</strong> – The first bit <span className="font-mono text-md font-bold text-[#8A7059]">(0)₂</span> is used to identify the class, which leaves a prefix length of 7.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Class B - /16</strong> – The first two bits <span className="font-mono text-md font-semibold text-[#8A7059]">(10)₂</span> are used to identify the class, which leaves a prefix length of 14.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Class C - /24</strong> – The first three bits <span className="font-mono text-md font-semibold text-[#8A7059]">(110)₂</span> are used to identify the class, which leaves a prefix length of 21.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Class D</strong> – No prefix.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Class E</strong> – No prefix.
            </span>
          </li>
        </ul>

        {/* ============================================================== */}
        {/* INTERACTIVE VISUALIZER: CLASSFUL PREFIX MORPHING */}
        {/* ============================================================== */}
        <div className="pt-8">
          <div className="mb-6 flex items-center justify-start">
            {/* Class Toggles */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-md bg-[#384545]/10 border border-[#8A7059]/25 w-fit">
              {['A', 'B', 'C', 'D', 'E'].map((c) => {
                const isActive = selectedClass === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedClass(c)}
                    className={`px-3 sm:px-4 py-1.5 rounded-md font-mono text-xs sm:text-sm font-semibold transition-all ${isActive
                      ? 'bg-[#384545] text-[#F5F2EB] shadow-sm'
                      : 'text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5'
                      }`}
                  >
                    Class {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 32-Bit Structure Visual Container */}
          <div className="pt-4 pb-2">
            {/* Octet Bracket Overheads */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[1, 2, 3, 4].map((octetNum) => (
                <div key={octetNum} className="flex flex-col items-center">
                  <span className="font-mono text-xs sm:text-sm text-[#232D2D] font-medium mb-1">
                    8 bits
                  </span>
                  {/* Minimalist SVG Bracket */}
                  <svg
                    className="w-full h-3 text-[#232D2D]"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M 2 10 L 2 3 Q 2 1 6 1 L 46 1 Q 50 1 50 0 Q 50 1 54 1 L 94 1 Q 98 1 98 3 L 98 10" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Animated Morphing 32-Bit Bar */}
            <div className="w-full h-14 sm:h-16 rounded-lg overflow-hidden flex border-2 border-[#232D2D] shadow-sm relative transition-all duration-500">
              {current.hasSplit ? (
                <>
                  {/* Prefix Bar (Solid Warm Bronze #856b54) */}
                  <div
                    style={{ width: `${current.prefixPercent}%` }}
                    className="bg-[#856b54] text-[#F5F2EB] flex items-center px-2 sm:px-3 relative overflow-hidden transition-all duration-500 ease-in-out border-r-2 border-[#232D2D]"
                  >
                    {/* Leading Bits Sub-box */}
                    <span className="border-2 border-[#232D2D] bg-[#856b54] px-2 py-1 rounded text-xs sm:text-sm font-mono font-bold tracking-wider text-white shrink-0 mr-2 shadow-sm">
                      {current.leadingBits}
                    </span>

                    {/* Prefix Label */}
                    <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider mx-auto truncate">
                      Prefix
                    </span>
                  </div>

                  {/* Suffix Bar (Solid Dark Slate #384545) */}
                  <div
                    style={{ width: `${current.suffixPercent}%` }}
                    className="bg-[#384545] text-[#F5F2EB] flex items-center justify-center px-2 sm:px-3 relative overflow-hidden transition-all duration-500 ease-in-out"
                  >
                    <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider truncate">
                      Suffix
                    </span>
                  </div>
                </>
              ) : (
                /* Class D / E: Unified Bar without Prefix/Suffix split */
                <div className="w-full bg-[#384545] text-[#F5F2EB] flex items-center px-2 sm:px-3 transition-all duration-500 ease-in-out">
                  {/* Leading Bits Sub-box */}
                  <span className="border-2 border-[#856b54] bg-[#384545] px-2 py-1 rounded text-xs sm:text-sm font-mono font-bold tracking-wider text-[#F5F2EB] shrink-0 mr-3 shadow-sm">
                    {current.leadingBits}
                  </span>

                  {/* Class Label */}
                  <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider mx-auto text-center">
                    {current.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Metrics & Mathematical Telemetry Under the Diagram */}
          <div className="mt-8 pt-6 border-t border-[#8A7059]/25 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                {current.name} Specifications
              </h3>
              <span className="font-mono text-xs sm:text-sm text-[#8A7059] font-semibold">
                First Octet Range: {current.firstOctetRange}
              </span>
            </div>

            {current.hasSplit ? (
              <div className="space-y-4 text-sm sm:text-base text-[#283535] leading-relaxed">
                <p>
                  If the prefix length is <span className="font-mono font-semibold text-[#8A7059]">n = {current.variablePrefixBits}</span>, then :
                </p>

                <ul className="space-y-2.5 pl-2 list-none">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-bold">•</span>
                    <span>
                      <strong className="text-[#232D2D]">2<sup className="text-xs">n</sup></strong> is the number of networks possible : <span className="font-mono font-semibold text-[#8A7059]">2<sup className="text-xs">{current.networksPower}</sup> = {current.networksCount}</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-bold">•</span>
                    <span>
                      <strong className="text-[#232D2D]">2<sup className="text-xs">32 − prefix</sup> − 2</strong> is the number of usable hosts : <span className="font-mono font-semibold text-[#384545]">2<sup className="text-xs">{current.hostsPower}</sup> − 2 = {current.hostsCount}</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-bold">•</span>
                    <span>
                      <strong className="text-[#232D2D]">Subnet mask :</strong> <span className="font-mono font-semibold text-[#232D2D] bg-[#8A7059]/15 px-2 py-0.5 rounded">{current.subnetMask}</span> ({current.prefixSlash})
                    </span>
                  </li>
                </ul>

                <p className="text-xs sm:text-sm text-[#6E5844] italic pt-1">
                  * Why −2 for usable hosts? The all-zeros host address is reserved as the <strong>Network ID</strong>, and the all-ones host address is reserved as the <strong>Directed Broadcast Address</strong>.
                </p>
              </div>
            ) : (
              <div className="pt-1 text-sm sm:text-base text-[#283535] leading-relaxed">
                <p>
                  {current.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: CLASSLESS ADDRESSING & SLASH NOTATION */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Classless addressing
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          The main disadvantage of classful addressing was that the addresses weren’t properly distributed, so not enough addresses were left for individuals and organisations who wanted to connect to the internet.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          So, in classless addressing, the address space is divided into variable-length blocks, where the prefix defines the block and the suffix defines the node/device.
        </p>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed font-semibold text-[#8A7059]">
          The larger the prefix, the smaller the network and vice versa.
        </p>

        {/* Subsection: Slash Notation */}
        <div className="pt-6 space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#232D2D]">
            Slash notation
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            Classless addressing requires a way to identify the prefix length, since here, the length is dynamic.
          </p>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            So, the prefix length <span className="font-mono font-semibold text-[#000000]">n</span> is added at the end of the address, separated by a slash, “/”. This is called slash notation or <strong>Classless Interdomain Routing (CIDR)</strong>.
          </p>

          <div className="pt-2">
            <span className="inline-block font-mono text-base sm:text-lg font-bold text-[#232D2D] bg-[#8A7059]/15 px-3 py-1.5 rounded-lg border border-[#8A7059]/30">
              Example : 192.168.1.0/26
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: SUBNETTING MATH */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Subnetting math
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          Subnetting basically involves dividing the network into various blocks.
        </p>

        {/* Formulas List (Normal text bullet points) */}
        <ul className="space-y-3 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Number of subnets (blocks)</strong> = 2<sup>s</sup> ; where <span className="font-semibold text-[#384545]">s</span> is the number of 1’s borrowed.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Number of possible addresses</strong> = 2<sup>h</sup>, where <span className="font-semibold text-[#384545]">h</span> is the number of zeroes left. Mathematically <span className="font-semibold text-[#232D2D]">h = 32 − n</span> where <span className="font-semibold text-[#384545]">n</span> is the prefix length.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-[#8A7059] font-bold">•</span>
            <span>
              <strong className="text-[#232D2D]">Number of usable addresses/hosts</strong> = 2<sup>h</sup> − 2, because the first address is the network address and the last one is the broadcast address.
            </span>
          </li>
        </ul>

        {/* Example Walkthrough */}
        <div className="pt-6 space-y-6">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#232D2D]">
            Example
          </h3>
          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            <strong className="text-[#232D2D]">Base address :</strong> <span className="font-mono font-bold text-[#8A7059] bg-[#8A7059]/15 px-2.5 py-1 rounded border border-[#8A7059]/30">192.168.1.0</span>
          </p>
          <p className="text-sm sm:text-base text-[#6E5844] italic">
            Now,
          </p>

          {/* Unified Interactive Bit-Borrowing Controller */}
          <div className="pt-2 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#6E5844] font-semibold">
                CIDR Prefix :
              </span>
              <span className="font-mono text-base font-bold text-[#8A7059]">
                /{cidrPrefix}
              </span>
              <span className="text-xs text-[#6E5844] font-mono">
                ({cidrPrefix - 24} {cidrPrefix - 24 === 1 ? 'bit' : 'bits'} borrowed)
              </span>
            </div>

            {/* Quick Preset Toggles */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-md bg-[#384545]/10 border border-[#8A7059]/25 w-fit">
              {[24, 25, 26, 27, 28].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCidrPrefix(p)}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all cursor-pointer ${cidrPrefix === p
                    ? 'bg-[#384545] text-[#F5F2EB] shadow-sm'
                    : 'text-[#6E5844] hover:text-[#232D2D] hover:bg-black/5'
                    }`}
                >
                  /{p} {p === 26 ? '' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Enlarged, Crisp Vector SVG Bit-Borrowing Diagram */}
          <div className="py-4 overflow-x-auto">
            <div className="min-w-[960px] w-full max-w-5xl mx-auto">
              <svg
                className="w-full h-auto text-[#232D2D] select-none"
                viewBox="0 0 1260 205"
                fill="none"
              >
                {/* Top Bracket for 24 bits (Octets 1 to 3) */}
                <path
                  d="M 28 54 L 28 34 L 758 34 L 758 54"
                  stroke="#232D2D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="393"
                  y="25"
                  textAnchor="middle"
                  className="font-sans text-sm font-bold fill-[#232D2D]"
                >
                  24 bits
                </text>

                {/* Top Callout for Borrowed Bits */}
                {cidrPrefix > 24 ? (
                  (() => {
                    const borrowedCount = cidrPrefix - 24;
                    const borrowCenter = 772 + ((borrowedCount - 1) * 29 + 25) / 2;
                    const elbowRight = borrowCenter + 20;
                    const labelText =
                      borrowedCount === 1
                        ? "One 1 borrowed => 24 + 1 = /25 prefix length"
                        : borrowedCount === 2
                          ? "Two 1’s borrowed => 24 + 2 = /26 prefix length"
                          : borrowedCount === 3
                            ? "Three 1’s borrowed => 24 + 3 = /27 prefix length"
                            : "Four 1’s borrowed => 24 + 4 = /28 prefix length";

                    return (
                      <g>
                        <path
                          d={`M ${elbowRight} 22 L ${borrowCenter} 22 L ${borrowCenter} 54`}
                          stroke="#232D2D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polygon
                          points={`${borrowCenter - 4},52 ${borrowCenter},60 ${borrowCenter + 4},52`}
                          fill="#232D2D"
                        />
                        <text
                          x={elbowRight + 8}
                          y="26"
                          className="font-sans text-xs sm:text-[13px] font-bold fill-[#232D2D]"
                        >
                          {labelText}
                        </text>
                      </g>
                    );
                  })()
                ) : (
                  <text
                    x="772"
                    y="26"
                    className="font-sans text-xs sm:text-[13px] font-bold fill-[#6E5844]"
                  >
                    0 bits borrowed (Base /24 network)
                  </text>
                )}

                {/* Outer Brown Bar Box - enclosing all 32 bits */}
                <rect
                  x="18"
                  y="62"
                  width="1024"
                  height="62"
                  rx="8"
                  fill="#856b54"
                  fillOpacity="0.1"
                  stroke="#856b54"
                  strokeWidth="2.5"
                />

                {/* Octet 1 (8 bits) */}
                {[28, 57, 86, 115, 144, 173, 202, 231].map((x, i) => (
                  <g key={`oct1-${i}`}>
                    <rect x={x} y="71" width="25" height="44" rx="4" fill="#384545" />
                    <text x={x + 12.5} y="97" textAnchor="middle" dominantBaseline="middle" className="font-mono text-sm font-bold fill-white">
                      1
                    </text>
                  </g>
                ))}

                {/* Dot 1 */}
                <circle cx="266" cy="93" r="3" fill="#856b54" />

                {/* Octet 2 (8 bits) */}
                {[276, 305, 334, 363, 392, 421, 450, 479].map((x, i) => (
                  <g key={`oct2-${i}`}>
                    <rect x={x} y="71" width="25" height="44" rx="4" fill="#384545" />
                    <text x={x + 12.5} y="97" textAnchor="middle" dominantBaseline="middle" className="font-mono text-sm font-bold fill-white">
                      1
                    </text>
                  </g>
                ))}

                {/* Dot 2 */}
                <circle cx="514" cy="93" r="3" fill="#856b54" />

                {/* Octet 3 (8 bits) */}
                {[524, 553, 582, 611, 640, 669, 698, 727].map((x, i) => (
                  <g key={`oct3-${i}`}>
                    <rect x={x} y="71" width="25" height="44" rx="4" fill="#384545" />
                    <text x={x + 12.5} y="97" textAnchor="middle" dominantBaseline="middle" className="font-mono text-sm font-bold fill-white">
                      1
                    </text>
                  </g>
                ))}

                {/* Dot 3 */}
                <circle cx="762" cy="93" r="3" fill="#856b54" />

                {/* Octet 4 (8 bits: Dynamic Borrowed Cyan bits + Remaining Zeroes) */}
                {[772, 801, 830, 859, 888, 917, 946, 975].map((x, i) => {
                  const isBorrowed = i < cidrPrefix - 24;
                  return (
                    <g key={`oct4-${i}`}>
                      <rect
                        x={x}
                        y="71"
                        width="25"
                        height="44"
                        rx="4"
                        fill={isBorrowed ? "#00A3FF" : "#384545"}
                      />
                      <text
                        x={x + 12.5}
                        y="97"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`font-mono text-sm ${isBorrowed ? "font-extrabold fill-white" : "font-bold fill-white"
                          }`}
                      >
                        {isBorrowed ? "1" : "0"}
                      </text>
                    </g>
                  );
                })}

                {/* Bottom Arrow Callout for Remaining Zeroes */}
                {32 - cidrPrefix > 0 && (
                  (() => {
                    const borrowedCount = cidrPrefix - 24;
                    const zeroStart = 772 + borrowedCount * 29;
                    const arrowX = Math.min(zeroStart + 35, 960);
                    return (
                      <g>
                        <path
                          d={`M ${arrowX} 175 L ${arrowX} 133`}
                          stroke="#232D2D"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <polygon
                          points={`${arrowX - 4},135 ${arrowX},127 ${arrowX + 4},135`}
                          fill="#232D2D"
                        />
                        <text
                          x={arrowX + 12}
                          y="170"
                          className="font-sans text-xs sm:text-[13px] font-bold fill-[#232D2D]"
                        >
                          32 − {cidrPrefix} = {32 - cidrPrefix} remaining zeroes
                        </text>
                      </g>
                    );
                  })()
                )}
              </svg>
            </div>
          </div>

          {/* Calculations Breakdown (Dynamically Evaluated) */}
          <div className="space-y-3 pt-2 text-base sm:text-lg text-[#283535] leading-relaxed">
            <p>
              <strong className="text-[#232D2D]">Number of ones borrowed :</strong> {cidrPrefix - 24} &nbsp;=&gt;&nbsp; <strong className="text-[#8A7059]">Number of blocks = 2<sup className="text-xs">{cidrPrefix - 24}</sup> = {Math.pow(2, cidrPrefix - 24)} blocks/subnets</strong>
            </p>
            <p>
              <strong className="text-[#232D2D]">Number of addresses in the block :</strong> 2<sup className="text-xs">32 − {cidrPrefix}</sup> = 2<sup className="text-xs">{32 - cidrPrefix}</sup> = <strong className="text-[#232D2D]">{Math.pow(2, 32 - cidrPrefix)}</strong>
            </p>
            <p>
              <strong className="text-[#232D2D]">Number of usable hosts :</strong> {Math.pow(2, 32 - cidrPrefix)} − 2 = <strong className="text-[#384545]">{Math.max(0, Math.pow(2, 32 - cidrPrefix) - 2)}</strong>
            </p>
          </div>

          {/* Subnet Blocks Table (Dynamically Generated) */}
          <div className="pt-6">
            <div className="overflow-x-auto border-t-2 border-[#8A7059]">
              <table className="w-full text-left font-mono text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#8A7059]/70 text-[#232D2D]">
                    <th className="py-3 px-3 sm:px-4 font-bold tracking-wider">Subnet</th>
                    <th className="py-3 px-3 sm:px-4 font-bold tracking-wider">Network Address</th>
                    <th className="py-3 px-3 sm:px-4 font-bold tracking-wider">Usable Range</th>
                    <th className="py-3 px-3 sm:px-4 font-bold tracking-wider">Broadcast address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8A7059]/25 text-[#283535]">
                  {Array.from({ length: Math.min(Math.pow(2, cidrPrefix - 24), 8) }).map((_, i) => {
                    const blkSize = Math.pow(2, 32 - cidrPrefix);
                    const netStart = i * blkSize;
                    const netEnd = netStart + blkSize - 1;
                    return (
                      <tr key={i} className="hover:bg-[#8A7059]/5 transition-colors">
                        <td className="py-3 px-3 sm:px-4 font-bold text-[#8A7059]">Block {i + 1}</td>
                        <td className="py-3 px-3 sm:px-4 text-[#232D2D] font-semibold">192.168.1.{netStart}</td>
                        <td className="py-3 px-3 sm:px-4 text-[#384545]">
                          {blkSize > 2 ? `192.168.1.${netStart + 1} to 192.168.1.${netEnd - 1}` : 'N/A'}
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-[#8A7059] font-medium">192.168.1.{netEnd}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: IPV4 DATAGRAM HEADER */}
      {/* ============================================================== */}
      <section className="mt-16 pt-12 border-t border-[#8A7059]/25 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          IPv4 Datagram Header
        </h2>
        <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
          The structure of the IPv4 packet header, organized into 32-bit (4-byte) rows:
        </p>

        {/* IPv4 Header Diagram (Responsive Vector SVG mirroring slide) */}
        <div className="py-4 overflow-x-auto">
          <div className="min-w-[760px] w-full max-w-4xl mx-auto">
            <svg
              className="w-full h-auto text-[#232D2D] select-none"
              viewBox="0 0 840 370"
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
                Measured in bits (32 bits / 4 bytes per row)
              </text>

              {/* Ruler Bit Marks */}
              <text x="20" y="60" textAnchor="start" className="font-mono text-xs font-bold fill-[#232D2D]">0</text>
              <text x="120" y="60" textAnchor="middle" className="font-mono text-xs font-bold fill-[#232D2D]">4</text>
              <text x="220" y="60" textAnchor="middle" className="font-mono text-xs font-bold fill-[#232D2D]">8</text>
              <text x="420" y="60" textAnchor="middle" className="font-mono text-xs font-bold fill-[#232D2D]">16</text>
              <text x="820" y="60" textAnchor="end" className="font-mono text-xs font-bold fill-[#232D2D]">32</text>

              {/* Row 1: Warm Bronze (#856b54) */}
              {/* VERSION: 4 bits */}
              <rect x="20" y="68" width="100" height="44" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="70" y="93" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                VERSION
              </text>

              {/* IHL: 4 bits */}
              <rect x="120" y="68" width="100" height="44" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="170" y="93" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                IHL
              </text>

              {/* QoS / DSCP: 8 bits */}
              <rect x="220" y="68" width="200" height="44" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="320" y="93" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                QoS / DSCP
              </text>

              {/* TOTAL LENGTH: 16 bits */}
              <rect x="420" y="68" width="400" height="44" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="620" y="93" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                TOTAL LENGTH
              </text>

              {/* Row 2: Dark Slate (#384545) */}
              {/* IDENTIFICATION: 16 bits */}
              <rect x="20" y="116" width="400" height="44" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="220" y="141" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                IDENTIFICATION
              </text>

              {/* FLAG (3 BITS): 3 bits */}
              <rect x="420" y="116" width="75" height="44" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="457.5" y="133" textAnchor="middle" dominantBaseline="middle" className="font-mono text-[11px] sm:text-xs font-bold fill-[#F5F2EB] tracking-tight">
                FLAG
              </text>
              <text x="457.5" y="148" textAnchor="middle" dominantBaseline="middle" className="font-mono text-[10px] sm:text-[11px] font-semibold fill-[#F5F2EB]/80">
                (3 BITS)
              </text>

              {/* FRAGMENTATION OFFSET: 13 bits */}
              <rect x="495" y="116" width="325" height="44" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="657.5" y="133" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                FRAGMENTATION
              </text>
              <text x="657.5" y="149" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                OFFSET
              </text>

              {/* Row 3: Warm Bronze (#856b54) */}
              {/* TIME-TO-LIVE (TTL): 8 bits */}
              <rect x="20" y="164" width="200" height="44" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="120" y="189" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                TIME-TO-LIVE (TTL)
              </text>

              {/* PROTOCOL: 8 bits */}
              <rect x="220" y="164" width="200" height="44" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="320" y="189" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                PROTOCOL
              </text>

              {/* HEADER CHECKSUM: 16 bits */}
              <rect x="420" y="164" width="400" height="44" fill="#856b54" stroke="#232D2D" strokeWidth="1.5" />
              <text x="620" y="189" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-wider">
                HEADER CHECKSUM
              </text>

              {/* Row 4: Dark Slate (#384545) */}
              {/* SOURCE IP ADDRESS: 32 bits */}
              <rect x="20" y="212" width="800" height="44" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="420" y="237" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-widest">
                SOURCE IP ADDRESS
              </text>

              {/* Row 5: Dark Slate (#384545) */}
              {/* DESTINATION IP ADDRESS: 32 bits */}
              <rect x="20" y="260" width="800" height="44" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="420" y="285" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-widest">
                DESTINATION IP ADDRESS
              </text>

              {/* Row 6: Dark Slate (#384545) */}
              {/* OPTION + PADDING */}
              <rect x="20" y="308" width="800" height="44" fill="#384545" stroke="#232D2D" strokeWidth="1.5" />
              <text x="420" y="333" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs sm:text-[13px] font-bold fill-[#F5F2EB] tracking-widest">
                OPTION + PADDING
              </text>
            </svg>
          </div>
        </div>

        {/* Header Fields Breakdown (Plain text bullet points) */}
        <div className="pt-2 space-y-3 text-base sm:text-lg text-[#283535] leading-relaxed">
          <ul className="space-y-3 pl-2 list-none">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Version :</strong> IPv4
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">IHL :</strong> Internet Header Length (IPv4 header length can vary from 20–60 bytes)
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Total Length :</strong> Header length + payload
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Identification :</strong> For identifying fragments belonging to the same parent packet
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <div>
                <strong className="text-[#232D2D]">Flag :</strong>
                <ul className="mt-1.5 ml-4 space-y-1.5 list-disc text-sm sm:text-base text-[#283535]">
                  <li>
                    <strong className="text-[#232D2D]">Don't Fragment flag bit :</strong> if 1, router cannot fragment the packet
                  </li>
                  <li>
                    <strong className="text-[#232D2D]">More fragments flag bit :</strong> if 1, more fragments follow, 0 indicates the final fragment
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Protocol :</strong> Whether it uses TCP or UDP
              </span>
            </li>
          </ul>
        </div>
      </section>
    </NetworkPageLayout>
  );
}
