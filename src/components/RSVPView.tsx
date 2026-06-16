/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Users, Utensils, MessageSquare, Send, Heart, Flame, Sparkles } from 'lucide-react';
import { RSVPFormInput, RSVPRecord, GuestWish } from '../types';

export default function RSVPView() {
  const [form, setForm] = useState<RSVPFormInput>({
    name: '',
    email: '',
    isAttending: true,
    guestsCount: 1,
    mealPreference: 'beef',
    dietaryNotes: '',
    message: ''
  });

  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial guestbook mockups
  const defaultWishes: GuestWish[] = [
    {
      id: 'wish-1',
      name: 'Alexander & Sophia',
      message: 'Happy wedding Elias and Julia! Still remember the day Elias told us about the coffee mishap. So happy to witness this absolute beautiful union! See you there!',
      submittedAt: '2026-06-15T14:22:00Z',
      likes: 12
    },
    {
      id: 'wish-2',
      name: 'Dr. Evelyn Carter',
      message: 'A perfect match! Wishing you both a lifetime of shared laughter, quiet morning coffee cups, and absolute infinite happiness. Sending all my love from afar.',
      submittedAt: '2026-06-16T08:05:00Z',
      likes: 8
    },
    {
      id: 'wish-3',
      name: 'Uncle Benjamin',
      message: 'So proud of you both, Elias & Julia. Welcome to the family officially. Always put faith and communication first. Can’t wait for the grand dance inside San Francisco!',
      submittedAt: '2026-06-16T10:11:00Z',
      likes: 15
    }
  ];

  // Load submissions and wishes from LocalStorage on mount
  useEffect(() => {
    const savedWishes = localStorage.getItem('wedding_guestbook_wishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    } else {
      setWishes(defaultWishes);
      localStorage.setItem('wedding_guestbook_wishes', JSON.stringify(defaultWishes));
    }

    const alreadySubmitted = localStorage.getItem('wedding_rsvp_submitted');
    if (alreadySubmitted) {
      setIsSubmitted(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrorMsg('');
    
    if (name === 'isAttending') {
      setForm(prev => ({ ...prev, isAttending: value === 'true' }));
    } else if (name === 'guestsCount') {
      setForm(prev => ({ ...prev, guestsCount: parseInt(value, 10) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErrorMsg('Please input your name');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    // Save RSVP record
    const rsvpRecord: RSVPRecord = {
      ...form,
      id: 'rsvp-' + Date.now().toString(),
      submittedAt: new Date().toISOString()
    };

    const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvp_records') || '[]');
    existingRsvps.push(rsvpRecord);
    localStorage.setItem('wedding_rsvp_records', JSON.stringify(existingRsvps));
    localStorage.setItem('wedding_rsvp_submitted', 'true');

    // Add wishes to guestbook if positive msg provided
    if (form.message.trim()) {
      const newWish: GuestWish = {
        id: 'wish-' + Date.now().toString(),
        name: form.name.trim(),
        message: form.message.trim(),
        submittedAt: new Date().toISOString(),
        likes: 0
      };
      
      const updatedWishes = [newWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem('wedding_guestbook_wishes', JSON.stringify(updatedWishes));
    }

    setIsSubmitted(true);
  };

  // Like a wish card
  const handleLikeWish = (wishId: string) => {
    const updated = wishes.map(wish => {
      if (wish.id === wishId) {
        return { ...wish, likes: wish.likes + 1 };
      }
      return wish;
    });
    setWishes(updated);
    localStorage.setItem('wedding_guestbook_wishes', JSON.stringify(updated));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-start min-h-screen px-4 pb-28 pt-4 w-full max-w-md mx-auto"
    >
      {/* Title Header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-normal text-[#3C332D]">RSVP Invitation</h2>
        <p className="text-xs text-[#8B7355] tracking-[0.25em] uppercase mt-2 font-medium">Be Our Cherished Guest</p>
        <div className="flex items-center justify-center gap-3 w-32 mt-4 mx-auto">
          <div className="h-[1px] bg-[#8B7355]/30 flex-1"></div>
          <Sparkles className="w-3.5 h-3.5 text-[#8B7355] fill-current opacity-70" />
          <div className="h-[1px] bg-[#8B7355]/30 flex-1"></div>
        </div>
      </div>

      {/* Main Submission Form card */}
      <div className="w-full bg-white rounded-2xl border border-[#EADFC9]/70 p-6 shadow-sm mb-10 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="rsvp-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 text-left"
            >
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="input-rsvp-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Sophia Harrison"
                    className="w-full text-xs px-4 py-3 rounded-lg bg-[#FAF6F0] border border-[#EADFC9]/80 focus:border-[#8B7355] focus:outline-none transition-all placeholder:text-[#A6937C]/60 text-[#3C332D]"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="input-rsvp-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="sophia@example.com"
                    className="w-full text-xs px-4 py-3 rounded-lg bg-[#FAF6F0] border border-[#EADFC9]/80 focus:border-[#8B7355] focus:outline-none transition-all placeholder:text-[#A6937C]/60 text-[#3C332D]"
                  />
                </div>
              </div>

              {/* Attendance Toggle Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-1.5">
                  Will you join our celebration?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="btn-rsvp-going"
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, isAttending: true }))}
                    className={`py-3 px-4 rounded-lg text-xs font-semibold transition-all border ${
                      form.isAttending
                        ? 'bg-[#8B7355] border-[#8B7355] text-white shadow-xs'
                        : 'bg-[#FAF6F0] border-[#EADFC9]/80 text-[#5C4D3C] hover:bg-[#EADFC9]/20'
                    }`}
                  >
                    Joyfully Attend
                  </button>
                  <button
                    id="btn-rsvp-regret"
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, isAttending: false }))}
                    className={`py-3 px-4 rounded-lg text-xs font-semibold transition-all border ${
                      !form.isAttending
                        ? 'bg-[#8B7355] border-[#8B7355] text-white shadow-xs'
                        : 'bg-[#FAF6F0] border-[#EADFC9]/80 text-[#5C4D3C] hover:bg-[#EADFC9]/20'
                    }`}
                  >
                    Decline Regretfully
                  </button>
                </div>
              </div>

              {/* Conditional attending details */}
              <AnimatePresence>
                {form.isAttending && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 overflow-hidden pt-1"
                  >
                    {/* Number of Companion Guests */}
                    <div>
                      <label className="block text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>Number of Attending Companions</span>
                      </label>
                      <select
                        id="select-rsvp-guests"
                        name="guestsCount"
                        value={form.guestsCount}
                        onChange={handleChange}
                        className="w-full text-xs px-4 py-3 rounded-lg bg-[#FAF6F0] border border-[#EADFC9]/80 focus:border-[#8B7355] focus:outline-none transition-all text-[#3C332D]"
                      >
                        <option value={1}>1 Person (Myself only)</option>
                        <option value={2}>2 People (Myself &amp; Partner)</option>
                        <option value={3}>3 People (Family set)</option>
                        <option value={4}>4 People (Family set)</option>
                      </select>
                    </div>

                    {/* Meal Preference Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Preferred Entrée Choice</span>
                      </label>
                      <select
                        id="select-rsvp-meal"
                        name="mealPreference"
                        value={form.mealPreference}
                        onChange={handleChange}
                        className="w-full text-xs px-4 py-3 rounded-lg bg-[#FAF6F0] border border-[#EADFC9]/80 focus:border-[#8B7355] focus:outline-none transition-all text-[#3C332D]"
                      >
                        <option value="beef">Roasted Angus Filet Mignon</option>
                        <option value="salmon">Pan-Seared Pacific Saffron Salmon</option>
                        <option value="vegetarian">Truffle-Infused Wild Mushroom Risotto (V)</option>
                        <option value="vegan">Roasted Butternut Squash &amp; Quinoa Bowl (VG)</option>
                      </select>
                    </div>

                    {/* Dietary details */}
                    <div>
                      <label className="block text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-1.5">
                        Dietary Notes &amp; Allergies (Optional)
                      </label>
                      <input
                        id="input-rsvp-dietary"
                        type="text"
                        name="dietaryNotes"
                        value={form.dietaryNotes}
                        onChange={handleChange}
                        placeholder="e.g. Gluten-free, Peanut allergy"
                        className="w-full text-xs px-4 py-3 rounded-lg bg-[#FAF6F0] border border-[#EADFC9]/80 focus:border-[#8B7355] focus:outline-none transition-all placeholder:text-[#A6937C]/60 text-[#3C332D]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Heartwarming Congratulations Message Area */}
              <div>
                <label className="block text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Blessings to Elias &amp; Julia</span>
                </label>
                <textarea
                  id="textarea-rsvp-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Leave a heartwarming greeting for the beautiful couple..."
                  className="w-full text-xs px-4 py-3 rounded-lg bg-[#FAF6F0] border border-[#EADFC9]/80 focus:border-[#8B7355] focus:outline-none transition-all placeholder:text-[#A6937C]/60 text-[#3C332D]"
                />
              </div>

              {/* Error messages if any */}
              {errorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg font-medium border border-red-200">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Submit CTA button */}
              <button
                id="btn-rsvp-submit"
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[#8B7355] hover:bg-[#735E45] text-white font-semibold text-xs uppercase tracking-widest shadow-xs transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit RSVP Invitation</span>
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="rsvp-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="text-center py-6 block"
            >
              <div className="w-16 h-16 bg-green-100/80 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <Check className="w-8 h-8 text-green-700 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3C332D]">Thank You So Much!</h3>
              <p className="text-xs text-[#8B7355] uppercase tracking-widest mt-1 font-semibold">RSVP Received Successfully</p>
              
              <div className="my-6 p-4 rounded-xl border border-[#EADFC9]/70 bg-[#FAF6F0]/60 text-xs text-[#5C4D3C] leading-relaxed mx-auto max-w-sm">
                We have logged your invitation attendance details. A formal digital barcode token has been set to your email. We look forward to creating stellar memories with you in San Francisco!
              </div>

              <button
                id="btn-rsvp-redo"
                onClick={() => {
                  setIsSubmitted(false);
                  localStorage.removeItem('wedding_rsvp_submitted');
                }}
                className="text-xs text-[#8B7355] hover:text-[#5C4D3C] underline font-semibold tracking-wider uppercase"
              >
                Change or Update RSVP Information
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guestbook Board (Buku Tamu / Wishes) */}
      <div className="w-full text-left">
        <h3 className="font-serif text-xl font-normal text-[#3C332D] mb-1.5 flex items-center gap-2">
          <span>Virtual Guestbook</span>
          <span className="text-[10px] bg-[#8B7355]/10 px-2 py-0.5 rounded-full font-sans font-bold text-[#8B7355] uppercase tracking-wider">
            {wishes.length} Wishes
          </span>
        </h3>
        <p className="text-xs text-[#8B7355] italic mb-6">Wishes and advice from lovely friends</p>

        {/* Wishes List Container */}
        <div className="space-y-4.5 max-h-[460px] overflow-y-auto pr-1 no-scrollbar pb-6">
          {wishes.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#A6937C] italic bg-white/40 rounded-xl border border-dashed border-[#EADFC9]/60">
              Be the first to congratulate the wedding couple!
            </div>
          ) : (
            wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-white border border-[#EADFC9]/50 shadow-xs hover:border-[#8B7355]/40 transition-colors relative"
              >
                {/* Header Name & Timestamp */}
                <div className="flex items-center justify-between pb-2 border-b border-[#EADFC9]/30 mb-2.5">
                  <p className="font-serif font-bold text-xs.5 text-[#3C332D]">{wish.name}</p>
                  <p className="text-[10px] text-[#A6937C] font-mono">
                    {new Date(wish.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })}
                  </p>
                </div>

                {/* Wish Message */}
                <p className="text-xs text-[#5C4D3C] leading-relaxed font-sans pr-4 italic">
                  “{wish.message}”
                </p>

                {/* Like Button on Wishes */}
                <div className="flex justify-end mt-3">
                  <button
                    id={`btn-like-wish-${wish.id}`}
                    onClick={() => handleLikeWish(wish.id)}
                    className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#8B7355] hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-red-100 hover:fill-red-500" />
                    <span>{wish.likes} Likes</span>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
