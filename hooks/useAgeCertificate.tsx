import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useAgeCertificate = (movieId: string) => {
  const [location, setLocation] = useState<any>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const country = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      setLocation(country);
    })();
  }, []);

  const url = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
    : null;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const ageCertificate = data?.results.find((country: any) =>
    country.iso_3166_1 === location?.[0]?.isoCountryCode
      ? true
      : country.release_dates?.[0]?.certification !== ""
  )?.release_dates[0]?.certification;
  return {
    ageCertificate,
    error,
    isLoading,
  };
};

export default useAgeCertificate;
