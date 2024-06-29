import Filter from '@/models/Filter';
import api, { buildFilter } from './ApiHelper';

export const getExams = (filter: Filter = {}, offset = 0, limit = 10) => {
  const params = {
    ...buildFilter(filter),
    offset,
    limit,
    orderType: 'DESC',
  };
  return api.get(`/exams`, { params });
};

export const deleteExams = (userId: number, type = null) => {
  const params = {
    ...buildFilter({
      userId,
      type,
    }),
  };
  return api.delete(`/exams`, { params });
};
