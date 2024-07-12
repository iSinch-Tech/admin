import { getCategories } from '@/api/Categories';
import Loader from '@/components/Loader';
import Category from '@/models/Category';
import Filter from '@/models/Filter';
import { Autocomplete, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

type CategoriesSelector = {
  setCategory: (category: Category | null) => void;
};

export const CategoriesSelector: FC<CategoriesSelector> = ({setCategory}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const filter: Filter = {
      name: '',
    };
    if (search) {
      filter.name = `%${search}%`;
    }
    getCategories()
      .then(({rows}) => {
        setCategories(rows);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const categoriesFieldProps = {
    options: categories,
    getOptionLabel: (category: Category) => {
      return category.name;
    },
  };

  return (
    <>
      <Autocomplete
        {...categoriesFieldProps}
        value={search}
        onChange={(_, newValue: Category | null) => {
          setSearch(newValue);
          setCategory(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Категория" />}
        sx={{ mb: 2 }}
      />
      {isLoading && <Loader />}
    </>
  );
};