import api, { buildFilter } from './ApiHelper';
import Filter from '@/models/Filter';
import Ticket from '@/models/Ticket';

export const getTickets = (filter: Filter = {}, offset = 0, limit = 100) => {
  const params = {
    ...buildFilter(filter),
    offset,
    limit,
  };
  return api.get('/tickets', { params });
};

export const getTicket = (id: number) => api.get(`/tickets/${id}`);

export const createTicket = (data: Ticket) =>
  api.post('/tickets', {
    name: data.name,
    categoryId: data.categoryId,
    questions: data.questions,
  });

export const updateTicket = (id: number, data: Partial<Ticket>) => api.patch(`/tickets/${id}`, data);

export const deleteTicket = (id: number) => api.delete(`/tickets/${id}`);
