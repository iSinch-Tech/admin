import { createUser } from '@/api/Users';
import Loader from '@/components/Loader';
import { AppContext } from '@/contexts/AppContext';
import { UserRole } from '@/enums/userRole.enum';
import { UserStatus } from '@/enums/userStatus.enum';
import Category from '@/models/Category';
import User, { NewUser } from '@/models/User';
import { CategoriesSelector } from '@/views/Users/CategoriesSelector';
import { TrainerSelector } from '@/views/Users/TrainerSelector';
import { Alert, Autocomplete, Box, Grid, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import React, { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddUser: FC = () => {
  const { setTitle } = useContext( AppContext );
  const navigate = useNavigate();

  useEffect( () => {
    setTitle( 'Добавить пользователя' );
    return () => {
      setTitle( '' );
    };
  }, [] );

  const [ error, setError ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ surname, setSurname ] = useState( '' );
  const [ name, setName ] = useState( '' );
  const [ patronymic, setPatronymic ] = useState( '' );
  const [ phone, setPhone ] = useState( '' );
  const [ birthDate, setBirthDate ] = useState<Date | null>( null );
  const [ login, setLogin ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [role, setRole] = useState<UserRole | null>(null);
  const userRoleOptions = Object.values(UserRole);
  const [trainer, setTrainer] = useState<User | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const addUser = ( event: SyntheticEvent ) => {
    event.preventDefault();

    setError( '' );

    if (surname && name && phone && birthDate && login && password && role && category) {
      const newUser: NewUser = {
        login: login,
        name: (`${surname} ${name} ${patronymic}`).trim(),
        password: password,
        role: role,
        trainerId: trainer ? trainer.id : null,
        phone: phone,
        birthdate: birthDate,
        status: UserStatus.ACTIVE,
        categoryId: category.id,
        driverLicenseId: null,
        firebaseToken: [],
      }
      setIsLoading( true );

      createUser(newUser)
        .then(() => {
          navigate( '/users' );
        })
        .catch((e) => setError(e.value))
        .finally(() => setIsLoading(false));

    } else {
      setError('Все поля обязательны!')
    }
  };

  return (
    <Paper>
      <Grid container justifyContent="center" alignItems="center" direction="column" padding='50px'>
        <Grid item width="360px" textAlign="center">
          <form onSubmit={ addUser }>
            { error && (
              <Alert sx={ { mb: 2 } } severity="error">
                { error }
              </Alert>
            ) }
            <TextField sx={ { mb: 1 } } placeholder="Фамилия" fullWidth value={ surname }
                       onChange={ ( e ) => setSurname( e.currentTarget.value ) }  required />
            <TextField sx={ { mb: 1 } } placeholder="Имя" fullWidth value={ name }
                       onChange={ ( e ) => setName( e.currentTarget.value ) } required />
            <TextField sx={ { mb: 1 } } placeholder="Отчество или второе имя" fullWidth value={ patronymic }
                       onChange={ ( e ) => setPatronymic( e.currentTarget.value ) } required />
            <TextField sx={ { mb: 1 } } placeholder="Номер телефона" fullWidth value={ phone }
                       onChange={ ( e ) => setPhone( e.currentTarget.value ) } required />
            <TextField sx={ { mb: 1 } } placeholder="Логин" fullWidth value={ login }
                       onChange={ ( e ) => setLogin( e.currentTarget.value ) } required />
            <TextField sx={ { mb: 1 } } placeholder="Пароль" fullWidth value={ password }
                       onChange={ ( e ) => setPassword( e.currentTarget.value ) } type="password" required />
            <Box sx={ { marginBottom: 1 } } >
            <LocalizationProvider dateAdapter={ AdapterLuxon } adapterLocale="ru-RU">
              <DatePicker
                label="Дата рождения"
                value={ birthDate }
                onChange={ ( newValue ) => setBirthDate( newValue ) }
                renderInput={ props => <TextField label="Дата рождения" fullWidth { ...props } /> }
                disableFuture
                inputFormat="dd/MM/yyyy"
              />
            </LocalizationProvider>
            </Box>
            <Autocomplete
              options={userRoleOptions}
              getOptionLabel={(option) => option}
              value={role}
              onChange={(_, newValue) => {
                setRole(newValue || role)
              }}
              renderInput={(params) => <TextField {...params} label="Роль пользователя" />}
              sx={{ mb: 1 }}
            />
            {(role === UserRole.USER || role === UserRole.STUDENT) &&
             <>
               <TrainerSelector setTrainer={setTrainer} />
               <CategoriesSelector setCategory={setCategory} />
             </>
            }
            <Button autoFocus type={ 'submit' } sx={{ mb: 5, mt: 2 }} variant={'contained'}>
              Добавить пользователя
            </Button>
          </form>
        </Grid>
      </Grid>
      { isLoading && <Loader /> }
    </Paper>
  );
};