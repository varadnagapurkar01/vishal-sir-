'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface IntroVideoOverlayProps {
  onComplete: () => void;
}

export const IntroVideoOverlay: React.FC<IntroVideoOverlayProps> = ({ onComplete }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const triggerGoalCelebration = () => {
    setVideoEnded(true);

    // Multi-stage fireworks confetti bursts
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#FFD700', '#FF5500', '#00F0FF', '#FFFFFF']
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 140,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF5500', '#00F0FF', '#FFFFFF']
      });
    }, 1200);

    setTimeout(() => {
      onComplete();
    }, 7000);
  };

  const handleGoldenButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch((err) => {
        console.error("Play error, trying muted play:", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => setIsPlaying(true)).catch(triggerGoalCelebration);
        }
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-auto"
      >
        {!videoEnded ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
            
            {/* CLEAN VIDEO ELEMENT WITHOUT NATIVE CONTROLS BAR */}
            <video
              ref={videoRef}
              src="/last_goal.mp4"
              playsInline
              preload="auto"
              onEnded={triggerGoalCelebration}
              onError={triggerGoalCelebration}
              className="w-full h-full object-contain max-h-screen mx-auto pointer-events-none"
            />

            {/* BLACK COVER WITH GOLDEN BUTTON */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-40 p-4 text-center">
                <motion.button 
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleGoldenButtonClick}
                  className="px-8 py-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-black text-lg uppercase tracking-wider shadow-[0_0_60px_rgba(255,215,0,0.8)] flex items-center gap-3 border-2 border-amber-200 cursor-pointer"
                >
                  <Play className="w-7 h-7 fill-black" />
                  <span>PLAY INTRO</span>
                </motion.button>
              </div>
            )}

            {/* MUTE / UNMUTE BUTTON ONLY */}
            {isPlaying && (
              <button
                onClick={toggleMute}
                className="absolute top-6 right-6 p-3 rounded-full bg-black/70 border border-amber-400/50 text-amber-300 z-50 shadow-2xl hover:bg-black/90 transition-all cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6 text-gray-400" />
                ) : (
                  <Volume2 className="w-6 h-6 text-amber-400" />
                )}
              </button>
            )}

          </div>
        ) : (
          /* HIGH IMPACT DEVOTIONAL MAHADEVA BLESSING & STAGGERED REVEAL */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center p-6 space-y-6 max-w-3xl relative z-10"
          >
            {/* Lord Mahadeva Glowing Trident Emblem (Replaces Football Icon) */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
              className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 p-[3px] shadow-[0_0_90px_rgba(255,215,0,0.9)]"
            >
              <div className="w-full h-full bg-[#040814] rounded-full flex items-center justify-center">
                {/* Glowing Trishul Trident SVG */}
                <svg className="w-14 h-14 text-amber-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 2v4.18C9.32 6.6 8 8.14 8 10v3H6v-3c0-2.76 2.24-5 5-5V2h2v3c2.76 0 5 2.24 5 5v3h-2v-3c0-1.86-1.32-3.4-3-3.82V2h-2zm-6 9v2c0 3.31 2.69 6 6 6v3h2v-3c3.31 0 6-2.69 6-6v-2h-2v2c0 2.21-1.79 4-4 4s-4-1.79-4-4v-2H5z" />
                </svg>
              </div>
            </motion.div>

            {/* Dynamic Staggered Text Reveal */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest"
              >
                <Sparkles className="w-4 h-4 text-amber-400" /> HAR HAR MAHADEV
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 uppercase tracking-tight leading-tight drop-shadow-2xl"
              >
                HAPPY BIRTHDAY <br /> VISHAL SIR!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="text-sm sm:text-base text-amber-100/90 font-serif italic max-w-lg mx-auto"
              >
                “May Lord Shiva bless you with immense strength, good health, and infinite success.”
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
              className="text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-widest pt-2"
            >
              A Gift From The 6:45 AM - 7:45 AM Batch
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
