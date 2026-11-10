import React from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page1_3_SwitchingMedia({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="1-3-switching-media"
      subtitle="Circuit-switched vs. packet-switched architectures, guided cables, and wireless unguided media."
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* Article Body */}
      <div className="space-y-12 text-base sm:text-lg text-[#283535] leading-relaxed">
        {/* SECTION 1: CIRCUIT-SWITCHED VS PACKET-SWITCHED */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Circuit-Switched vs. Packet-Switched Networks
          </h2>
          <p>
            A switch connects at least two links and needs to forward data between them. This is done in one of two ways :
          </p>

          <div className="space-y-6">
            {/* Circuit-Switched */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#232D2D]">
                Circuit-Switched
              </h3>
              <p>
                A dedicated connection (a circuit) is created between the sender and the receiver before any communication takes place, and the switch can either make this connection active or inactive.
              </p>
              <p>
                A circuit-switched network is only efficient when it is being used at its maximum capacity. Since most of the time, it’s only used at partial capacity, it isn’t the most efficient.
              </p>
            </div>

            {/* Packet-Switched */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xl font-bold text-[#232D2D]">
                Packet-Switched
              </h3>
              <p>
                Communication between the sender and the receiver takes place in blocks of data called packets. Routers have a queue that can store and forward such packets.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-4 border-t border-[#8A7059]/25" />

        {/* SECTION 2: TRANSMISSION MEDIA TYPES */}
        <section className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Transmission Media Types
          </h2>

          {/* Transmission Media Hierarchy Tree Diagram */}
          <div className="my-6 p-4 sm:p-6 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 flex flex-col items-center shadow-sm">
            <svg viewBox="0 0 840 260" className="w-full max-w-[780px] h-auto select-none font-sans">
              {/* Root Node: Transmission Media */}
              <rect x="295" y="12" width="250" height="44" rx="8" fill="#384545" />
              <text x="420" y="39" textAnchor="middle" fill="#FAF8F5" fontSize="15" fontWeight="600">
                Transmission Media
              </text>

              {/* Tree connecting lines to Guided & Unguided */}
              <path
                d="M 420 56 L 420 74 M 230 96 L 230 84 Q 230 74 245 74 L 420 74 L 595 74 Q 610 74 610 84 L 610 96"
                fill="none"
                stroke="#384545"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Guided Box */}
              <rect x="145" y="96" width="170" height="42" rx="8" fill="#8A7059" />
              <text x="230" y="122" textAnchor="middle" fill="#FAF8F5" fontSize="14" fontWeight="600">
                Guided
              </text>

              {/* Unguided Box */}
              <rect x="525" y="96" width="170" height="42" rx="8" fill="#8A7059" />
              <text x="610" y="122" textAnchor="middle" fill="#FAF8F5" fontSize="14" fontWeight="600">
                Unguided
              </text>

              {/* Lines from Guided to its 3 sub-media */}
              <line x1="230" y1="138" x2="105" y2="198" stroke="#232D2D" strokeWidth="1.75" />
              <line x1="230" y1="138" x2="230" y2="198" stroke="#232D2D" strokeWidth="1.75" />
              <line x1="230" y1="138" x2="355" y2="198" stroke="#232D2D" strokeWidth="1.75" />

              {/* Guided Sub-boxes */}
              {/* 1. Twisted-Pair */}
              <rect x="45" y="198" width="120" height="42" rx="8" fill="#FAF8F5" stroke="#8A7059" strokeWidth="1.5" />
              <text x="105" y="224" textAnchor="middle" fill="#232D2D" fontSize="13" fontWeight="500">
                Twisted-Pair
              </text>

              {/* 2. Coaxial */}
              <rect x="175" y="198" width="110" height="42" rx="8" fill="#FAF8F5" stroke="#8A7059" strokeWidth="1.5" />
              <text x="230" y="224" textAnchor="middle" fill="#232D2D" fontSize="13" fontWeight="500">
                Coaxial
              </text>

              {/* 3. Fibre-Optic */}
              <rect x="300" y="198" width="110" height="42" rx="8" fill="#FAF8F5" stroke="#8A7059" strokeWidth="1.5" />
              <text x="355" y="224" textAnchor="middle" fill="#232D2D" fontSize="13" fontWeight="500">
                Fibre-Optic
              </text>

              {/* Lines from Unguided to its 3 sub-media */}
              <line x1="610" y1="138" x2="485" y2="198" stroke="#232D2D" strokeWidth="1.75" />
              <line x1="610" y1="138" x2="610" y2="198" stroke="#232D2D" strokeWidth="1.75" />
              <line x1="610" y1="138" x2="735" y2="198" stroke="#232D2D" strokeWidth="1.75" />

              {/* Unguided Sub-boxes */}
              {/* 1. Radio waves */}
              <rect x="425" y="198" width="120" height="42" rx="8" fill="#FAF8F5" stroke="#8A7059" strokeWidth="1.5" />
              <text x="485" y="224" textAnchor="middle" fill="#232D2D" fontSize="13" fontWeight="500">
                Radio waves
              </text>

              {/* 2. Infrared waves */}
              <rect x="550" y="198" width="120" height="42" rx="8" fill="#FAF8F5" stroke="#8A7059" strokeWidth="1.5" />
              <text x="610" y="224" textAnchor="middle" fill="#232D2D" fontSize="13" fontWeight="500">
                Infrared waves
              </text>

              {/* 3. Microwaves */}
              <rect x="675" y="198" width="120" height="42" rx="8" fill="#FAF8F5" stroke="#8A7059" strokeWidth="1.5" />
              <text x="735" y="224" textAnchor="middle" fill="#232D2D" fontSize="13" fontWeight="500">
                Microwaves
              </text>
            </svg>
          </div>

          {/* GUIDED MEDIA */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D] mb-2">
                Guided Media
              </h3>
              <p>
                Provides a physical path along which data is transmitted from the sender to the receiver.
              </p>
            </div>

            {/* Twisted-Pair Cables */}
            <div className="space-y-3 pt-2">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Twisted-Pair Cables
              </h4>
              <ul className="space-y-2 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Consists of a pair of copper conductors, encased in an insulated covering, that are twisted together, in order to balance out noise. One of the wires is for transmitting signals, while the other one is for ground reference.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>If the two wires were parallel to each other, then there is a possibility that one of the wires would be closer to the noise and be more affected by it than the other one.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>When the wires are twisted, at one point, one of the wires will be closer to the noise, while the other one will be farther away from it. At the next point, it’s the opposite. This ensures that both wires are equally affected, so that eventually, at the receiver’s end, the unwanted signals mostly cancel each other out.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <div>
                    <span>There are two types of twisted-pair cables :</span>
                    <ul className="mt-2 space-y-1.5 pl-4 list-none text-base">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#8A7059] font-semibold">-</span>
                        <span><strong className="text-[#232D2D]">Unshielded twisted-pair :</strong> The most common one.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#8A7059] font-semibold">-</span>
                        <span><strong className="text-[#232D2D]">Shielded twisted-pair :</strong> A more expensive one developed by IBM, where the insulated wires are further encased in a metallic foil to prevent noise.</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>These are mostly used in LANs.</span>
                </li>
              </ul>

              {/* Twisted-Pair Cable Diagram - Native Vector SVG Replica */}
              <div className="my-6 p-4 sm:p-6 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 flex flex-col items-center shadow-sm">
                <svg viewBox="0 0 860 220" className="w-full max-w-[800px] h-auto select-none font-sans">
                  <defs>
                    {/* Gradients for cylindrical 3D wire lighting */}
                    <linearGradient id="wire-bronze" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#634F3D" />
                      <stop offset="25%" stopColor="#8A7059" />
                      <stop offset="50%" stopColor="#A48C74" />
                      <stop offset="75%" stopColor="#8A7059" />
                      <stop offset="100%" stopColor="#4D3B2C" />
                    </linearGradient>

                    <linearGradient id="wire-slate" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1E2727" />
                      <stop offset="25%" stopColor="#384545" />
                      <stop offset="50%" stopColor="#4E5D5D" />
                      <stop offset="75%" stopColor="#384545" />
                      <stop offset="100%" stopColor="#182020" />
                    </linearGradient>

                    <linearGradient id="twisted-copper-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#B34F1D" />
                      <stop offset="35%" stopColor="#E57639" />
                      <stop offset="70%" stopColor="#C85F28" />
                      <stop offset="100%" stopColor="#88360E" />
                    </linearGradient>

                    {/* Drop shadow for 3D crossover depth */}
                    <filter id="crossover-shadow" x="-15%" y="-15%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#151C1C" floodOpacity="0.3" />
                    </filter>
                  </defs>

                  {/* --- LEFT WIRE START CAPS (No stray bumps) --- */}
                  <ellipse cx="135" cy="75" rx="4" ry="11" fill="#634F3D" stroke="#4D3B2C" strokeWidth="1" />
                  <ellipse cx="135" cy="145" rx="4" ry="11" fill="#1E2727" stroke="#182020" strokeWidth="1" />

                  {/* --- WIRE B (DEEP SLATE) FULL CONTINUOUS BASE SWEEP (Zero seams) --- */}
                  <path
                    d="M 135 145 C 195 145, 255 75, 315 75 C 375 75, 435 145, 495 145 C 555 145, 605 75, 640 75"
                    fill="none"
                    stroke="url(#wire-slate)"
                    strokeWidth="22"
                    strokeLinecap="butt"
                  />

                  {/* --- WIRE A (WARM BRONZE) FULL CONTINUOUS BASE SWEEP (Zero seams) --- */}
                  {/* Wire A is in front at Crossover 1 (x=225) and Crossover 3 (x=585) */}
                  <path
                    d="M 135 75 C 195 75, 255 145, 315 145 C 375 145, 435 75, 495 75 C 555 75, 605 145, 640 145"
                    fill="none"
                    stroke="url(#wire-bronze)"
                    strokeWidth="22"
                    strokeLinecap="butt"
                  />

                  {/* --- CROSSOVER 2: WIRE B CROSSES OVER WIRE A (with 3D shadow) --- */}
                  {/* Clean background separator halo */}
                  <path
                    d="M 345 83 C 385 101, 425 120, 465 137"
                    fill="none"
                    stroke="#EAE5DA"
                    strokeWidth="26"
                    strokeLinecap="round"
                  />
                  {/* Wire B crossing piece from x=330 to x=480 */}
                  <path
                    d="M 330 78 C 380 90, 430 130, 480 142"
                    fill="none"
                    stroke="url(#wire-slate)"
                    strokeWidth="22"
                    strokeLinecap="round"
                    filter="url(#crossover-shadow)"
                  />

                  {/* --- RIGHT TERMINATION: CLEAN PERPENDICULAR CROSS-SECTIONS --- */}
                  {/* Top Wire (Wire B) insulation cut cap & copper conductor */}
                  <ellipse cx="640" cy="75" rx="5" ry="11" fill="#252F2F" stroke="#182020" strokeWidth="1" />
                  <rect x="640" y="71" width="45" height="8" fill="url(#twisted-copper-grad)" />
                  <ellipse cx="685" cy="75" rx="2.5" ry="4" fill="#F59359" stroke="#88360E" strokeWidth="0.75" />

                  {/* Bottom Wire (Wire A) insulation cut cap & copper conductor */}
                  <ellipse cx="640" cy="145" rx="5" ry="11" fill="#634F3D" stroke="#4D3B2C" strokeWidth="1" />
                  <rect x="640" y="141" width="45" height="8" fill="url(#twisted-copper-grad)" />
                  <ellipse cx="685" cy="145" rx="2.5" ry="4" fill="#F59359" stroke="#88360E" strokeWidth="0.75" />

                  {/* --- CALLOUT BRACKETS & LABELS (Spacious, zero truncation) --- */}
                  {/* Left Bracket: Insulation */}
                  <path
                    d="M 125 75 L 105 75 L 105 145 L 125 145 M 105 110 L 85 110"
                    fill="none"
                    stroke="#8A7059"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="75" y="114" textAnchor="end" fill="#232D2D" fontSize="14" fontWeight="600">
                    Insulation
                  </text>

                  {/* Right Fork Bracket: Conductors */}
                  <path
                    d="M 695 75 L 725 110 L 695 145 M 725 110 L 750 110"
                    fill="none"
                    stroke="#C85F28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="758" y="114" fill="#C86432" fontSize="14" fontWeight="600">
                    Conductors
                  </text>
                </svg>
              </div>
            </div>

            {/* Coaxial Cables */}
            <div className="space-y-3 pt-10 sm:pt-14">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Coaxial Cables
              </h4>
              <ul className="space-y-2 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Coaxial cables consist of a conductor, enclosed in an insulated casing, which is again wrapped in a metallic foil (to act as an extra conductor and as a shield against noise), which is again wrapped within an insulated casing, which is further encased in a plastic coating.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>These were mostly used in telephone and television networks before being replaced by fibre-optic cables.</span>
                </li>
              </ul>

              {/* Coaxial Cable Cutaway Diagram - Native Vector SVG Replica */}
              <div className="my-6 p-4 sm:p-6 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 flex flex-col items-center shadow-sm">
                <svg viewBox="0 0 780 380" className="w-full max-w-[740px] h-auto select-none font-sans">
                  <defs>
                    {/* Gradients for stepped coaxial 3D cylinders */}
                    <linearGradient id="coax-bronze-long" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#634F3D" />
                      <stop offset="25%" stopColor="#8A7059" />
                      <stop offset="55%" stopColor="#9C826B" />
                      <stop offset="80%" stopColor="#735C47" />
                      <stop offset="100%" stopColor="#4A3A2C" />
                    </linearGradient>

                    <linearGradient id="coax-slate-side-1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#222B2B" />
                      <stop offset="30%" stopColor="#384545" />
                      <stop offset="70%" stopColor="#2A3535" />
                      <stop offset="100%" stopColor="#1B2222" />
                    </linearGradient>

                    <linearGradient id="coax-foil-side" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6E767A" />
                      <stop offset="30%" stopColor="#ACB3B8" />
                      <stop offset="70%" stopColor="#8D959A" />
                      <stop offset="100%" stopColor="#555C60" />
                    </linearGradient>

                    <linearGradient id="coax-slate-side-2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#222B2B" />
                      <stop offset="30%" stopColor="#384545" />
                      <stop offset="70%" stopColor="#2A3535" />
                      <stop offset="100%" stopColor="#1B2222" />
                    </linearGradient>

                    <linearGradient id="coax-copper-rod" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#A84817" />
                      <stop offset="25%" stopColor="#E57235" />
                      <stop offset="60%" stopColor="#C85F28" />
                      <stop offset="100%" stopColor="#7E330D" />
                    </linearGradient>

                    <radialGradient id="coax-copper-tip" cx="45%" cy="45%" r="55%">
                      <stop offset="0%" stopColor="#F59359" />
                      <stop offset="65%" stopColor="#C85F28" />
                      <stop offset="100%" stopColor="#8B3910" />
                    </radialGradient>
                  </defs>

                  {/* All layers share the same horizontal center axis: y = 190 */}

                  {/* LAYER 1: Plastic Cladding (Long Outer Cable Body with Rounded 3D Left Contour, ry=130, rx=55) */}
                  {/* Continuous sleeve extending from x=75 to x=180, rounding smoothly on the left to x=20 */}
                  <path
                    d="M 75 60 L 180 60 A 55 130 0 0 1 180 320 L 75 320 A 55 130 0 0 1 75 60 Z"
                    fill="url(#coax-bronze-long)"
                  />
                  {/* Left 3D End Rim / Contour to give natural depth */}
                  <path
                    d="M 75 60 A 55 130 0 0 1 75 320"
                    fill="none"
                    stroke="#5E4A38"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    opacity="0.35"
                  />
                  {/* Front Face Ellipse of Plastic Cladding */}
                  <ellipse cx="180" cy="190" rx="55" ry="130" fill="#8A7059" stroke="#5E4A38" strokeWidth="1" />

                  {/* LAYER 2: Insulated Wrapping (Outer Dielectric Cylinder, ry=105, rx=44) */}
                  {/* Stepping forward from x=180 to x=230 */}
                  <path
                    d="M 180 85 L 230 85 A 44 105 0 0 1 230 295 L 180 295 A 44 105 0 0 1 180 85 Z"
                    fill="url(#coax-slate-side-1)"
                  />
                  {/* Front Face Ellipse of Layer 2 */}
                  <ellipse cx="230" cy="190" rx="44" ry="105" fill="#384545" stroke="#222B2B" strokeWidth="1" />

                  {/* LAYER 3: Metallic Foil (Shielding Cylinder, ry=82, rx=35) */}
                  {/* Stepping forward from x=230 to x=275 */}
                  <path
                    d="M 230 108 L 275 108 A 35 82 0 0 1 275 272 L 230 272 A 35 82 0 0 1 230 108 Z"
                    fill="url(#coax-foil-side)"
                  />
                  {/* Front Face Ellipse of Layer 3 */}
                  <ellipse cx="275" cy="190" rx="35" ry="82" fill="#9BA2A6" stroke="#6C7478" strokeWidth="1" />

                  {/* LAYER 4: Insulated Wrapping (Inner Dielectric Cylinder, ry=60, rx=25) */}
                  {/* Stepping forward from x=275 to x=315 */}
                  <path
                    d="M 275 130 L 315 130 A 25 60 0 0 1 315 250 L 275 250 A 25 60 0 0 1 275 130 Z"
                    fill="url(#coax-slate-side-2)"
                  />
                  {/* Front Face Ellipse of Layer 4 */}
                  <ellipse cx="315" cy="190" rx="25" ry="60" fill="#384545" stroke="#222B2B" strokeWidth="1" />

                  {/* LAYER 5: Conductor (Solid, Straight, Protruding Copper Core Rod, ry=18, rx=8) */}
                  {/* Cylindrical Rod Body from x=315 to x=390 */}
                  <path
                    d="M 315 172 L 390 172 A 8 18 0 0 1 390 208 L 315 208 A 8 18 0 0 1 315 172 Z"
                    fill="url(#coax-copper-rod)"
                  />
                  {/* Front Circular Face Cap of Conductor */}
                  <ellipse cx="390" cy="190" rx="8" ry="18" fill="url(#coax-copper-tip)" stroke="#8B3910" strokeWidth="1" />

                  {/* CALLOUT LEADER LINES & LABELS (Clean lines without dots) */}

                  {/* 1. Plastic Cladding */}
                  <polyline
                    points="180,60 410,44 460,44"
                    fill="none"
                    stroke="#8A7059"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <text x="468" y="48" fill="#232D2D" fontSize="14" fontWeight="600">
                    Plastic Cladding
                  </text>

                  {/* 2. Insulated wrapping (outer) */}
                  <polyline
                    points="230,85 450,84 500,84"
                    fill="none"
                    stroke="#384545"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <text x="508" y="88" fill="#232D2D" fontSize="14" fontWeight="500">
                    Insulated wrapping
                  </text>

                  {/* 3. Metallic foil */}
                  <polyline
                    points="275,108 485,124 535,124"
                    fill="none"
                    stroke="#6C7478"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <text x="543" y="128" fill="#232D2D" fontSize="14" fontWeight="500">
                    Metallic foil
                  </text>

                  {/* 4. Insulated wrapping (inner) */}
                  <polyline
                    points="315,130 520,162 565,162"
                    fill="none"
                    stroke="#384545"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <text x="573" y="166" fill="#232D2D" fontSize="14" fontWeight="500">
                    Insulated wrapping
                  </text>

                  {/* 5. Conductor */}
                  <polyline
                    points="398,190 540,190 580,190"
                    fill="none"
                    stroke="#C85F28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <text x="588" y="194" fill="#C86432" fontSize="14" fontWeight="600">
                    Conductor
                  </text>
                </svg>
              </div>
            </div>

            {/* Fibre-Optic Cables */}
            <div className="space-y-3 pt-10 sm:pt-14">
              <h4 className="text-lg sm:text-xl font-bold text-[#232D2D]">
                Fibre-Optic Cables
              </h4>
              <ul className="space-y-2 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Fibre-optic cables consist of a glass or plastic core that is encased within a glass or plastic cladding of lower density. It transmits signals in the form of light using the concept of total internal reflection.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>The density of the core and the cladding should be in such a way that, when a light signal hits the cladding, it gets reflected from it instead of being refracted into it.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Fibre-optic cables are really fast and highly resistant to noise, but also expensive to install and maintain.</span>
                </li>
              </ul>

              <ul className="space-y-2 pl-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[#8A7059] font-bold mt-3">•</span>
                  <div className="w-full">
                    <span className="font-medium text-[#232D2D] block mt-3 mb-3">
                      There are three propagation modes:
                    </span>

                    {/* Minimal 3-Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                      {/* Mode 1 */}
                      <div className="p-4 rounded-md border border-[#8A7059]/25 bg-[#EAE5DA]/30 flex flex-col justify-start">
                        <h5 className="font-bold text-[#232D2D] mb-2 text-base">
                          Multimode step-index :
                        </h5>
                        <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                          Allows for transmission of multiple light rays. The density of the core remains the same throughout, which means when the light ray hits the juncture between the core and the cladding, its angle changes abruptly, which distorts the signal.
                        </p>
                      </div>

                      {/* Mode 2 */}
                      <div className="p-4 rounded-md border border-[#8A7059]/25 bg-[#EAE5DA]/30 flex flex-col justify-start">
                        <h5 className="font-bold text-[#232D2D] mb-2 text-base">
                          Multimode graded-index :
                        </h5>
                        <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                          Allows for transmission of multiple light rays as well, but here the density of the core gradually decreases as you move from the center and out to the edges, so a light ray smoothly bends instead of being deflected abruptly. This reduces signal distortion.
                        </p>
                      </div>

                      {/* Mode 3 */}
                      <div className="p-4 rounded-md border border-[#8A7059]/25 bg-[#EAE5DA]/30 flex flex-col justify-start">
                        <h5 className="font-bold text-[#232D2D] mb-2 text-base">
                          Single Mode :
                        </h5>
                        <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                          Here, the core is so thin with a low density that it only allows for a single ray of light to travel through it. Due to this reduced density, all light rays are transmitted in an almost identical and horizontal manner, which reduces delay.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              {/* Fibre-Optic Total Internal Reflection Diagram */}
              <div className="my-6 p-4 sm:p-6 rounded-md bg-[#EAE5DA]/40 border border-[#8A7059]/25 flex flex-col items-center shadow-sm">
                <svg viewBox="0 0 760 220" className="w-full max-w-[720px] h-auto select-none font-sans">
                  <defs>
                    <marker id="tir-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8A7059" />
                    </marker>
                  </defs>

                  {/* Top Cladding Section */}
                  <line x1="80" y1="36" x2="680" y2="36" stroke="#384545" strokeWidth="4" strokeLinecap="round" />
                  <text x="380" y="58" textAnchor="middle" fill="#232D2D" fontSize="15" fontWeight="600">
                    Cladding
                  </text>
                  <line x1="80" y1="70" x2="680" y2="70" stroke="#384545" strokeWidth="4" strokeLinecap="round" />

                  {/* Center Core Label */}
                  <text x="380" y="118" textAnchor="middle" fill="#8A7059" fontSize="16" fontWeight="700">
                    Core
                  </text>

                  {/* Bottom Cladding Section */}
                  <line x1="80" y1="150" x2="680" y2="150" stroke="#384545" strokeWidth="4" strokeLinecap="round" />
                  <text x="380" y="172" textAnchor="middle" fill="#232D2D" fontSize="15" fontWeight="600">
                    Cladding
                  </text>
                  <line x1="80" y1="184" x2="680" y2="184" stroke="#384545" strokeWidth="4" strokeLinecap="round" />

                  {/* Light Ray Path with Total Internal Reflection */}
                  {/* Segment 1: Ingress */}
                  <line x1="30" y1="150" x2="135" y2="70" stroke="#8A7059" strokeWidth="3" markerEnd="url(#tir-arrow)" />
                  {/* Segment 2: Bounce down */}
                  <line x1="135" y1="70" x2="245" y2="150" stroke="#8A7059" strokeWidth="3" markerEnd="url(#tir-arrow)" />
                  {/* Segment 3: Bounce up */}
                  <line x1="245" y1="150" x2="355" y2="70" stroke="#8A7059" strokeWidth="3" markerEnd="url(#tir-arrow)" />
                  {/* Segment 4: Bounce down */}
                  <line x1="355" y1="70" x2="465" y2="150" stroke="#8A7059" strokeWidth="3" markerEnd="url(#tir-arrow)" />
                  {/* Segment 5: Bounce up */}
                  <line x1="465" y1="150" x2="575" y2="70" stroke="#8A7059" strokeWidth="3" markerEnd="url(#tir-arrow)" />
                  {/* Segment 6: Egress */}
                  <line x1="575" y1="70" x2="685" y2="150" stroke="#8A7059" strokeWidth="3" markerEnd="url(#tir-arrow)" />
                </svg>
              </div>
            </div>
          </div>

          {/* UNGUIDED MEDIA */}
          <div className="space-y-4 mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#8A7059]/25">
            <h3 className="text-xl sm:text-2xl font-bold text-[#232D2D]">
              Unguided Media
            </h3>
            <p>
              Signals are transmitted in the form of electromagnetic waves, where a sender transmits signals which can be received by any device capable of doing so. There are mainly three propagation methods :
            </p>

            <div className="space-y-3 pt-2">
              <p>
                <strong className="text-[#232D2D]">Ground propagation :</strong> Radio waves travel in the lowest part of the atmosphere and follow the curvature of the earth. The greater the power, greater the distance covered.
              </p>
              <p>
                <strong className="text-[#232D2D]">Sky propagation :</strong> High-frequency radio waves are propagated into the ionosphere and reflected back to the earth. Allows the network to cover much larger distances with less power.
              </p>
              <p>
                <strong className="text-[#232D2D]">Line-of-sight propagation :</strong> Very high-frequency radio waves are transmitted in a straight line between two antennas. For this to be possible, these two antennas either have to be close to each other or tall enough to overcome the curvature of the earth.
              </p>
            </div>

            {/* Unguided Media Types Comparison Table */}
            <div className="overflow-x-auto rounded-md border border-[#8A7059]/30 bg-[#EAE5DA]/30 shadow-sm mt-10 sm:mt-12">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b-2 border-[#8A7059] bg-[#EAE5DA]/70 font-mono text-xs sm:text-sm text-[#232D2D]">
                    <th className="py-4 px-4 sm:px-6 font-bold uppercase tracking-wider w-1/3">
                      Radio waves
                    </th>
                    <th className="py-4 px-4 sm:px-6 font-bold uppercase tracking-wider w-1/3">
                      Microwaves
                    </th>
                    <th className="py-4 px-4 sm:px-6 font-bold uppercase tracking-wider w-1/3">
                      Infrared waves
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8A7059]/20 text-[#283535]">
                  {/* Row 1: Frequency Range */}
                  <tr className="hover:bg-[#8A7059]/5 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#232D2D]">
                      Frequency Range : 3kHz to 1 GHz
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#232D2D]">
                      Frequency Range : 1GHz to 300GHz
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#232D2D]">
                      Frequency Range : 300 GHz to 400 THz
                    </td>
                  </tr>

                  {/* Row 2: Directionality */}
                  <tr className="hover:bg-[#8A7059]/5 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs sm:text-sm text-[#8A7059] font-bold">
                      Omnidirectional
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs sm:text-sm text-[#8A7059] font-bold">
                      Unidirectional
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs sm:text-sm text-[#8A7059] font-bold">
                      Unidirectional
                    </td>
                  </tr>

                  {/* Row 3: Antenna Alignment */}
                  <tr className="hover:bg-[#8A7059]/5 transition-colors leading-relaxed">
                    <td className="py-4 px-4 sm:px-6 align-top">
                      Sending and receiving antennas need not be aligned.
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top">
                      Uses line-of-sight propagation; sending and receiving antennas need to be aligned.
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top">
                      Cannot be used for long-range communication nor can it be used outside due to interference from the sun’s own infrared waves.
                    </td>
                  </tr>

                  {/* Row 4: Wall Penetration */}
                  <tr className="hover:bg-[#8A7059]/5 transition-colors leading-relaxed">
                    <td className="py-4 px-4 sm:px-6 align-top">
                      Low and medium frequencies can penetrate through walls.
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top">
                      High-frequency microwaves cannot penetrate walls.
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top">
                      Very high frequency; cannot penetrate walls whatsoever.
                    </td>
                  </tr>

                  {/* Row 5: Bandwidth */}
                  <tr className="hover:bg-[#8A7059]/5 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      Radio wave band is relatively narrow.
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      Microwave band is relatively wide.
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      Infrared band is wide.
                    </td>
                  </tr>

                  {/* Row 6: Data Rate */}
                  <tr className="hover:bg-[#8A7059]/5 transition-colors font-medium">
                    <td className="py-4 px-4 sm:px-6 text-[#232D2D]">
                      Low data rate.
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#232D2D]">
                      Higher data rate.
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#232D2D]">
                      Very high data rate.
                    </td>
                  </tr>

                  {/* Row 7: Suitability / Applications */}
                  <tr className="hover:bg-[#8A7059]/5 transition-colors leading-relaxed">
                    <td className="py-4 px-4 sm:px-6 align-top">
                      Best suited for multicasting.
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top">
                      Best suited for one-to-one communication.
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top">
                      Communication between devices such as keyboards, mice, PCs, television remote controls, etc.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </NetworkPageLayout>
  );
}
