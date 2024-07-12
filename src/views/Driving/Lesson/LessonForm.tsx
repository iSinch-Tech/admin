import { setLesson } from '@/api/Driving';
import { LessonStatus } from '@/enums/LessonStatus.enum';
import { DrivingLesson } from '@/models/DrivingLesson';
import User from '@/models/User';
import { LessonStatusSelector } from '@/views/Driving/Lesson/LessonStatusSelector';
import { UserSelector } from '@/views/Driving/Lesson/UserSelector';
import { Alert, Container, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { FC, SyntheticEvent, useState } from 'react';

type LessonFormProps = {
  user: User | null;
  setUser: (user: User | null) => void;
  lesson: DrivingLesson;
  lessonStatus: LessonStatus;
  setLessonStatus: (status: LessonStatus) => void;
  comment: string;
  setComment: (comment: string) => void;
  background: string;
  setIsLoading: (isLoading: boolean) => void;
  handleClose: () => void;
};

export const LessonForm: FC<LessonFormProps> = ({
  user,
  setUser,
  lesson,
  lessonStatus,
  setLessonStatus,
  comment,
  setComment,
  background,
  setIsLoading,
  handleClose,
}) => {
  const [error, setError] = useState('');
  const addLesson = (event: SyntheticEvent) => {
    event.preventDefault();

    setError('');

    if (!lessonStatus) {
      setError('Выберите статус.');
      return;
    }
    if (lessonStatus === LessonStatus.OPEN && !user) {
      setError('Выберите учащегося.');
      return;
    }

    setIsLoading(true);

    setLesson({ date: lesson.date, id: lesson.id, user: user || undefined, status: lessonStatus, comment })
      .then(() => handleClose())
      .catch((e) => setError(e.value))
      .finally(() => setIsLoading(false));
  };
  return (
    <form onSubmit={addLesson}>
      <DialogContent dividers>
        <Container maxWidth="xs">
          <Paper elevation={12} sx={{ p: 2, position: 'relative', backgroundColor: background }}>
            {error.length > 0 && (
              <Alert sx={{ mb: 2 }} severity="error">
                {error}
              </Alert>
            )}
            <LessonStatusSelector lessonStatus={lessonStatus} setLessonStatus={setLessonStatus} setUser={setUser} />
            <TextField
              fullWidth
              label="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              sx={{ mb: 2 }}
            />
            <UserSelector setUser={setUser} user={user} disabled={lessonStatus === LessonStatus.CLOSE} />
          </Paper>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type={'submit'}>
          Сохранить
        </Button>
      </DialogActions>
    </form>
  );
};
