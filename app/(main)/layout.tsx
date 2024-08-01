import { SignedIn, SignedOut } from '@clerk/nextjs';
import { type PropsWithChildren } from 'react';
import { meta } from '@/lib/metadata';
import { LandingPage } from '../(landing)/landing-page';
import { Sidebar } from './sidebar';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <main className="flex">
          <Sidebar />

          <div className="flex flex-1 p-4">{children}</div>
        </main>
      </SignedIn>
    </>
  );
}

export const metadata = meta();
