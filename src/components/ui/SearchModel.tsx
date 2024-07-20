'use client';
import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RecentCoin, useRecentSearch } from '@/lib/store';

type Coin = {
  id: string;
  name: string;
};

type SearchModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, closeModal }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Coin[]>([]);
  const { recentSearches, addSearch } = useRecentSearch();
  const router = useRouter();

  useEffect(() => {
    if (query) {
      const fetchSuggestions = async () => {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${query}`
        );
        setSuggestions(response.data.coins.slice(0, 5)); // Limit to 5 suggestions
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (coin: RecentCoin) => {
    setQuery('');
    addSearch(coin); // Add the selected coin to recent searches
    closeModal();
    router.push(`/trending/${coin.id}`);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-foreground p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Search for a Coin
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Type to search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <ul className="mt-2">
                    {query
                      ? suggestions.map((coin) => (
                          <li
                            key={coin.id}
                            className="cursor-pointer p-2 bg-primary-foreground hover:bg-secondary rounded-md border border-transparent hover:border-gray-500"
                            onClick={() => handleSelect(coin)}
                          >
                            {coin.name}
                          </li>
                        ))
                      : recentSearches.map((coin) => (
                          <li
                            key={coin.id}
                            className="cursor-pointer p-2 bg-primary-foreground hover:bg-secondary rounded-md border border-transparent hover:border-gray-500"
                            onClick={() => handleSelect(coin)}
                          >
                            {coin.name}
                          </li>
                        ))}
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchModal;
