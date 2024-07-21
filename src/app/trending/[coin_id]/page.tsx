import { ProductChart } from '@/components/ProductChart';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

const fetchCoinData = async (coin_id: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': process.env.API_KEY || '',
    },
  };

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coin_id}`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

const truncateDescription = (description: string, sentenceCount: number) => {
  const sentences = description.split('. ');
  return (
    sentences.slice(0, sentenceCount).join('. ') +
    (sentences.length > sentenceCount ? '.' : '')
  );
};

const Page = async ({ params }: { params: { coin_id: string } }) => {
  const coinData = await fetchCoinData(params.coin_id);
  return (
    <div className="lg:max-w-7xl max-w-[320px] mt-6 mx-auto mb-4">
      <div className="w-full gap-4 flex justify-between flex-col md:flex-row">
        <div className="lg:w-[45%] flex flex-col">
          <Card className="w-full bg-transparent">
            <CardHeader>
              <div className="text-2xl flex gap-3 items-center mb-2 text-primary">
                <img src={coinData.image?.small} className="rounded-full" />
                {coinData.name}{' '}
                <span className="text-lg text-gray-600 uppercase">
                  {coinData.symbol}
                </span>
              </div>
              <CardTitle className="font-bold text-3xl">
                $ {coinData.market_data.current_price.usd}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <InfoItem
                item="Market Cap Rank"
                value={coinData.market_cap_rank}
              />
              <InfoItem
                item="Watchlist Portfolio Users"
                value={coinData.watchlist_portfolio_users}
              />
              <InfoItem item="Genesis Date" value={coinData.genesis_date} />
              <InfoItem
                item="Hashing Algorithm"
                value={coinData.hashing_algorithm}
              />
              <h1 className="text-xl mt-2 font-semibold">Info</h1>
              <Links item="Website" value={coinData.links?.homepage[0]} />
              <Links
                item="Official Forum"
                value={coinData.links?.official_forum_url[0]}
              />
              <Links
                item="Source Code"
                value={coinData.links?.repos_url?.github[0]}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <h1>How did you feel about {coinData.name}?</h1>
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary-foreground p-2 text-primary border hover:bg-secondary cursor-pointer">
                  👍 {coinData.sentiment_votes_up_percentage}%
                </div>
                <div className="rounded-md bg-primary-foreground p-2 text-primary border hover:bg-secondary cursor-pointer">
                  👎 {coinData.sentiment_votes_down_percentage}%
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full flex flex-col gap-4">
          <ProductChart coin_id={params.coin_id} />
          {coinData.description.en ? (
            <div className="flex flex-col gap-3 mt-4">
              <h1 className="text-xl font-semibold">About {coinData.name}</h1>
              <p>{truncateDescription(coinData.description.en, 3)}</p>
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ item, value }: { item: string; value: string }) => {
  return (
    <div
      className={`items-center justify-between border-b pb-2 ${
        value ? 'flex' : 'hidden'
      }`}
    >
      <h1>{item}</h1>
      <h1>{value}</h1>
    </div>
  );
};

const Links = ({ item, value }: { item: string; value: string }) => {
  if (!value || value == undefined || value == null) return;

  const formattedValue = value
    .replace(/^https?:\/\/(www\.)?/, '')
    .split('/')[0];
  return (
    <div
      className={`items-center justify-between border-b pb-2 ${
        value ? 'flex' : 'hidden'
      }`}
    >
      <h1>{item}</h1>
      <Link
        href={value}
        className="p-2 text-sm bg-primary-foreground rounded-md hover:bg-secondary"
      >
        {formattedValue}
      </Link>
    </div>
  );
};

export default Page;
