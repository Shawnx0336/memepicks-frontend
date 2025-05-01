'use client';

import { useState, useEffect } from 'react';
import { Prop, SlipPick } from '../lib/types';
import { useAppStore } from '../lib/store';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PropCardProps {
  prop: Prop;
}

export default function PropCard({ prop }: PropCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const { addPick, slip: { picks } } = useAppStore();

  const isPropInSlip = picks.some((pick) => pick.propId === prop.id);
  const isTrending = Math.random() > 0.7; // Mock trending status (replace with real logic)

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expiry = new Date(prop.expiresAt);
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [prop.expiresAt]);

  const handleAddToSlip = () => {
    if (selectedOption && !isPropInSlip) {
      const pick: SlipPick = {
        propId: prop.id,
        token: prop.token,
        description: prop.description.split(' ').slice(1).join(' '),
        choice: selectedOption,
      };
      addPick(pick);
      setSelectedOption(null);
    }
  };

  return (
    <motion.div
      className="card mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="region"
      aria-label={`Prediction card for ${prop.token}`}
    >
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-[#4A4A4A] rounded-full flex items-center justify-center">
          <Image
            src={`/tokens/${prop.token.toLowerCase().replace('$', '')}.png`}
            alt={`${prop.token} logo`}
            width={24}
            height={24}
            className="object-contain"
            onError={(e) => (e.currentTarget.src = '/tokens/placeholder.png')}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-white">{prop.token}</h3>
            {isTrending && <span className="heat-tag">🔥</span>}
          </div>
          <p className="text-text-secondary text-sm mt-1">{prop.description}</p>
          <p className="text-text-secondary text-xs mt-1">Ends in {timeLeft}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 gap-2">
        <div className="flex space-x-2">
          {prop.options.map((option) => (
            <motion.button
              key={option}
              className={`button-secondary text-xs px-3 py-1.5 min-w-[60px] ${
                selectedOption === option ? 'bg-secondary-purple text-white' : ''
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedOption(option)}
              disabled={timeLeft === 'Expired'}
              aria-label={`Select ${option} for ${prop.token} prediction`}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="button-primary text-xs px-3 py-1.5 min-w-[60px]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToSlip}
          disabled={!selectedOption || isPropInSlip || timeLeft === 'Expired'}
          aria-label={`Add ${prop.token} prediction to entry slip`}
        >
          {isPropInSlip ? 'In Slip' : 'Add'}
        </motion.button>
      </div>
    </motion.div>
  );
}
