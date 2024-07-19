import create from 'zustand';

export interface Coin {
  coin_id: string;
  name: string;
  symbol: string;
  data: {
    price: number;
    market_cap: string;
    total_volume: string;
  };
  small: string;
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
  coins: [],
  setCoins: (coins) => set({ coins }),
}));

const useWatchlistStore = create<WatchlistStore>((set) => ({
  watchlist: [],
  setWatchlist: (watchlist) => set({ watchlist }),
  addToWatchlist: (coin) =>
    set((state) => ({
      watchlist: [coin, ...state.watchlist],
    })),
}));

export { useWatchlistStore, useCoinStore };
