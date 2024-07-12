import Category from '@/models/Category';
import { AxiosResponse } from 'axios';
import api, { PageResponse } from './ApiHelper';

export const getCategories = () => api.get<Category[], PageResponse<Category>>('/categories');

export const getCategory = (id: number) => api.get<Category, AxiosResponse<Category>>(`/categories/${id}`);
