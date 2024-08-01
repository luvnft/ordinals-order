import { type PropsWithChildren } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
