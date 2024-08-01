import Image from 'next/image';
import { MoveLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MotionDiv } from '@/lib/motion';
import { ordinalsApiRoutes, routes } from '@/lib/routing/routes';

interface Data {
  id: string;
  error: string;
  status: string;
  state: string;
  receiveAddress: string;
  orderType: string;
  paid: boolean;
  baseFee: number;
  chainFee: number;
  charge: {
    currency: string;
  };
  files?: [
    {
      name: string;
      type: string;
      url: string;
    },
  ];
}

const fetchOrderData = async (orderId: string) => {
  try {
    const response = await fetch(`${ordinalsApiRoutes.order}?id=${orderId}`);

    const data = (await response.json()) as Data;

    if (data.status === 'error') {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default async function OrderIdPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetchOrderData(params.id);

  return (
    <MotionDiv
      key={data.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="flex flex-1 flex-col">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="relative flex flex-1 flex-col justify-center gap-4 px-6 py-5 sm:py-6">
            <CardTitle className="flex gap-2">
              <span className="font-mono text-sm md:text-base">
                Order {data.id}
              </span>
            </CardTitle>

            <CardDescription className="flex gap-4">
              <Badge>Status: {data.status}</Badge>
              <Badge>State: {data.state}</Badge>
              <Badge>Paid: {data.paid ? 'yes' : 'no'}</Badge>
              <Badge>Type: {data.orderType}</Badge>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex h-full flex-col justify-center gap-4 p-4">
          {data.files
            ? data.files.map((file) => (
                <div key={file.url} className="flex items-center gap-6">
                  <Image
                    src={file.url}
                    alt={file.name}
                    width={200}
                    height={200}
                  />

                  <div className="flex flex-col gap-2">
                    <div className="text-sm">
                      <span className="text-sm font-semibold">File name:</span>{' '}
                      <span className="font-mono">{file.name}</span>
                    </div>

                    <div className="text-sm">
                      <span className="font-semibold">File type:</span>{' '}
                      <span className="font-mono">{file.type}</span>
                    </div>

                    <div className="text-sm">
                      <span className="font-semibold">Base fee:</span>{' '}
                      <span className="font-mono">{data.baseFee}</span>
                    </div>

                    <div className="text-sm">
                      <span className="font-semibold">Chain fee:</span>{' '}
                      <span className="font-mono">{data.chainFee}</span>
                    </div>

                    <div className="text-sm">
                      <span className="font-semibold">Currency:</span>{' '}
                      <span className="font-mono">{data.charge.currency}</span>
                    </div>

                    <div>
                      <span className="text-sm font-semibold">
                        Received by:
                      </span>{' '}
                      <span className="line-clamp-1 font-mono text-xs">
                        {data.receiveAddress}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </CardContent>

        <CardFooter className="border-t p-6">
          <Link href={routes.order}>
            <Button variant="outline" leftIcon={<MoveLeftIcon />}>
              Go Back
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
}
