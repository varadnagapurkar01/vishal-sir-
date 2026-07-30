'use client';

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#050B18]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#071026] rounded-[10.5px] flex items-center justify-center font-black text-amber-400 text-lg tracking-tighter">
              V
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
              VISHAL SIR
            </h1>
            <p className="text-[11px] text-cyan-400/80 font-medium">
              A Gift From 6:45 AM - 7:45 AM Batch
            </p>
          </div>
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
