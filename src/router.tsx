// import { Suspense, lazy, FC, ReactNode } from 'react';
import { UserRole } from '@/enums/userRole.enum';

// import SuspenseLoader from '@/components/SuspenseLoader';
import BaseLayout from '@/layouts/BaseLayout';
import MainLayout from '@/layouts/MainLayout';
import { AppRoute } from '@/models/AppRoute';

// const Loader = (Component: FC) => (props: JSX.IntrinsicAttributes) =>
//   (
//     <Suspense fallback={<SuspenseLoader />}>
//       <Component {...props} />
//     </Suspense>
//   );
// const Login = Loader(lazy(() => import('@/views/Login')));
// const Users = Loader(lazy(() => import('@/views/Users')));
import Login from '@/views/Login';
import { Schedule } from '@/views/Schedule';
import User from '@/views/User';
import Users from '@/views/Users';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

const routes: AppRoute[] = [
  {
    path: '/',
    element: <MainLayout />,
    handle: {
      title: 'MAIN_CONTENT',
    },
    children: [
      {
        path: '/',
        element: <Navigate to="/users" replace />,
      },
      {
        path: '/users',
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: ':id',
            element: <User />,
          },
        ],
        handle: {
          title: 'Пользователи',
          userRole: [UserRole.ADMIN],
          icon: <GroupOutlinedIcon />,
        },
      },
      {
        path: '/categories',
        children: [
          {
            index: true,
            element: <div>Categories works!</div>,
          },
        ],
        handle: {
          title: 'Категории',
          userRole: [UserRole.ADMIN, UserRole.USER],
          icon: <AutoStoriesOutlinedIcon />,
        },
      },
      {
        path: '/topics',
        children: [
          {
            index: true,
            element: <div>Topics works!</div>,
          },
        ],
        handle: {
          title: 'Темы',
          userRole: [UserRole.ADMIN, UserRole.USER],
          icon: <QuestionAnswerIcon />,
        },
      },
      {
        path: '/questions',
        children: [
          {
            index: true,
            element: <div>Questions works!</div>,
          },
        ],
        handle: {
          title: 'Вопросы',
          userRole: [UserRole.ADMIN, UserRole.USER],
          icon: <QuestionAnswerIcon />,
        },
      },
      {
        path: '/schedule',
        children: [
          {
            index: true,
            element: <Schedule />,
          },
          {
            path: '/schedule/:month',
            element: <Schedule />,
          },
        ],
        handle: {
          title: 'Расписание',
          userRole: [UserRole.ADMIN, UserRole.USER],
          icon: <CalendarMonthIcon />,
        },
      },
    ],
  },
  {
    path: '/login',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Login />,
      },
    ],
  },
  {
    path: '/forbidden',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <div>Доступ к странице запрещен</div>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/forbidden" replace />,
  },
];

export default routes;
