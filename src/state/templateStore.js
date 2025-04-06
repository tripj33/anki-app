import { create } from 'zustand';

export const useTemplateStore = create((set) => ({
  templates: {
    default: {
      html: '<div>{{question}}</div>',
      css: 'div { font-size: 20px; }',
      js: '',
    },
  },

  setTemplate: (name, template) =>
    set((state) => ({
      templates: {
        ...state.templates,
        [name]: template,
      },
    })),

  getTemplate: (name) => {
    const state = useTemplateStore.getState();
    return state.templates[name] || state.templates.default;
  },
}));
