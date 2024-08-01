import { MotionDiv } from '@/lib/motion';
import { BitcoinHistoricalPrice } from './bitcoin-historical-price/bitcoin-historical-price';
import { BitcoinLivePrice } from './bitcoin-live-price/bitcoin-live-price';

export default function BitcoinPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex max-h-[400px] flex-1 flex-col gap-4 md:flex-row"
    >
      <BitcoinLivePrice />
      <BitcoinHistoricalPrice />
    </MotionDiv>
  );
}
