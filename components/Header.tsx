'use client';

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#050B18]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left Branding */}
        <div>
          <h1 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
            VISHAL SIR
          </h1>
          <p className="text-[11px] text-cyan-400/80 font-medium">
            A Gift From 6:45 AM - 7:45 AM Batch
          </p>
        </div>

        {/* Quick Nav Anchors */}
        <nav className="flex items-center gap-6 text-xs font-bold text-gray-300">
          <a href="#tree" className="hover:text-amber-400 transition-colors">Video Messages</a>
          <a href="#blessing" className="hover:text-amber-400 transition-colors">Blessing</a>
        </nav>

      </div>
    </header>
  );
};
