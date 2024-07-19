'use client';
import { Coin, useWatchlistStore } from '@/lib/store';
import React from 'react';
import { useDrop } from 'react-dnd';

const Watchlist: React.FC = () => {
  const { watchlist, addToWatchlist } = useWatchlistStore();

  const [, drop] = useDrop(() => ({
    accept: 'COIN',
    drop: (item: { coin: Coin }) => {
      // Add dropped coin to watchlist
      // addToWatchlist(item.coin);
    },
  }));

  return (
    <div ref={drop as unknown as React.RefObject<HTMLDivElement>}>
      <h2>Watchlist</h2>
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((coin) => (
            <tr key={coin.coin_id}>
              <td>
                <img src={coin.small} alt={coin.name} />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>{coin.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
