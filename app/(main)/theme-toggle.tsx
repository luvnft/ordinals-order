'use client';

import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="px-1.5" variant="outline">
          <SunIcon className="h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={theme === 'light'}
          onClick={() => {
            setTheme('light');
          }}
        >
          <div className="flex items-center gap-0.5">
            <SunIcon className="h-4" />
            <span>Light</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={theme === 'dark'}
          onClick={() => {
            setTheme('dark');
          }}
        >
          <div className="flex items-center gap-0.5">
            <MoonIcon className="h-4" />
            <span>Dark</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={theme === 'system'}
          onClick={() => {
            setTheme('system');
          }}
        >
          <div className="flex items-center gap-0.5">
            <LaptopIcon className="h-4" />
            <span>System</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
