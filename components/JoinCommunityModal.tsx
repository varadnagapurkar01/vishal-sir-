'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Sparkles, X, Video } from 'lucide-react';

export const JoinCommunityModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "8600671512";
  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
    "Hello Vishal Sir! I am a student and I would love to send my heartfelt video message to express my gratitude and join the wishes!"
  )}`;

  return (
    <>
      {/* Subtle, Humble Invitation Banner / Card in Main View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto my-12"
      >
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0B1530] via-[#0D1D45] to-[#0B1530] border border-amber-500/30 shadow-[0_0_30px_rgba(255,215,0,0.08)] overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Every student of Vishal Sir is invited</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Are you a student of Vishal Sir?
              </h3>

              <p className="text-sm text-gray-300 font-serif leading-relaxed">
                If you’d like to join this wall of gratitude and send your personal video thank-you note to Sir, you are warmly invited to share your video message with us.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-bold text-sm tracking-wide shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Share Your Greeting</span>
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp directly</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal Dialog providing clear, respectful instructions */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#08122C] border border-amber-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header */}
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-1">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-white tracking-tight">
                  Thank Your Mentor
                </h4>
                <p className="text-xs text-amber-200/80 font-serif italic">
                  “A teacher affects eternity; he can never tell where his influence stops.”
                </p>
              </div>

              {/* Simple Step Guidelines */}
              <div className="space-y-4 text-sm text-gray-200 bg-[#040814]/60 p-4 rounded-2xl border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="leading-snug">
                    Record a simple, heartfelt video expressing your birthday wishes and gratitude to Vishal Sir.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="leading-snug">
                    Send your video clip on WhatsApp along with your name and batch.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="leading-snug">
                    Your video will be added to this growing universe of student wishes!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-center text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>Send Video via WhatsApp ({whatsappNumber})</span>
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-2xl bg-transparent text-gray-400 hover:text-white font-medium text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
