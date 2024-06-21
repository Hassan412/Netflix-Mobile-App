"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { MoviesData } from "@/types";

const useMoviesById = (movieId?: string | number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;

  const { data, error, isLoading } = useSWR<MoviesData>(movieId ? url : null, fetcher, {
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

export default useMoviesById;
