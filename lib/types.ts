export interface Prop {
  id: string;
  token: string;
  description: string;
  options: [string, string];
  expiresAt: string; // ISO string, e.g., "2025-05-01T18:00:00Z"
}

export interface SlipPick {
  propId: string;
  token: string;
  description: string;
  choice: string;
}

export interface Slip {
  picks: SlipPick[];
  wager: number;
}

export interface AppState {
  slip: Slip;
  balance: number | null;
  addPick: (pick: SlipPick) => void;
  removePick: (propId: string) => void;
  setWager: (wager: number) => void;
  resetSlip: () => void;
  setBalance: (balance: number) => void;
  isConnectModalOpen: boolean;
  setConnectModalOpen: (open: boolean) => void;
  isSubmissionModalOpen: boolean;
  setSubmissionModalOpen: (open: boolean) => void;
  isErrorModalOpen: boolean;
  setErrorModalOpen: (open: boolean) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}
