'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { MediaItem } from '../app/api/media/route';

interface MediaPlayerModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const MediaPlayerModal: React.FC<MediaPlayerModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-3xl overflow-hidden rounded-2xl bg-[#071026] border ${
            item.isPriority 
              ? 'border-amber-400/80 shadow-[0_0_40px_rgba(255,215,0,0.2)]' 
              : 'border-cyan-500/30 shadow-2xl'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#050B18] border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              {item.isPriority && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-black">
                  <Star className="w-3.5 h-3.5 fill-black" /> PRIORITY
                </span>
              )}
              <span className="text-xs font-bold text-gray-200">
                {item.name}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-cyan-950 hover:bg-amber-500 text-cyan-200 hover:text-black transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Frame */}
          <div className="relative w-full bg-black flex items-center justify-center min-h-[260px] max-h-[75vh] overflow-hidden">
            {item.type === 'video' ? (
              <video
                src={item.url}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full max-h-[73vh] object-contain mx-auto"
              />
            ) : (
              <img
                src={item.url}
                alt={item.name}
                loading="lazy"
                className="w-full max-h-[73vh] object-contain mx-auto"
              />
            )}
          </div>

          {/* Strictly Only File Name Below Video */}
          <div className="p-3 bg-[#050B18] text-center border-t border-cyan-500/10">
            <p className="text-xs font-mono text-cyan-300">
              {item.name}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
