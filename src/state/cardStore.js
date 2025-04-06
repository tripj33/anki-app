import { create } from 'zustand';

export const useCardStore = create((set) => ({
  currentCard: null,
  loading: false,
  error: null,

  fetchNextCard: async (deckId) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with Supabase + LLM API call
      // Placeholder sample card
      const sampleCard = {
        id: 'sample-id',
        question: 'What is the capital of France?',
        answer: 'Paris',
      };
      set({ currentCard: sampleCard, loading: false });
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
