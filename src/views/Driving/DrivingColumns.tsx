import { DrivingLesson } from '@/models/DrivingLesson';
import User from '@/models/User';
import { LessonMenu } from '@/views/Driving/Lesson/LessonMenu';
import { Box } from '@mui/material';
import React from 'react';

type ScheduleColumnsProps = {
  trainers: User[];
  driving: DrivingLesson[];
};

export const drivingColumns = ( { trainers, driving }: ScheduleColumnsProps ) => {
  const trainersColumns = trainers.map( ( trainer ) => {
    const trainerLessons = driving.filter( ( lesson ) => lesson.trainerId === trainer.id );
    return {
      title: trainer.name,
      template: ( row: DrivingLesson ) => {
        const dayLessons = trainerLessons
          .sort( ( a, b ) => Number( a.date ) - Number( b.date ) )
          .filter( ( lesson ) => {
            return (
              row.date.toString() ===
              new Intl.DateTimeFormat( 'ru-RU', {
                weekday: 'long' as const,
                year: undefined,
                month: 'long' as const,
                day: 'numeric' as const
              } ).format( new Date( lesson.date ) )
            );
          } );
        return (
          <Box
            sx={ {
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'left'
            } }
          >
            { dayLessons.length ? (
              dayLessons.map( ( lesson ) => {
                return <LessonMenu key={ lesson.id } lesson={ lesson } />;
              } )
            ) : (
                <></>
              ) }
          </Box>
        );
      }
    };
  } );
  return [
    {
      title: 'Дата',
      field: 'date'
    },
    ...trainersColumns
  ];
};
