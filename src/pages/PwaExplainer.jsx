import React, { useEffect } from 'react';
import { profileData } from '../data/portfolioData';
import NormalWebVisualizer from '../components/pwa/NormalWebVisualizer';
import ServiceWorkerVisualizer from '../components/pwa/ServiceWorkerVisualizer';
import CodeBlockTerminal from '../components/pwa/CodeBlockTerminal';
import LifecycleInstallFlow from '../components/pwa/LifecycleInstallFlow';
import LifecycleRefreshFlow from '../components/pwa/LifecycleRefreshFlow';
import WhyWaitVisualizer from '../components/pwa/WhyWaitVisualizer';

const manifestExampleJson = `{
  "name": "Full application name",
  "short_name": "Shortened application name",
  "description": "What the application is about",
  "start_url": "./",
  "background_color": "#000000",
  "theme_color": "#FFFFFF",
  "orientation": "any",
  "display": "standalone",
  "icons": [
    {
      "src": "image_path.png",
      "sizes": "256x256",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "image_path.svg",
      "sizes": "192x192 512x512 any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}`;

export default function PwaExplainer({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#232D2D] selection:bg-[#8A7059]/20 overflow-x-hidden">
      {/* Top sticky minimalist bar */}
      <nav className="sticky top-0 z-30 bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#8A7059]/25 px-4 sm:px-8 md:px-12 py-4">
        <div className="w-[88%] max-w-[1440px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#6E5844] hover:text-[#232D2D] transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Portfolio</span>
          </button>
        </div>
      </nav>

      {/* Main Reading Container */}
      <main className="w-[88%] max-w-[1440px] mx-auto px-2 sm:px-6 md:px-10 py-12 sm:py-16 pb-24">
        {/* Main Document Title */}
        <header className="mb-10 sm:mb-12 border-b border-[#8A7059]/25 pb-8 sm:pb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#232D2D] leading-[1.15]">
            Progressive Web Applications
          </h1>
          <p className="mt-4 text-base sm:text-lg font-mono text-[#8A7059]">
            A basic write-up on PWAs and their working
          </p>

          {/* Quick Chapter Navigation Links */}
          <div className="mt-8 pt-6 border-t border-[#8A7059]/20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6E5844]">
              Jump to Chapter:
            </span>
            <button
              type="button"
              onClick={() => scrollToChapter('chapter-1')}
              className="font-mono text-xs sm:text-sm text-[#283535] hover:text-[#8A7059] underline underline-offset-4 decoration-[#8A7059]/40 hover:decoration-[#8A7059] transition-all text-left w-fit"
            >
              01 • Core Architecture & Manifest
            </button>
            <button
              type="button"
              onClick={() => scrollToChapter('chapter-2')}
              className="font-mono text-xs sm:text-sm text-[#283535] hover:text-[#8A7059] underline underline-offset-4 decoration-[#8A7059]/40 hover:decoration-[#8A7059] transition-all text-left w-fit"
            >
              02 • Service Worker Lifecycle & Updates
            </button>
          </div>
        </header>

        {/* ============================================================== */}
        {/* CHAPTER 01: CORE ARCHITECTURE & MANIFEST */}
        {/* ============================================================== */}
        <section id="chapter-1" className="scroll-mt-24 space-y-8 text-base sm:text-lg leading-relaxed text-[#283535]">
          <div className="inline-block px-3 py-0.5 rounded bg-[#384545]/10 font-mono text-xs uppercase tracking-widest text-[#384545] font-semibold">
            Chapter 01
          </div>

          <p>
            A progressive web app (PWA) is a web application that can be installed and used like a native system application across all devices (desktop, mobile phones, tablets) and across Windows, Android and iOS, all using a single codebase.
          </p>

          <div>
            <p className="font-semibold text-[#232D2D] mb-3">
              It combines the best parts of a web application and a native one :
            </p>
            <ul className="space-y-2.5 pl-2 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>PWAs can be used offline and can support push notifications using a service worker</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>PWAs don’t require building separate codebases for Android, iOS, Windows etc.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>They can be installed and added to a device’s shelf, taskbar or home screen as a standalone application alongside other native applications.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span>Since PWAs are basically web applications at their heart, they require HTTPS for security and can be optimized for SEO</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-[#232D2D] mb-3">
              Progressive web apps are built using web programming languages such as HTML, CSS and JavaScript but there are two important files that make it what it is :
            </p>
            <ul className="space-y-2 pl-2 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span><strong className="text-[#232D2D]">The Service Worker</strong> (a JavaScript file)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8A7059] font-bold">•</span>
                <span><strong className="text-[#232D2D]">The Web App Manifest</strong> (a JavaScript Object Notation file)</span>
              </li>
            </ul>
          </div>

          <p>
            When installing a PWA, the pages of the web application (HTML) along with all the respective styles and interactive components (CSS and JS) are downloaded and stored in the local cache, so that it can be accessed offline. The Service Worker is also installed, independent of the application, which can be opened by the browser to sync data even when the application is closed.
          </p>

          {/* Section Divider */}
          <div className="pt-6 border-t border-[#8A7059]/25" />

          {/* Title: The Service Worker */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#232D2D] mb-4">
              The Service Worker
            </h2>
            <p>
              The Service Worker, at its core, is a JavaScript file (normally named as <code className="px-1.5 py-0.5 rounded bg-[#8A7059]/15 font-mono text-sm text-[#232D2D]">sw.js</code>) that allows the PWA to handle incoming HTTP requests, deliver push notifications and work offline. It’s a separate interceptor file that has nothing to do with the UI of the application. It is stateless, meaning it can't store data by itself. It only handles the transmission of requests.
            </p>
          </div>

          {/* Baseline Web Architecture */}
          <p>
            Usually what happens with a normal web application is, it communicates with a web server to handle HTTP requests and retrieve resources. This is fine, because a normal web application can only be accessed when the device is connected to the Internet.
          </p>

          {/* Diagram 1: Normal Web Visualizer */}
          <NormalWebVisualizer />

          {/* Core PWA Logic */}
          <p>
            But when it comes to a PWA, two scenarios need to be acknowledged, when the device is online and offline. That is why the Service Worker exists. It sits in between the application and the server and intercepts any requests. If the device is online, it forwards the GET request to the web server. If it’s offline, it forwards the GET request to the local browser cache to retrieve the resources.
          </p>
          <p>
            If a user submits data or performs any POST operations through the application when offline, the Service Worker temporarily caches the request and forwards it to the server when connectivity resumes.
          </p>
          <p>
            Cache storage usually stores Request-Response pairs, that is, GET operations. POST operations are usually stored in IndexedDB (the browser's NoSQL database), although both mechanisms come under the umbrella term "Local Cache".
          </p>

          {/* Diagram 2: Interactive Service Worker Visualizer */}
          <ServiceWorkerVisualizer />

          {/* Section Divider */}
          <div className="pt-6 border-t border-[#8A7059]/25" />

          {/* Title: The Web App Manifest */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#232D2D] mb-4">
              The Web App Manifest
            </h2>
            <p>
              The Web App Manifest is a JSON file (normally named as <code className="px-1.5 py-0.5 rounded bg-[#8A7059]/15 font-mono text-sm text-[#232D2D]">manifest.json</code>) that informs the browser about the web application, like the name of the application, the theme, the icons etc.
            </p>
          </div>

          <p className="font-medium text-[#232D2D]">
            Example for a manifest.json file is given below:
          </p>

          {/* st.code() style code terminal */}
          <CodeBlockTerminal filename="manifest.json" code={manifestExampleJson} />

          {/* Subtitle: Key Terms */}
          <div className="pt-4">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D] mb-6">
              Key Terms
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-base sm:text-lg font-bold text-[#6E5844] mb-2">
                  “display” : “standalone”
                </h4>
                <p className="text-base sm:text-lg leading-relaxed text-[#283535]">
                  This is one of the more important terms, because it’s what allows the PWA to behave like a native application. “standalone” launches the application in its own window rather than the browser, hiding the URL and search bars completely, making it look and feel like an independent app.
                </p>
              </div>

              <div>
                <h4 className="font-mono text-base sm:text-lg font-bold text-[#6E5844] mb-2">
                  “icons”
                </h4>
                <p className="text-base sm:text-lg leading-relaxed text-[#283535]">
                  Specifies the icons for the app. Usually varying sizes are given like 192x192, 512x512 and “any” because different devices and software have different requirements and vary in where they use the icon. The SVG (Scalable Vector Graphics) format is usually used because of its ability to shrink and expand the image size without compromising quality. But in devices and software where SVG isn’t supported, the PNG (Portable Network Graphics) format acts as the default fallback.
                </p>
              </div>

              <div>
                <h4 className="font-mono text-base sm:text-lg font-bold text-[#6E5844] mb-2">
                  “purpose” : “any maskable”
                </h4>
                <p className="text-base sm:text-lg leading-relaxed text-[#283535]">
                  This is mainly for mobile phones. Samsung by default forces app icons to be “squircles”. Google Pixel usually forces icons to be circles and iPhones usually force icons to be rounded squares. If these devices are given a normal icon, they may shrink it and place it inside a white square or circle. “maskable” basically lets the device crop or mask the image so that it adapts to the default icon shape, making it look like any other native app icon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CHAPTER 02: THE SERVICE WORKER LIFECYCLE */}
        {/* ============================================================== */}
        <section id="chapter-2" className="mt-20 pt-12 border-t-2 border-[#8A7059]/40 scroll-mt-24 space-y-8 text-base sm:text-lg leading-relaxed text-[#283535]">
          <div className="inline-block px-3 py-0.5 rounded bg-[#8A7059]/20 font-mono text-xs uppercase tracking-widest text-[#6E5844] font-semibold">
            Chapter 02
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#232D2D] mb-4">
              The Service Worker Lifecycle
            </h2>
            <p>
              A Service Worker goes through many cycles or events when it is used. In broad terms, when the user installs a PWA, the Service Worker (a <code className="px-1.5 py-0.5 rounded bg-[#8A7059]/15 font-mono text-sm text-[#232D2D]">sw.js</code> file) is registered and <strong>installed (Event 1)</strong>. Once the Service Worker is installed, it becomes <strong>active (Event 2)</strong> and starts handling HTTP requests.
            </p>
          </div>

          {/* Interactive Flowchart 1: Initial Install Sequence */}
          <LifecycleInstallFlow />

          <div>
            <p className="mb-4">
              If the user refreshes the page, the Service Worker is registered again. If no change has been made to the Service Worker since the last refresh, it skips the installation and continues working normally.
            </p>
            <p>
              If the Service Worker has been changed, it installs the new version. Upon completion of the installation, instead of immediately pushing it into the active state to replace the old version, it <strong>waits (Event 3)</strong> until every single window/tab of the application is closed before activating it. Until then, the application is served by the older version of the Service Worker. Once the application is closed and restarted, the new Service Worker is activated.
            </p>
          </div>

          {/* Interactive Flowchart 2: The Update Fork */}
          <LifecycleRefreshFlow />

          {/* Real-World Case Study: Why Wait? */}
          <div className="pt-10 sm:pt-14 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#232D2D]">
              Why wait instead of swapping the old one out for the new version immediately on refresh?
            </h3>

            <p>
              Imagine an application containing a data collection form. Let’s say the Service Worker currently being utilized by the application is <code className="px-1.5 py-0.5 rounded bg-[#384545]/15 font-mono text-sm font-semibold text-[#232D2D]">SW_v1</code>.
            </p>

            <p>
              The user refreshes the page. When doing so, it recognizes a new Service Worker <code className="px-1.5 py-0.5 rounded bg-[#8A7059]/20 font-mono text-sm font-semibold text-[#6E5844]">SW_v2</code> is available and registers and installs it. This will take some time, during which, the user enters their details into the form and clicks the “Submit” button (an HTTP request). Currently, <code className="px-1.5 py-0.5 rounded bg-[#384545]/15 font-mono text-sm font-semibold text-[#232D2D]">SW_v1</code> handles all the details regarding this request.
            </p>

            <p>
              Let’s say clicking the “Submit” button is programmed to trigger a page refresh to show a success message. If during the refresh, <code className="px-1.5 py-0.5 rounded bg-[#384545]/15 font-mono text-sm font-semibold text-[#232D2D]">SW_v1</code> (the one handling the request) was to be swapped out for the newer <code className="px-1.5 py-0.5 rounded bg-[#8A7059]/20 font-mono text-sm font-semibold text-[#6E5844]">SW_v2</code>, it could potentially interrupt the Request-Response flow and break the application.
            </p>

            {/* Interactive Visual Comparison of Why Wait Matters */}
            <WhyWaitVisualizer />

            <div className="pt-2">
              <p className="font-semibold text-[#232D2D] border-l-4 border-[#8A7059] pl-3">
                This is why SW_v2 waits until all active windows/tabs of the application are closed and restarted before becoming active.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="mt-20 pt-8 border-t border-[#8A7059]/25 flex items-center justify-end">
          <span className="font-mono text-xs text-[#8A7059]">
            Progressive Web Applications | {profileData.firstName} {profileData.lastName}
          </span>
        </footer>
      </main>
    </div>
  );
}
