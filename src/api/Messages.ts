import api, { buildFilter } from './ApiHelper';

export const getMessages = (userId: number, offset = 0, limit = 100) => {
  const params = {
    offset,
    limit,
    ...buildFilter({
      recipientId: userId,
    }),
  };
  return api.get('/messages', { params });
};

export const sendMessage = (userId: number, text: string) =>
  api.post('/messages', {
    recipientId: userId,
    text: text,
  });

export const deleteMessage = (id: number) => api.delete(`/messages/${id}`);
