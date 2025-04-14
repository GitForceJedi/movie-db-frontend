export interface Movie {
  id: number;
  title: string;
  description: string;
  rating: string;
  genre: string;
  releaseDate: string;
  inTheaters: boolean;
  avg_stars?: number;
}

export interface MovieResponse {
  data: Movie[];
  sql: string;
  params: any[];
}

export interface Review {
  id: number;
  movieId: number;
  userId: number;
  rating: number;
  comment: string;
  stars: number;
  name: string;
  email: string;
  movie_title?: string;
  movie_rating?: string;
  genre?: string;
}

export interface ReviewResponse {
  data: Review[];
  sql: string;
  params: any[];
}
