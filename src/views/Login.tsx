import { FC, SyntheticEvent, useRef, useState } from 'react';
import { Box, Container, TextField, Button, Paper, Alert, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '@/components/Loader';
import { useAuth } from '@/hooks/useAuth';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`,
);

const Login: FC = () => {
  const navigate = useNavigate();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser, doLogin } = useAuth();

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const login = loginRef.current?.value;
    const pass = passwordRef.current?.value;

    setError('');

    if (!login || !pass) {
      setError('Введите логин и пароль.');
      return;
    }
    setIsLoading(true);

    doLogin(login, pass)
      .then(() => navigate('/'))
      .catch(() => setError('Неверный логин или пароль.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {currentUser ? (
        <Navigate to="/" />
      ) : (
        <MainContent>
          <form onSubmit={onSubmit}>
            <Container maxWidth="xs">
              <Paper elevation={12} sx={{ p: 2, position: 'relative' }}>
                <Avatar sx={{ mx: 'auto', mb: 2 }}>
                  <LockOutlinedIcon />
                </Avatar>
                {error.length > 0 && (
                  <Alert sx={{ mb: 2 }} severity="error">
                    {error}
                  </Alert>
                )}
                <TextField fullWidth label="Логин" inputRef={loginRef} sx={{ mb: 2 }} />
                <TextField
                  fullWidth
                  label="Пароль"
                  inputRef={passwordRef}
                  type="password"
                  autoComplete="current-password"
                  sx={{ mb: 2 }}
                />
                <Button fullWidth variant="outlined" color="primary" type="submit">
                  Войти
                </Button>
                {isLoading && <Loader />}
              </Paper>
            </Container>
          </form>
        </MainContent>
      )}
    </>
  );
};

export default Login;
