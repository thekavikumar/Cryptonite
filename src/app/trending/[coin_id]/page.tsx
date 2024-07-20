'use client';
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
        if (response.status === 429 && retryCount < 3) {
          // Retry after a delay if rate limited (429 status)
          setTimeout(
            () => fetchCoinData(retryCount + 1),
            Math.pow(2, retryCount) * 1000
          );
          return;
        }
        throw new Error('Failed to fetch data');
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

  return (
    <div>
      <h1>{coinData.name}</h1>
      <p>Symbol: {coinData.symbol}</p>
      <p>Current Price: {coinData.market_data.current_price.usd} USD</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Page;
