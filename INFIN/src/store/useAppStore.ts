import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTab: 'dashboard' | 'matrix' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'matrix' | 'profile') => void;
  isQuestionnaireOpen: boolean;
  setQuestionnaireOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', next === 'dark');
          }
          return { theme: next };
        }),
      activeTab: 'dashboard',
      setActiveTab: (activeTab) => set({ activeTab }),
      isQuestionnaireOpen: false,
      setQuestionnaireOpen: (isQuestionnaireOpen) => set({ isQuestionnaireOpen }),
    }),
    {
      name: 'skillorbit-ui-preferences',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
