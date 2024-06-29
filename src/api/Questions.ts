import api, { buildFilter } from './ApiHelper';
import Filter from '@/models/Filter';
import Question from '@/models/Question';

export const getQuestions = (offset = 0, limit = 10) => {
  const params = {
    offset,
    limit,
    orderType: 'DESC',
  };
  return api.get('/questions', { params });
};

export const getQuestion = (id: number) => api.get(`/questions/${id}`);

export const searchQuestion = (filter: Filter = {}, offset = 0, limit = 10) => {
  const params = {
    ...buildFilter(filter),
    offset,
    limit,
    orderType: 'DESC',
  };
  return api.get('/questions', { params });
};

export const createQuestion = (data: Question) =>
  api.post('/questions', {
    image: data.image,
    name: data.name,
    text: data.text,
    answers: data.answers,
    categoryId: data.categoryId,
  });

export const updateQuestion = (id: number, data: Partial<Question>) => api.patch(`/questions/${id}`, data);

export const deleteQuestion = (id: number) => api.delete(`/questions/${id}`);
