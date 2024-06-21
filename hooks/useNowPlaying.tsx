import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useNowPlaying = () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data: data?.results,
    error,
    isLoading,
    url,
  };
};

export default useNowPlaying;
