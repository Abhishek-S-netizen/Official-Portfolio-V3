import React from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page4_2_NetworkSecurity({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="4-2-network-security"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      <div className="space-y-16 text-base sm:text-lg text-[#283535] leading-relaxed">
        {/* ============================================================== */}
        {/* SECTION 1: CIA TRIAD                                           */}
        {/* ============================================================== */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              CIA Triad
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
            <div className="bg-white/70 border border-[#8A7059]/25 rounded-xl p-5 sm:p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#232D2D] mb-2">
                Confidentiality
              </h3>
              <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                Prevent unauthorized access to data.
              </p>
            </div>

            <div className="bg-white/70 border border-[#8A7059]/25 rounded-xl p-5 sm:p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#232D2D] mb-2">
                Integrity
              </h3>
              <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                Data should be accurate and error-free.
              </p>
            </div>

            <div className="bg-white/70 border border-[#8A7059]/25 rounded-xl p-5 sm:p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#232D2D] mb-2">
                Availability
              </h3>
              <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                Services should remain accessible.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-2 border-t border-[#8A7059]/25" />

        {/* ============================================================== */}
        {/* SECTION 2: MALWARE & THREAT MODELS                             */}
        {/* ============================================================== */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              Malware &amp; Threat Models
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-[#283535] leading-relaxed">
            <p>
              <strong className="text-[#232D2D]">Virus :</strong> Copies itself to a file and then spreads to other files infecting the whole system.
            </p>

            <p>
              <strong className="text-[#232D2D]">Worm :</strong> Self-replicates across the whole network.
            </p>

            <p>
              <strong className="text-[#232D2D]">Trojan Horse :</strong> Malicious software disguised as safe software which activates once clicked or downloaded.
            </p>

            <p>
              <strong className="text-[#232D2D]">Ransomware :</strong> Encrypting or locking files and demanding payment to regain access.
            </p>

            <p>
              <strong className="text-[#232D2D]">DoS :</strong> Denial of Service. A single system sends millions of requests to the server continuously, which causes the server to become slow or unusable for other users.
            </p>

            <p>
              <strong className="text-[#232D2D]">DDoS :</strong> Distributed Denial of Service. This is basically DoS on a much larger scale. Thousands of compromised systems together flood the server with millions of requests to overload it to the point where it may even crash.
            </p>

            <p>
              <strong className="text-[#232D2D]">Spoofing :</strong> Pretending to be  a trusted authority to gain access to unauthorized data.
            </p>

            <p>
              <strong className="text-[#232D2D]">Sniffing :</strong> Intercepting data packets when they are being transmitted over the network to gain access to the data.
            </p>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-2 border-t border-[#8A7059]/25" />

        {/* ============================================================== */}
        {/* SECTION 3: FIREWALLS & CRYPTOGRAPHY BASICS                     */}
        {/* ============================================================== */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              Firewalls &amp; Cryptography Basics
            </h2>
          </div>

          {/* Firewalls Subsection */}
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Firewalls are built to monitor incoming and outgoing network traffic to filter and block unauthorized/malicious payload. They are of three types :
            </p>

            <div className="space-y-2 pt-1">
              <ul className="space-y-2 pl-2 text-base sm:text-lg text-[#283535]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Packet Filtering Firewall</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Stateful Firewall</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Next Generation Firewall (NGFW)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-[#8A7059]/20" />

          {/* Cryptography Basics Subsection */}
          <div className="space-y-4">

            <div className="overflow-x-auto rounded-md border border-[#8A7059]/30 shadow-xs">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="bg-[#384545] text-[#F5F2EB] font-mono text-xs sm:text-sm uppercase tracking-wider">
                    <th className="py-3 px-4 sm:px-6 border-b border-[#384545] w-1/2">
                      Symmetric Cryptography
                    </th>
                    <th className="py-3 px-4 sm:px-6 border-b border-[#384545] w-1/2">
                      Asymmetric Cryptography
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/60 divide-y divide-[#8A7059]/20 text-[#283535]">
                  <tr>
                    <td className="py-4 px-4 sm:px-6 leading-relaxed align-top">
                      Consists of a single shared secret key for both encryption and decryption.
                    </td>
                    <td className="py-4 px-4 sm:px-6 leading-relaxed align-top">
                      Consists of two mathematically linked keys; a public one for encryption and a private one for decryption.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-2 border-t border-[#8A7059]/25" />

        {/* ============================================================== */}
        {/* SECTION 4: ACCESS CONTROL LISTS (ACLS)                         */}
        {/* ============================================================== */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              Access Control Lists (ACLs)
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
            ACLs are essentially lists containing a bunch of rules to permit or deny the transmission of data packets across a network based on IP address, protocols and port numbers. They usually use a rule called Implicit Deny All so that any unlisted traffic is denied entry.
          </p>

          <div className="space-y-4">
            <h4 className="font-semibold text-base sm:text-lg text-[#232D2D]">
              ACLs are of two types :
            </h4>

            <div className="overflow-x-auto rounded-md border border-[#8A7059]/30 shadow-xs">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="bg-[#384545] text-[#F5F2EB] font-mono text-xs sm:text-sm uppercase tracking-wider">
                    <th className="py-3 px-4 sm:px-6 border-b border-[#384545] w-1/2">
                      Standard ACLs
                    </th>
                    <th className="py-3 px-4 sm:px-6 border-b border-[#384545] w-1/2">
                      Extended ACLs
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/60 divide-y divide-[#8A7059]/20 text-[#283535]">
                  {/* Row 1: Numbered ID Range */}
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 leading-relaxed align-top">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#8A7059] font-bold block mb-1">
                        Numbered ID Range
                      </span>
                      <span className="font-mono font-semibold text-[#232D2D]">
                        1-99 and 1300-1999
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 leading-relaxed align-top">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#8A7059] font-bold block mb-1">
                        Numbered ID Range
                      </span>
                      <span className="font-mono font-semibold text-[#232D2D]">
                        100-199 and 2000-2699
                      </span>
                    </td>
                  </tr>

                  {/* Row 2: Filtering Criteria */}
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 leading-relaxed align-top">
                      Checks only the source IP address.
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 leading-relaxed align-top">
                      Checks the source and destination IP addresses as well as the protocols and port numbers.
                    </td>
                  </tr>

                  {/* Row 3: Placement Strategy */}
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 leading-relaxed align-top">
                      Placed as close to the destination as possible so that the host isn’t prevented from making valid transmissions.
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 leading-relaxed align-top">
                      Placed as close to the source as possible, so that any invalid transmission can be stopped right then and there.
                    </td>
                  </tr>

                  {/* Row 4: Scope of Filtering */}
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 leading-relaxed align-top">
                      Usually blocks the host from all transmissions.
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 leading-relaxed align-top">
                      Capable of blocking the host from some transmissions while allowing access to valid ones.
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

