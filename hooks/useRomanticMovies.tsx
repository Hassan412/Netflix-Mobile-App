import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useRomanticList = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&with_genres=10749`
  const { data, error, isLoading } = useSWR(url, fetcher,{
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false
  });

  return {
    data: data?.results,
    error,
    isLoading
  };
};

export default useRomanticList;