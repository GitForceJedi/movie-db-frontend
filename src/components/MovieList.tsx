import React, { useEffect, useState } from 'react';
import FilterPanel from './FilterPanel';
import { Movie, MovieResponse } from '../types';

const MovieList: React.FC = () => {
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
      .then(res => res.json())
      .then((data: MovieResponse) => {
        setMovies(data.data || []);
        setSql(data.sql || '');
        setParams(data.params || []);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-2">Available Movies</h2>
      <FilterPanel onFilter={fetchMovies} />
      <div className="mt-6 bg-gray-100 p-3 rounded">
        <h4 className="font-mono font-semibold">SQL Query:</h4>
        <pre className="text-xs overflow-x-auto">{sql}</pre>
        <h4 className="font-mono font-semibold mt-2">Params:</h4>
        <pre className="text-xs overflow-x-auto">{JSON.stringify(params)}</pre>
      </div>
      <ul className="space-y-2">
        {movies.map(movie => (
          <li key={movie.id} className="bg-white shadow rounded p-3">
            <h3 className="font-bold">
              {movie.title} ({movie.rating})
            </h3>
            <p className="text-sm text-gray-600">{movie.description}</p>
            <p className="text-xs mt-1">
              🎭 Genre: {movie.genre} | 🎬 In Theaters:{' '}
              {movie.inTheaters ? 'Yes' : 'No'}
            </p>
            {movie.avg_stars && (
              <p className="text-xs mt-1">⭐ Avg Stars: {movie.avg_stars}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
