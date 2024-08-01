import { type ClassValue, clsx } from 'clsx';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { routes } from './routing';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const errorToast = (error: unknown) => {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error('An unknown error occurred.');
  }
};

export const getIsPathActive = (pathname: string, itemPath: string) => {
  if (pathname === itemPath || pathname.startsWith(`${itemPath}/`)) {
    return true;
  }

  if (pathname.includes(`/${itemPath}/`) || pathname.endsWith(`/${itemPath}`)) {
    return true;
  }

  return false;
};

export const RedirectToBase = () => {
  redirect(routes.base);
};
