import { apiClient } from '@api/client';
import type { Vacancy, CreateVacancyDto, PaginatedResponse, SearchVacanciesParams } from '@types';

export const vacanciesApi = {
  getAll: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Vacancy>> => {
    const response = await apiClient.get<PaginatedResponse<Vacancy>>('/vacancies', { params });
    return response.data;
  },
  search: async (params?: SearchVacanciesParams): Promise<PaginatedResponse<Vacancy>> => {
    const response = await apiClient.get<PaginatedResponse<Vacancy>>('/vacancies/search', { params });
    return response.data;
  },
  getById: async (id: number): Promise<Vacancy> => {
    const response = await apiClient.get<Vacancy>(`/vacancies/${id}`);
    return response.data;
  },
  create: async (data: CreateVacancyDto): Promise<Vacancy> => {
    const response = await apiClient.post<Vacancy>('/vacancies', data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/vacancies/${id}`);
  },
};
