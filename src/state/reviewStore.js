import { create } from 'zustand';
import { supabase } from '../api/supabase';

export const useReviewStore = create((set) => ({
  reviews: [],
  loading: false,
  error: null,

  saveReview: async (cardId, rating) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('reviews').insert([
        {
          card_id: cardId,
          rating,
          reviewed_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  calculateNextInterval: (previousInterval, rating) => {
    // SM-2 simplified
    let newInterval;
    if (rating === 'again') {
      newInterval = 1;
    } else if (rating === 'hard') {
      newInterval = Math.max(1, previousInterval * 1.2);
    } else if (rating === 'good') {
      newInterval = previousInterval * 2;
    } else if (rating === 'easy') {
      newInterval = previousInterval * 2.5;
    } else {
      newInterval = previousInterval;
    }
    return Math.round(newInterval);
  },
}));
