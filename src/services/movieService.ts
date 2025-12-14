import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const url = 'https://api.themoviedb.org/3/search/movie';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
    params: {
      query,
    },
  };

  try {
    const response = await axios.get<MovieResponse>(url, options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
