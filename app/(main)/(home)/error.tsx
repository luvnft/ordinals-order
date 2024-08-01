'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console -- error boundary
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-md border border-dashed">
      <h2>Oops, something went wrong!</h2>

      <Button
        onClick={() => {
          reset();
        }}
      >
        Try again
      </Button>
    </div>
  );
}
