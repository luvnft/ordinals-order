import Link from 'next/link';
import type { Route as NextRoute } from 'next';
import { routes } from '@/lib/routing';

interface LogoProps {
  href?: NextRoute;
}

export function Logo({ href = routes.base }: LogoProps) {
  return (
    <Link
      href={href}
      className="flex w-6 focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full"
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    </Link>
  );
}
