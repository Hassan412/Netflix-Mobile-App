import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Episode } from "@/types";

const useTvSeason = (tvId: string, seasonNumber: number) => {

  const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;

  const { data, error, isLoading } = useSWR<{
    episodes: Episode[];
  }>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return {
    data: data?.episodes,
    error,
    isLoading,
  };
};

export default useTvSeason;
