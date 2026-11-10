import React from 'react';
import NetworkPageLayout from '../../components/NetworkPageLayout';

export default function Page1_1_Fundamentals({ onBackToIndex, onNavigatePage }) {
  return (
    <NetworkPageLayout
      pageId="1-1-fundamentals"
      subtitle="The 4 characteristics, the 5 components, transmission modes, and protocol layering."
      onBackToIndex={onBackToIndex}
      onNavigatePage={onNavigatePage}
    >
      {/* Article Body */}
      <div className="space-y-12 text-base sm:text-lg text-[#283535] leading-relaxed">
        {/* SECTION 1: DATA COMMUNICATION */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Data Communication
          </h2>
          <p>
            The transmission of data between two devices capable of communication is called data communication.
          </p>
          <p className="font-medium text-[#232D2D]">
            The four characteristics of data communication include:
          </p>

          <ul className="space-y-2.5 pl-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">1.</span>
              <span>
                <strong className="text-[#232D2D]">Delivery:</strong> The data packet needs to be transmitted to the intended receiver.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">2.</span>
              <span>
                <strong className="text-[#232D2D]">Accuracy:</strong> The data packet needs to be transmitted without any errors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">3.</span>
              <span>
                <strong className="text-[#232D2D]">Timeliness:</strong> The data packet should be transmitted to the receiver without major delay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">4.</span>
              <span>
                <strong className="text-[#232D2D]">Jitter:</strong> Variation in packet delay that causes audio/video stutter.
              </span>
            </li>
          </ul>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-4 border-t border-[#8A7059]/25" />

        {/* SECTION 2: THE 5 COMPONENTS */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            The 5 components of data communication
          </h2>

          <ul className="space-y-3 pl-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Message:</strong> The data that needs to be transmitted from the sender to the receiver.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Sender:</strong> The device which sends the data.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Receiver:</strong> The device which receives the data.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <div>
                <span>
                  <strong className="text-[#232D2D]">Transmission Medium:</strong> The path along which data is transmitted from the sender to the receiver. There are two types of transmission media:
                </span>
                <ul className="mt-2.5 space-y-1.5 pl-4 list-none text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">Guided:</strong> Coaxial cables, fibre-optic cables, etc.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#8A7059] font-semibold">-</span>
                    <span><strong className="text-[#232D2D]">Unguided:</strong> Radio waves, microwaves, etc.</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">•</span>
              <span>
                <strong className="text-[#232D2D]">Protocol:</strong> A set of rules that governs the communication and transmission of data from sender to receiver over a network.
              </span>
            </li>
          </ul>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-4 border-t border-[#8A7059]/25" />

        {/* SECTION 3: TRANSMISSION MODES */}
        <section className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Transmission Modes
          </h2>

          <div className="space-y-4">
            <p>
              <strong className="text-[#232D2D]">Simplex:</strong> A channel exists between the sender and the receiver, but only one device (the sender) can transmit data. The other device has to receive it. Only unidirectional communication is possible.
            </p>
            <p>
              Example : Keyboard to computer.
            </p>
            <br></br>
            <p>
              <strong className="text-[#232D2D]">Half-Duplex:</strong> A channel exists between the sender and receiver where bidirectional communication is possible. Both devices can transmit and receive data, but not simultaneously. If one device is transmitting data, it will take up the entire channel to do so, and the other device has to wait for the ongoing transmission to finish before it can send its data.
            </p>
            <p>
              Example : Walkie-talkies. Only one person can speak at a time.
            </p>
            <br></br>
            <p>
              <strong className="text-[#232D2D]">Full-Duplex:</strong> A channel exists between the sender and receiver where bidirectional communication is possible, and both devices can transmit and receive data simultaneously. This can be done either by having two separate channels or by splitting a single channel into two parts catering to the signals moving in opposite directions.
            </p>
            <p>Example : Telephone call. Both people can talk and listen at the same time.</p>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="pt-4 border-t border-[#8A7059]/25" />

        {/* SECTION 4: PROTOCOL LAYERING */}
        <section className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
            Protocol Layering
          </h2>
          <p>
            Earlier, we saw that a protocol is a set of rules that defines data communication over a network. If the communication is simple, simple protocols will suffice. But in most real-world scenarios, communication is complex, and governing it requires protocol layering, where tasks are distributed among different layers.
          </p>
          <p className="font-medium text-[#232D2D]">
            For protocol layering to be implemented, there are two principles to be followed :
          </p>

          <ul className="space-y-3.5 pl-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">1.</span>
              <span>
                If bidirectional communication is required, each layer should perform two opposite actions in both directions. For example, if a layer is responsible for decoding data and passing it up to the higher layers, it should also be able to encode data and pass it down to the lower layers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8A7059] font-bold">2.</span>
              <span>
                The object type under each layer at both sites (sender and receiver) should be the same. For example, if the object type is a data segment under the Transport Layer of the sender, it should be a data segment under the Transport Layer of the receiver as well.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </NetworkPageLayout>
  );
}
