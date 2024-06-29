import { FC } from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';

const Loader: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: '999999',
        background: theme.colors.alpha.white[70],
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={64} disableShrink thickness={3} />
    </Box>
  );
};

export default Loader;
