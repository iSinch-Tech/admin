import Loader from '@/components/Loader';
import { LessonStatus } from '@/enums/LessonStatus.enum';
import { DrivingLesson } from '@/models/DrivingLesson';
import User from '@/models/User';
import { LessonForm } from '@/views/Driving/Lesson/LessonForm';
import { LessonItemBtn } from '@/views/Driving/Lesson/LessonItemBtn';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { FC, useState } from 'react';

type DrivingLessonMenuProps = {
  lesson: DrivingLesson;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '30vw',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const LessonMenu: FC<DrivingLessonMenuProps> = ({ lesson }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(lesson.user || null);
  const [lessonStatus, setLessonStatus] = useState<LessonStatus>(lesson.status);
  const [comment, setComment] = useState(lesson.comment || '');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setUser(lesson.user || null);
    setLessonStatus(lesson.status);
    setComment(lesson.comment || '');

    setOpen(false);
  };

  const background = lessonStatus === LessonStatus.OPEN ? 'rgba(60, 179, 113, 0.4)' : 'rgba(255, 0, 0, 0.4)';

  return (
    <>
      <LessonItemBtn lesson={lesson} handleClickOpen={handleClickOpen} background={background} />
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {lesson.user ? 'Отредактировать запись' : 'Добавить запись'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <LessonForm
          user={user}
          setUser={setUser}
          lesson={lesson}
          lessonStatus={lessonStatus}
          setLessonStatus={setLessonStatus}
          comment={comment}
          setComment={setComment}
          background={background}
          handleClose={handleClose}
          setIsLoading={setIsLoading}
        />
      </BootstrapDialog>
      {isLoading && <Loader />}
    </>
  );
};
