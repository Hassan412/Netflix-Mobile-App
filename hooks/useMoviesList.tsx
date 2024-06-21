import useSWRInfinite from "swr/infinite";
import fetcher from "@/lib/fetcher";
import { MoviesData } from "@/types";
import _ from "lodash";

const useMoviesList = (Genre?: number) => {
  const getKey = (
    pageIndex: number,
    previousPageData: {
      results: [];
    }
  ) => {
    if (previousPageData && !previousPageData.results.length) return null;
    return `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.EXPO_PUBLIC_TMDB_API_KEY
    }&with_genres=${Genre}&page=${pageIndex + 1}`;
  };

  const { data, error, size, setSize } = useSWRInfinite<{
    results: MoviesData[];
  }>(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const movies: MoviesData[] = data
    ? _.uniqBy([].concat(...data.map((page: any) => page.results)), "id")
    : [];
  const isLoading = !data && !error;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  return {
    data: movies,
    error,
    isLoading,
    isLoadingMore,
    size,
    setSize,
  };
};

export default useMoviesList;
