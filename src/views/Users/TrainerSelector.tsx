import { searchUsers } from '@/api/Users';
import Loader from '@/components/Loader';
import { UserRole } from '@/enums/userRole.enum';
import Filter from '@/models/Filter';
import User from '@/models/User';
import { Autocomplete, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

type TrainerSelector = {
  setTrainer: (trainer: User | null) => void;
};

export const TrainerSelector: FC<TrainerSelector> = ({ setTrainer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<User | null>(null);
  const [trainers, setTrainers] = useState<User[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const filter: Filter = {
      role: UserRole.TRAINER,
    };
    if (search) {
      filter.name = `%${search}%`;
    }
    searchUsers(filter)
      .then(({ rows }) => {
        setTrainers(rows);
      })
      .finally(() => setIsLoading(false));
  }, [search]);

  const trainerFieldProps = {
    options: trainers,
    getOptionLabel: (trainer: User) => {
      return trainer.name;
    },
  };

  return (
    <>
      <Autocomplete
        {...trainerFieldProps}
        value={search}
        onChange={(_, newValue: User | null) => {
          setSearch(newValue);
          setTrainer(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Тренер" />}
        sx={{ mb: 2 }}
      />
      {isLoading && <Loader />}
    </>
  );
};
