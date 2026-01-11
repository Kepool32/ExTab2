import { apiClient } from '@api/client';
import type { Favorite, CreateFavoriteDto } from '@types';

export const favoritesApi = {
  getAll: async (): Promise<Favorite[]> => {
    const response = await apiClient.get<Favorite[]>('/favorites');
    return response.data;
  },
  create: async (data: CreateFavoriteDto): Promise<Favorite> => {
    const response = await apiClient.post<Favorite>('/favorites', data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/favorites/${id}`);
  },
};
