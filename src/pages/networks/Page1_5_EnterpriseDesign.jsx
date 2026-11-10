import React, { useState } from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page1_5_EnterpriseDesign({ onBackToIndex, onNavigatePage }) {
  const [activeTierId, setActiveTierId] = useState('core');
  const [animating, setAnimating] = useState(false);

  const handleSelectTier = (id) => {
    if (id === activeTierId) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTierId(id);
      setAnimating(false);
    }, 50);
  };

  const tiers = [
    {
      id: 'core',
      name: 'Core Layer',
      badge: 'Backbone',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Responsible for high-speed transmission of packets with maximum fault tolerance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Connects distribution switches between buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Zero inspection or filtering is done here.
              </span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'distribution',
      name: 'Distribution Layer',
      badge: 'Aggregation & Policy',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Holds the default gateway addresses of all the local VLANs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Helps in Inter-VLAN routing by checking the destination IP address and identifying the destination VLAN gateway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Implements security policies using Access Control Lists (ACLs).
              </span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'access',
      name: 'Access Layer',
      badge: 'Workgroup Edge',
      renderContent: () => (
        <div className="space-y-6">
          <ul className="space-y-3.5 pl-2 list-none text-base sm:text-lg text-[#283535] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Provides network connectivity directly to end hosts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                Manages the ports and the VLAN assignments.
              </span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const currentTier = tiers.find((t) => t.id === activeTierId) || tiers[0];

  return (
    <NetworkPageLayout
      pageId="1-5-enterprise-design"
      subtitle="Cisco 3-Layer Hierarchical Model, VLAN boundaries, and enterprise design principles."
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* Introduction Paragraph */}
      <p className="text-base sm:text-lg text-[#283535] leading-relaxed mb-12">
        The Cisco 3-layer Hierarchical Model and the Enterprise Design Principles together lay down the blueprint for setting up a full physical and logical campus network.
      </p>

      {/* SECTION 1: CISCO 3-LAYER HIERARCHICAL MODEL */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Cisco 3-Layer Hierarchical Model
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#6E5844] font-mono leading-relaxed">
            (This model relies on VLANs and Inter-VLAN routing at the Distribution Layer. For more information on VLANs, explore{' '}
            <button
              type="button"
              onClick={() => {
                if (onNavigatePage) {
                  onNavigatePage('2-5-vlans-trunking');
                }
              }}
              className="text-[#8A7059] underline underline-offset-4 hover:text-[#232D2D] transition-colors cursor-pointer"
            >
              Page 2.5 : Virtual LANs & Trunking
            </button>
            )
          </p>
        </div>

        {/* Interactive 3-Tier Layer Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
          {/* Left Column: The 3-Tier Stack Buttons (Flipped colors per mockup: Bronze inactive, Deep Slate active) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <span className="text-sm sm:text-base font-bold tracking-wide text-[#232D2D] mb-1.5 pl-1">
              Click to explore each layer
            </span>
            {tiers.map((tier) => {
              const isActive = tier.id === activeTierId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleSelectTier(tier.id)}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 relative flex items-center justify-center select-none shadow-sm ${isActive
                    ? 'bg-[#384545] text-[#FAF8F5] shadow-md ring-2 ring-[#384545]/40 scale-[1.02]'
                    : 'bg-[#8A7059] text-[#FAF8F5]/90 hover:bg-[#735C47] hover:text-white'
                    }`}
                >
                  <span className="font-medium text-center">{tier.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Content Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-[#EAE5DA]/40 border border-[#8A7059]/25 shadow-sm min-h-[300px] flex flex-col justify-start">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#8A7059]/20">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232D2D]">
                  {currentTier.name}
                </h3>
              </div>

              {/* Animated Content Body */}
              <div
                className={`transition-all duration-300 ease-out transform ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
              >
                {currentTier.renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ENTERPRISE DESIGN PRINCIPLES */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#8A7059]/25 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
          Enterprise Design Principles
        </h2>

        <div className="space-y-4 text-base sm:text-lg text-[#283535] leading-relaxed">
          <ul className="space-y-3.5 pl-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Modularity :</strong> Converts the huge, flat network into 3 tiers (Core, Distribution and Access).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Scalability :</strong> New modules can be added without any major reconfiguration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Redundancy :</strong> Eliminate single points of failure. Provision of backup switches, dual power lines, duplicate links, etc.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Fault Domain Isolation :</strong> The effect of a device’s failure should be confined to that particular distribution switch instead of bringing down the entire network.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </NetworkPageLayout>
  );
}

