import { useState } from 'react';

interface FilterPanelProps {
  onFilter: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter }) => {
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [inTheaters, setInTheaters] = useState(false);
  const [stars, setStars] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      rating: rating || undefined,
      genre: genre || undefined,
      inTheaters: inTheaters || undefined,
      stars: stars || undefined,
    });
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
        <label className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 rounded w-40"
          placeholder="e.g. Horror"
        />
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={inTheaters}
          onChange={(e) => setInTheaters(e.target.checked)}
        />
        <label className="text-sm">In Theaters</label>
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

export default FilterPanel;
