'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useEffect } from 'react';
import { Coin, useCoinStore } from '@/lib/store';

const DnDWrapper = ({ children }: { children: React.ReactNode }) => {
  const { setCoins } = useCoinStore();

  useEffect(() => {
    const fetchCoins = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.API_KEY ?? '', // replace with your actual API key if needed
        },
      };

      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/search/trending',
          options
        );
        const data = await response.json();
        const transformedCoins = data.coins.map(
          (item: { item: Coin }) => item.item
        );

        setCoins(transformedCoins); // Set the transformed coins in the store
      } catch (err) {
        console.error('Error fetching coin data:', err);
      }
    };

    fetchCoins(); // Fetch data immediately on component mount

    const intervalId = setInterval(fetchCoins, 60000); // Fetch data every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [setCoins]);

  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DnDWrapper;
