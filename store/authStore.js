import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,
      userLanguages:[],

      setUser: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: !!user,
        }),

      setUserLanguages:(userLanguages) => set({userLanguages}),

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage), 
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        userLanguages: state.userLanguages,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);