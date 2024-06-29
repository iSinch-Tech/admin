import { RouteObject } from 'react-router-dom';
import { UserRole } from '@/enums/userRole.enum';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

/**
 * AppRoute уточняет свойство handle типа RouteObject из библиотеки react-router-dom.
 */

export type AppRoute = RouteObject & {
  handle?: {
    title: string;
    userRole: UserRole[];
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  };
  children?: AppRoute[];
};
