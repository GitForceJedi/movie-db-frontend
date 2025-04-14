import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
}

interface Props {
  onSelect: (movieId: number | null) => void;
}

const MovieDropdown: React.FC<Props> = ({ onSelect }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies`)
      .then(res => res.json())
      .then(data => setMovies(data.data || []));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedId(value);
    onSelect(value ? parseInt(value) : null);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold text-sm">🎯 Filter by Movie Title</label>
      <select
        className="w-full border rounded p-2 text-sm"
        value={selectedId}
        onChange={handleChange}
      >
        <option value="">-- All Movies --</option>
        {movies.map(movie => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieDropdown;