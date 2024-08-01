import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ordinalsApiRoutes } from '@/lib/routing/routes';
import { MotionDiv } from '@/lib/motion';

const WALLET_ADDRESS = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';

interface Data {
  error: string | null;
  result: [
    {
      overall_balance: string;
      available_balance: string;
      block_height: number;
      tick: string;
    },
  ];
}

const fetchWalletBalance = async () => {
  try {
    const response = await fetch(
      `${ordinalsApiRoutes.opiV1.brc20.walletBalance}?address=${WALLET_ADDRESS}`,
      {
        headers: {
          // we assume the env is defined for the purpose of this demo
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- allow
          'x-api-key': process.env.ORDINALS_API_KEY!,
        },
      },
    );

    const data = (await response.json()) as Data;

    return data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export async function Brc20WalletBalance() {
  const data = await fetchWalletBalance();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">BRC20 Wallet Balance</h1>

        <span className="font-mono text-muted-foreground">
          Address: {WALLET_ADDRESS}
        </span>
      </div>

      <MotionDiv
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {data.result.slice(0, 4).map((token) => {
          return (
            <MotionDiv
              key={token.tick}
              variants={{
                hidden: {
                  opacity: 0,
                },
                show: {
                  opacity: 1,
                },
              }}
            >
              <Card className="flex flex-1 flex-col">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                  <div className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle className="flex gap-2">
                      <span>{token.tick.toUpperCase()}</span>
                    </CardTitle>

                    <CardDescription>
                      Block height: {token.block_height}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="flex h-full flex-col justify-center gap-4 p-4 text-xs">
                  <div className="flex flex-col">
                    <span>Overall balance</span>
                    <span className="line-clamp-1 text-muted-foreground">
                      {token.overall_balance}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span>Available balance</span>
                    <span className="line-clamp-1 text-muted-foreground">
                      {token.available_balance}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </div>
  );
}
