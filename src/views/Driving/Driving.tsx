import { generateDriving, getDriving, mockTrainers } from '@/api/Driving';
import Loader from '@/components/Loader';
import TableData from '@/components/TableData';
import { AppContext } from '@/contexts/AppContext';
import { AuthContext } from '@/contexts/AuthContext';
import { UserRole } from '@/enums/userRole.enum';
import { DrivingLesson } from '@/models/DrivingLesson';
import Filter from '@/models/Filter';
import User from '@/models/User';
import { drivingColumns } from '@/views/Driving/DrivingColumns';
import { drivingRows } from '@/views/Driving/DrivingRows';
import { switchMonth } from '@/views/Driving/switchMonth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import { Button, Container, Paper } from '@mui/material';
import React, { FC, useContext, useEffect, useState } from 'react';

export const Driving: FC = () => {
  const { setTitle } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [driving, setDriving] = useState<DrivingLesson[]>([]);
  const [trainers, setTrainers] = useState<User[]>([]);

  const scheduleTitleOptions = {
    weekday: undefined,
    year: 'numeric' as const,
    month: 'long' as const,
    day: undefined,
  };
  const [scheduleTitle, setScheduleTitle] = useState(
    (driving?.length ? driving[0].date : new Date()).toLocaleDateString('ru-RU', scheduleTitleOptions),
  );
  // Заголовок страницы
  useEffect(() => {
    setTitle('Расписание');
    return () => {
      setTitle('');
    };
  }, []);

  // Загружаем расписание
  useEffect(() => {
    setIsLoading(true);
    getDriving({ date: new Date().toString() })
      .then((res) => {
        if (res?.length) {
          setDriving(res);
          setScheduleTitle(res[0].date.toLocaleDateString('ru-RU', scheduleTitleOptions));
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Загружаем тренеров
  useEffect(() => {
    setIsLoading(true);
    const filter: Filter = {
      role: UserRole.TRAINER,
    };
    //   searchUsers(filter)
    //     .then(({ rows }) => {
    //       setTrainers(rows);
    //     })
    //     .finally(() => setIsLoading(false));
    setTrainers(mockTrainers);
  }, []);

  const generateDrivingHandler = () => {
    setIsLoading(true);
    generateDriving(new Date().toString())
      .then((res) => {
        setDriving(res);
      })
      .finally(() => setIsLoading(false));
  };

  const getPreviousMonth = () => {
    setIsLoading(true);
    getDriving({ date: switchMonth(driving ? driving[0].date : new Date(), true).toString() })
      .then((res) => {
        if (res) {
          setDriving(res);
          setScheduleTitle(res[0].date.toLocaleDateString('ru-RU', scheduleTitleOptions));
        }
      })
      .finally(() => setIsLoading(false));
  };

  const getNextMonth = () => {
    setIsLoading(true);
    getDriving({ date: switchMonth(driving ? driving[0].date : new Date(), false).toString() })
      .then((res) => {
        if (res) {
          setDriving(res);
          setScheduleTitle(res[0].date.toLocaleDateString('ru-RU', scheduleTitleOptions));
        } else {
          setDriving([]);
          setScheduleTitle(
            switchMonth(driving ? driving[0].date : new Date(), false).toLocaleDateString(
              'ru-RU',
              scheduleTitleOptions,
            ),
          );
        }
      })
      .finally(() => setIsLoading(false));
  };

  const GenerateDrivingBtn = () => {
    if (currentUser?.role === UserRole.ADMIN) {
      return (
        <Button
          variant="contained"
          startIcon={<CalendarIcon />}
          onClick={generateDrivingHandler}
          sx={{ margin: '20px' }}
        >
          Сгенерировать расписание
        </Button>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <h2 style={{ margin: '20px' }}>{scheduleTitle}</h2>
        <div>
          <Button variant={'text'} onClick={getPreviousMonth}>
            <ArrowBackIosIcon />
          </Button>
          <Button variant={'text'} onClick={getNextMonth}>
            <ArrowForwardIosIcon />
          </Button>
        </div>
      </Paper>
      {driving.length ? (
        <Paper sx={{ p: 2, position: 'relative' }}>
          <TableData rows={drivingRows(driving)} columns={drivingColumns({ trainers, driving })} />
        </Paper>
      ) : (
        <GenerateDrivingBtn />
      )}
      {isLoading && <Loader />}
    </Container>
  );
};
