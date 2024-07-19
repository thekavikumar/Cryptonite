import create from 'zustand';

export interface Coin {
  coin_id: string;
  name: string;
  symbol: string;
  price: number;
  small: string;
  market_cap: string;
  total_volume: string;
}

interface WatchlistStore {
  watchlist: Coin[];
  setWatchlist: (watchlist: Coin[]) => void;
  addToWatchlist: (coin: Coin) => void;
}

interface CoinStore {
  coins: Coin[];
  setCoins: (coins: Coin[]) => void;
}

const useCoinStore = create<CoinStore>((set) => ({
  coins: [
    {
      coin_id: '28470',
      name: 'Moon Tropica',
      symbol: 'CAH',
      price: 36.97171180169754,
      small:
        'https://assets.coingecko.com/coins/images/28470/small/MTLOGO.png?1696527464',
      market_cap: '$99,703,583',
      total_volume: '$282,142',
    },
  ],
  setCoins: (coins) => set({ coins }),
}));

const useWatchlistStore = create<WatchlistStore>((set) => ({
  watchlist: [],
  setWatchlist: (watchlist) => set({ watchlist }),
  addToWatchlist: (coin) =>
    set((state) => ({
      watchlist: [...state.watchlist, coin],
    })),
}));

export { useWatchlistStore, useCoinStore };
