import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import ReviewList from './components/ReviewList';

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <header className="flex flex-col items-center mb-6 space-y-3">
        <h1 className="text-3xl font-bold text-center">My Movie DB</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Explore Movies
          </button>
          <button
            onClick={() => navigate('/reviews')}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Explore Reviews
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/reviews" element={<ReviewList />} />
      </Routes>
    </div>
  );
};

export default App;