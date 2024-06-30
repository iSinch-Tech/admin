import { LessonStatus } from '@/enums/LessonStatus.enum';
import User from '@/models/User';
import { Autocomplete, TextField } from '@mui/material';
import React, { FC } from 'react';

type LessonStatusSelectorProps = {
  lessonStatus: LessonStatus;
  setLessonStatus: (status: LessonStatus) => void;
  setUser: (user: User | null) => void;
};

export const LessonStatusSelector: FC<LessonStatusSelectorProps> = ({ lessonStatus, setLessonStatus, setUser }) => (
    <Autocomplete
      options={['Открыто', 'Закрыто']}
      getOptionLabel={(option) => option}
      value={lessonStatus === LessonStatus.OPEN ? 'Открыто' : 'Закрыто'}
      onChange={(_, newValue) => {
        if (newValue === 'Открыто') {
          setLessonStatus(LessonStatus.OPEN);
        } else if (newValue === 'Закрыто') {
          setLessonStatus(LessonStatus.CLOSE);
          setUser(null);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Статус занятия" />}
      sx={{ mb: 2 }}
    />
  );
