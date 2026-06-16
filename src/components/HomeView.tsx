/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Heart, Clock, Music, Volume2, VolumeX } from 'lucide-react';

interface HomeViewProps {
  onSetActiveTab: (tab: 'home' | 'story' | 'details' | 'rsvp') => void;
  primaryImage: string;
  key?: string;
}

export default function HomeView({ onSetActiveTab, primaryImage }: HomeViewProps) {
  // Wedding Target date: October 24, 2026 16:00:00 (GMT+7 or local)
  const targetDate = new Date('2026-10-24T16:00:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [showInvitationToast, setShowInvitationToast] = useState(true);

  // Background audio (royalty free elegant acoustic wedding theme)
  useEffect(() => {
    // Elegant background audio source: soft wedding nylon guitar
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Fallback elegant player
    audio.loop = true;
    audio.volume = 0.15;

    if (isPlaying) {
      audio.play().catch(e => console.log("Audio play delayed till user interaction"));
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0')
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-start min-h-screen px-4 pb-28 pt-4 w-full max-w-md mx-auto"
    >
      {/* Primary Wedding Picture Card */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-[0_12px_40px_rgba(110,95,78,0.12)] border-2 border-white/80 bg-[#FAF6F0] mb-8">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full object-cover aspect-[3/4]"
          src={primaryImage}
          alt="Elias & Julia Wedding Portraits"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating audio control bar */}
        <div className="absolute bottom-4 right-4 z-10">
          <button
            id="btn-toggle-music"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md bg-white/70 border border-white/50 text-[#5C4D3C] hover:bg-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            title="Toggle background music"
          >
            {isPlaying ? (
              <Volume2 className="w-4.5 h-4.5 animate-pulse text-rose-600" />
            ) : (
              <VolumeX className="w-4.5 h-4.5" />
            )}
          </button>
        </div>

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Elias & Julia Headline Typography */}
      <h1 className="font-serif text-[42px] font-normal leading-tight text-[#3C332D] text-center select-none tracking-normal">
        Elias &amp; Julia
      </h1>

      {/* Decorative Golden Line / Circle Segment */}
      <div className="flex items-center justify-center gap-4 w-48 mt-4">
        <div className="h-[1px] bg-[#8B7355]/30 flex-1"></div>
        <div className="w-[6px] h-[6px] rounded-full border border-[#8B7355]/60 bg-transparent flex-shrink-0"></div>
        <div className="h-[1px] bg-[#8B7355]/30 flex-1"></div>
      </div>

      {/* Golden Section Label */}
      <h2 className="text-[#8B7355] text-xs font-semibold tracking-[0.35em] text-center uppercase mt-6 mb-6">
        Save the Date
      </h2>

      {/* Countdown Timer Table Grid */}
      <div className="grid grid-cols-4 w-full border-t border-b border-[#EADFC9]/60 py-6 mb-8 mt-2 text-center">
        {/* DAYS COUNT */}
        <div className="flex flex-col items-center">
          <span className="font-sans text-[26px] font-light leading-none text-[#3C332D] tracking-tight">
            {timeLeft.days}
          </span>
          <span className="text-[10px] text-[#8B7355] font-semibold tracking-wider mt-2.5">
            DAYS
          </span>
        </div>

        {/* HRS COUNT */}
        <div className="flex flex-col items-center border-l border-[#EADFC9]">
          <span className="font-sans text-[26px] font-light leading-none text-[#3C332D] tracking-tight">
            {timeLeft.hours}
          </span>
          <span className="text-[10px] text-[#8B7355] font-semibold tracking-wider mt-2.5">
            HRS
          </span>
        </div>

        {/* MIN COUNT */}
        <div className="flex flex-col items-center border-l border-[#EADFC9]">
          <span className="font-sans text-[26px] font-light leading-none text-[#3C332D] tracking-tight">
            {timeLeft.minutes}
          </span>
          <span className="text-[10px] text-[#8B7355] font-semibold tracking-wider mt-2.5">
            MIN
          </span>
        </div>

        {/* SEC COUNT */}
        <div className="flex flex-col items-center border-l border-[#EADFC9]">
          <span className="font-sans text-[26px] font-light leading-none text-[#3C332D] tracking-tight text-amber-900 font-normal">
            {timeLeft.seconds}
          </span>
          <span className="text-[10px] text-[#8B7355] font-semibold tracking-wider mt-2.5 animate-pulse">
            SEC
          </span>
        </div>
      </div>

      {/* CTA Button to interact directly with RSVP */}
      <motion.button
        id="btn-home-rsvp-cta"
        whileTap={{ scale: 0.98 }}
        onClick={() => onSetActiveTab('rsvp')}
        className="px-8 py-3.5 rounded-full bg-[#8B7355] hover:bg-[#735E45] text-[#FCFAF6] font-medium tracking-widest text-xs uppercase shadow-md transition-all active:shadow-sm"
      >
        Click to RSVP
      </motion.button>

      {/* Toast Prompt for first-time visitors */}
      {showInvitationToast && (
        <div className="fixed bottom-24 inset-x-4 max-w-sm mx-auto p-4 rounded-xl bg-[#FAF6F0] border border-[#8B7355]/40 shadow-xl z-30 flex items-start gap-3">
          <Heart className="w-5 h-5 text-[#8B7355] fill-[#8B7355]/20 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-[#3C332D]">You are Cordially Invited!</p>
            <p className="text-[11px] text-[#8B7355] mt-1">Elias & Julia invite you to celebrate their union on Saturday, Oct 24, 2026. Please confirm RSVP.</p>
          </div>
          <button 
            id="btn-toast-close"
            onClick={() => setShowInvitationToast(false)} 
            className="text-[#8B7355] hover:text-[#3C332D] text-xs font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}
    </motion.div>
  );
}
