import { FC } from 'react';
import { Container, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const User: FC = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 2, position: 'relative' }}>Test {id}</Paper>
    </Container>
  );
};

export default User;
