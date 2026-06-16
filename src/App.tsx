/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ActiveTab } from './types';
import Header from './components/Header';
import HomeView from './components/HomeView';
import StoryView from './components/StoryView';
import DetailsView from './components/DetailsView';
import RSVPView from './components/RSVPView';
import NavBar from './components/NavBar';

// Path to the primary premium image generated in our asset system
const PRIMARY_WEDDING_IMAGE = "/src/assets/images/elias_julia_wedding_1781633186283.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex justify-center items-start text-[#3C332D] selection:bg-[#EADFC9]/70 selection:text-[#3C332D]">
      {/* 
        Responsive desktop mock wrapping wrapper:
        If screen is large (md:), center the invitation in a gorgeous tall phone frame, 
        making it highly accessible, legible and authentic to mobile visitors, while remaining jaw-dropping.
      */}
      <div className="w-full md:max-w-md md:min-h-[92vh] md:my-6 md:rounded-[32px] md:shadow-[0_24px_80px_rgba(110,95,78,0.16)] md:border-[10px] md:border-white bg-[#FCFAF6] overflow-hidden flex flex-col relative">
        
        {/* Persistent Elegant Top Header */}
        <Header activeTab={activeTab} onSetActiveTab={setActiveTab} />

        {/* Dynamic Route View Containers */}
        <main className="flex-1 overflow-y-auto no-scrollbar bg-[#FCFAF6]">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <HomeView 
                key="home-view" 
                primaryImage={PRIMARY_WEDDING_IMAGE} 
                onSetActiveTab={setActiveTab} 
              />
            )}
            {activeTab === 'story' && (
              <StoryView key="story-view" />
            )}
            {activeTab === 'details' && (
              <DetailsView key="details-view" />
            )}
            {activeTab === 'rsvp' && (
              <RSVPView key="rsvp-view" />
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Persistent Navigation Bar */}
        <NavBar activeTab={activeTab} onSelectTab={setActiveTab} />
      </div>

      {/* Decorative desktop-only ambient side text */}
      <div className="hidden lg:flex fixed left-10 top-1/2 -translate-y-1/2 flex-col gap-1 text-[#8B7355] font-serif select-none pointer-events-none">
        <span className="text-sm tracking-[0.45em] uppercase font-semibold">T h e  W e d d i n g  o f</span>
        <span className="text-4xl italic font-normal text-[#3C332D] mt-2 block">Elias &amp; Julia</span>
        <span className="text-[10px] tracking-widest font-mono text-[#A6937C] mt-2 block uppercase">October 24, 2026 • San Francisco</span>
      </div>

      <div className="hidden lg:flex fixed right-10 top-1/2 -translate-y-1/2 flex-col gap-1 items-end text-right text-[#8B7355] font-serif select-none pointer-events-none">
        <span className="text-sm tracking-[0.45em] uppercase font-semibold">C o r d i a l l y</span>
        <span className="text-4xl font-normal text-[#3C332D] mt-2 block">Invited</span>
        <span className="text-[10px] tracking-widest font-mono text-[#A6937C] mt-2 block uppercase">Join Us to Create Forever Memories</span>
      </div>
    </div>
  );
}
