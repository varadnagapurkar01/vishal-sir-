'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BasketballTransitionProps {
  onComplete: () => void;
}

export const BasketballTransition: React.FC<BasketballTransitionProps> = ({ onComplete }) => {
  const [swished, setSwished] = useState(false);

  // Trigger SWISH net reaction and score completion
  setTimeout(() => {
    setSwished(true);
  }, 1400);

  setTimeout(() => {
    onComplete();
  }, 2200);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm overflow-hidden"
      >
        {/* Hoop & Net Assembly */}
        <div className="relative flex flex-col items-center mb-10">
          <div className="w-36 h-24 bg-slate-900 border-2 border-amber-500 rounded-lg flex flex-col items-center justify-end p-1 shadow-[0_0_30px_rgba(255,140,0,0.3)]">
            <div className="w-18 h-12 border border-cyan-400 rounded-sm mb-1" />
            <div className="w-16 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
          </div>

          {/* Dynamic Net Stretch on Swish */}
          <motion.div
            animate={swished ? { scaleY: [1, 1.4, 0.85, 1], y: [0, 8, 0] } : { scaleY: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-14 h-12 border-b-2 border-l-2 border-r-2 border-white/80 rounded-b-xl border-dashed bg-amber-500/10"
          />
        </div>

        {/* Curved Parabolic Ball Trajectory */}
        <motion.div
          initial={{ y: 220, x: -60, scale: 1.3, rotate: 0 }}
          animate={{
            y: [-40, -140, -70], // Arc over hoop and down through net
            x: [-60, 0, 0],
            scale: [1.3, 1.1, 0.75],
            rotate: [0, 360, 720]
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 border-2 border-amber-300 shadow-[0_0_40px_rgba(255,140,0,0.9)] flex items-center justify-center pointer-events-none"
        >
          <div className="w-full h-0.5 bg-black/60" />
        </motion.div>

        {/* SWISH Impact Text */}
        {swished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-28 text-amber-400 font-black text-2xl uppercase tracking-widest drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
          >
            SWISH! 🏀
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
