/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, BookOpen, Calendar, Mail } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export default function NavBar({ activeTab, onSelectTab }: NavBarProps) {
  const tabs = [
    { id: 'home' as ActiveTab, icon: Home, label: 'HOME' },
    { id: 'story' as ActiveTab, icon: BookOpen, label: 'STORY' },
    { id: 'details' as ActiveTab, icon: Calendar, label: 'DETAILS' },
    { id: 'rsvp' as ActiveTab, icon: Mail, label: 'RSVP' }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#FCFAF6] border-t border-[#EADFC9]/70 shadow-[0_-4px_24px_rgba(110,95,78,0.06)] pb-safe">
      <div className="flex items-center justify-around h-18 max-w-md mx-auto px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              id={`nav-btn-${tab.id}`}
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center w-20 h-full transition-all relative focus:outline-none"
              aria-label={tab.label}
            >
              {/* Active Dot Accent */}
              {isActive && (
                <span className="absolute top-1.5 w-1 h-1 rounded-full bg-[#8B7355]" />
              )}

              {/* Navigation Icon */}
              <Icon 
                className={`w-[22px] h-[22px] stroke-[1.5] transition-transform duration-300 ${
                  isActive 
                    ? 'text-[#8B7355] scale-110 drop-shadow-[0_2px_4px_rgba(139,115,85,0.15)]' 
                    : 'text-[#A6937C] hover:text-[#8B7355]'
                }`} 
              />

              {/* Navigation Label */}
              <span 
                className={`text-[9.5px] font-semibold tracking-widest mt-1.5 transition-all font-sans ${
                  isActive 
                    ? 'text-[#8B7355] font-bold' 
                    : 'text-[#A6937C]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
