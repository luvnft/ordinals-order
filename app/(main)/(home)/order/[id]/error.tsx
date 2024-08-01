'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routing';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console -- error boundary
    console.error(error);
  }, [error]);

  return (
    <>
      <h2>{error.message}</h2>

      <Link href={routes.order}>
        <Button>Try again</Button>
      </Link>
    </>
  );
}
