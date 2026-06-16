/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveTab = 'home' | 'story' | 'details' | 'rsvp';

export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface RSVPFormInput {
  name: string;
  email: string;
  isAttending: boolean;
  guestsCount: number;
  mealPreference: 'beef' | 'salmon' | 'vegetarian' | 'vegan';
  dietaryNotes: string;
  message: string;
}

export interface RSVPRecord extends RSVPFormInput {
  id: string;
  submittedAt: string;
}

export interface GuestWish {
  id: string;
  name: string;
  message: string;
  submittedAt: string;
  likes: number;
}
