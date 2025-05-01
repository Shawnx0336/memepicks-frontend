'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '../lib/store';
import { motion } from 'framer-motion';

export default function EntrySlip() {
  const {
    slip,
    balance,
    removePick,
    setWager,
    resetSlip,
    setSubmissionModalOpen,
    setErrorModalOpen,
    setErrorMessage,
  } = useAppStore();
  const [inputWager, setInputWager] = useState<string>('');
  const [isValid, setIsValid] = useState(false);

  const multipliers = { 2: 2, 3: 5, 4: 10, 5: 20 };

  useEffect(() => {
    const wagerNum = parseFloat(inputWager);
    const isWagerValid =
      !isNaN(wagerNum) &&
      wagerNum >= 0.1 &&
      wagerNum <= 10 &&
      (balance === null || wagerNum <= balance);
    const hasValidPicks = slip.picks.length >= 2 && slip.picks.length <= 5;
    setIsValid(isWagerValid && hasValidPicks);
    if (isWagerValid) setWager(wagerNum);
  }, [inputWager, slip.picks, balance, setWager]);

  const handleSubmit = () => {
    if (!isValid) {
      setErrorMessage('Invalid slip or wager.');
      setErrorModalOpen(true);
      return;
    }
    setSubmissionModalOpen(true);
    setTimeout(() => {
      resetSlip();
      setInputWager('');
    }, 1000);
  };

  return (
    <motion.div className="fixed right-0 top-20 w-80 bg-[#2A2A2A] p-4 h-[calc(100vh-80px)]">
      <h2 className="text-2xl text-white mb-4">Your Slip</h2>
      {slip.picks.length === 0 ? (
        <p className="text-[#CCCCCC]">No picks yet.</p>
      ) : (
        <div className="space-y-2 mb-4">
          {slip.picks.map((p) => (
            <div key={p.propId} className="bg-[#333333] p-2 rounded flex justify-between">
              <div>
                <p className="text-sm neon-green">{p.token}</p>
                <p className="text-xs text-white">{p.description}</p>
                <p className="text-xs neon-purple">{p.choice}</p>
              </div>
              <button
                className="text-red-500"
                onClick={() => removePick(p.propId)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        type="text"
        value={inputWager}
        onChange={(e) => /^\d*\.?\d*$/.test(e.target.value) && setInputWager(e.target.value)}
        placeholder="Wager (SOL)"
        className="w-full bg-[#1A1A1A] border-2 border-[#39FF14] text-white p-2 rounded mb-4"
      />
      {slip.picks.length >= 2 && (
        <p className="text-neon-purple mb-4">
          {slip.picks.length} Picks = {multipliers[slip.picks.length]}x
        </p>
      )}
      <motion.button
        className="glow-button w-full bg-[#39FF14] text-black py-3 rounded-lg disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!isValid}
        whileHover={{ scale: 1.05 }}
      >
        Submit Entry
      </motion.button>
      <p className="text-[#CCCCCC] mt-4">
        Balance: {balance !== null ? balance.toFixed(2) : 'Loading...'} SOL
      </p>
    </motion.div>
  );
}
