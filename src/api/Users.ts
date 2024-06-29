import api, { buildFilter, PageResponse } from './ApiHelper';
import Filter from '@/models/Filter';
import User from '@/models/User';

export const searchUsers = (filter: Filter = {}, offset = 0, limit = 10) => {
  const params = {
    ...buildFilter(filter),
    offset,
    limit,
    orderType: 'DESC',
  };

  return api.get<unknown, PageResponse<User>>('/users', { params });
};

export const getUsers = (offset = 0, limit = 10) => searchUsers({}, offset, limit);

export const getUser = (id: number) => api.get(`/users/${id}`);

export const createUser = (user: User) =>
  api.post('/users', {
    login: user.login,
    name: user.name,
    password: user.password,
    role: user.role,
    categoryId: user.categoryId,
  });

export const updateUser = (id: number, user: Partial<User>) => api.patch(`/users/${id}`, user);

export const deleteUser = (id: number) => api.delete(`/users/${id}`);
