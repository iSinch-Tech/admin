import { FC, useRef, useState } from 'react';

import { Avatar, Box, Button, Divider, List, ListItem, ListItemText, Popover, Typography, Link } from '@mui/material';

import { styled } from '@mui/material/styles';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import WebIcon from '@mui/icons-material/Web';
import { useAuth } from '@/hooks/useAuth';

const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
  `,
);

const HeaderUserbox: FC = () => {
  const { currentUser } = useAuth();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button color="secondary" ref={ref} onClick={handleOpen} sx={{ px: 1 }}>
        {currentUser && (
          <Avatar alt={currentUser.name}>
            {currentUser.name
              .split(' ')
              .map((w) => w[0])
              .join()}
          </Avatar>
        )}
      </Button>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex" alignItems="center">
          {currentUser && (
            <>
              <Avatar alt={currentUser.name}>
                {currentUser.name
                  .split(' ')
                  .map((w) => w[0])
                  .join()}
              </Avatar>
              <Typography variant="body1" fontWeight={500} sx={{ ml: 1 }}>
                {currentUser.name}
              </Typography>
            </>
          )}
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem href="/" component={Link}>
            <WebIcon fontSize="small" sx={{ mr: 1 }} />
            <ListItemText primary="На сайт" />
          </ListItem>
          <ListItem href="/" component={Link}>
            <LockOpenTwoToneIcon fontSize="small" sx={{ mr: 1 }} />
            <ListItemText primary="Выйти" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default HeaderUserbox;
