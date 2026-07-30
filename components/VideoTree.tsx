'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Star } from 'lucide-react';
import { MediaItem } from '../app/api/media/route';

interface VideoTreeProps {
  mediaItems: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
}

export const VideoTree: React.FC<VideoTreeProps> = ({ mediaItems, onSelectMedia }) => {
  // Format raw filenames into clean titles
  const getCleanTitle = (name: string) => {
    const clean = name.replace(/\.mp4$/i, '').trim();
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center bg-gradient-to-b from-[#071026] via-[#091535] to-[#040814] rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-[0_0_60px_rgba(0,0,0,0.8)] min-h-[550px] overflow-hidden">
      
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest mb-3 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" /> WISDOM & MEMORIES
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 uppercase tracking-tight">
          STUDENT WISHES FOR VISHAL SIR
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/80 font-medium mt-2">
          Tap any memory orb to launch the video greeting
        </p>
      </div>

      {/* Responsive Interactive Video Galaxy */}
      <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaItems.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectMedia(item)}
              className={`relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl border overflow-hidden group ${
                item.isPriority
                  ? 'bg-gradient-to-r from-amber-950/80 via-[#1C1202] to-amber-950/80 border-amber-400 shadow-[0_0_25px_rgba(255,215,0,0.3)]'
                  : 'bg-[#0B1A3E]/80 border-cyan-500/30 hover:border-amber-400/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Dynamic Aura Orb Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                  item.isPriority
                    ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-black font-extrabold shadow-[0_0_20px_rgba(255,215,0,0.6)]'
                    : 'bg-gradient-to-tr from-amber-500/20 via-cyan-500/20 to-blue-500/20 border border-amber-400/40 text-amber-400'
                }`}
              >
                {item.isPriority ? (
                  <Star className="w-7 h-7 fill-black text-black" />
                ) : (
                  <Film className="w-7 h-7 text-amber-400" />
                )}
              </div>

              {/* Student Name & Copy */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="text-sm sm:text-base font-extrabold text-white truncate">
                    {getCleanTitle(item.name)}
                  </h3>
                  {item.isPriority && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-black uppercase tracking-wider">
                      PRIORITY
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-300/80 font-semibold flex items-center gap-1">
                  <span>Birthday Message</span>
                  <span className="text-amber-400 text-[10px]">→</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
