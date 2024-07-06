import { FC, SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import { Container, Tooltip, IconButton, useTheme, Paper, Tabs, Tab, Box, Button, TextField } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ClearIcon from '@mui/icons-material/Clear';
import { UserStatus } from '@/enums/userStatus.enum';
import User from '@/models/User';
import { searchUsers } from '@/api/Users';
import Loader from '@/components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import TableData from '@/components/TableData';
import { AppContext } from '@/contexts/AppContext';
import Filter from '@/models/Filter';

const Users: FC = () => {
  const theme = useTheme();
  const { setTitle } = useContext(AppContext);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle('Пользователи');
    return () => {
      setTitle('');
    };
  }, []);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState(UserStatus.ACTIVE);
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState({
    count: 0,
    page: 0,
    limit: 10,
  });

  const columns = [
    {
      field: 'login',
      title: 'Логин',
    },
    {
      field: 'name',
      title: 'ФИО',
    },
    {
      field: 'phone',
      title: 'Телефон',
    },
    {
      title: 'Категория',
      template: (row: User) => <>{row?.category?.name}</>,
    },
    {
      title: '',
      attr: {
        align: 'right',
      },
      template: (row: User) => (
        <>
          <Tooltip placement="top" title="Открыть профиль" arrow>
            <Link to={`/users/${row.id}`}>
              <IconButton
                sx={{
                  '&:hover': {
                    background: theme.colors.primary.lighter,
                  },
                  color: theme.palette.primary.main,
                  mr: 1,
                }}
                color="inherit"
                size="small"
              >
                <ContactPageIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip placement="top" title="Заблокировать" arrow>
            <IconButton
              sx={{
                '&:hover': {
                  background: theme.colors.error.lighter,
                },
                color: theme.palette.error.main,
              }}
              color="inherit"
              size="small"
            >
              <LockPersonIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    const filter: Filter = {
      status,
    };
    if (search) {
      filter.name = `%${search}%`;
    }
    searchUsers(filter, paginationState.page * paginationState.limit, paginationState.limit)
      .then(({ rows, count }) => {
        setUsers(rows);
        setPaginationState((p) => ({
          ...p,
          count: Math.ceil(count / paginationState.limit),
        }));
      })
      .finally(() => setIsLoading(false));
  }, [paginationState.page, paginationState.limit, status, search]);

  const searchHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    searchRef.current?.value && setSearch(searchRef.current?.value);
  };

  const searchResetHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!searchRef.current?.value) {
      return;
    }
    searchRef.current.value = '';
    setSearch('');
  };

  const toAddUserPage = () => {
    navigate('/users/add-user')
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <form onSubmit={searchHandler}>
          <TextField
            sx={{ mr: 1 }}
            InputProps={{
              sx: { height: 40 },
              endAdornment: (
                <IconButton
                  sx={{
                    visibility: searchRef.current?.value ? 'visible' : 'hidden',
                  }}
                  onClick={searchResetHandler}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
            label="ФИО/Телефон"
            size="small"
            inputRef={searchRef}
          />
          <Button variant="contained" type="submit" startIcon={<PersonSearchIcon />}>
            Найти
          </Button>
        </form>
        <Box>
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={toAddUserPage}>
            Добавить
          </Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, position: 'relative' }}>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={status}
          sx={{ mb: 2 }}
          onChange={(_, nv: UserStatus) => setStatus(nv)}
        >
          <Tab label="Активные" value={UserStatus.ACTIVE} sx={{ textTransform: 'none' }} />
          <Tab label="Не активные" value={UserStatus.INACTIVE} sx={{ textTransform: 'none' }} />
          <Tab label="Ожидающие подтверждения" value={UserStatus.UNCONFIRMED} sx={{ textTransform: 'none' }} />
        </Tabs>
        <TableData
          columns={columns}
          rows={users}
          pagination={paginationState}
          updatePagination={(data) => setPaginationState((s) => ({ ...s, ...data }))}
        />
        {isLoading && <Loader />}
      </Paper>
    </Container>
  );
};

export default Users;
