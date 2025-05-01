'use client';

import Header from '../components/Header';
import PropCard from '../components/PropCard';
import EntrySlip from '../components/EntrySlip';
import Modals from '../components/Modals';
import mockData from '../lib/mockData.json';
import { Prop } from '../lib/types';

export default function Home() {
  const props: Prop[] = mockData;

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <Header />
      <main className="flex flex-col md:flex-row pt-20">
        {/* Left Navigation Spacer */}
        <div className="md:w-1/6"></div>

        {/* Center: Prop Feed */}
        <section className="md:w-4/6 w-full px-4" role="main" aria-label="Meme coin predictions">
          <h1 className="text-3xl text-white text-center mb-6">Today’s Meme Coin Slate</h1>
          <div className="max-w-3xl mx-auto">
            {props.map((prop) => (
              <PropCard key={prop.id} prop={prop} />
            ))}
          </div>
        </section>

        {/* Right: Entry Slip */}
        <aside className="md:w-1/6 hidden md:block">
          <EntrySlip />
        </aside>
      </main>
      <Modals />
    </div>
  );
}
