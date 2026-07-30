'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, Volume2, VolumeX } from 'lucide-react';

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
            
            {/* CLEAN VIDEO ELEMENT WITHOUT NATIVE CONTROLS BAR (controls=false) */}
            <video
              ref={videoRef}
              src="/last_goal.mp4"
              playsInline
              preload="auto"
              onEnded={triggerGoalCelebration}
              onError={triggerGoalCelebration}
              className="w-full h-full object-contain max-h-screen mx-auto pointer-events-none"
            />

            {/* BLACK SCREEN COVER WITH ONLY GOLDEN BUTTON BEFORE PLAYING */}
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

            {/* FLOATING MUTE / UNMUTE BUTTON ONLY (NO PLAY/PAUSE/STOP/SEEK CONTROLS) */}
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
