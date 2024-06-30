import { searchUsers } from '@/api/Users';
import Loader from '@/components/Loader';
import { UserRole } from '@/enums/userRole.enum';
import Filter from '@/models/Filter';
import User from '@/models/User';
import { Autocomplete, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

type UserSelectorProps = {
  setUser: (user: User | null) => void;
  user: User | null;
  disabled: boolean;
};

export const UserSelector: FC<UserSelectorProps> = ({ setUser, user, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<User | null>(user);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const filter: Filter = {
      role: UserRole.USER,
    };
    if (search) {
      filter.name = `%${search}%`;
    }
    searchUsers(filter)
      .then(({ rows }) => {
        setUsers(rows);
      })
      .finally(() => setIsLoading(false));
  }, [search]);

  const userFieldProps = {
    options: users,
    getOptionLabel: (user: User) => {
      return user.name;
    },
  };

  return (
    <>
      <Autocomplete
        {...userFieldProps}
        value={search}
        onChange={(_, newValue: User | null) => {
          setSearch(newValue);
          setUser(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Ученик" />}
        sx={{ mb: 2 }}
        disabled={disabled}
      />
      {isLoading && <Loader />}
    </>
  );
};
