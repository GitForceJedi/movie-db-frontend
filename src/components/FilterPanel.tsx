import React from 'react';

interface FilterPanelProps {
  onFilter: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const rating = (form.elements.namedItem('rating') as HTMLSelectElement).value;
    const genre = (form.elements.namedItem('genre') as HTMLInputElement).value;
    const inTheaters = (form.elements.namedItem('inTheaters') as HTMLInputElement).checked;
    const stars = (form.elements.namedItem('stars') as HTMLSelectElement).value;

    onFilter({
      rating: rating || undefined,
      genre: genre || undefined,
      inTheaters: inTheaters || undefined,
      stars: stars || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4 space-y-3">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <select name="rating" className="border rounded px-2 py-1">
            <option value="">All</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Genre</label>
          <input
            type="text"
            name="genre"
            className="border rounded px-2 py-1"
            placeholder="e.g. Horror"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Stars</label>
          <select name="stars" className="border rounded px-2 py-1">
            <option value="">All</option>
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" name="inTheaters" />
          <label className="text-sm">In Theaters</label>
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-3 py-1 rounded mt-6 hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default FilterPanel;
