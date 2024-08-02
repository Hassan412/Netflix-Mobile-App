import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { MoviesData } from "@/types";

const usePopulerMovies = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  const { data, error, isLoading } = useSWR<{results: MoviesData[]}>(url, fetcher);

  return {
    data: data?.results,
    error,
    isLoading,
    url,
  };
};

export default usePopulerMovies;
