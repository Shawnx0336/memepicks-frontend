'use client';

import { useState, useEffect } from 'react';
import { Prop, SlipPick } from '../lib/types';
import { useAppStore } from '../lib/store';
import { motion } from 'framer-motion';

interface PropCardProps {
  prop: Prop;
}

export default function PropCard({ prop }: PropCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const addPick = useAppStore((state) => state.addPick);
  const slipPicks = useAppStore((state) => state.slip.picks);

  const isPropInSlip = slipPicks.some((p) => p.propId === prop.id);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiry = new Date(prop.expiresAt);
      const diff = expiry.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    }, 60000);
    return () => clearInterval(interval);
  }, [prop.expiresAt]);

  const handleAdd = () => {
    if (selectedOption && !isPropInSlip) {
      const pick: SlipPick = {
        propId: prop.id,
        token: prop.token,
        description: prop.description,
        choice: selectedOption,
      };
      addPick(pick);
    }
  };

  return (
    <motion.div className="bg-[#2A2A2A] rounded-lg p-4 flex justify-between items-center mb-4">
      <div>
        <h3 className="text-xl neon-green">{prop.token}</h3>
        <p className="text-white">{prop.description}</p>
        <p className="text-sm text-[#CCCCCC]">{timeLeft}</p>
      </div>
      <div className="flex items-center space-x-4">
        {prop.options.map((option) => (
          <motion.button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`px-4 py-2 rounded-lg border-2 ${
              selectedOption === option
                ? 'bg-[#C300FF] text-black'
                : 'border-[#C300FF] text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            disabled={timeLeft === 'Expired'}
          >
            {option}
          </motion.button>
        ))}
        <motion.button
          onClick={handleAdd}
          className="glow-button bg-[#39FF14] text-black px-4 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          disabled={!selectedOption || isPropInSlip || timeLeft === 'Expired'}
        >
          {isPropInSlip ? 'In Slip' : 'Add to Entry'}
        </motion.button>
      </div>
    </motion.div>
  );
}
