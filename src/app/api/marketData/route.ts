import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { from, to, ids } = await req.json();
    console.log('from', from);
    console.log('to', to);
    console.log('ids', ids);
    if (!from || !to || !ids || ids.length === 0) {
      return NextResponse.json(
        { error: 'Missing parameters in request body' },
        { status: 400 }
      );
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.API_KEY ?? '',
      },
    };

    const requests = ids.map((id: string) =>
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
        options
      )
    );

    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map((res) => res.json()));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
