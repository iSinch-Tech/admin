import { FC, useState, createContext, ReactNode } from 'react';
type AppContext = {
  title: string;
  setTitle: (title: string) => void;
};

export const AppContext = createContext<AppContext>({} as AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [title, setTitle] = useState('');

  return <AppContext.Provider value={{ title, setTitle }}>{children}</AppContext.Provider>;
};
