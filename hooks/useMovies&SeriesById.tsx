import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { MoviesData } from "@/types";
import { useLocalSearchParams } from "expo-router";

const useMoviesAndSeriesById = (movieId?: string | number) => {
  const { Series } = useLocalSearchParams();
  const url = Series
    ? `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&include_video=true`
    : `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&include_video=true`;

  const { data, error, isLoading } = useSWR<MoviesData>(
    movieId ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useMoviesAndSeriesById;
