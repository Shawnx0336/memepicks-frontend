'use client';

import { useState } from 'react';
import EntrySlip from './EntrySlip';
import { useAppStore } from '../lib/store';
import { motion } from 'framer-motion';

export default function MobileEntrySlipTray() {
  const [isOpen, setIsOpen] = useState(false);
  const pickCount = useAppStore((state) => state.slip.picks.length);

  return (
    <>
      <motion.button
        className="md:hidden fixed bottom-4 right-4 button-primary flex items-center space-x-2 text-sm px-4 py-2 shadow-lg rounded-full"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        aria-label={`Open entry slip with ${pickCount} picks`}
      >
        <span>Slip</span>
        {pickCount > 0 && (
          <span className="bg-secondary-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {pickCount}
          </span>
        )}
      </motion.button>
      {isOpen && (
        <motion.div
          className="md:hidden fixed bottom-0 left-0 w-full bg-[#1E1E1E] rounded-t-xl max-h-[80vh] overflow-y-auto"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-labelledby="mobile-slip-title"
        >
          <div className="flex justify-between items-center p-4 border-b border-[#4A4A4A]">
            <h2 id="mobile-slip-title" className="text-base font-semibold text-white">
              Your Slip
            </h2>
            <motion.button
              className="text-text-secondary hover:text-red-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              aria-label="Close entry slip"
            >
              ✕
            </motion.button>
          </div>
          <EntrySlip />
        </motion.div>
      )}
    </>
  );
}
