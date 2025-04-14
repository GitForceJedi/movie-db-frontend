import { ReviewResponse } from '../types';

export const getFilteredReviews = async (
  filters: Record<string, any> = {}
): Promise<ReviewResponse> => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/reviews`);

  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== '') {
      url.searchParams.append(key, val != null ? val.toString() : '');
    }
  });

  const res = await fetch(url.toString());
  return res.json();
};
