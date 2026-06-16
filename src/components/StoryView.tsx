/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Stars, Calendar, Quote, MapPin } from 'lucide-react';

export default function StoryView() {
  const milestones = [
    {
      id: 'meet',
      date: 'September 21, 2021',
      title: 'Our First Encounter',
      subtitle: 'The Cafe Coffee Mix-Up',
      description: 'Elias mistakenly grabbed Julia’s double-shot espresso, resulting in an awkward smile and an introduction that lasted nearly four hours. By the time our cups were cold, we knew our hearts had found something brand warm.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
      tag: 'How We Met'
    },
    {
      id: 'travel',
      date: 'May 14, 2023',
      title: 'First Sunset Escapades',
      subtitle: 'Wildflowers and Coastal Breeze',
      description: 'Our first travel together as a couple. Finding absolute quietness walking through the golden grass dunes against crashing deep blue tides. This was the moment where Elias realized he wanted to walk alongside her for all adventures.',
      image: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=600',
      tag: 'First Travel'
    },
    {
      id: 'proposal',
      date: 'December 25, 2025',
      title: 'The Divine Promise',
      subtitle: 'A Radiant Christmas Eve',
      description: 'Under swirling white winter flakes and glistening fairy lights, Elias knelt down with a vintage champagne diamond ring. Tears of joy fell as Julia whispered "Yes, yes, a million times yes!" surrounded by absolute silence and warmth.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
      tag: 'The Proposal'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="flex flex-col items-center justify-start min-h-screen px-4 pb-28 pt-4 w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-normal text-[#3C332D]">Our Love Story</h2>
        <p className="text-xs text-[#8B7355] tracking-[0.25em] uppercase mt-2 font-medium">How it started vs how it's going</p>
        <div className="flex items-center justify-center gap-3 w-32 mt-4 mx-auto">
          <div className="h-[1px] bg-[#8B7355]/30 flex-1"></div>
          <Heart className="w-3.5 h-3.5 text-[#8B7355] fill-current opacity-70" />
          <div className="h-[1px] bg-[#8B7355]/30 flex-1"></div>
        </div>
      </div>

      {/* Quote Card */}
      <motion.div 
        variants={itemVariants}
        className="relative p-6 rounded-xl border border-[#EADFC9] bg-white/50 text-center mb-10 w-full shadow-sm"
      >
        <Quote className="w-8 h-8 text-[#EADFC9] absolute -top-4 left-1/2 -translate-x-1/2 fill-white bg-[#FAF6F0] px-1" />
        <p className="font-serif italic text-sm text-[#5C4D3C] mt-2 leading-relaxed">
          "True love is not just a destination, but a magnificent journey in which two souls align their paths to walk as one forever."
        </p>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative w-full border-l-[1.5px] border-[#EADFC9] ml-4 pl-6 space-y-12">
        {milestones.map((milestone) => (
          <motion.div 
            key={milestone.id}
            variants={itemVariants}
            className="relative flex flex-col items-start"
          >
            {/* Timeline Bullet Marker */}
            <span className="absolute -left-[33px] top-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#FCFAF6] border-2 border-[#8B7355] z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B7355]"></span>
            </span>

            {/* Milestone Date Tag */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B7355] bg-[#EADFC9]/30 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 font-mono">
              <Calendar className="w-3 h-3" />
              <span>{milestone.date}</span>
            </div>

            {/* Custom Milestone Content Card */}
            <div className="w-full bg-white rounded-xl border border-[#EADFC9]/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Picture banner */}
              <div className="relative h-44 overflow-hidden bg-[#FAF6F0]">
                <img 
                  src={milestone.image} 
                  alt={milestone.title} 
                  className="w-full h-full object-cover grayscale-[10%] hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-sm tracking-wider uppercase font-sans">
                  {milestone.tag}
                </span>
              </div>

              {/* Text content */}
              <div className="p-5">
                <h3 className="font-serif text-lg text-[#3C332D] font-semibold">{milestone.title}</h3>
                <h4 className="text-xs italic text-[#8B7355] mt-1 mb-3.5 font-medium">{milestone.subtitle}</h4>
                <p className="text-xs text-[#5C4D3C] leading-relaxed font-sans">{milestone.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Outro Accent */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col items-center mt-12 mb-6"
      >
        <Stars className="w-6 h-6 text-[#8B7355] animate-pulse" />
        <h3 className="font-serif mt-3 text-base text-[#3C332D] text-center font-medium">To Be Continued...</h3>
        <p className="text-[10px] text-[#A6937C] tracking-widest uppercase mt-1">Our forever commences October 24, 2026</p>
      </motion.div>
    </motion.div>
  );
}
