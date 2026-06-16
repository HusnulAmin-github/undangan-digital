/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Gift, Info, Check, Copy, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export default function DetailsView() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const calendarLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Elias+%26+Julia+Wedding+Day&dates=20261024T090000Z/20261024T160000Z&details=You+are+cordially+invited+to+the+wedding+of+Elias+%26+Julia.+Please+bring+your+warmest+blessings.&location=The+Grand+Ivory+Garden,+Royal+Boulevard+No.+88,+San+Francisco";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-start min-h-screen px-4 pb-28 pt-4 w-full max-w-md mx-auto"
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-normal text-[#3C332D]">Event Details</h2>
        <p className="text-xs text-[#8B7355] tracking-[0.25em] uppercase mt-2 font-medium">When &amp; Where We Gather</p>
        <div className="flex items-center justify-center gap-3 w-32 mt-4 mx-auto">
          <div className="h-[1px] bg-[#8B7355]/30 flex-1"></div>
          <Sparkles className="w-3.5 h-3.5 text-[#8B7355] fill-current opacity-70" />
          <div className="h-[1px] bg-[#8B7355]/30 flex-1"></div>
        </div>
      </div>

      {/* Main General Coordinate Card */}
      <div className="w-full bg-white rounded-2xl border border-[#EADFC9]/70 p-6 shadow-sm mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#EADFC9]/20 rounded-bl-full pointer-events-none" />
        
        <div className="flex items-center gap-3 text-[#3C332D] mb-4">
          <Calendar className="w-5 h-5 text-[#8B7355]" />
          <span className="font-serif text-lg font-semibold">Saturday, October 24, 2026</span>
        </div>

        <p className="text-xs text-[#5C4D3C] leading-relaxed mb-5">
          We invite you to join us as we say our vows and take our first steps together as life partners under the autumn sunset.
        </p>

        {/* Calendar Add Button */}
        <a 
          id="link-details-calendar"
          href={calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#8B7355] text-xs text-[#8B7355] font-semibold hover:bg-[#8B7355]/5 transition-all w-full justify-center shadow-xs"
        >
          <Calendar className="w-4 h-4" />
          <span>Add to Google Calendar</span>
        </a>
      </div>

      {/* Timeline Sessions Split */}
      <div className="w-full space-y-6 mb-8">
        {/* Holy Matrimony Block */}
        <div className="w-full bg-white rounded-2xl border border-[#EADFC9]/60 p-5 shadow-xs relative">
          <div className="inline-block py-1 px-2.5 rounded-md bg-[#8B7355]/10 text-[9px] font-bold uppercase tracking-wider text-[#8B7355] mb-3">
            The Ceremony
          </div>
          <h3 className="font-serif text-base text-[#3C332D] font-bold">Holy Matrimony</h3>
          
          <div className="flex items-center gap-2 text-xs text-[#5C4D3C] mt-3">
            <Clock className="w-4 h-4 text-[#8B7355]" />
            <span>04:00 PM – 05:00 PM</span>
          </div>

          <div className="flex items-start gap-2 text-xs text-[#5C4D3C] mt-2.5">
            <MapPin className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">St. Mary's Cathedral</p>
              <p className="text-[#897566] text-[11px] mt-0.5">Royal Cathedral Wing, Lane 7A, San Francisco, CA</p>
            </div>
          </div>

          <a 
            id="link-cathedral-map"
            href="https://maps.google.com/?q=St.+Mary's+Cathedral+San+Francisco"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-1.5 py-2 w-full rounded-md bg-[#FAF6F0] hover:bg-[#EADFC9]/20 text-[#8B7355] text-xs font-semibold cursor-pointer transition-colors border border-[#EADFC9]/50"
          >
            <span>Navigate Location</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Dinner Reception Block */}
        <div className="w-full bg-white rounded-2xl border border-[#EADFC9]/60 p-5 shadow-xs relative">
          <div className="inline-block py-1 px-2.5 rounded-md bg-[#8B7355]/10 text-[9px] font-bold uppercase tracking-wider text-[#8B7355] mb-3">
            The Celebration
          </div>
          <h3 className="font-serif text-base text-[#3C332D] font-bold">Wedding Dinner Reception</h3>
          
          <div className="flex items-center gap-2 text-xs text-[#5C4D3C] mt-3">
            <Clock className="w-4 h-4 text-[#8B7355]" />
            <span>06:30 PM – 09:30 PM</span>
          </div>

          <div className="flex items-start gap-2 text-xs text-[#5C4D3C] mt-2.5">
            <MapPin className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">The Grand Ivory Pavilion</p>
              <p className="text-[#897566] text-[11px] mt-0.5">Boulevard Court No. 88, West Garden Estate, San Francisco</p>
            </div>
          </div>

          <a 
            id="link-pavilion-map"
            href="https://maps.google.com/?q=The+Grand+Ivory+Pavilion+San+Francisco"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-1.5 py-2 w-full rounded-md bg-[#FAF6F0] hover:bg-[#EADFC9]/20 text-[#8B7355] text-xs font-semibold cursor-pointer transition-colors border border-[#EADFC9]/50"
          >
            <span>Navigate Location</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Dress Code Section */}
      <div className="w-full bg-white rounded-2xl border border-[#EADFC9]/60 p-5 shadow-xs mb-8 text-center">
        <h3 className="font-serif text-base text-[#3C332D] font-bold mb-1">Dress Code Palette</h3>
        <p className="text-xs text-[#8B7355] italic mb-4">Elegant Formal &amp; Clean Tones</p>
        
        <p className="text-xs text-[#5C4D3C] leading-relaxed mb-5 px-2">
          To help us capture a pristine memory palette, we invite our lovable guests to dress inside our cohesive signature colors:
        </p>

        {/* Palette Circles */}
        <div className="flex items-center justify-center gap-4.5">
          {[
            { hex: '#FCFAF6', label: 'Ivory' },
            { hex: '#F0E6D2', label: 'Champagne' },
            { hex: '#DFD1B3', label: 'Warm Beige' },
            { hex: '#A89E8D', label: 'Taupe' },
            { hex: '#776E60', label: 'Mocha' }
          ].map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span 
                className="w-10 h-10 rounded-full border border-gray-200/85 shadow-xs" 
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[9px] text-[#8B7355] font-medium font-mono">{color.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wedding Gift Wishing Well Info */}
      <div className="w-full bg-[#FCFAF6] rounded-2xl border border-dashed border-[#8B7355]/40 p-5 shadow-xs text-center">
        <Gift className="w-6 h-6 text-[#8B7355] mx-auto mb-2" />
        <h3 className="font-serif text-base text-[#3C332D] font-bold mb-1.5">Digital Gift &amp; Wishing Well</h3>
        <p className="text-xs text-[#5C4D3C] leading-relaxed mb-5">
          Your presence at our wedding is the absolute greatest gift we could request. However, if you wish to honor us with a digital token of blessings, you may route them safely below:
        </p>

        {/* Copy Bank Accounts Form */}
        <div className="space-y-3.5">
          {/* Account 1 */}
          <div className="p-3.5 rounded-xl bg-white border border-[#EADFC9]/40 flex items-center justify-between text-left">
            <div>
              <p className="text-[10px] text-[#8B7355] uppercase tracking-wider font-bold">CITIBANK WELLS</p>
              <p className="text-sm font-serif font-semibold text-[#3C332D] mt-0.5">882-9481-0492</p>
              <p className="text-[11px] text-[#A6937C] mt-0.5">Holder: Elias Harrison</p>
            </div>
            <button
              id="btn-copy-citibank"
              onClick={() => handleCopy('88294810492', 'citi')}
              className={`p-2 rounded-lg transition-colors ${
                copiedAccount === 'citi' ? 'bg-green-100 text-green-700' : 'bg-[#FAF6F0] hover:bg-[#EADFC9]/40 text-[#8B7355]'
              }`}
            >
              {copiedAccount === 'citi' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Account 2 */}
          <div className="p-3.5 rounded-xl bg-white border border-[#EADFC9]/40 flex items-center justify-between text-left">
            <div>
              <p className="text-[10px] text-[#8B7355] uppercase tracking-wider font-bold">CHASE BLUE</p>
              <p className="text-sm font-serif font-semibold text-[#3C332D] mt-0.5">559-105-3921</p>
              <p className="text-[11px] text-[#A6937C] mt-0.5">Holder: Julia Sterling</p>
            </div>
            <button
              id="btn-copy-chase"
              onClick={() => handleCopy('5591053921', 'chase')}
              className={`p-2 rounded-lg transition-colors ${
                copiedAccount === 'chase' ? 'bg-green-100 text-green-700' : 'bg-[#FAF6F0] hover:bg-[#EADFC9]/40 text-[#8B7355]'
              }`}
            >
              {copiedAccount === 'chase' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center mt-4.5 text-[10px] text-green-700/80 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted Secure Transfer</span>
        </div>
      </div>
    </motion.div>
  );
}
