'use client';
import * as React from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const chartConfig = {
  btc: { label: 'BTC', color: '#ff6f61' }, // Coral
  eth: { label: 'ETH', color: '#6a5acd' }, // SlateBlue
};

const cryptoIds = ['bitcoin', 'ethereum'];

const formatLargeNumber = (num: any) => {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + 'T';
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export function GlobalMarketCapChart() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Loading state
  const [error, setError] = React.useState(''); // Error state
  const [timeRange, setTimeRange] = React.useState('30d');

  React.useEffect(() => {
    console.log('Running the useEffect');
    const getTimeRange = () => {
      const endTime = Math.floor(Date.now() / 1000);
      const daysMap: any = {
        '90d': [endTime - 90 * 24 * 3600, endTime],
        '30d': [endTime - 30 * 24 * 3600, endTime],
        '7d': [endTime - 7 * 24 * 3600, endTime],
        '24h': [endTime - 24 * 3600, endTime], // Last 24 hours
      };
      return daysMap[timeRange];
    };

    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      setError(''); // Reset error state before fetching data
      const [from, to] = getTimeRange();

      try {
        const response = await fetch('/api/marketData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ from, to, ids: cryptoIds }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const [btcData, ethData] = await response.json();
        const formattedData = btcData.market_caps.map(
          (_: any, index: number) => {
            return {
              date: new Date(btcData.market_caps[index][0])
                .toISOString()
                .split('T')[0],
              btc: btcData.market_caps[index][1],
              eth: ethData.market_caps[index][1],
            };
          }
        );

        setData(formattedData);
      } catch (error: any) {
        setError('Too many requests, please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching data or encountering an error
      }
    };

    fetchData();
  }, [timeRange]);

  return (
    <Card className="bg-transparent md:h-[408px] sm:max-w-3xl max-w-[320px]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Global Market Cap</CardTitle>
          <CardDescription>
            The chart below shows the global market cap of BTC, and ETH
            globally, tracked over the last{' '}
            {timeRange === '90d'
              ? 'three months'
              : timeRange === '30d'
              ? '30 days'
              : timeRange === '7d'
              ? '7 days'
              : '24 hours'}
            .
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="24h" className="rounded-lg">
              Last 24 hours
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex flex-col text-center justify-center items-center ">
            <Loader2 size={20} className="animate-spin" />
            <p>Chart is getting loaded</p>
          </div>
        ) : error ? (
          <div className="flex flex-col text-center justify-center items-center">
            <p>{error}</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart data={data}>
              <defs>
                <linearGradient id="fillBTC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6f61" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff6f61" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillETH" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6a5acd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6a5acd" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={16} // Adjusted interval
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${formatLargeNumber(value)}`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="btc"
                stroke="#ff6f61"
                fill="url(#fillBTC)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="eth"
                stroke="#6a5acd"
                fill="url(#fillETH)"
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
