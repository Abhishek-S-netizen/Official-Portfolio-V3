export const networksChaptersData = [
  {
    id: "bucket-1",
    chapterNumber: "01",
    title: "Network Foundations & Architecture",
    focus: "",
    pages: [
      {
        id: "1-1-fundamentals",
        pageNumber: "1.1",
        title: "Fundamentals of Data Communication",
        status: "Available",
        available: true,
        topics: [
          "Definition of Data Communication & 4 Characteristics (Delivery, Accuracy, Timeliness, Jitter)",
          "The 5 Components (Message, Sender, Receiver, Transmission Medium, Protocol)",
          "Transmission Modes (Simplex, Half-Duplex, Full-Duplex)",
          "Protocol Layering"
        ]
      },
      {
        id: "1-2-topologies",
        pageNumber: "1.2",
        title: "Network Criteria, Scales & Topologies",
        status: "Available",
        available: true,
        topics: [
          "Network Criteria (Performance, Reliability, Security)",
          "Network Scales (PAN, LAN, MAN, WAN)",
          "The 4 Core Topologies (Mesh, Star, Bus, Ring)"
        ]
      },
      {
        id: "1-3-switching-media",
        pageNumber: "1.3",
        title: "Switching Paradigms & Physical Media",
        status: "Available",
        available: true,
        topics: [
          "Circuit-Switched vs. Packet-Switched Networks",
          "Guided Media (Twisted Pair, Coaxial, Fiber Optic)",
          "Unguided Media (Radio, Microwave, Infrared)"
        ]
      },
      {
        id: "1-4-reference-models",
        pageNumber: "1.4",
        title: "Layered Reference Models & Encapsulation",
        status: "Available",
        available: true,
        topics: [
          "ISO/OSI 7-Layer Model Breakdown",
          "TCP/IP Protocol Suite Mapping",
          "Encapsulation and Decapsulation Lifecycle"
        ]
      },
      {
        id: "1-5-enterprise-design",
        pageNumber: "1.5",
        title: "Enterprise Network Design",
        status: "Available",
        available: true,
        topics: [
          "Cisco 3-Layer Hierarchical Model (Core, Distribution, Access)",
          "Design Principles (Modularity, Scalability, Redundancy, Fault Domain Isolation)"
        ]
      }
    ]
  },
  {
    id: "bucket-2",
    chapterNumber: "02",
    title: "Data Link Layer & Local Switching (Layer 2)",
    focus: "",
    pages: [
      {
        id: "2-1-flow-error-control",
        pageNumber: "2.1",
        title: "Framing, Flow & Error Control",
        status: "Available",
        available: true,
        topics: [
          "Framing (Byte Count, Byte Stuffing, Bit Stuffing)",
          "Flow Control (Simplex, Stop-and-Wait)",
          "Sliding Window ARQ (Go-Back-N, Selective Repeat)",
          "Error Detection (CRC - Coming Soon)"
        ]
      },
      {
        id: "2-2-point-to-point",
        pageNumber: "2.2",
        title: "Data Link Protocols (HDLC & PPP)",
        status: "Available",
        available: true,
        topics: [
          "HDLC (High-Level Data Link Control)",
          "I-Frame, S-Frame, U-Frame Architectures",
          "PPP (Point-to-Point Protocol)"
        ]
      },
      {
        id: "2-3-random-access-mac",
        pageNumber: "2.3",
        title: "Random Access MAC Protocols",
        status: "Available",
        available: true,
        topics: [
          "Pure vs. Slotted ALOHA Vulnerability Windows",
          "CSMA Variations (1-Persistent, Non-Persistent, p-Persistent)",
          "CSMA/CD (Collision Detection) & CSMA/CA (Collision Avoidance)"
        ]
      },
      {
        id: "2-4-controlled-channelization",
        pageNumber: "2.4",
        title: "Controlled Access & Channelization Protocols",
        status: "Available",
        available: true,
        topics: [
          "Controlled Access (Reservation, Polling, Token Passing)",
          "Channelization Protocols (FDMA, TDMA, CDMA)"
        ]
      },
      {
        id: "2-5-vlans-trunking",
        pageNumber: "2.5",
        title: "Virtual LANs & Trunking",
        status: "Available",
        available: true,
        topics: [
          "Virtual LANs (VLAN) Segmentation",
          "802.1Q Tagging & Native VLAN Mechanics"
        ]
      }
    ]
  },
  {
    id: "bucket-3",
    chapterNumber: "03",
    title: "IP Addressing, Packets & Core Services",
    focus: "",
    pages: [
      {
        id: "3-1-ipv4-structure",
        pageNumber: "3.1",
        title: "IPv4 Architecture, Subnetting & Header Format",
        status: "Available",
        available: true,
        topics: [
          "IPv4 32-bit Structure (Prefix & Suffix)",
          "Classful Addressing (Classes A, B, C, D, E)",
          "Classless Addressing (CIDR) & Subnetting Math",
          "IPv4 Datagram Header Structure (20–60 Bytes)"
        ]
      },
      {
        id: "3-2-ipv6",
        pageNumber: "3.2",
        title: "Next-Generation Addressing (IPv6)",
        status: "Available",
        available: true,
        topics: [
          "128-bit Structure & Address Space (2¹²⁸)",
          "Hexadecimal Colon Notation & Compression Rules (::)",
          "Address Types: Unicast, Anycast & Multicast",
          "Fixed 40-Byte Header Architecture"
        ]
      },
      {
        id: "3-3-arp",
        pageNumber: "3.3",
        title: "Address Resolution Protocol (ARP)",
        status: "Available",
        available: true,
        topics: [
          "Logical vs. Physical Address Resolution",
          "ARP Request (Broadcast) & Reply (Unicast) Lifecycle",
          "Node Matching & Silent Packet Discard Mechanics",
          "ARP Cache Tables & Mapping Commitment"
        ]
      },
      {
        id: "3-4-dhcp-dns",
        pageNumber: "3.4",
        title: "Core Network Services (DHCP & DNS)",
        status: "Available",
        available: true,
        topics: [
          "Dynamic Host Configuration Protocol (DHCP & DORA Process)",
          "Domain Name System (DNS Hierarchy & Query Resolution)"
        ]
      }
    ]
  },
  {
    id: "bucket-4",
    chapterNumber: "04",
    title: "Quality of Service (QoS) & Network Security",
    focus: "",
    pages: [
      {
        id: "4-1-qos-metrics",
        pageNumber: "4.1",
        title: "Quality of Service (QoS) & Traffic Conditioning",
        status: "Available",
        available: true,
        topics: [
          "The 4 QoS Metrics (Reliability, Delay, Jitter, Bandwidth)",
          "Queuing Methods (FIFO, Priority Queue, Weighted Fair Queue)",
          "Traffic Shaping & Policing (Leaky Bucket & Token Bucket Algorithms)"
        ]
      },
      {
        id: "4-2-network-security",
        pageNumber: "4.2",
        title: "Network Security, Cryptography & Access Control",
        status: "Available",
        available: true,
        topics: [
          "The CIA Triad (Confidentiality, Integrity, Availability)",
          "Threat Models & Malware (Viruses, Worms, Trojans, Ransomware, DoS/DDoS, Spoofing, Sniffing)",
          "Firewalls (Packet Filtering, Stateful, Next-Gen)",
          "Cryptography Basics (Symmetric vs. Asymmetric)",
          "Access Control Lists (Standard vs. Extended ACLs & Implicit Deny)"
        ]
      }
    ]
  }
];
