import { DrivingLesson } from '@/models/DrivingLesson';
import Button from '@mui/material/Button';
import React, { FC } from 'react';

type LessonItemBtnProps = {
  lesson: DrivingLesson;
  handleClickOpen: () => void;
  background: string;
};

export const LessonItemBtn: FC<LessonItemBtnProps> = ({ lesson, handleClickOpen, background }) => {
  return (
    <Button
      variant="outlined"
      onClick={handleClickOpen}
      sx={{ color: '#223354', border: '1px solid #223354', backgroundColor: background }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>
          {lesson.date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <span>{lesson.user?.name}</span>
        <span>{lesson.comment}</span>
      </div>
    </Button>
  );
};
