import React from 'react';
import { CoinTable } from '@/components/CoinTable';
import Watchlist from '@/components/WatchList';

const Page = () => {
  return (
    <div className="flex mb-5 md:flex-row flex-col p-6 justify-between max-w-7xl mx-auto lg:gap-6 ">
      <CoinTable page="trending" />
      <div className="md:mt-16 mt-4">
        <Watchlist />
      </div>
    </div>
  );
};

export default Page;
