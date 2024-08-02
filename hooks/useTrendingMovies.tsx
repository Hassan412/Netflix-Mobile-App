import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useTrendingMovies = () => {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.results,
    error,
    isLoading,
    url,
  };
};

export default useTrendingMovies;
