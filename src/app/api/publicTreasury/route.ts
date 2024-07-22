import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { coin } = await req.json();

    if (!coin) {
      return NextResponse.json(
        { error: 'Coin parameter is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/companies/public_treasury/${coin}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
