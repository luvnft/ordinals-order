import { BitcoinIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mempoolApiRoutes } from '@/lib/routing/routes';
import { BitcoinLivePriceDisplay } from './bitcoin-live-price-display';

export interface LivePriceData {
  time: number;
  USD: number;
  EUR: number;
  GBP: number;
  CAD: number;
  CHF: number;
  AUD: number;
  JPY: number;
}

const REFETCH_INTERVAL_SECONDS = 5;

const fetchLivePriceData = async () => {
  try {
    const response = await fetch(mempoolApiRoutes.prices, {
      next: { revalidate: REFETCH_INTERVAL_SECONDS },
    });

    const data = (await response.json()) as LivePriceData;

    if (!data.USD) {
      throw new Error('Live price data not found');
    }

    return data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export async function BitcoinLivePrice() {
  const livePriceData = await fetchLivePriceData();

  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="flex gap-2">
            <BitcoinIcon className="size-5" />
            <span>Bitcoin (Live)</span>
          </CardTitle>

          <CardDescription>Showing live USD Price</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="relative flex h-full items-center justify-center p-6">
        <BitcoinLivePriceDisplay
          livePriceData={livePriceData}
          refetchIntervalMs={REFETCH_INTERVAL_SECONDS * 1000}
        />
      </CardContent>
    </Card>
  );
}
