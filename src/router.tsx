import { UserRole } from '@/enums/userRole.enum';
import BaseLayout from '@/layouts/BaseLayout';
import MainLayout from '@/layouts/MainLayout';
import { AppRoute } from '@/models/AppRoute';
import { Driving } from '@/views/Driving/Driving';
import Login from '@/views/Login';
import { AddUser } from '@/views/Users/AddUser';
import User from '@/views/Users/User';
import Users from '@/views/Users/Users';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

// import { Suspense, lazy, FC, ReactNode } from 'react';
// import SuspenseLoader from '@/components/SuspenseLoader';

// const Loader = (Component: FC) => (props: JSX.IntrinsicAttributes) =>
//   (
//     <Suspense fallback={<SuspenseLoader />}>
//       <Component {...props} />
//     </Suspense>
//   );
// const Login = Loader(lazy(() => import('@/views/Login')));
// const Users = Loader(lazy(() => import('@/views/Users')));


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
            path: '/users/add-user',
            element: <AddUser />,
          },
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
        path: '/driving',
        children: [
          {
            index: true,
            element: <Driving />,
          },
          {
            path: '/driving/:month',
            element: <Driving />,
          },
        ],
        handle: {
          title: 'Расписание',
          userRole: [UserRole.ADMIN, UserRole.TRAINER],
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
