'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': process.env.API_KEY || '',
  },
};

const Page = ({ params }: { params: { coin_id: string } }) => {
  const [coinData, setCoinData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoinData = async (retryCount = 0) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${params.coin_id}`,
        options
      );
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('To Many Requests');
        }
      }
      const data = await response.json();
      setCoinData(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData(); // Fetch data on component mount

    const intervalId = setInterval(fetchCoinData, 60000); // Refetch every 60 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [params.coin_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  //   <h1>{coinData.name}</h1>
  //           <p>Symbol: {coinData.symbol}</p>
  //           <p>Current Price: {coinData.market_data.current_price.usd} USD</p>

  return (
    <div className="max-w-7xl mt-6 mx-auto">
      <div className="w-full flex justify-between flex-col md:flex-row">
        <div className="w-[45%] flex flex-col">
          <Card className="w-full">
            <CardHeader>
              <div className="text-lg text-primary">
                <img src={coinData.image?.thumb} />
                {coinData.name} {coinData.symbol}
                
              </div>
              <CardTitle className="font-bold text-3xl">
                $ {coinData.market_data.current_price.usd}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  );
};

export default Page;
