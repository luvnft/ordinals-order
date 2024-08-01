import { type PropsWithChildren } from 'react';

export default function OrderPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-md border border-dashed">
      {children}
    </div>
  );
}
