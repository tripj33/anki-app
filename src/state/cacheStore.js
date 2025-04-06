import { create } from 'zustand';

export const useCacheStore = create((set, get) => ({
  cache: {},

  addToCache: (concept, qaPair) => {
    set((state) => {
      const existing = state.cache[concept] || [];
      return {
        cache: {
          ...state.cache,
          [concept]: [qaPair, ...existing].slice(0, 5), // limit cache size per concept
        },
      };
    });
  },

  getFromCache: (concept) => {
    const state = get();
    return state.cache[concept] || [];
  },
}));
