'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
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

const fetchCoinData = async (coin_id: string, days: string) => {
  const response = await fetch('/api/productChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coin_id, days }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Too Many Requests');
    }
    throw new Error('Failed to fetch coin data');
  }

  const data = await response.json();
  return data;
};

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <text x={x} y={y} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
      {payload.value}
    </text>
  );
};

export function ProductChart({ coin_id }: { coin_id: string }) {
  const [timeRange, setTimeRange] = React.useState('90');
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCoinData(coin_id, timeRange);
        const transformedData = data.prices.map(
          ([time, price]: [number, number]) => ({
            date: new Date(time).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
            }),
            price,
          })
        );
        setChartData(transformedData);
      } catch (error: any) {
        if (error.message === 'Too Many Requests') {
          setError('Too many requests. Please try again later.');
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coin_id, timeRange]);

  if (loading) {
    return (
      <Card className="bg-transparent">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>{`Price Chart for ${coin_id}`}</CardTitle>
            <CardDescription>
              <div className="flex flex-col text-center justify-center items-center ">
                <Loader2 size={20} className="animate-spin" />
                <p>Chart is getting loaded...</p>
              </div>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-transparent">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>{`Price Chart for ${coin_id}`}</CardTitle>
            <CardDescription className="text-red-500">
              {error} Try refreshing!
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6" />
      </Card>
    );
  }

  // Format X-axis labels based on the selected time range
  const dateFormatter = (value: string) => {
    const date = new Date(value);
    if (timeRange === '7') {
      // For last 7 days, show day of the month and month
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });
    } else if (timeRange === '30') {
      // For last 30 days, show day of the month and month
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });
    } else {
      // For last 3 months or more, show month
      return date.toLocaleDateString('en-GB', { month: 'short' });
    }
  };

  return (
    <Card className="bg-transparent">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{`Price Chart for ${coin_id}`}</CardTitle>
          <CardDescription>
            Historical price data for {coin_id} over the selected time period.
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
            <SelectItem value="90" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-price)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-price)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={50}
              tickFormatter={dateFormatter}
              tick={<CustomXAxisTick />}
            />
            <YAxis
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={80}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    });
                  }}
                  // @ts-ignore
                  formatter={(value) => `$${value.toFixed(2)}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="price"
              type="natural"
              fill="url(#fillPrice)"
              stroke="var(--color-price)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
