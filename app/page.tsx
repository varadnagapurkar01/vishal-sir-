'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { VideoTree } from '@/components/VideoTree';
import { MediaPlayerModal } from '@/components/MediaPlayerModal';
import { IntroVideoOverlay } from '@/components/IntroVideoOverlay';
import { BasketballTransition } from '@/components/BasketballTransition';
import { JoinCommunityModal } from '@/components/JoinCommunityModal';
import { MediaItem } from '@/app/api/media/route';
import { motion } from 'framer-motion';

export default function Home() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [pendingMedia, setPendingMedia] = useState<MediaItem | null>(null);
  const [showBasketballTransition, setShowBasketballTransition] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic Media Ingestion
  useEffect(() => {
    async function loadMedia() {
      try {
        const res = await fetch('/api/media');
        const data = await res.json();
        if (data.success && data.media) {
          setMediaItems(data.media);
        }
      } catch (err) {
        console.error('Failed to load media items:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMedia();
  }, []);

  // Handle student video click -> trigger 2s basketball transition -> open EXACT selected video
  const handleSelectMediaWithTransition = (item: MediaItem) => {
    setPendingMedia(item);
    setShowBasketballTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowBasketballTransition(false);
    if (pendingMedia) {
      setSelectedMedia(pendingMedia);
      setPendingMedia(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#040814] text-gray-100 flex flex-col justify-between selection:bg-amber-400 selection:text-black">
      
      {/* Dynamic Intro Goal Video Overlay */}
      {showIntro && (
        <IntroVideoOverlay onComplete={() => setShowIntro(false)} />
      )}

      {/* 2-Second Basketball Swish Transition Overlay */}
      {showBasketballTransition && (
        <BasketballTransition onComplete={handleTransitionComplete} />
      )}

      {/* Header */}
      <Header />

      {/* Main Single Page Experience */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 space-y-16">
        
        {/* Section A: Wisdom Memory Universe (Dynamic Video Experience) */}
        <section id="tree" className="scroll-mt-24">
          <VideoTree
            mediaItems={mediaItems}
            onSelectMedia={handleSelectMediaWithTransition}
          />
        </section>

        {/* Section B: Happy Birthday Hero Banner & Memory Photo of Vishal Sir */}
        <section className="w-full max-w-3xl mx-auto space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 uppercase tracking-tight leading-tight drop-shadow-lg">
              HAPPY BIRTHDAY VISHAL SIR!
            </h1>
            <p className="text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-widest">
              A Special Birthday Celebration Gift From 6:45 AM - 7:45 AM Batch
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl bg-[#071026] p-3"
          >
            <div className="relative w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center max-h-[550px]">
              <img
                src="/photos/og_photo.jpeg"
                alt="Vishal Sir Memory Photo"
                className="w-full h-full object-contain mx-auto"
              />
            </div>
          </motion.div>
        </section>

        {/* Section C: Mahadeva Pure Devotional Blessing */}
        <section id="blessing" className="scroll-mt-24 relative bg-gradient-to-b from-[#08122C] to-[#040814] rounded-3xl p-8 sm:p-12 border border-amber-500/40 shadow-2xl text-center overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
              src="/photos/image.png"
              alt="Lord Mahadeva"
              className="w-full h-full object-cover mix-blend-lighten"
            />
          </div>
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest">
              DIVINE BLESSING
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 uppercase tracking-wider">
              HAR HAR MAHADEV
            </h2>

            <p className="text-base sm:text-lg text-amber-100/90 font-serif italic leading-relaxed">
              “May Lord Shiva bless you with immense strength, good health, and infinite success.”
            </p>
          </div>
        </section>

        {/* Section D: Humble Invitation for Other Batches / Students (Positioned below Har Har Mahadev) */}
        <JoinCommunityModal />

      </main>

      {/* Media Player Modal */}
      <MediaPlayerModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

      {/* Footer strictly containing requested text */}
      <footer className="w-full bg-[#030610] border-t border-cyan-500/20 py-6 px-4 text-center">
        <p className="text-xs sm:text-sm text-cyan-300/90 font-medium tracking-wide">
          A gift from the 6:45–7:45 batch.
        </p>
      </footer>

    </div>
  );
}
