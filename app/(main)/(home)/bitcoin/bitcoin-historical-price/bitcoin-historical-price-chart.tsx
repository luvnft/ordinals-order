'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { BitcoinIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  price: {
    label: 'USD',
  },
} satisfies ChartConfig;

export function BitcoinHistoricalPriceChart({
  chartData,
}: {
  chartData: {
    date: number;
    price: number;
  }[];
}) {
  return (
    <Card className="md:w-[1000px]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="flex gap-2">
            <BitcoinIcon className="size-5" />
            <span>Bitcoin (Historical)</span>
          </CardTitle>

          <CardDescription>
            Showing USD Price over the last 12 months
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value * 1000);

                return date.toLocaleDateString('en-US', {
                  month: 'short',
                });
              }}
            />

            <YAxis dataKey="price" />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="price"
                  labelFormatter={() => {
                    return 'Price';
                  }}
                />
              }
            />

            <Line
              dataKey="price"
              type="monotone"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
