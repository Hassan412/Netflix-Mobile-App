import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useSearchData = (query?: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;

  const { data, error, isLoading } = useSWR(query ? url : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return {
    data: data?.results,
    error,
    isLoading,
  };
};

export default useSearchData;
