import FilterPanel from './FilterPanel';
import { useFetchMovies } from '../hooks/useFetchMovies';

const MovieList: React.FC = () => {
  const { movies, sql, params, fetchMovies } = useFetchMovies();

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
            <h3 className="font-bold">{movie.title} ({movie.rating})</h3>
            <p className="text-sm text-gray-600">{movie.description}</p>
            <p className="text-xs mt-1">
              🎭 Genre: {movie.genre} | 🎬 In Theaters: {movie.inTheaters ? 'Yes' : 'No'}
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
