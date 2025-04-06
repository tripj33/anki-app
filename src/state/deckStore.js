import { create } from 'zustand';
import { supabase } from '../api/supabase';

export const useDeckStore = create((set, get) => ({
  decks: [],
  loading: false,
  error: null,

  fetchDecks: async () => {
    set({ loading: true, error: null });
    const { user } = get().authStore || {};
    if (!user) {
      set({ error: 'Not authenticated', loading: false });
      return;
    }
    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ decks: data, loading: false });
    }
  },

  createDeck: async (deck) => {
    set({ loading: true, error: null });
    const { user } = get().authStore || {};
    if (!user) {
      set({ error: 'Not authenticated', loading: false });
      return;
    }
    const { data, error } = await supabase
      .from('decks')
      .insert([{ ...deck, user_id: user.id }])
      .select();
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set((state) => ({ decks: [data[0], ...state.decks], loading: false }));
    }
  },

  deleteDeck: async (deckId) => {
    set({ loading: true, error: null });
    const { error } = await supabase.from('decks').delete().eq('id', deckId);
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set((state) => ({
        decks: state.decks.filter((d) => d.id !== deckId),
        loading: false,
      }));
    }
  },
}));
