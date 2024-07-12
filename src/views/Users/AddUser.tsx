import { createUser } from '@/api/Users';
import Loader from '@/components/Loader';
import { AppContext } from '@/contexts/AppContext';
import { UserRole } from '@/enums/userRole.enum';
import { UserStatus } from '@/enums/userStatus.enum';
import { NewUser } from '@/models/User';
import { translateRuToEn } from '@/utils/translateRuToEn';
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

  const [ user, setUser ] = useState<NewUser>( {
                                                 login: '',
                                                 name: '',
                                                 password: '',
                                                 role: UserRole.USER,
                                                 categoryId: null,
                                                 driverLicenseId: null,
                                                 trainerId: null,
                                                 phone: '',
                                                 birthdate: new Date(),
                                                 firebaseToken: null,
                                                 status: UserStatus.UNCONFIRMED
                                               } );
  const [ surname, setSurname ] = useState( '' );
  const [ name, setName ] = useState( '' );
  const [ patronymic, setPatronymic ] = useState( '' );
  const [ error, setError ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );
  const userRoleOptions = Object.values( UserRole );

  useEffect( () => {
    const userName = ( surname.trim() + ' ' + name.trim() + ' ' + patronymic.trim() ).trim();
    setUser( ( prevUser ) => ( { ...prevUser, name: userName } ) );
    const newLogin = translateRuToEn( surname.trim() + ( name ? '_' : '' ) + name.trim() + ( patronymic ? '_' : '' ) + patronymic.trim() );
    setUser( ( prevUser ) => ( { ...prevUser, login: newLogin } ) );
  }, [ surname, name, patronymic ] );

  const addUser = ( event: SyntheticEvent ) => {
    event.preventDefault();

    setError( '' );

      const newUser: NewUser = {
        ...user,
        status: UserStatus.ACTIVE,
        driverLicenseId: null,
        firebaseToken: []
      };
      setIsLoading( true );

      createUser( newUser )
        .then( () => {
          navigate( '/users' );
        } )
        .catch( ( e ) => setError( e.value ) )
        .finally( () => setIsLoading( false ) );
  };

  return (
    <Paper>
      <Grid container justifyContent="center" alignItems="center" direction="column" padding="50px">
        <Grid item width="360px" textAlign="center">
          <form onSubmit={ addUser }>
            { error && (
              <Alert sx={ { mb: 2 } } severity="error">
                { error }
              </Alert>
            ) }
            <TextField sx={ { mb: 1 } } placeholder="Фамилия" fullWidth value={ surname }
                       onChange={ ( e ) => setSurname( e.currentTarget.value ) } required />
            <TextField sx={ { mb: 1 } } placeholder="Имя" fullWidth value={ name }
                       onChange={ ( e ) => setName( e.currentTarget.value ) } required />
            <TextField sx={ { mb: 1 } } placeholder="Отчество или второе имя" fullWidth value={ patronymic }
                       onChange={ ( e ) => setPatronymic( e.currentTarget.value ) } required />
            <TextField sx={ {
              mb: 1,
              '& input[type=number]': {
                '-moz-appearance': 'textfield',
                '&::-webkit-outer-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0
                },
                '&::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0
                }
              }
            } } placeholder="Номер телефона"
                       fullWidth value={ user.phone }
                       onChange={ ( e ) => setUser( { ...user, phone: e.currentTarget.value } ) }
                       type="number"
                       onWheel={(e) => e.currentTarget.blur()}
                       required

            />
            <TextField sx={ { mb: 1 } } placeholder="Логин" fullWidth value={ user.login }
                       onChange={ ( e ) => setUser( { ...user, login: e.currentTarget.value } ) } required />
            <TextField sx={ { mb: 1 } } placeholder="Пароль" fullWidth value={ user.password }
                       onChange={ ( e ) => setUser( { ...user, password: e.currentTarget.value } ) } type="password"
                       required />
            <Box sx={ { marginBottom: 1 } }>
              <LocalizationProvider dateAdapter={ AdapterLuxon } adapterLocale="ru-RU">
                <DatePicker
                  label="Дата рождения"
                  value={ user.birthdate }
                  onChange={ ( newValue ) => newValue && setUser( { ...user, birthdate: newValue } ) }
                  renderInput={ props => <TextField label="Дата рождения" fullWidth { ...props } /> }
                  disableFuture
                  inputFormat="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Box>
            <Autocomplete
              options={ userRoleOptions }
              getOptionLabel={ ( option ) => {
                switch ( option ) {
                  case UserRole.ADMIN:
                    return 'Администратор'
                  case UserRole.TRAINER:
                    return 'Инструктор'
                  case UserRole.STUDENT:
                    return 'Студент'
                  case UserRole.USER:
                    return 'Пользователь'
                  default:
                    return 'Выберите роль'
                }
              } }
              value={ user.role }
              onChange={ ( _, newValue ) => setUser( { ...user, role: newValue || UserRole.USER } ) }
              renderInput={ ( params ) => <TextField { ...params } label="Роль пользователя" /> }
              sx={ { mb: 1 } }
            />
            { ( user.role === UserRole.USER || user.role === UserRole.STUDENT ) &&
              <>
                <TrainerSelector
                  setTrainer={ ( trainer ) => setUser( { ...user, trainerId: trainer ? trainer.id : null } ) } />
                <CategoriesSelector
                  setCategory={ ( category ) => setUser( { ...user, categoryId: category ? category.id : null } ) } />
              </>
            }
            <Button autoFocus type={ 'submit' } sx={ { mb: 5, mt: 2 } } variant={ 'contained' }>
              Добавить пользователя
            </Button>
          </form>
        </Grid>
      </Grid>
      { isLoading && <Loader /> }
    </Paper>
  );
};