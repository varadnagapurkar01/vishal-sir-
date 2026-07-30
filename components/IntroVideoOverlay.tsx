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

            {/* Top Right Controls: Mute & Skip Intro */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
              {isPlaying && (
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-black/70 border border-amber-400/50 text-amber-300 shadow-2xl hover:bg-black/90 transition-all cursor-pointer flex items-center gap-2 text-xs font-bold"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-amber-400" />
                  )}
                </button>
              )}

              <button
                onClick={onComplete}
                className="px-4 py-2 rounded-full bg-black/70 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 hover:text-black transition-all cursor-pointer shadow-lg backdrop-blur-md"
              >
                Skip Intro →
              </button>
            </div>

          </div>
        ) : (
          /* CINEMATIC LORD MAHADEVA BIRTHDAY OVERLAY - TEXT AT BOTTOM, MAHADEVA FACE CLEAN ON TOP */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black"
          >
            {/* Lord Mahadeva Image - Positioned in top/middle screen so face is completely clear */}
            <motion.div 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 z-0 flex items-start sm:items-center justify-center pt-8 pb-48 sm:pb-64 pointer-events-none"
            >
              <img
                src="/photos/image.png"
                alt="Lord Mahadeva"
                className="max-h-[52vh] sm:max-h-[60vh] w-auto object-contain drop-shadow-[0_0_60px_rgba(255,215,0,0.4)]"
              />
            </motion.div>

            {/* Top Anchor: Har Har Mahadev Tag */}
            <div className="relative z-10 text-center pt-4 sm:pt-6">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-lg"
              >
                HAR HAR MAHADEV
              </motion.span>
            </div>

            {/* Bottom Anchor: Birthday Wishes Container (Positioned safely below Mahadeva's face) */}
            <div className="relative z-10 w-full bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-6 px-4 sm:px-8 text-center space-y-3 sm:space-y-4 mt-auto">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 uppercase tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
              >
                HAPPY BIRTHDAY <br className="sm:hidden" /> VISHAL SIR!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-xs sm:text-base text-amber-100/90 font-serif italic max-w-md sm:max-w-xl mx-auto drop-shadow-md px-2 leading-relaxed"
              >
                “May Lord Shiva bless you with immense strength, good health, and infinite success.”
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-[11px] sm:text-xs text-cyan-300 font-bold uppercase tracking-widest"
              >
                A Gift From The 6:45 AM - 7:45 AM Batch
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="pt-2 sm:pt-4"
              >
                <button
                  onClick={onComplete}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-105 transition-all cursor-pointer"
                >
                  ENTER CELEBRATION →
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
