'use client';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';
import SearchModal from './ui/SearchModel';

const Navbar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  return (
    <div className="border-b w-screen shadow-md">
      <div className="flex items-center max-w-6xl mx-auto p-5 justify-between w-screen">
        <Link href={'/'}>
          <h1 className="md:text-3xl text-2xl font-bold">
            Crypto<span className="text-pink-500">nite</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            className="p-2 bg-transparent"
            onClick={openSearchModal}
          >
            <Search size={20} />
          </Button>
          <ModeToggle />
        </div>
      </div>
      <SearchModal isOpen={isSearchModalOpen} closeModal={closeSearchModal} />
    </div>
  );
};

export default Navbar;
