'use client';

import Link from 'next/link';
import { routes } from '@/lib/routing';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

export function LandingHeader() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in border-b px-4 opacity-0 backdrop-blur-[12px] [--animation-delay:600ms] xl:px-0">
      <div className="container flex h-16 items-center justify-between px-4 py-4 2xl:px-0">
        <div className="flex items-center gap-3">
          <Logo />

          <h1 className="line-clamp-1 text-xl font-bold tracking-tight">
            Ordinals
          </h1>
        </div>

        <div className="flex gap-3">
          <Link href={routes.auth.signIn}>
            <Button variant="link">Sign in</Button>
          </Link>

          <Link href={routes.auth.signUp}>
            <Button variant="outline">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
