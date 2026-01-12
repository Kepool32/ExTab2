import { create } from 'zustand';
import type { Vacancy, Favorite, CreateVacancyDto, PaginationMeta, SearchVacanciesParams, PaginatedResponse } from '@types';
import { vacanciesApi } from '@api/vacancies';
import { favoritesApi } from '@api/favorites';

interface VacanciesState {
  vacancies: Vacancy[];
  favorites: Favorite[];
  selectedVacancy: Vacancy | null;
  paginationMeta: PaginationMeta | null;
  isLoading: boolean;
  isLoadingFavorites: boolean;
  error: string | null;
  fetchVacancies: (params?: SearchVacanciesParams) => Promise<void>;
  fetchVacancyById: (id: number) => Promise<void>;
  createVacancy: (data: CreateVacancyDto) => Promise<void>;
  deleteVacancy: (id: number) => Promise<void>;
  fetchFavorites: () => Promise<void>;
  addToFavorites: (vacancyId: number) => Promise<void>;
  removeFromFavorites: (id: number) => Promise<void>;
  setSelectedVacancy: (vacancy: Vacancy | null) => void;
  clearError: () => void;
}

export const useVacanciesStore = create<VacanciesState>((set, get) => ({
  vacancies: [],
  favorites: [],
  selectedVacancy: null,
  paginationMeta: null,
  isLoading: false,
  isLoadingFavorites: false,
  error: null,

  fetchVacancies: async (params?: SearchVacanciesParams) => {
    set({ isLoading: true, error: null });
    try {
      let response: PaginatedResponse<Vacancy>;
      
      if (params?.keyword) {
        response = await vacanciesApi.search(params);
      } else {
        response = await vacanciesApi.getAll({ 
          page: params?.page, 
          limit: params?.limit 
        });
      }
      
      if (response && typeof response === 'object' && 'items' in response && Array.isArray(response.items)) {
        set({ 
          vacancies: response.items, 
          paginationMeta: response.meta || null,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching vacancies:', error);
      const errorMessage = (error as any)?.userMessage || (error instanceof Error ? error.message : 'Не удалось загрузить вакансии');
      set({
        vacancies: [],
        paginationMeta: null,
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  fetchVacancyById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const vacancy = await vacanciesApi.getById(id);
      set({ selectedVacancy: vacancy, isLoading: false });
    } catch (error) {
      const errorMessage = (error as any)?.userMessage || (error instanceof Error ? error.message : 'Не удалось загрузить вакансию');
      set({
        error: errorMessage,
        isLoading: false,
        selectedVacancy: null,
      });
    }
  },

  createVacancy: async (data: CreateVacancyDto) => {
    set({ isLoading: true, error: null });
    try {
      const newVacancy = await vacanciesApi.create(data);
      const currentVacancies = get().vacancies;
      set({
        vacancies: [newVacancy, ...currentVacancies],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = (error as any)?.userMessage || (error instanceof Error ? error.message : 'Не удалось создать вакансию');
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  deleteVacancy: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await vacanciesApi.delete(id);
      const state = get();
      set({
        vacancies: state.vacancies.filter((v) => v.id !== id),
        favorites: state.favorites.filter((f) => f.vacancyId !== id),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = (error as any)?.userMessage || (error instanceof Error ? error.message : 'Не удалось удалить вакансию');
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  fetchFavorites: async () => {
    set({ isLoadingFavorites: true });
    try {
      const favorites = await favoritesApi.getAll();
      set({ favorites, isLoadingFavorites: false });
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      set({ isLoadingFavorites: false });
    }
  },

  addToFavorites: async (vacancyId: number) => {
    try {
      const favorite = await favoritesApi.create({ vacancyId });
      if (favorite && favorite.vacancy) {
        const currentFavorites = get().favorites;
        set({
          favorites: [...currentFavorites, favorite],
        });
      } else {
        const favorites = await favoritesApi.getAll();
        set({ favorites });
      }
    } catch (error) {
      console.error('Failed to add to favorites:', error);
      throw error;
    }
  },

  removeFromFavorites: async (id: number) => {
    try {
      await favoritesApi.delete(id);
      const currentFavorites = get().favorites;
      set({
        favorites: currentFavorites.filter((f) => f.id !== id),
      });
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
    }
  },

  setSelectedVacancy: (vacancy: Vacancy | null) => set({ selectedVacancy: vacancy }),

  clearError: () => set({ error: null }),
}));
