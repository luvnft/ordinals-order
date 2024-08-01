import './globals.css';

import { type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { fontMono, fontSans } from '@/lib/fonts';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers>
          {children}

          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
