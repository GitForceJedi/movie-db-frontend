import { useState } from 'react';
import { useFetchMovies } from '../hooks/useFetchMovies';

interface ReviewFilterProps {
  onFilter: (filters: any) => void;
}

const ReviewFilter: React.FC<ReviewFilterProps> = ({ onFilter }) => {
  const { movies } = useFetchMovies();
  const [rating, setRating] = useState('');
  const [reviewerType, setReviewerType] = useState('');
  const [stars, setStars] = useState('');
  const [movieId, setMovieId] = useState('');

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
