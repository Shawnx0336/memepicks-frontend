'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import Link from 'next/link';
import { useAppStore } from '../lib/store';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Header() {
  const { publicKey, connected } = useWallet();
  const setConnectModalOpen = useAppStore((state) => state.setConnectModalOpen);
  const setBalance = useAppStore((state) => state.setBalance);
  const balance = useAppStore((state) => state.balance);

  useEffect(() => {
    if (connected && publicKey) {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      connection.getBalance(publicKey)
        .then((lamports) => {
          const sol = lamports / 1e9;
          setBalance(sol);
        })
        .catch((err) => {
          console.error('Error fetching balance:', err);
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
    <header className="fixed top-0 left-0 w-full h-20 bg-gradient-to-b from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-between px-4 z-10">
      <h1 className="text-2xl neon-green">MemePicks</h1>
      <nav className="hidden md:flex space-x-6">
        {['Home', 'My Picks', 'Leaderboard', 'Deposit'].map((link) => (
          <Link
            key={link}
            href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
            className="text-white hover:neon-green transition"
          >
            {link}
          </Link>
        ))}
      </nav>
      <div>
        {connected ? (
          <span className="text-white">
            {shortAddress} | {balance !== null ? balance.toFixed(2) : '...'} SOL
          </span>
        ) : (
          <motion.button
            className="glow-button border-2 border-[#C300FF] text-white px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            onClick={() => setConnectModalOpen(true)}
            aria-label="Connect wallet"
          >
            Connect Wallet
          </motion.button>
        )}
      </div>
    </header>
  );
}
