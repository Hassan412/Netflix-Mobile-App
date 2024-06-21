import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const usePerson = (movieId?: string) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;

  const { data, error, isLoading } = useSWR(movieId ? url : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default usePerson;
