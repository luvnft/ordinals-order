import { mempoolApiRoutes } from '@/lib/routing/routes';
import { BitcoinHistoricalPriceChart } from './bitcoin-historical-price-chart';

interface Data {
  prices?: {
    time: number;
    USD: number;
  }[];
  exchangeRates?: {
    USDEUR: number;
    USDGBP: number;
    USDCAD: number;
    USDCHF: number;
    USDAUD: number;
    USDJPY: number;
  };
}

const getTimestampsForLastYear = () => {
  const timestamps = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    timestamps.push(Math.floor(date.getTime() / 1000));
  }

  return timestamps.reverse();
};

const fetchChartData = async () => {
  const timestamps = getTimestampsForLastYear();
  const chartData = [];

  for (const timestamp of timestamps) {
    try {
      const response = await fetch(
        `${mempoolApiRoutes.historicalPrice}?currency=USD&timestamp=${timestamp.toString()}`,
      );

      const data = (await response.json()) as Data;

      if (data.prices && data.prices.length > 0) {
        chartData.push({
          date: data.prices[0].time,
          price: data.prices[0].USD,
        });
      } else {
        throw new Error('Prices not found');
      }
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  return chartData;
};

export async function BitcoinHistoricalPrice() {
  const chartData = await fetchChartData();

  return <BitcoinHistoricalPriceChart chartData={chartData} />;
}
