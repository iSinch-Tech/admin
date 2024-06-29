import { AppRoute } from '@/models/AppRoute';
import { matchPath } from 'react-router-dom';

export function getRoute(routes: AppRoute[], path: string): AppRoute | null {
  let currentRoute: AppRoute | null = null;

  for (const route of routes) {
    if (route.path && matchPath({ path: route.path, end: true }, path)) {
      return (currentRoute = route);
    } else if (route.path && route.children) {
      if (matchPath({ path: route.path, end: false }, path)) {
        const childrenPath = route.path.length > 1 ? path.substring(route.path.length + 1) : path;
        return getRoute(route.children, childrenPath);
      }
    } else if (route.children) {
      return getRoute(route.children, path);
    }
  }
  return currentRoute;
}
