import { DrivingLesson } from '@/models/DrivingLesson';

export const drivingRows = ( driving: DrivingLesson[] ) => {
  const year = driving[0].date.getFullYear();
  const month = driving[0].date.getMonth();

  const daysInMonth = new Date( year, month + 1, 0 ).getDate();
  const datesForSchedule = [];

  for ( let day = 1; day <= daysInMonth; day++ ) {
    const rowDate = new Intl.DateTimeFormat( 'ru-RU', {
      weekday: 'long' as const,
      year: undefined,
      month: 'long' as const,
      day: 'numeric' as const
    } ).format( new Date( year, month, day ) );
    datesForSchedule.push( rowDate );
  }
  return datesForSchedule.map( ( day ) => ( {
    id: Math.random(),
    date: day
  } ) );
};
