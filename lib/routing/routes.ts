import { type Route as NextRoute } from 'next';
import { createAbsoluteRoutes, createApiRoutes, createRoutes } from './utils';
import { urls } from './urls';

export const routes = createRoutes({
  base: '/',
  bitcoin: '/bitcoin',
  brc20: '/brc20',
  order: '/order',
  auth: {
    oauth: {
      callback: '/oauth/callback',
    },
    // Catch-all routes are not supported by Next.js's
    // typedRoutes yet, so they need to be asserted
    signIn: '/sign-in' as NextRoute,
    signUp: '/sign-up' as NextRoute,
    verify: '/verify' as NextRoute,
  },
} as const);

export const absoluteRoutes = createAbsoluteRoutes(routes);

export const ordinalsApiRoutes = createApiRoutes(
  {
    order: '/order',
    opiV1: {
      brc20: {
        tickerInfo: '/opi/v1/brc20/ticker_info',
        walletBalance: '/opi/v1/brc20/get_current_balance_of_wallet',
      },
    },
  } as const,
  urls.ordinalsApi,
);

export const mempoolApiRoutes = createApiRoutes(
  {
    prices: '/prices',
    historicalPrice: '/historical-price',
  } as const,
  urls.mempoolApi,
);
