import useSWR from 'swr';
import fetcher from '@/lib/fetcher'; // Assuming you have defined your fetcher function
import { CollectionData } from '@/types'; // Import your CollectionData type/interface

const useCollectionDetails = (collectionId?: number) => {
  const url = `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;

  const { data, error, isLoading } = useSWR<CollectionData>(
    collectionId ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    collection: data,
    error,
    isLoading
  };
};

export default useCollectionDetails;