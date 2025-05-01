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
      {/* Connect Wallet Modal */}
      {isConnectModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="dialog"
          aria-labelledby="connect-wallet-title"
        >
          <motion.div
            className="bg-[#1E1E1E] p-5 rounded-xl w-full max-w-[90%] sm:max-w-sm"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="connect-wallet-title" className="text-base font-semibold text-white mb-3">
              Connect Wallet
            </h2>
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <motion.button
                  key={wallet.adapter.name}
                  className="button-secondary w-full text-sm py-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    select(wallet.adapter.name);
                    setConnectModalOpen(false);
                  }}
                  aria-label={`Connect with ${wallet.adapter.name} wallet`}
                >
                  {wallet.adapter.name}
                </motion.button>
              ))}
            </div>
            <motion.button
              className="mt-3 text-text-secondary hover:text-white text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setConnectModalOpen(false)}
              aria-label="Cancel wallet connection"
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Submission Confirmation Modal */}
      {isSubmissionModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="dialog"
          aria-labelledby="submission-title"
        >
          <motion.div
            className="bg-[#1E1E1E] p-5 rounded-xl w-full max-w-[90%] sm:max-w-sm"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="submission-title" className="text-base font-semibold text-white mb-3">
              Slip Submitted
            </h2>
            <p className="text-text-secondary text-sm mb-3">Your picks are locked in!</p>
            {slip.picks.map((pick) => (
              <p key={pick.propId} className="text-sm text-white mb-1">
                {pick.token}: {pick.choice}
              </p>
            ))}
            <p className="text-sm text-primary-green mt-2">Wager: {slip.wager} SOL</p>
            <motion.button
              className="button-primary mt-3 w-full text-sm py-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSubmissionModalOpen(false)}
              aria-label="Close submission confirmation"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Error Modal */}
      {isErrorModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="dialog"
          aria-labelledby="error-title"
        >
          <motion.div
            className="bg-[#1E1E1E] p-5 rounded-xl w-full max-w-[90%] sm:max-w-sm"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="error-title" className="text-base font-semibold text-white mb-3">
              Error
            </h2>
            <p className="text-text-secondary text-sm mb-3">{errorMessage}</p>
            <motion.button
              className="button-primary mt-3 w-full text-sm py-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setErrorModalOpen(false)}
              aria-label="Close error message"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
