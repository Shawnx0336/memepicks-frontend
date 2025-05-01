import { create } from 'zustand';
import { Slip, SlipPick, AppState } from './types';

export const useAppStore = create<AppState>((set) => ({
  slip: { picks: [], wager: 0 },
  balance: null,

  addPick: (pick) =>
    set((state) => {
      // Prevent duplicate prop picks
      if (state.slip.picks.some((p) => p.propId === pick.propId)) return state;
      return {
        slip: {
          ...state.slip,
          picks: [...state.slip.picks, pick],
        },
      };
    }),

  removePick: (propId) =>
    set((state) => ({
      slip: {
        ...state.slip,
        picks: state.slip.picks.filter((p) => p.propId !== propId),
      },
    })),

  setWager: (wager) => set((state) => ({ slip: { ...state.slip, wager } })),

  resetSlip: () => set({ slip: { picks: [], wager: 0 } }),

  setBalance: (balance) => set({ balance }),

  isConnectModalOpen: false,
  setConnectModalOpen: (open) => set({ isConnectModalOpen: open }),

  isSubmissionModalOpen: false,
  setSubmissionModalOpen: (open) => set({ isSubmissionModalOpen: open }),

  isErrorModalOpen: false,
  setErrorModalOpen: (open) => set({ isErrorModalOpen: open }),

  errorMessage: '',
  setErrorMessage: (message) => set({ errorMessage: message }),
}));
