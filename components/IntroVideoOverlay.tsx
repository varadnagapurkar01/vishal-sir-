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
      particleCount: 160,
      spread: 120,
      origin: { y: 0.4 },
      colors: ['#FFD700', '#FF5500', '#00F0FF', '#FFFFFF']
    });

    setTimeout(() => {
      confetti({
        particleCount: 160,
        spread: 140,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF5500', '#00F0FF', '#FFFFFF']
      });
    }, 1200);

    setTimeout(() => {
      onComplete();
    }, 7500);
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
            
            <video
              ref={videoRef}
              src="/last_goal.mp4"
              playsInline
              preload="auto"
              onEnded={triggerGoalCelebration}
              onError={triggerGoalCelebration}
              className="w-full h-full object-contain max-h-screen mx-auto pointer-events-none"
            />

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
          /* CINEMATIC FULL-SCREEN LORD MAHADEVA BACKGROUND ASPECT (IMAGE NEVER DISTURBED) */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full flex flex-col justify-between p-6 overflow-hidden bg-black"
          >
            {/* Full-Screen Lord Mahadeva Image Background Layer */}
            <motion.div 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 z-0 flex items-center justify-center"
            >
              <img
                src="/photos/image.png"
                alt="Lord Mahadeva Background"
                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_50px_rgba(255,215,0,0.4)]"
              />
              {/* Subtle Gradient Backdrop to Ensure Text Readability without Obscuring Lord Mahadeva */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/80 pointer-events-none" />
            </motion.div>

            {/* Top Text Anchor */}
            <div className="relative z-10 text-center pt-4">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest backdrop-blur-md"
              >
                DIVINE BLESSINGS
              </motion.span>
            </div>

            {/* Bottom Floating Birthday Text & Batch Attribution (Positioned Below Image Subject) */}
            <div className="relative z-10 text-center space-y-3 pb-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 uppercase tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
              >
                HAPPY BIRTHDAY <br /> VISHAL SIR!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="text-sm sm:text-base text-amber-100 font-serif italic max-w-lg mx-auto drop-shadow-md"
              >
                May Lord Shiva bless you with immense strength, good health, and infinite success.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
                className="text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-widest pt-1"
              >
                A Gift From The 6:45 AM - 7:45 AM Batch
              </motion.p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
