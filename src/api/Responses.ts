import api from './ApiHelper';

export const getResponses = (userId: number, offset = 0, limit = 10) => {
  const params = {
    offset,
    limit,
    orderType: 'DESC',
  };
  return api.get(`/responses/user/${userId}`, { params });
};

export const deleteResponses = (userId: number) => api.delete(`/responses/user/${userId}`);
