import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useLocalSearchParams } from "expo-router";
import { MoviesData } from "@/types";

const useSimilarMovies = (movieId?: string) => {
  const { Series } = useLocalSearchParams();
  const url = Series
    ? `https://api.themoviedb.org/3/tv/${movieId}/similar?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
    : `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;

  const { data, error, isLoading } = useSWR<{
    results: MoviesData[];
  }>(movieId ? url : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.results,
    error,
    isLoading,
  };
};

export default useSimilarMovies;
