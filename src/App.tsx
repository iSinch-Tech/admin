import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import router from '@/router';
import ThemeProvider from '@/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

const App: FC = () => {
  const content = useRoutes(router);

  return (
    <AuthProvider>
      <AppProvider>
        <ThemeProvider>
            <CssBaseline />
            {content}
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
};
export default App;
