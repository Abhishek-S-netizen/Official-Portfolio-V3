import React from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page4_1_QosMetrics({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="4-1-qos-metrics"
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      <div className="space-y-16 text-base sm:text-lg text-[#283535] leading-relaxed">
        {/* ============================================================== */}
        {/* SECTION 1: QUALITY OF SERVICE METRICS                          */}
        {/* ============================================================== */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              Quality of Service Metrics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* 1. RELIABILITY */}
            <div className="bg-white/70 border border-[#8A7059]/25 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#232D2D] mb-3">
                  Reliability
                </h3>
                <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                  Packets should be transmitted from the source to the destination safely without getting lost or damaged.
                </p>
              </div>
            </div>

            {/* 2. BANDWIDTH */}
            <div className="bg-white/70 border border-[#8A7059]/25 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#232D2D] mb-3">
                  Bandwidth
                </h3>
                <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                  The data carrying capacity of the link. Different applications require different bandwidths.
                </p>
              </div>
            </div>
          </div>

          {/* 3. DELAY */}
          <div className="bg-white/70 border border-[#8A7059]/25 rounded-xl p-5 sm:p-7 shadow-sm space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-[#232D2D]">
                Delay
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
              The total time taken for the packet to move from the source to the destination. Ideally, delay should be minimised, but different applications can tolerate different levels of delay. For example :
            </p>

            <ul className="space-y-2.5 pl-2 text-sm sm:text-base text-[#283535]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Sending an email</strong> <span className="font-mono text-[#8A7059]">→</span> can tolerate a reasonable amount of delay.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>
                  <strong className="text-[#232D2D]">Live streaming or video conferencing</strong> <span className="font-mono text-[#8A7059]">→</span> requires little to no delay.
                </span>
              </li>
            </ul>
          </div>

          {/* 4. JITTER */}
          <div className="bg-white/70 border border-[#8A7059]/25 rounded-xl p-5 sm:p-7 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#232D2D]">
                Jitter
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
              This is the variation in packet delay. Consider an example :
            </p>

            {/* Side-by-side Comparative Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Case 1: Constant Delay */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#F5F2EB]/90 border border-[#8A7059]/25 space-y-3.5">
                <h4 className="font-mono text-xs sm:text-sm font-bold text-[#15803D] uppercase tracking-wider">
                  Case 1 : Constant Delay : Acceptable
                </h4>
                <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                  Four packets leave at times <span className="font-mono font-semibold text-[#232D2D]">0, 1, 2, and 3</span> and reach the destination at <span className="font-mono font-semibold text-[#232D2D]">20, 21, 22, and 23</span>.
                </p>
                <p className="text-sm sm:text-base font-mono text-[#15803D] font-medium pt-1">
                  Delay for all packets = 20 (Even &amp; Equal)
                </p>
              </div>

              {/* Case 2: Variable Delay */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#F5F2EB]/90 border border-[#8A7059]/25 space-y-3.5">
                <h4 className="font-mono text-xs sm:text-sm font-bold text-[#C85A17] uppercase tracking-wider">
                  Case 2 : Variable Delay (Jitter) : Not Acceptable
                </h4>
                <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                  Now consider a scenario where the same four packets reach the destination at <span className="font-mono font-semibold text-[#232D2D]">21, 24, 28, and 31</span>.
                </p>
                <p className="text-sm sm:text-base font-mono text-[#C85A17] font-medium pt-1">
                  Delays = 21, 23, 26, 28 (Uneven Delay)
                </p>
              </div>
            </div>

            {/* Normal Text Note */}
            <div className="space-y-3 pt-1">
              <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                For applications like video conferencing or live streaming, the first case is acceptable, but the second case is not.
              </p>
              <p className="text-sm sm:text-base text-[#283535] leading-relaxed">
                It does not matter how long or short the delay is, as long as all the packets face the same, equal delay.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-2 border-t border-[#8A7059]/25" />

        {/* ============================================================== */}
        {/* SECTION 2: QUEUING METHODS                                     */}
        {/* ============================================================== */}
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              Queuing Methods
            </h2>
          </div>

          {/* 1. FIRST-IN-FIRST-OUT (FIFO) */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
              First-In-First-Out (FIFO)
            </h3>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Packets line up in a queue and wait until the router is ready to process them. If new packets arrive when the queue is full, they are discarded.
            </p>

            {/* Advantages */}
            <div className="space-y-2 pt-1">
              <h4 className="font-semibold text-base sm:text-lg text-[#232D2D]">
                Advantages
              </h4>
              <ul className="space-y-2 pl-2 text-base sm:text-lg text-[#283535]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Packets leave in the exact same order in which they arrive.</span>
                </li>
              </ul>
            </div>

            {/* Disadvantages */}
            <div className="space-y-2 pt-1">
              <h4 className="font-semibold text-base sm:text-lg text-[#232D2D]">
                Disadvantages
              </h4>
              <ul className="space-y-2 pl-2 text-base sm:text-lg text-[#283535]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>A packet may arrive and leave with different delays causing jitter.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>FIFO offers no priority. Doesn’t matter if a packet belongs to a file transfer or a video conference, they are all equally subject to delay and loss.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-[#8A7059]/20" />

          {/* 2. PRIORITY QUEUE */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
              Priority Queue
            </h3>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Packets are assigned to a priority class, where each class has its own queue. Packets of higher priority are processed first followed by packets of lower priority.
            </p>

            {/* Advantages */}
            <div className="space-y-2 pt-1">
              <h4 className="font-semibold text-base sm:text-lg text-[#232D2D]">
                Advantages
              </h4>
              <ul className="space-y-2 pl-2 text-base sm:text-lg text-[#283535]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>Offers better QoS than FIFO, since here, high-priority packets can be processed and sent without much delay.</span>
                </li>
              </ul>
            </div>

            {/* Disadvantages */}
            <div className="space-y-2 pt-1">
              <h4 className="font-semibold text-base sm:text-lg text-[#232D2D]">
                Disadvantages
              </h4>
              <ul className="space-y-2 pl-2 text-base sm:text-lg text-[#283535]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8A7059] font-bold">•</span>
                  <span>If the higher-priority queue keeps filling up with packets, then packets in the lower-priority queue will never be processed, causing starvation.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-[#8A7059]/20" />

          {/* 3. WEIGHTED FAIR QUEUE */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
              Weighted Fair Queue
            </h3>

            <ul className="space-y-3.5 pl-2 text-base sm:text-lg text-[#283535]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8A7059] font-bold">•</span>
                <div className="space-y-2.5">
                  <span>
                    Borrows the concept of Priority Queue, except here, each queue is assigned a weight based on the priority. For example :
                  </span>
                  <div className="pl-4 sm:pl-6 space-y-2 pt-1">
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#8A7059] font-semibold">o</span>
                      <span>
                        If there are three queues with weights <strong className="text-[#232D2D]">1 (low priority)</strong>, <strong className="text-[#232D2D]">2 (medium priority)</strong>, and <strong className="text-[#232D2D]">3 (high priority)</strong> :
                      </span>
                    </div>
                    <ul className="pl-6 sm:pl-8 space-y-1.5 list-disc text-[#283535]">
                      <li>Process one packet from the low-priority queue.</li>
                      <li>Process two packets from the medium-priority queue.</li>
                      <li>Process three packets from the high-priority queue.</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>This prevents starvation.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-2 border-t border-[#8A7059]/25" />

        {/* ============================================================== */}
        {/* SECTION 3: TRAFFIC SHAPING & POLICING                          */}
        {/* ============================================================== */}
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              Traffic Shaping &amp; Policing Basics
            </h2>
          </div>

          {/* Definitions */}
          <ul className="space-y-2.5 pl-2 text-base sm:text-lg text-[#283535]">
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Traffic Policing</strong> – controlling the amount of traffic entering the network.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Traffic Shaping</strong> – controlling the amount of traffic exiting the network.
              </span>
            </li>
          </ul>

          <div className="pt-2 border-t border-[#8A7059]/20" />

          {/* Leaky Bucket Algorithm */}
          <div className="space-y-3.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
              Leaky Bucket Algorithm : Traffic Shaping
            </h3>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Packets can enter the network (the “bucket”) at any rate but exit at a constant rate. It helps prevent congestion by shaping bursty traffic into fixed-rate traffic.
            </p>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              It doesn’t account for a situation where the host is idle. If the host is idle, the bucket just sits empty.
            </p>
          </div>

          <div className="pt-2 border-t border-[#8A7059]/20" />

          {/* Token Bucket Algorithm */}
          <div className="space-y-3.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#232D2D]">
              Token Bucket Algorithm : Traffic Policing
            </h3>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              Here, the host uses the bucket to accumulate tokens which it can use to transmit data. When the host processes and sends a data cell, one token is removed from the bucket. A host cannot send data if it does not have any tokens.
            </p>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              A token bucket can be implemented using a counter. Initially, the counter is at 0. When a token is added, the counter is incremented by 1. When a token is removed to transmit data, the counter decrements by 1.
            </p>
            <p className="text-base sm:text-lg text-[#283535] leading-relaxed">
              If tokens arrive when the bucket is full, they are discarded.
            </p>
          </div>
        </section>
      </div>
    </NetworkPageLayout>
  );
}
