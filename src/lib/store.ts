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

export type RecentCoin = {
  id: string;
  name: string;
};

type RecentStoreState = {
  recentSearches: RecentCoin[];
  addSearch: (coin: RecentCoin) => void;
};

export const useRecentSearch = create<RecentStoreState>((set) => ({
  recentSearches: [],
  addSearch: (coin) =>
    set((state) => ({
      recentSearches: [
        coin,
        ...state.recentSearches.filter((c) => c.id !== coin.id),
      ].slice(0, 5),
    })),
}));

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
