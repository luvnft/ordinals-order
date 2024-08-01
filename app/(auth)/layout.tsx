import { SignedIn, SignedOut } from '@clerk/nextjs';
import { type PropsWithChildren } from 'react';
import { RedirectToBase } from '@/lib/utils';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <SignedIn>
        <RedirectToBase />
      </SignedIn>

      <SignedOut>
        <div className="flex min-h-dvh items-center justify-center">
          {children}
        </div>
      </SignedOut>
    </>
  );
}
