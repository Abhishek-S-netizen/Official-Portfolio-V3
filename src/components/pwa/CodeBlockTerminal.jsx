import React, { useState } from 'react';

export default function CodeBlockTerminal({ filename = 'manifest.json', code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-[#384545]/20 shadow-lg bg-[#1E2525]">
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#171D1D] border-b border-[#384545]/30">
        <div className="flex items-center gap-2">
          {/* macOS window controls */}
          <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 inline-block" />
          <span className="ml-2 font-mono text-xs text-[#F5F2EB]/60 tracking-wider">
            {filename}
          </span>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono text-[#F5F2EB]/70 hover:text-[#F5F2EB] hover:bg-[#384545]/40 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-[#5eead4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#5eead4]">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-5 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-[#F5F2EB]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

