import { type Metadata } from 'next';

export const meta = ({ subtitle }: { subtitle?: string } = {}): Metadata => {
  let title: string;

  if (subtitle) {
    title = `Ordinals Demo | ${subtitle}`;
  } else {
    title = 'Ordinals Demo';
  }

  return {
    title,
    robots: {
      index: false,
      follow: false,
    },
  };
};
