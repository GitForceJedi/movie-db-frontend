import ReviewFilter from './ReviewFilter';
import { useFetchReviews } from '../hooks/useFetchReviews';

const ReviewList: React.FC = () => {
  const { reviews, sql, params, fetchReviews } = useFetchReviews();

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      <ReviewFilter onFilter={fetchReviews} />
      <div className="mt-6 bg-gray-100 p-3 rounded">
        <h4 className="font-mono font-semibold">SQL Query:</h4>
        <pre className="text-xs overflow-x-auto">{sql}</pre>
        <h4 className="font-mono font-semibold mt-2">Params:</h4>
        <pre className="text-xs overflow-x-auto">{JSON.stringify(params)}</pre>
      </div>
      <ul className="space-y-2">
        {reviews.map(review => (
          <li key={review.id} className="bg-white shadow rounded p-3">
            <p className="font-semibold">Movie: {review.movie_title || 'Unknown'} ({review.movie_rating})</p>
            <p className="text-sm text-gray-700">Reviewer: {review.name} ({review.email})</p>
            <p className="mt-1">⭐ {review.stars} - {review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;