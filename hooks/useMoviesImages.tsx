import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMoviesImages = (movieId?: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;

  const { data, error, isLoading } = useSWR(movieId ? url : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useMoviesImages;
