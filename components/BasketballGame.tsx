'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MediaItem } from '../app/api/media/route';

interface BasketballGameProps {
  mediaItems: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
}

export const BasketballGame: React.FC<BasketballGameProps> = ({ mediaItems, onSelectMedia }) => {
  const [isShooting, setIsShooting] = useState(false);

  const handleShootBall = () => {
    if (isShooting) return;
    setIsShooting(true);

    setTimeout(() => {
      setIsShooting(false);
      if (mediaItems.length === 0) return;
      const priorityItems = mediaItems.filter(item => item.isPriority);
      let selectedItem: MediaItem;
      if (priorityItems.length > 0 && Math.random() < 0.7) {
        selectedItem = priorityItems[Math.floor(Math.random() * priorityItems.length)];
      } else {
        selectedItem = mediaItems[Math.floor(Math.random() * mediaItems.length)];
      }
      onSelectMedia(selectedItem);
    }, 1300);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-between min-h-[520px] bg-[#071026] rounded-3xl p-6 border border-amber-500/30 shadow-2xl overflow-hidden">
      
      {/* Basketball Hoop */}
      <div className="relative w-full flex justify-center mt-2 z-10">
        <div className="relative flex flex-col items-center">
          <div className="w-36 h-24 bg-slate-900 border-2 border-amber-500 rounded-lg flex flex-col items-center justify-end p-1 shadow-xl shadow-amber-500/20">
            <div className="w-18 h-12 border border-cyan-400 rounded-sm mb-1" />
            <div className="w-16 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
          </div>
          
          {/* Dynamic Net Motion on Score */}
          <motion.div
            animate={isShooting ? { scaleY: [1, 1.4, 0.9, 1], y: [0, 6, 0] } : { scaleY: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-14 h-12 border-b-2 border-l-2 border-r-2 border-white/60 rounded-b-xl border-dashed bg-amber-500/10"
          />
        </div>
      </div>

      {/* Synchronized Character Shooting Motion */}
      <div className="relative w-full h-64 flex items-end justify-center z-10">
        
        {/* Curved Ball Trajectory */}
        <motion.div
          animate={
            isShooting
              ? {
                  y: [-15, -230, -170],
                  x: [0, 24, 0],
                  scale: [1, 1.25, 0.75],
                  rotate: [0, 540, 1080],
                }
              : { y: 0, x: 0 }
          }
          transition={
            isShooting
              ? { duration: 1.1, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          className="absolute bottom-28 z-30 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 border-2 border-amber-300 shadow-[0_0_30px_rgba(255,140,0,0.8)] flex items-center justify-center"
        >
          <div className="w-full h-0.5 bg-black/50" />
        </motion.div>

        {/* Character Posture Extension on Shot */}
        <motion.div 
          animate={
            isShooting
              ? { y: [0, -18, 0], scaleY: [1, 1.05, 1] }
              : { y: 0, scaleY: 1 }
          }
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="relative w-48 h-56 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-2xl bg-black"
        >
          <img
            src="/photos/vishal_avatar.png"
            alt="Vishal Sir Basketball Player"
            className="w-full h-full object-cover"
          />
        </motion.div>

      </div>

      {/* Take the Shot CTA */}
      <div className="w-full z-10 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          disabled={isShooting}
          onClick={handleShootBall}
          className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wider uppercase transition-all duration-300 ${
            isShooting
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
              : 'bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-black shadow-xl shadow-amber-500/30'
          }`}
        >
          {isShooting ? 'TAKING THE SHOT... 🏀' : 'TAKE THE SHOT 🏀'}
        </motion.button>
      </div>

    </div>
  );
};
