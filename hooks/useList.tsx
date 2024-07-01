import useSWRInfinite from "swr/infinite";
import fetcher from "@/lib/fetcher";
import { MoviesData } from "@/types";
import _ from "lodash";

const useList = (Genre?: number, Series?: boolean) => {
  const getKey = (
    pageIndex: number,
    previousPageData: {
      results: [];
    }
  ) => {
    if (previousPageData && !previousPageData.results.length) return null;
    if (Series) {
      return `https://api.themoviedb.org/3/discover/tv?api_key=${
        process.env.EXPO_PUBLIC_TMDB_API_KEY
      }&query=netflix&with_genres=${Genre}&page=${pageIndex + 1}`;
    } else {
      return `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.EXPO_PUBLIC_TMDB_API_KEY
      }&with_genres=${Genre}&page=${pageIndex + 1}`;
    }
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite<{
    results: MoviesData[];
  }>(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const movies: MoviesData[] = data
    ? _.uniqBy([].concat(...data.map((page: any) => page.results)), "id")
    : [];
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

export default useList;
