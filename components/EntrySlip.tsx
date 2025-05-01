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

  const multipliers: { [key: number]: number } = {
    2: 2,
    3: 5,
    4: 10,
    5: 20,
  };

  useEffect(() => {
    const wagerNum = parseFloat(inputWager);
    const isValidWager =
      !isNaN(wagerNum) &&
      wagerNum >= 0.1 &&
      wagerNum <= 10 &&
      (balance === null || wagerNum <= balance);
    const isValidPicks = slip.picks.length >= 2 && slip.picks.length <= 5;
    setIsValid(isValidWager && isValidPicks);
    if (isValidWager) {
      setWager(wagerNum);
    }
  }, [slip.picks, inputWager, balance, setWager]);

  const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputWager(value);
    }
  };

  const handleSubmit = () => {
    if (!isValid) {
      setErrorMessage('Need 2–5 picks and a wager between 0.1–10 SOL.');
      setErrorModalOpen(true);
      return;
    }
    setSubmissionModalOpen(true);
    setTimeout(() => {
      resetSlip();
      setInputWager('');
    }, 1000);
  };

  const potentialPayout =
    slip.picks.length >= 2 && isValid
      ? (slip.wager * multipliers[slip.picks.length]).toFixed(2)
      : '0.00';

  return (
    <div className="p-4 bg-[#1E1E1E] h-full">
      <h2 className="text-base font-semibold text-white mb-3">Your Slip</h2>
      {slip.picks.length === 0 ? (
        <p className="text-text-secondary text-sm">Add picks to start.</p>
      ) : (
        <div className="space-y-2 mb-4">
          {slip.picks.map((pick) => (
            <motion.div
              key={pick.propId}
              className="bg-[#2A2A2A] p-2 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <p className="text-xs font-semibold text-white">{pick.token}</p>
                <p className="text-xs text-text-secondary">{pick.description}</p>
                <p className="text-xs text-secondary-purple">{pick.choice}</p>
              </div>
              <motion.button
                className="text-text-secondary hover:text-red-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removePick(pick.propId)}
                aria-label={`Remove ${pick.token} prediction from slip`}
              >
                ✕
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="wager" className="text-xs text-text-secondary mb-1 block">
          Wager (SOL)
        </label>
        <input
          id="wager"
          type="text"
          value={inputWager}
          onChange={handleWagerChange}
          className="input-field text-sm"
          placeholder="0.1–10 SOL"
          aria-label="Wager amount in SOL (0.1 to 10)"
        />
      </div>
      {slip.picks.length >= 2 && (
        <div className="flex justify-between text-xs mb-4">
          <p className="text-text-secondary">
            {slip.picks.length} Picks · {multipliers[slip.picks.length]}x
          </p>
          <p className="text-primary-green">Payout: {potentialPayout} SOL</p>
        </div>
      )}
      <motion.button
        className="button-primary w-full text-sm py-2"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        disabled={!isValid}
        aria-label="Submit entry slip"
      >
        Submit Slip
      </motion.button>
      <p className="text-text-secondary text-xs mt-3">
        Balance: {balance !== null ? balance.toFixed(2) : 'Loading...'} SOL
      </p>
    </div>
  );
}
