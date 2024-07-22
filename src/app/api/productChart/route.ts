import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const { coin_id, days } = await req.json();

    // Validate input
    if (!coin_id || !days) {
      return NextResponse.json(
        { error: 'Missing parameters in request body' },
        { status: 400 }
      );
    }

    // Fetch data from CoinGecko API
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=usd&days=${days}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.API_KEY ?? '', // Optional API key if needed
        },
      }
    );

    // Check if the response is okay
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too Many Requests');
      }
      throw new Error('Failed to fetch coin data');
    }

    // Parse the response JSON
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    // Handle errors and return a response
    return NextResponse.json(
      { error: error.message || 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
