export interface Vacancy {
  id: number;
  title: string;
  description: string;
  location?: string;
  salary?: string;
  requirements?: string;
  skills?: string;
  employmentType?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: number;
  vacancyId: number;
  vacancy: Vacancy;
  createdAt: string;
}

export interface CreateVacancyDto {
  title: string;
  description: string;
  location?: string;
  salary?: string;
  requirements?: string;
  skills?: string;
  employmentType?: string;
  category?: string;
}

export interface CreateFavoriteDto {
  vacancyId: number;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface SearchVacanciesParams {
  keyword?: string;
  page?: number;
  limit?: number;
}
