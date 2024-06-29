import api from './ApiHelper';

export const getCategories = () => api.get('/categories');

export const getCategorie = (id: number) => api.get(`/categories/${id}`);
