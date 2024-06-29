import { FC, useState, createContext, ReactNode, useEffect } from 'react';
import api from '@/api/ApiHelper';
import CurrentUser from '@/models/CurrentUser';

type AuthContext = {
  doLogin: (login: string, pass: string) => Promise<void>;
  doLogout: () => void;
  currentUser: CurrentUser | null;
};

function parseJwt<T>(token: string): T | null {
  try {
    return JSON.parse(atob(token.split('.')[1])) as T;
  } catch (e) {
    return null;
  }
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const access_token = window.localStorage.getItem('access_token');
    if (!access_token) {
      return;
    }
    setCurrentUser(parseJwt<CurrentUser>(access_token));
  }, []);

  const doLogin = async (login: string, pass: string) => {
    await api
      .post<unknown, CurrentUser & { access_token: string }>('/auth/login', {
        login: login,
        password: pass,
      })
      .then(({ access_token, ...user }) => {
        if (user.role !== 'ADMIN') {
          throw new Error('Admin only');
        }
        window.localStorage.setItem('access_token', access_token);
        setCurrentUser(user);
      });
  };

  const doLogout = () => {
    window.localStorage.removeItem('access_token');
    setCurrentUser(null);
    window.location.reload();
  };

  return <AuthContext.Provider value={{ doLogin, doLogout, currentUser }}>{children}</AuthContext.Provider>;
};
