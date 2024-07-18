import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchOHLCData = async (coinId: String) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc`,
    {
      params: {
        vs_currency: 'usd',
        days: '1',
      },
    }
  );
  return response.data.map(
    ([timestamp, open, high, low, close]: [
      number,
      number,
      number,
      number,
      number
    ]) => ({
      timestamp,
      open,
      high,
      low,
      close,
    })
  );
};

export const formatTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};
