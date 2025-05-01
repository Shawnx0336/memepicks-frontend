'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useAppStore } from '../lib/store';
import { motion } from 'framer-motion';

export default function Modals() {
  const {
    isConnectModalOpen,
    setConnectModalOpen,
    isSubmissionModalOpen,
    setSubmissionModalOpen,
    isErrorModalOpen,
    setErrorModalOpen,
    errorMessage,
    slip,
  } = useAppStore();
  const { wallets, select } = useWallet();

  return (
    <>
      {isConnectModalOpen && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h2 className="text-2xl text-white mb-4">Connect Wallet</h2>
            {wallets.map((w) => (
              <button
                key={w.adapter.name}
                className="glow-button w-full bg-[#C300FF] text-white py-2 rounded mb-2"
                onClick={() => {
                  select(w.adapter.name);
                  setConnectModalOpen(false);
                }}
              >
                {w.adapter.name}
              </button>
            ))}
            <button
              onClick={() => setConnectModalOpen(false)}
              className="mt-4 text-sm text-[#CCCCCC]"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {isSubmissionModalOpen && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] p-6 rounded-lg text-white">
            <h2 className="text-2xl mb-4">Entry Submitted</h2>
            {slip.picks.map((p) => (
              <p key={p.propId}>
                {p.token}: {p.description} - {p.choice}
              </p>
            ))}
            <p className="mt-2">Wager: {slip.wager} SOL</p>
            <button
              onClick={() => setSubmissionModalOpen(false)}
              className="glow-button mt-4 bg-[#39FF14] text-black py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {isErrorModalOpen && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] p-6 rounded-lg text-white">
            <h2 className="text-2xl mb-4">Error</h2>
            <p>{errorMessage}</p>
            <button
              onClick={() => setErrorModalOpen(false)}
              className="glow-button mt-4 bg-[#39FF14] text-black py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
