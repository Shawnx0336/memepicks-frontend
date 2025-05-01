'use client';

import Header from '../components/Header';
import PropCard from '../components/PropCard';
import EntrySlip from '../components/EntrySlip';
import MobileEntrySlipTray from '../components/MobileEntrySlipTray';
import Modals from '../components/Modals';
import MobileNav from '../components/MobileNav';
import mockData from '../lib/mockData.json';
import { Prop } from '../lib/types';

export default function Home() {
  const props: Prop[] = mockData;

  return (
    <div className="min-h-screen">
      <Header />
      <MobileNav />
      <main className="pt-14 pb-20 md:pb-0 md:flex md:gap-4 md:px-4">
        {/* Left Spacer */}
        <div className="md:w-1/12"></div>

        {/* Center: Prop Feed */}
        <section
          className="w-full md:w-7/12 px-4 md:px-0"
          role="main"
          aria-label="Meme coin predictions"
        >
          <h1 className="text-xl font-semibold text-white text-center mb-4 md:text-left">
            Meme Coin Slate
          </h1>
          <div className="max-w-xl mx-auto">
            {props.map((prop) => (
              <PropCard key={prop.id} prop={prop} />
            ))}
          </div>
        </section>

        {/* Right: Entry Slip (Desktop) */}
        <aside className="hidden md:block md:w-4/12">
          <EntrySlip />
        </aside>
      </main>
      <MobileEntrySlipTray />
      <Modals />
    </div>
  );
}
