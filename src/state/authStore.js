import { create } from 'zustand';
import { supabase } from '../api/supabase';

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  signUp: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ user: data.user, loading: false });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ user: data.user, loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },

  setUser: (user) => set({ user }),
}));
