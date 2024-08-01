import type { Route as NextRoute } from 'next';
import { urls } from './urls';

interface RouteDefinition {
  [key: string]: NextRoute | RouteDefinition;
}

export const createRoutes = <T extends RouteDefinition>(routes: T): T => routes;

export const createAbsoluteRoutes = <T extends RouteDefinition>(
  routes: T,
  baseUrl: string = urls.base,
) => {
  const absoluteRoutes: RouteDefinition = {};

  for (const [key, value] of Object.entries(routes)) {
    if (typeof value === 'string') {
      absoluteRoutes[key] = `${baseUrl}${value}` as NextRoute;
    } else {
      absoluteRoutes[key] = createAbsoluteRoutes(value, baseUrl);
    }
  }

  return absoluteRoutes as T;
};

interface ApiRouteDefinition {
  [key: string]: string | ApiRouteDefinition;
}

export const createApiRoutes = <T extends ApiRouteDefinition>(
  routes: T,
  apiUrl: string,
) => {
  const apiRoutes: ApiRouteDefinition = {};

  for (const [key, value] of Object.entries(routes)) {
    if (typeof value === 'string') {
      apiRoutes[key] = `${apiUrl}${value}`;
    } else {
      apiRoutes[key] = createApiRoutes(value, apiUrl);
    }
  }

  return apiRoutes as T;
};
