import { AppRoute } from '@/models/AppRoute';
import CurrentUser from '@/models/CurrentUser';

export const useRights = (currentUser: CurrentUser, route: AppRoute): boolean => {
  return route.handle?.userRole ? route.handle.userRole.includes(currentUser.role) : true;
};
