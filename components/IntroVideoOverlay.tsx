'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play } from 'lucide-react';

interface IntroVideoOverlayProps {
  onComplete: () => void;
}

export const IntroVideoOverlay: React.FC<IntroVideoOverlayProps> = ({ onComplete }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const triggerGoalCelebration = () => {
    setVideoEnded(true);

    confetti({
      particleCount: 220,
      spread: 140,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FF5500', '#00F0FF', '#FFFFFF']
    });

    setTimeout(() => {
      onComplete();
    }, 6000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      >
        {!videoEnded ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
            
            {/* NATIVE HTML5 UNMUTED CONTROLS - ZERO REACT INTERFERENCE TO PREVENT STUTTER */}
            {isPlaying ? (
              <video
                src="/last_goal.mp4"
                autoPlay
                controls
                playsInline
                preload="auto"
                onEnded={triggerGoalCelebration}
                onError={triggerGoalCelebration}
                className="w-full h-full object-contain max-h-screen mx-auto"
              />
            ) : (
              /* PURE BLACK COVER WITH GOLDEN PLAY BUTTON BEFORE USER CLICK */
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-40 p-4 text-center">
                <motion.button 
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setIsPlaying(true)}
                  className="px-8 py-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-black text-lg uppercase tracking-wider shadow-[0_0_60px_rgba(255,215,0,0.8)] flex items-center gap-3 border-2 border-amber-200 cursor-pointer"
                >
                  <Play className="w-7 h-7 fill-black" />
                  <span>PLAY INTRO</span>
                </motion.button>
              </div>
            )}

          </div>
        ) : (
          /* HIGH IMPACT STAGGERED REVEAL (>6 SECONDS) */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center p-6 space-y-6 max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
              className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 p-[3px] shadow-[0_0_100px_rgba(255,215,0,0.9)]"
            >
              <div className="w-full h-full bg-[#040814] rounded-full flex items-center justify-center text-4xl">
                ⚽
              </div>
            </motion.div>

            <div className="space-y-3">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-block px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest"
              >
                WINNING GOAL COMPLETED!
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 uppercase tracking-tight leading-tight"
              >
                HAPPY BIRTHDAY <br /> VISHAL SIR!
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="text-sm text-cyan-300 font-bold uppercase tracking-widest pt-2"
            >
              A Gift From The 6:45 AM - 7:45 AM Batch
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
