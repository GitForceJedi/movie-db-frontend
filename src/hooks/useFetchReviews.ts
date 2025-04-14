import { useEffect, useState } from 'react';
import { Review, ReviewResponse } from '../types';
import { getFilteredReviews } from '../services/reviewService';

export function useFetchReviews(initialFilters: Record<string, any> = {}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sql, setSql] = useState('');
  const [params, setParams] = useState<any[]>([]);

  const fetchReviews = (filters: Record<string, any> = {}) => {
    getFilteredReviews(filters).then((data: ReviewResponse) => {
      setReviews(data.data || []);
      setSql(data.sql || '');
      setParams(data.params || []);
    });
  };

  useEffect(() => {
    fetchReviews(initialFilters);
  }, []);

  return { reviews, sql, params, fetchReviews };
}

export default useFetchReviews;
