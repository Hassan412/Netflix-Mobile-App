import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useFavorites = (movieIds: number[]) => {
  const fetchMovies = async () => {
    const requests = movieIds.map((id) =>
      fetcher(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
      )
    );
    return Promise.all(requests);
  };

  const shouldFetch = movieIds.length > 0;
  const { data, error, mutate, isValidating } = useSWR(
    shouldFetch ? ["favorites", movieIds] : null,
    fetchMovies
  );

  return {
    data,
    error,
    isLoading: !data && !error,
    mutate,
    isValidating,
  };
};

export default useFavorites;
