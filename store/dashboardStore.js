import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useDashboardStore = create(
    persist(
      (set) => ({
        dashboardData: null,
        loading: false,
        isHydrated: false,
        error:null,

        setDashboardData: (dashboardData) => set({ dashboardData }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        clearDashboard: () => set({ dashboardData: null, error: null }),
        setHydrated:() => set({isHydrated: true})
    }),
    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        dashboardData: state.dashboardData,
    }),
    onRehydrateStorage:() =>(state) =>{
      state?.setHydrated();
    },

    }
  
));