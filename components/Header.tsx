'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import Link from 'next/link';
import { useAppStore } from '../lib/store';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Header() {
  const { publicKey, connected } = useWallet();
  const { setConnectModalOpen, setBalance, balance } = useAppStore();

  useEffect(() => {
    if (connected && publicKey) {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      connection
        .getBalance(publicKey)
        .then((lamports) => {
          const solBalance = lamports / 1e9;
          setBalance(solBalance);
        })
        .catch((err) => {
          console.error('Failed to fetch balance:', err);
          setBalance(0);
        });
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, setBalance]);

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : '';

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-[#1A1A1A] flex items-center justify-between px-4 z-20">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary-green">MemePicks</h1>
      </div>
      <nav className="hidden md:flex space-x-4">
        {['Home', 'My Picks', 'Leaderboard', 'Deposit'].map((link) => (
          <Link
            key={link}
            href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
            className="text-text-secondary text-sm hover:text-white transition-colors"
          >
            {link}
          </Link>
        ))}
      </nav>
      <div>
        {connected ? (
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-text-secondary">{shortAddress}</span>
            <span className="text-white">
              {balance !== null ? `${balance.toFixed(2)} SOL` : 'Loading...'}
            </span>
          </div>
        ) : (
          <motion.button
            className="button-primary text-sm px-4 py-1.5"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setConnectModalOpen(true)}
            aria-label="Connect cryptocurrency wallet"
          >
            Connect
          </motion.button>
        )}
      </div>
    </header>
  );
}
