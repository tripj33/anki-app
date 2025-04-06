import { create } from 'zustand';

export const useApiKeyStore = create((set) => ({
  keys: {
    openai: '',
    claude: '',
    gemini: '',
    deepseek: '',
  },

  setApiKey: (provider, key) =>
    set((state) => ({
      keys: {
        ...state.keys,
        [provider]: key,
      },
    })),

  getApiKey: (provider) => {
    const state = useApiKeyStore.getState();
    return state.keys[provider] || '';
  },
}));
