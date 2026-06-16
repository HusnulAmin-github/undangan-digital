/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, Heart, X, Share2, BookOpen, Calendar, MapPin, Gift, AlertCircle, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onSetActiveTab: (tab: 'home' | 'story' | 'details' | 'rsvp') => void;
  activeTab: string;
}

export default function Header({ onSetActiveTab, activeTab }: HeaderProps) {
  const [loveCount, setLoveCount] = useState<number>(() => {
    const saved = localStorage.getItem('wedding_love_count');
    return saved ? parseInt(saved, 10) : 108;
  });
  
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; color: string; scale: number }>>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync love count
  useEffect(() => {
    localStorage.setItem('wedding_love_count', loveCount.toString());
  }, [loveCount]);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoveCount(prev => prev + 1);
    
    // Spawn heart particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 40,
      y: rect.top - 10,
      color: ['#E63946', '#D62828', '#EE9B00', '#F4A261', '#E76F51'][Math.floor(Math.random() * 5)],
      scale: Math.random() * 0.4 + 0.6
    }));

    setHearts(prev => [...prev, ...newHearts]);
  };

  // Cleanup old hearts
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts(prev => prev.slice(5));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#FCFAF6] border-b border-[#EADFC9]/40 backdrop-blur-md">
        {/* Burger Menu Button */}
        <button 
          id="btn-header-menu"
          onClick={() => setIsDrawerOpen(true)}
          className="p-1 text-[#5c4d3c] hover:text-[#9e835e] transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 stroke-[1.5]" />
        </button>

        {/* Centered Serif Logo */}
        <div className="flex flex-col items-center select-none">
          <span className="font-serif text-3xl font-normal tracking-[0.25em] text-[#3C332D] ml-[0.25em]">
            E & J
          </span>
        </div>

        {/* Heart Rate Like Button */}
        <button
          id="btn-header-heart"
          onClick={handleHeartClick}
          className="relative p-1 text-[#5c4d3c] hover:text-red-500 transition-colors focus:outline-none"
          aria-label="Send Love"
        >
          <Heart className={`w-6 h-6 stroke-[1.5] ${loveCount > 108 ? 'fill-red-500 text-red-500' : ''}`} />
          {loveCount > 0 && (
            <span className="absolute -top-1.5 -right-2 px-1 rounded-full text-[9px] font-bold bg-[#8B7355] text-white select-none leading-none pt-0.5 pb-0.5 min-w-[14px] text-center">
              {loveCount}
            </span>
          )}
        </button>
      </header>

      {/* Love Hearts Animation Canvas Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: heart.y, x: heart.x, scale: 0.1 }}
              animate={{ 
                opacity: 0, 
                y: heart.y - 300, 
                x: heart.x + (Math.random() - 0.5) * 150,
                scale: heart.scale,
                rotate: (Math.random() - 0.5) * 45
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute text-xl"
              style={{ color: heart.color }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Aesthetic Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              id="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            <motion.div
              id="drawer-container"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-[#FAF6F0] shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#EADFC9]/60">
                  <span className="font-serif text-2xl tracking-widest text-[#3D342C]">MENU</span>
                  <button 
                    id="btn-close-drawer"
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 text-[#3D342C]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Couple Brand Card */}
                <div className="my-6 p-4 rounded-xl border border-[#EADFC9]/80 bg-white/50 text-center">
                  <p className="font-serif text-xl text-[#3D342C]">Elias & Julia</p>
                  <p className="text-xs text-[#8B7355] uppercase tracking-widest mt-1 font-medium">Wedding Invitation</p>
                  <p className="text-[11px] text-[#A6937C] mt-2 italic">“And now these three remain: faith, hope and love. But the greatest of these is love.”</p>
                </div>

                {/* Nav Links inside Drawer */}
                <nav className="flex flex-col gap-1 mt-6">
                  {[
                    { id: 'home', label: 'Home Page', icon: MapPin },
                    { id: 'story', label: 'Our Story Timeline', icon: BookOpen },
                    { id: 'details', label: 'Wedding Event Details', icon: Calendar },
                    { id: 'rsvp', label: 'RSVP Guestbook', icon: Gift },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        id={`btn-drawer-${item.id}`}
                        onClick={() => {
                          onSetActiveTab(item.id as any);
                          setIsDrawerOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm text-left transition-all ${
                          activeTab === item.id 
                            ? 'bg-[#8B7355] text-white font-medium shadow-sm' 
                            : 'text-[#3D342C] hover:bg-[#EADFC9]/30'
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5 stroke-[1.5]" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer and Sharing Settings */}
              <div className="pt-6 border-t border-[#EADFC9]/50">
                <button
                  id="btn-drawer-share"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-white/80 border border-[#EADFC9] text-[#3D342C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Copied Invite Link</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Invitation</span>
                    </>
                  )}
                </button>
                <div className="text-center mt-4 text-[10px] text-[#A6937C] font-mono tracking-wider">
                  ELIAS & JULIA • 2026
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
