import { create } from 'zustand';

export const useToastStore = create((set) => ({
  toast: { visible: false, message: '', type: 'success' },

  showToast: (message, type = 'success') => {
    set({ toast: { visible: true, message, type } });

    setTimeout(() => {
      set({ toast: { visible: false, message: '', type: 'success' } });
    }, 3000);
  },
}));