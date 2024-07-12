import Filter from '@/models/Filter';
import User, { NewUser } from '@/models/User';
import { AxiosResponse } from 'axios';
import api, { buildFilter, PageResponse } from './ApiHelper';

export const searchUsers = (filter: Filter = {}, offset = 0, limit = 10) => {
  const params = {
    ...buildFilter(filter),
    offset,
    limit,
    orderType: 'DESC',
  };

  return api.get<User[], PageResponse<User>>('/users', { params });
};

export const getUsers = (offset = 0, limit = 10) => searchUsers({}, offset, limit);

export const getUser = (id: number) => api.get<User, AxiosResponse<User>>(`/users/${id}`);

export const createUser = (user: NewUser) =>
  api.post<User, PageResponse<User>, NewUser>('/users', {
    login: user.login,
    name: user.name,
    password: user.password,
    phone: user.phone,
    birthdate: user.birthdate,
    role: user.role,
    categoryId: user.categoryId,
    trainerId: user.trainerId,
    driverLicenseId: user.driverLicenseId,
    firebaseToken: user.firebaseToken,
    status: user.status,
  });

export const updateUser = (id: number, user: Partial<User>) => api.patch(`/users/${id}`, user);

export const deleteUser = (id: number) => api.delete(`/users/${id}`);
