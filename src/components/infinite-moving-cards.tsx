'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': process.env.API_KEY || '',
  },
};

const bitcoinImg =
  'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400';

const ethereumImg =
  'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628';

const fetchCompanyHoldings = async (coin: string) => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/companies/public_treasury/${coin}`,
    options
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data.companies.map((company: any) => ({ ...company, coin }));
};

export const InfiniteMovingCards = ({
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [holdings, setHoldings] = useState<any[]>([]);
  const [start, setStart] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const updateHoldings = async () => {
    try {
      const [btcHoldings, ethHoldings] = await Promise.all([
        fetchCompanyHoldings('bitcoin'),
        fetchCompanyHoldings('ethereum'),
      ]);

      const combinedHoldings = [...ethHoldings, ...btcHoldings];
      setHoldings(combinedHoldings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateHoldings();
    const intervalId = setInterval(updateHoldings, 30000); // Refetch every 60 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '120s');
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 lg:mx-auto w-full max-w-[320px] lg:max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      {holdings.length > 0 ? (
        <h1 className="text-center text-xl lg:text-2xl font-semibold mb-2">
          Public Market Holdings
        </h1>
      ) : (
        <div className=""></div>
      )}
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {holdings.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[350px]"
            style={{
              background:
                'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
            }}
            key={`${item.name}-${idx}`}
          >
            <div className="flex justify-between">
              <div className="">
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="relative z-20 text-sm leading-[1.6] text-primary font-normal">
                  {item.name} ({item.coin})
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-primary font-normal">
                      {item.symbol}
                    </span>
                    <span className="text-sm leading-[1.6] text-primary font-normal">
                      {item.total_current_value_usd} USD
                    </span>
                  </span>
                </div>
              </div>
              <img
                className="h-14 w-14"
                src={item.coin == 'bitcoin' ? bitcoinImg : ethereumImg}
                alt="logo"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
