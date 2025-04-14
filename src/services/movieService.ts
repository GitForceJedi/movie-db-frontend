import { MovieResponse } from '../types';
import { apiFetch } from './apiClient';

export const getFilteredMovies = (
  filters: Record<string, any> = {}
): Promise<MovieResponse> => {
  const url = new URL('/movies', import.meta.env.VITE_API_URL);

  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== '') {
      url.searchParams.append(key, val.toString());
    }
  });

  return apiFetch<MovieResponse>(url.pathname + url.search);
};
