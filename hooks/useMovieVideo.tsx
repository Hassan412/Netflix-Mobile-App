import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useLocalSearchParams } from "expo-router";
import { MovieVideo } from "@/types";

const useMovieVideo = (
  movieId?: string,
  season_number?: number,
  episode_number?: number
) => {
  const { Series } = useLocalSearchParams();
  const url = episode_number
    ? `https://api.themoviedb.org/3/tv/${movieId}/season/${season_number}/episode/${episode_number}/videos?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
    : Series
    ? `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
    : `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  const { data, error, isLoading } = useSWR<{
    results: MovieVideo[];
  }>(movieId ? url : null, fetcher);

  return {
    data: data?.results,
    error,
    isLoading,
  };
};

export default useMovieVideo;
