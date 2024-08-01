import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MotionDiv } from '@/lib/motion';
import { ordinalsApiRoutes } from '@/lib/routing/routes';

interface Data {
  error: string | null;
  result: {
    id: string;
    original_tick: string;
    tick: string;
    max_supply: string;
    decimals: number;
    limit_per_mint: string;
    remaining_supply: string;
    burned_supply: string;
    is_self_mint: boolean;
    deploy_inscription_id: string;
    block_height: number;
  };
}

const TICKER = 'trio';

const fetchTickerInfo = async () => {
  try {
    const response = await fetch(
      `${ordinalsApiRoutes.opiV1.brc20.tickerInfo}?ticker=${TICKER}`,
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

export async function Brc20TickerInfo() {
  const { result: tickerInfo } = await fetchTickerInfo();

  return (
    <MotionDiv
      key={tickerInfo.id}
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
          <div className="relative flex flex-1 flex-col justify-center gap-3 px-6 py-5 sm:py-6">
            <CardTitle className="flex gap-2">
              <span>{tickerInfo.original_tick}</span>
            </CardTitle>

            <CardDescription>
              <Badge>ID: {tickerInfo.id}</Badge>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex h-full flex-col justify-center gap-6 p-4 text-xs">
          <div className="flex flex-col">
            <span>Max Supply</span>
            <span className="line-clamp-1 text-muted-foreground">
              {tickerInfo.max_supply}
            </span>
          </div>

          <div className="flex flex-col">
            <span>Limit Per Mint</span>
            <span className="line-clamp-1 text-muted-foreground">
              {tickerInfo.limit_per_mint}
            </span>
          </div>

          <div className="flex flex-col">
            <span>Burned Supply</span>
            <span className="line-clamp-1 text-muted-foreground">
              {tickerInfo.burned_supply}
            </span>
          </div>

          <div className="flex flex-col">
            <span>Remaining Supply</span>
            <span className="line-clamp-1 text-muted-foreground">
              {tickerInfo.remaining_supply}
            </span>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
