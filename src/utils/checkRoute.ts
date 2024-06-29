import { AppRoute } from '@/models/AppRoute';
import { matchPath } from 'react-router-dom';

export function checkRoute(rs: AppRoute[], path: string): AppRoute | null {
  let currentRoute: AppRoute | null = null;

  for (let r of rs) {
    if (r.path && matchPath({ path: r.path, end: true }, path)) {
      return (currentRoute = r);
    } else if (r.path && r.children) {
      if (matchPath({ path: r.path, end: false }, path)) {
        const childrenPath = r.path.length > 1 ? path.substring(r.path.length + 1) : path;
        return checkRoute(r.children, childrenPath);
      }
    } else if (r.children) {
      return checkRoute(r.children, path);
    }
  }
  return currentRoute;
}
