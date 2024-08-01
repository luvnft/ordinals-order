import { MotionDiv } from '@/lib/motion';
import { Brc20WalletBalance } from './brc20-wallet-balance';
import { Brc20TickerInfo } from './brc20-ticker-info';

export default function Brc20Page() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex max-h-[400px] flex-1 flex-col gap-8"
    >
      <Brc20TickerInfo />
      <Brc20WalletBalance />
    </MotionDiv>
  );
}
