import { useState, useEffect } from 'react';
import { Movie, MovieResponse } from '../types';

export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sql, setSql] = useState('');
  const [params, setParams] = useState<any[]>([]);

  const fetchMovies = (filters: Record<string, any> = {}) => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/movies`);
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== '') {
        url.searchParams.append(key, val.toString());
      }
    });

    fetch(url.toString())
      .then((res) => res.json())
      .then((data: MovieResponse) => {
        setMovies(data.data || []);
        setSql(data.sql || '');
        setParams(data.params || []);
      });
  };

  // Automatically fetch on first load
  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, sql, params, fetchMovies };
};
