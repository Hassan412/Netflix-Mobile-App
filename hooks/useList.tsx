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
      }&query=netflix&include_video=true&with_genres=${Genre}&page=${pageIndex + 1}&language=en-US&with_networks=213`;
    } else {
      return `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.EXPO_PUBLIC_TMDB_API_KEY
      }&with_genres=${Genre}&include_video=true&with_watch_providers=netflix&page=${pageIndex + 1}&language=en-US`;
    }
  };

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<{
    results: MoviesData[];
  }>(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const movies: MoviesData[] = data
    ? _.uniqBy([].concat(...data.map((page: any) => page.results)), "id")
    : [];
  const isLoadingMore =
    isLoading || isValidating;

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
