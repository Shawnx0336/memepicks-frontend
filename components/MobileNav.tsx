'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <motion.button
        className="fixed top-4 left-4 text-white z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? '✕' : '☰'}
      </motion.button>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-64 h-full bg-[#1E1E1E] p-4 z-10"
          initial={{ x: -256 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4 mt-12">
            {['Home', 'My Picks', 'Leaderboard', 'Deposit'].map((link) => (
              <Link
                key={link}
                href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                className="text-text-secondary text-sm hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
