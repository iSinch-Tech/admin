import Topic from '@/models/Topic';
import api from './ApiHelper';

export const getTopics = (offset = 0, limit = 100) => {
  const params = {
    offset,
    limit,
  };
  return api.get('/topics', { params });
};

export const getTopic = (id: number) => api.get(`/topics/${id}`);

export const createTopic = (data: Topic) =>
  api.post('/topics', {
    name: data.name,
    questions: data.questions,
  });

export const updateTopic = (id: number, data: Partial<Topic>) => api.patch(`/topics/${id}`, data);

export const deleteTopic = (id: number) => api.delete(`/topics/${id}`);
