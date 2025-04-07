import { create } from 'zustand';
import { generateQA } from '../api/llmApi';
import { useCacheStore } from './cacheStore';
import { supabase } from '../api/supabase';
import { useReviewStore } from './reviewStore';

export const useCardStore = create((set) => ({
  currentCard: null,
  loading: false,
  error: null,
  conceptQueue: [],
  currentConceptIndex: 0,

  loadConcepts: async (deckId) => {
    set({ loading: true, error: null, conceptQueue: [], currentConceptIndex: 0 });
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('concept')
        .eq('deck_id', deckId);
      if (error) throw error;
      const concepts = data.map((c) => c.concept);
      set({ conceptQueue: concepts, currentConceptIndex: 0, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchNextCard: async () => {
    set((state) => ({ loading: true, error: null }));

    const { conceptQueue, currentConceptIndex } = useCardStore.getState();
    if (currentConceptIndex >= conceptQueue.length) {
      set({ currentCard: null, loading: false });
      return;
    }

    const concept = conceptQueue[currentConceptIndex];

    try {
      const cached = useCacheStore.getState().getFromCache(concept);
      let qa;
      if (cached.length > 0) {
        qa = cached[Math.floor(Math.random() * cached.length)];
      } else {
        qa = await generateQA(concept);
        useCacheStore.getState().addToCache(concept, qa);
      }
      set((state) => ({
        currentCard: qa,
        loading: false,
        currentConceptIndex: state.currentConceptIndex + 1,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  rateCard: async (rating) => {
    const { currentCard } = useCardStore.getState();
    if (!currentCard) return;

    try {
      // Save review result
      await useReviewStore.getState().saveReview(currentCard.id, rating);

      // TODO: Fetch previous interval from Supabase or local state
      const previousInterval = 1; // Placeholder

      // Calculate next interval
      const nextInterval = useReviewStore
        .getState()
        .calculateNextInterval(previousInterval, rating);

      console.log(
        `Rated card ${currentCard.id} as ${rating}, next interval: ${nextInterval} days`
      );

      // TODO: Update card scheduling info in Supabase

      set({ currentCard: null });
    } catch (error) {
      console.error('Error saving review:', error);
      set({ currentCard: null });
    }
  },
}));
