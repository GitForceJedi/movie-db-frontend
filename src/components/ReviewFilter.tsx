import React, { useEffect, useState } from 'react';
import { Movie } from '../types';

interface ReviewFilterProps {
  onFilter: (filters: any) => void;
}

const ReviewFilter: React.FC<ReviewFilterProps> = ({ onFilter }) => {
  const [rating, setRating] = useState('');
  const [reviewerType, setReviewerType] = useState('');
  const [stars, setStars] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieId, setMovieId] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies`)
      .then((res) => res.json())
      .then((data) => {
        const moviesArray = Array.isArray(data) ? data : data.data;
        if (Array.isArray(moviesArray)) {
          setMovies(moviesArray);
        } else {
          console.error('Movie response not an array:', data);
        }
      })
      .catch((err) => console.error('Failed to fetch movies:', err));
  }, []);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: any = {
      rating,
      reviewerType,
      stars,
    };

    if (movieId !== '') {
      filters.movieId = parseInt(movieId, 10);
    }

    onFilter(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 items-end bg-gray-100 p-4 rounded mb-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">All</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reviewer Type</label>
        <select
          value={reviewerType}
          onChange={(e) => setReviewerType(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">All</option>
          <option value="audience">Audience</option>
          <option value="critic">Critic</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stars</label>
        <select
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">All</option>
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Movie</label>
        <select
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="border p-2 rounded w-48"
        >
          <option value="">All</option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default ReviewFilter;
