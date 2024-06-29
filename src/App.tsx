import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import router from '@/router';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from '@/theme/ThemeProvider';
import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';

const App: FC = () => {
  const content = useRoutes(router);

  return (
    <AuthProvider>
      <AppProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            {content}
          </LocalizationProvider>
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
};
export default App;
