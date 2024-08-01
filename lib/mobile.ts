import resolveConfig from 'tailwindcss/resolveConfig';
import { useMediaQuery } from 'react-responsive';
import tailwindConfig from '../tailwind.config';

const breakpoints = resolveConfig(tailwindConfig).theme.screens;

export const useBreakpoint = <K extends keyof typeof breakpoints>(
  breakpointKey: K,
) => {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });

  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type Key = `is${Capitalize<K>}`;

  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
};
