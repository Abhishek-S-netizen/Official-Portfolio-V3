import React, { useState, useEffect, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import TypewriterRole from './components/TypewriterRole';
import ProjectsCarousel from './components/ProjectsCarousel';
import CertificationsAccordion from './components/CertificationsAccordion';
import ExplainersAccordion from './components/ExplainersAccordion';
import {
  profileData,
  educationData,
  technologiesData,
} from './data/portfolioData';

// Dynamic Lazy Loading for on-demand bundle splitting
const PwaExplainer = lazy(() => import('./pages/PwaExplainer'));
const NetworksIndex = lazy(() => import('./pages/networks/NetworksIndex'));
const Page1_1_Fundamentals = lazy(() => import('./pages/networks/Page1_1_Fundamentals'));
const Page1_2_Topologies = lazy(() => import('./pages/networks/Page1_2_Topologies'));
const Page1_3_SwitchingMedia = lazy(() => import('./pages/networks/Page1_3_SwitchingMedia'));
const Page1_4_ReferenceModels = lazy(() => import('./pages/networks/Page1_4_ReferenceModels'));
const Page1_5_EnterpriseDesign = lazy(() => import('./pages/networks/Page1_5_EnterpriseDesign'));
const Page2_1_FlowErrorControl = lazy(() => import('./pages/networks/Page2_1_FlowErrorControl'));
const Page2_2_PointToPoint = lazy(() => import('./pages/networks/Page2_2_PointToPoint'));
const Page2_3_RandomAccess = lazy(() => import('./pages/networks/Page2_3_RandomAccess'));
const Page2_4_ControlledAccess = lazy(() => import('./pages/networks/Page2_4_ControlledAccess'));
const Page2_5_VlansTrunking = lazy(() => import('./pages/networks/Page2_5_VlansTrunking'));
const Page3_1_Ipv4Structure = lazy(() => import('./pages/networks/Page3_1_Ipv4Structure'));
const Page3_2_Ipv6Addressing = lazy(() => import('./pages/networks/Page3_2_Ipv6Addressing'));
const Page3_3_AddressResolutionProtocol = lazy(() => import('./pages/networks/Page3_3_AddressResolutionProtocol'));
const Page3_4_DhcpDns = lazy(() => import('./pages/networks/Page3_4_DhcpDns'));
const Page4_1_QosMetrics = lazy(() => import('./pages/networks/Page4_1_QosMetrics'));
const Page4_2_NetworkSecurity = lazy(() => import('./pages/networks/Page4_2_NetworkSecurity'));

function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center font-mono text-sm text-[#8A7059]">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#8A7059] animate-ping" />
        <span>Loading Explainer...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('progressive-web-applications') || path.includes('pwa') || hash.includes('pwa')) {
        return 'pwa';
      }
      if (path.includes('1-1-fundamentals')) {
        return 'networks-1-1';
      }
      if (path.includes('1-2-topologies')) {
        return 'networks-1-2';
      }
      if (path.includes('1-3-switching-media')) {
        return 'networks-1-3';
      }
      if (path.includes('1-4-reference-models')) {
        return 'networks-1-4';
      }
      if (path.includes('1-5-enterprise-design')) {
        return 'networks-1-5';
      }
      if (path.includes('2-1-flow-error-control')) {
        return 'networks-2-1';
      }
      if (path.includes('2-2-point-to-point')) {
        return 'networks-2-2';
      }
      if (path.includes('2-3-random-access')) {
        return 'networks-2-3';
      }
      if (path.includes('2-4-controlled')) {
        return 'networks-2-4';
      }
      if (path.includes('2-5-vlans')) {
        return 'networks-2-5';
      }
      if (path.includes('3-1-ipv4')) {
        return 'networks-3-1';
      }
      if (path.includes('3-2-ipv6')) {
        return 'networks-3-2';
      }
      if (path.includes('3-3-arp')) {
        return 'networks-3-3';
      }
      if (path.includes('3-4-dhcp')) {
        return 'networks-3-4';
      }
      if (path.includes('4-1-qos')) {
        return 'networks-4-1';
      }
      if (path.includes('4-2-security') || path.includes('4-2-network-security')) {
        return 'networks-4-2';
      }
      if (path.includes('computer-networks') || path.includes('networks') || hash.includes('networks')) {
        return 'networks';
      }
    }
    return 'portfolio';
  });

  const [activeSection, setActiveSection] = useState('about');
  const [lastNetworksPageId, setLastNetworksPageId] = useState(null);

  // Handle browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('progressive-web-applications') || path.includes('pwa') || hash.includes('pwa')) {
        setCurrentPage('pwa');
      } else if (path.includes('1-1-fundamentals')) {
        setCurrentPage('networks-1-1');
      } else if (path.includes('1-2-topologies')) {
        setCurrentPage('networks-1-2');
      } else if (path.includes('1-3-switching-media')) {
        setCurrentPage('networks-1-3');
      } else if (path.includes('1-4-reference-models')) {
        setCurrentPage('networks-1-4');
      } else if (path.includes('1-5-enterprise-design')) {
        setCurrentPage('networks-1-5');
      } else if (path.includes('2-1-flow-error-control')) {
        setCurrentPage('networks-2-1');
      } else if (path.includes('2-2-point-to-point')) {
        setCurrentPage('networks-2-2');
      } else if (path.includes('2-3-random-access')) {
        setCurrentPage('networks-2-3');
      } else if (path.includes('2-4-controlled')) {
        setCurrentPage('networks-2-4');
      } else if (path.includes('2-5-vlans')) {
        setCurrentPage('networks-2-5');
      } else if (path.includes('3-1-ipv4')) {
        setCurrentPage('networks-3-1');
      } else if (path.includes('3-2-ipv6')) {
        setCurrentPage('networks-3-2');
      } else if (path.includes('3-3-arp')) {
        setCurrentPage('networks-3-3');
      } else if (path.includes('3-4-dhcp')) {
        setCurrentPage('networks-3-4');
      } else if (path.includes('4-1-qos')) {
        setCurrentPage('networks-4-1');
      } else if (path.includes('4-2-security') || path.includes('4-2-network-security')) {
        setCurrentPage('networks-4-2');
      } else if (path.includes('networks') || hash.includes('networks')) {
        setCurrentPage('networks');
      } else {
        setCurrentPage('portfolio');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const defaultTitle = `${profileData.firstName} ${profileData.lastName}`;
    const titles = {
      'portfolio': defaultTitle,
      'pwa': `Progressive Web Applications - ${profileData.firstName}`,
      'networks': `Computer Networks & Architecture - ${profileData.initials}`,
      'networks-1-1': '1.1 Fundamentals of Data Communication - Computer Networks',
      'networks-1-2': '1.2 Topologies & Network Types - Computer Networks',
      'networks-1-3': '1.3 Switching & Media Types - Computer Networks',
      'networks-1-4': '1.4 Reference Models (OSI vs TCP/IP) - Computer Networks',
      'networks-1-5': '1.5 Enterprise Network Design - Computer Networks',
      'networks-2-1': '2.1 Framing, Flow & Error Control - Computer Networks',
      'networks-2-2': '2.2 Point-to-Point Protocols - Computer Networks',
      'networks-2-3': '2.3 Random Access Protocols - Computer Networks',
      'networks-2-4': '2.4 Controlled Access & Channelization - Computer Networks',
      'networks-2-5': '2.5 VLANs & Trunking - Computer Networks',
      'networks-3-1': '3.1 IPv4 Addressing & Subnetting - Computer Networks',
      'networks-3-2': '3.2 IPv6 Addressing - Computer Networks',
      'networks-3-3': '3.3 Address Resolution Protocol - Computer Networks',
      'networks-3-4': '3.4 DHCP & DNS - Computer Networks',
      'networks-4-1': '4.1 QoS Metrics & Traffic Management - Computer Networks',
      'networks-4-2': '4.2 Network Security, Firewalls & ACLs - Computer Networks',
    };
    document.title = titles[currentPage] || defaultTitle;
  }, [currentPage]);

  const navigateTo = (page, targetSection) => {
    setCurrentPage(page);

    if (page.startsWith('networks-')) {
      const pageMap = {
        'networks-1-1': '1-1-fundamentals',
        'networks-1-2': '1-2-topologies',
        'networks-1-3': '1-3-switching-media',
        'networks-1-4': '1-4-reference-models',
        'networks-1-5': '1-5-enterprise-design',
        'networks-2-1': '2-1-flow-error-control',
        'networks-2-2': '2-2-point-to-point',
        'networks-2-3': '2-3-random-access-mac',
        'networks-2-4': '2-4-controlled-channelization',
        'networks-2-5': '2-5-vlans-trunking',
        'networks-3-1': '3-1-ipv4-structure',
        'networks-3-2': '3-2-ipv6',
        'networks-3-3': '3-3-arp',
        'networks-3-4': '3-4-dhcp-dns',
        'networks-4-1': '4-1-qos-metrics',
        'networks-4-2': '4-2-network-security',
      };
      if (pageMap[page]) {
        setLastNetworksPageId(pageMap[page]);
      }
    }
    if (page === 'pwa') {
      window.history.pushState(null, '', '/writings/progressive-web-applications');
    } else if (page === 'networks') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics');
    } else if (page === 'networks-1-1') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/1-1-fundamentals');
    } else if (page === 'networks-1-2') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/1-2-topologies');
    } else if (page === 'networks-1-3') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/1-3-switching-media');
    } else if (page === 'networks-1-4') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/1-4-reference-models');
    } else if (page === 'networks-1-5') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/1-5-enterprise-design');
    } else if (page === 'networks-2-1') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/2-1-flow-error-control');
    } else if (page === 'networks-2-2') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/2-2-point-to-point');
    } else if (page === 'networks-2-3') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/2-3-random-access-mac');
    } else if (page === 'networks-2-4') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/2-4-controlled-channelization');
    } else if (page === 'networks-2-5') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/2-5-vlans-trunking');
    } else if (page === 'networks-3-1') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/3-1-ipv4-structure');
    } else if (page === 'networks-3-2') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/3-2-ipv6-addressing');
    } else if (page === 'networks-3-3') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/3-3-arp');
    } else if (page === 'networks-3-4') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/3-4-dhcp-dns');
    } else if (page === 'networks-4-1') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/4-1-qos-metrics');
    } else if (page === 'networks-4-2') {
      window.history.pushState(null, '', '/writings/computer-networks-and-architecture-basics/4-2-network-security');
    } else {
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        const targetId = targetSection || 'technical-notes';
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection('projects');
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setActiveSection('about');
        }
      }, 50);
    }
  };

  // Scroll-spy observer to highlight active pill in Sidebar
  useEffect(() => {
    const sectionIds = ['about', 'technologies', 'projects', 'certifications', 'contact'];
    const handleScroll = () => {
      // Check if user has scrolled near the bottom of the document
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 90;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Re-synchronize active section upon returning to portfolio view
  useEffect(() => {
    if (currentPage === 'portfolio') {
      const timer = setTimeout(() => {
        const isAtBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 90;
        if (isAtBottom) {
          setActiveSection('contact');
          return;
        }

        const sectionIds = ['about', 'technologies', 'projects', 'certifications', 'contact'];
        const scrollPosition = window.scrollY + window.innerHeight * 0.35;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(id);
              break;
            }
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderExplainerPage = () => {
    if (currentPage === 'pwa') {
      return <PwaExplainer onBack={() => navigateTo('portfolio', 'technical-notes')} />;
    }

    if (currentPage === 'networks') {
      return (
        <NetworksIndex
          initialPageId={lastNetworksPageId}
          onBack={() => navigateTo('portfolio', 'technical-notes')}
          onSelectPage={(pageId) => {
            if (pageId === '1-1-fundamentals') {
              navigateTo('networks-1-1');
            } else if (pageId === '1-2-topologies') {
              navigateTo('networks-1-2');
            } else if (pageId === '1-3-switching-media') {
              navigateTo('networks-1-3');
            } else if (pageId === '1-4-reference-models') {
              navigateTo('networks-1-4');
            } else if (pageId === '1-5-enterprise-design') {
              navigateTo('networks-1-5');
            } else if (pageId === '2-1-flow-error-control') {
              navigateTo('networks-2-1');
            } else if (pageId === '2-2-point-to-point') {
              navigateTo('networks-2-2');
            } else if (pageId === '2-3-random-access-mac' || pageId === '2-3-random-access') {
              navigateTo('networks-2-3');
            } else if (pageId === '2-4-controlled-channelization' || pageId === '2-4-controlled-access') {
              navigateTo('networks-2-4');
            } else if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-1-1') {
      return (
        <Page1_1_Fundamentals
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '1-2-topologies') {
              navigateTo('networks-1-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-1-2') {
      return (
        <Page1_2_Topologies
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '1-1-fundamentals') {
              navigateTo('networks-1-1');
            } else if (pageId === '1-3-switching-media') {
              navigateTo('networks-1-3');
            } else if (pageId === '1-4-reference-models') {
              navigateTo('networks-1-4');
            } else if (pageId === '1-5-enterprise-design') {
              navigateTo('networks-1-5');
            } else if (pageId === '2-1-flow-error-control') {
              navigateTo('networks-2-1');
            } else if (pageId === '2-2-point-to-point') {
              navigateTo('networks-2-2');
            } else if (pageId === '2-3-random-access-mac' || pageId === '2-3-random-access') {
              navigateTo('networks-2-3');
            } else if (pageId === '2-4-controlled-channelization' || pageId === '2-4-controlled-access') {
              navigateTo('networks-2-4');
            } else if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-1-3') {
      return (
        <Page1_3_SwitchingMedia
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '1-2-topologies') {
              navigateTo('networks-1-2');
            } else if (pageId === '1-4-reference-models') {
              navigateTo('networks-1-4');
            } else if (pageId === '1-5-enterprise-design') {
              navigateTo('networks-1-5');
            } else if (pageId === '2-1-flow-error-control') {
              navigateTo('networks-2-1');
            } else if (pageId === '2-2-point-to-point') {
              navigateTo('networks-2-2');
            } else if (pageId === '2-3-random-access-mac' || pageId === '2-3-random-access') {
              navigateTo('networks-2-3');
            } else if (pageId === '2-4-controlled-channelization' || pageId === '2-4-controlled-access') {
              navigateTo('networks-2-4');
            } else if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-1-4') {
      return (
        <Page1_4_ReferenceModels
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '1-3-switching-media') {
              navigateTo('networks-1-3');
            } else if (pageId === '1-5-enterprise-design') {
              navigateTo('networks-1-5');
            } else if (pageId === '2-1-flow-error-control') {
              navigateTo('networks-2-1');
            } else if (pageId === '2-2-point-to-point') {
              navigateTo('networks-2-2');
            } else if (pageId === '2-3-random-access-mac' || pageId === '2-3-random-access') {
              navigateTo('networks-2-3');
            } else if (pageId === '2-4-controlled-channelization' || pageId === '2-4-controlled-access') {
              navigateTo('networks-2-4');
            } else if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-1-5') {
      return (
        <Page1_5_EnterpriseDesign
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '1-4-reference-models') {
              navigateTo('networks-1-4');
            } else if (pageId === '2-1-flow-error-control') {
              navigateTo('networks-2-1');
            } else if (pageId === '2-2-point-to-point') {
              navigateTo('networks-2-2');
            } else if (pageId === '2-3-random-access-mac' || pageId === '2-3-random-access') {
              navigateTo('networks-2-3');
            } else if (pageId === '2-4-controlled-channelization' || pageId === '2-4-controlled-access') {
              navigateTo('networks-2-4');
            } else if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-2-1') {
      return (
        <Page2_1_FlowErrorControl
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '1-5-enterprise-design') {
              navigateTo('networks-1-5');
            } else if (pageId === '2-2-point-to-point') {
              navigateTo('networks-2-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-2-2') {
      return (
        <Page2_2_PointToPoint
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '2-1-flow-error-control') {
              navigateTo('networks-2-1');
            } else if (pageId === '2-3-random-access-mac' || pageId === '2-3-random-access') {
              navigateTo('networks-2-3');
            } else if (pageId === '2-4-controlled-channelization' || pageId === '2-4-controlled-access') {
              navigateTo('networks-2-4');
            } else if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-2-3') {
      return (
        <Page2_3_RandomAccess
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '2-2-point-to-point') {
              navigateTo('networks-2-2');
            } else if (pageId === '2-4-controlled-channelization' || pageId === '2-4-controlled-access') {
              navigateTo('networks-2-4');
            } else if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-2-4') {
      return (
        <Page2_4_ControlledAccess
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '2-3-random-access-mac' || pageId === '2-3-random-access') {
              navigateTo('networks-2-3');
            } else if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-2-5') {
      return (
        <Page2_5_VlansTrunking
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '2-4-controlled-channelization' || pageId === '2-4-controlled-access') {
              navigateTo('networks-2-4');
            } else if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-3-1') {
      return (
        <Page3_1_Ipv4Structure
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '2-5-vlans-trunking' || pageId === '2-5-vlans') {
              navigateTo('networks-2-5');
            } else if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-3-2') {
      return (
        <Page3_2_Ipv6Addressing
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '3-1-ipv4-structure' || pageId === '3-1-ipv4') {
              navigateTo('networks-3-1');
            } else if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-3-3') {
      return (
        <Page3_3_AddressResolutionProtocol
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '3-2-ipv6' || pageId === '3-2-ipv6-addressing') {
              navigateTo('networks-3-2');
            } else if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-3-4') {
      return (
        <Page3_4_DhcpDns
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '3-3-arp' || pageId === '3-3-address-resolution') {
              navigateTo('networks-3-3');
            } else if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-4-1') {
      return (
        <Page4_1_QosMetrics
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '3-4-dhcp-dns' || pageId === '3-4-dhcp') {
              navigateTo('networks-3-4');
            } else if (pageId === '4-2-network-security' || pageId === '4-2-security') {
              navigateTo('networks-4-2');
            }
          }}
        />
      );
    }

    if (currentPage === 'networks-4-2') {
      return (
        <Page4_2_NetworkSecurity
          onBackToIndex={() => navigateTo('networks')}
          onNavigatePage={(pageId) => {
            if (pageId === '4-1-qos-metrics' || pageId === '4-1-qos') {
              navigateTo('networks-4-1');
            }
          }}
        />
      );
    }

    return null;
  };

  const explainerContent = renderExplainerPage();
  if (explainerContent) {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        {explainerContent}
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#232D2D] overflow-x-hidden">
      {/* Floating Rounded Left Sidebar (Desktop) & Sticky Top Bar (Mobile) */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* Right Content Area */}
      <main className="lg:ml-[280px] px-6 sm:px-10 md:px-14 xl:px-16 pt-8 pb-6 sm:pb-8 lg:pt-12 max-w-[1420px]">
        {/* 1. ABOUT SECTION (Shifted higher up + 2-Line Horizontal Education Timeline at bottom) */}
        <section
          id="about"
          className="min-h-[84vh] flex flex-col justify-between pt-2 pb-10 border-b border-[#8A7059]/25"
        >
          {/* Main Hero Block */}
          <div className="pt-1 pb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.06] mb-5 text-[#232D2D]">
              <span className="block">{profileData.firstName}</span>
              <span className="block mt-1">{profileData.lastName}</span>
            </h1>

            {/* Typewriter Animation */}
            <div className="mb-6">
              <TypewriterRole roles={profileData.roles} />
            </div>

            <p className="text-base sm:text-lg leading-relaxed max-w-[820px] text-[#283535] mb-8">
              {profileData.bio}
            </p>

            {/* Primary Action Links */}
            <div className="flex items-center gap-6 sm:gap-7 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#232D2D] hover:text-[#8A7059] transition-colors focus:outline-none"
              >
                <span>Explore Works</span>
                <span className="font-mono text-sm transition-transform duration-200 transform group-hover:translate-y-1">
                  ↓
                </span>
              </button>

              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#6E5844] hover:text-[#232D2D] transition-colors"
              >
                <span>View Resume</span>
                <span className="font-mono text-sm transition-transform duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Minimal 2-Line Education Timeline (Vertical left-rail on mobile, Horizontal on desktop) */}
          <div className="pt-4">
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Continuous Vertical Line (Mobile < md) */}
              <div
                className="md:hidden absolute left-[6px] top-2 bottom-2 w-[1.5px] bg-[#8A7059]/35 pointer-events-none"
                aria-hidden="true"
              />

              {/* Continuous Horizontal Line (Desktop >= md) */}
              <div
                className="hidden md:block absolute top-[6px] left-2 right-2 h-[1.5px] bg-[#8A7059]/35 pointer-events-none"
                aria-hidden="true"
              />

              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="relative flex flex-row md:flex-col items-start gap-4 md:gap-0"
                >
                  {/* Node on the Timeline Line */}
                  <div className="flex items-center mt-1 md:mt-0 md:mb-3 relative z-10 shrink-0">
                    {edu.current ? (
                      <span className="w-3.5 h-3.5 rounded-full bg-[#384545] ring-4 ring-[#8A7059]/35 shadow-sm inline-block" />
                    ) : (
                      <span className="w-3.5 h-3.5 md:w-3 md:h-3 rounded-full bg-[#8A7059] ring-4 ring-[#F5F2EB] inline-block" />
                    )}
                  </div>

                  <div className="flex flex-col">
                    {/* Line 1: Tiny Bronze Monospace Label */}
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#8A7059] font-semibold mb-1">
                      {edu.level}
                    </span>

                    {/* Line 2: Clean Institution Name */}
                    <span className="text-sm sm:text-[15px] font-medium text-[#232D2D]">
                      {edu.institution}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. TECHNOLOGIES SECTION */}
        <section
          id="technologies"
          className="py-12 sm:py-16 border-b border-[#8A7059]/25 scroll-mt-14"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#232D2D] mb-6 sm:mb-8">
            Technologies
          </h2>

          <div className="space-y-10 sm:space-y-12">
            {technologiesData.map((group) => (
              <div key={group.category} className="space-y-3.5 sm:space-y-4">
                <h3 className="text-xs sm:text-sm uppercase tracking-[0.22em] text-[#6E5844] font-bold">
                  {group.category}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-3.5">
                  {group.items.map((tech, idx) => (
                    <div key={tech.name} className="inline-flex items-center gap-x-4 sm:gap-x-6">
                      <div
                        className="group inline-flex items-center gap-2.5 sm:gap-3 py-1 cursor-default select-none transition-all duration-200"
                      >
                        <span className="shrink-0 flex items-center justify-center filter grayscale brightness-[0.25] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-110 transition-all duration-300">
                          {tech.customSvg === 'vscode' ? (
                            <span className="text-[#0284C7] font-mono font-bold text-base sm:text-lg leading-none">
                              &lt;/&gt;
                            </span>
                          ) : tech.customSvg === 'tableau' ? (
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-[#EA580C]"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <rect x="4" y="12" width="3.5" height="8" rx="1" />
                              <rect x="10.25" y="5" width="3.5" height="15" rx="1" />
                              <rect x="16.5" y="9" width="3.5" height="11" rx="1" />
                            </svg>
                          ) : (
                            <i
                              className={`${tech.iconClass} text-xl sm:text-2xl ${tech.colorClass
                                ? tech.colorClass
                                : tech.name === 'GITHUB'
                                  ? 'text-[#232D2D]'
                                  : ''
                                }`}
                            />
                          )}
                        </span>
                        <span className="font-mono text-sm sm:text-base uppercase tracking-wider font-semibold text-[#232D2D] group-hover:text-[#8A7059] transition-colors">
                          {tech.name}
                        </span>
                      </div>
                      {idx < group.items.length - 1 && (
                        <span className="text-[#8A7059]/75 font-mono text-xs sm:text-sm select-none font-semibold" aria-hidden="true">
                          |
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PROJECTS & WORKS SECTION */}
        <section
          id="projects"
          className="pt-12 sm:pt-14 pb-16 sm:pb-20 border-b border-[#8A7059]/25 scroll-mt-14"
        >
          {/* Subsection A: Projects */}
          <div className="mb-14 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#232D2D] mb-4">
              Projects
            </h2>
            <ProjectsCarousel />
          </div>

          {/* Subsection B: Technical notes & writings */}
          <div id="technical-notes" className="pt-4 scroll-mt-20">
            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-3 text-[#232D2D]">
              Technical notes &amp; writings
            </h3>

            <ExplainersAccordion
              onNavigate={(link) => {
                if (link.includes('computer-networks') || link.includes('networks')) {
                  navigateTo('networks');
                } else if (link.includes('progressive-web-applications') || link.includes('pwa')) {
                  navigateTo('pwa');
                }
              }}
            />
          </div>
        </section>

        {/* 4. CERTIFICATIONS SECTION */}
        <section
          id="certifications"
          className="pt-12 sm:pt-14 pb-16 sm:pb-20 border-b border-[#8A7059]/25 scroll-mt-14"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#232D2D] mb-6 sm:mb-8">
            Certifications
          </h2>

          <CertificationsAccordion />
        </section>

        {/* 5. CONTACT ME SECTION */}
        <section id="contact" className="pt-12 sm:pt-14 pb-4 scroll-mt-14">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5 text-[#232D2D]">
            Get in touch
          </h2>

          <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-7 gap-y-3.5 mb-14">
            <a
              href={profileData.email}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#8A7059] hover:bg-[#78604B] text-[#F5F2EB] font-medium text-sm shadow-sm transition-all hover:-translate-y-0.5"
            >
              <span className='font-bold'>Say Hello</span>
              <span className="font-mono font-bold text-xs transition-transform duration-200 transform group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#6E5844] hover:text-[#232D2D] transition-colors"
            >
              <span className="font-bold">LinkedIn</span>
              <span className="font-mono font-bold text-xs transition-transform duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#6E5844] hover:text-[#232D2D] transition-colors"
            >
              <span className="font-bold">GitHub</span>
              <span className="font-mono font-bold text-xs transition-transform duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#6E5844] hover:text-[#232D2D] transition-colors"
            >
              <span className="font-bold">Resume / CV</span>
              <span className="font-mono font-bold text-xs transition-transform duration-200 transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>

          {/* Minimal Bottom Footer */}
          <footer className="pt-6 border-t border-[#8A7059]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E5844]">
            <p className="inline-flex items-center gap-1.5 flex-wrap">
              <span className="font-sans text-sm leading-none font-medium text-[#8A7059]">©</span>
              <span>{new Date().getFullYear()} {profileData.firstName} {profileData.lastName}</span>
            </p>

            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('about');
              }}
              className="group inline-flex items-center gap-1.5 text-[#6E5844] hover:text-[#232D2D] transition-colors"
            >
              <span>Back to top</span>
              <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
            </button>
          </footer>
        </section>
      </main>
    </div>
  );
}
