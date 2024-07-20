import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};
