import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = async () => {
  return (
    <div className="border-b w-screen shadow-md">
      <div className="flex items-center max-w-6xl mx-auto p-5 justify-between w-screen">
        <Link href={'/'}>
          <h1 className="text-3xl font-bold">
            Crypto<span className="text-pink-500">nite</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant={'outline'} className="p-2 bg-transparent">
            <Search size={20} />
          </Button>
          <ModeToggle />

          <SignedOut>
            <Button variant={'outline'}>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
