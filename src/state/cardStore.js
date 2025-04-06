import { create } from 'zustand';
import { generateQA } from '../api/llmApi';
import { useCacheStore } from './cacheStore';

export const useCardStore = create((set) => ({
  currentCard: null,
  loading: false,
  error: null,

  fetchNextCard: async (concept) => {
    set({ loading: true, error: null });
    try {
      const cached = useCacheStore.getState().getFromCache(concept);
      if (cached.length > 0) {
        const qa = cached[Math.floor(Math.random() * cached.length)];
        set({ currentCard: qa, loading: false });
        return;
      }

      const qa = await generateQA(concept);
      useCacheStore.getState().addToCache(concept, qa);
      set({ currentCard: qa, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  rateCard: async (rating) => {
    // TODO: Save review result, update spaced repetition schedule
    console.log('Rated card:', rating);
    set({ currentCard: null });
  },
}));
