'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { type LivePriceData } from './bitcoin-live-price';

export function BitcoinLivePriceDisplay({
  livePriceData,
  refetchIntervalMs,
}: {
  livePriceData: LivePriceData;
  refetchIntervalMs: number;
}) {
  const router = useRouter();

  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefreshRouter = useCallback(() => {
    setIsRefetching(true);

    router.refresh();

    setTimeout(() => {
      setIsRefetching(false);
    }, 1000);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(handleRefreshRouter, refetchIntervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [handleRefreshRouter, refetchIntervalMs]);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xl font-bold leading-none sm:text-5xl">
        ${livePriceData.USD}
      </span>

      <span className="text-center text-sm text-muted-foreground">
        Last updated at{' '}
        {new Date(livePriceData.time * 1000).toLocaleTimeString('en-US')}
      </span>

      <span className="absolute right-5 top-5 flex h-3 w-3">
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75',
            isRefetching && 'animate-ping',
          )}
        />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
      </span>
    </div>
  );
}
