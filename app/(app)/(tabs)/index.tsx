import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import useProfile from "@/hooks/useProfile";
import { LinearGradient } from "expo-linear-gradient";
import Billboard from "@/components/billboard";
import useNowPlaying from "@/hooks/useNowPlaying";
import { MoviesData } from "@/types";
import MoviesList from "@/components/movies-list";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import useMoviesList from "@/hooks/useMoviesList";
import useFavorites from "@/hooks/useFavorites";
import useSeries from "@/hooks/useSeries";

const useGenreData = (genreId: string) => {
  const { data, setSize, size, isLoadingMore } = useSeries(genreId);
  return { data, setSize, size, isLoadingMore };
};

const HomeScreen = () => {
  const { favoriteIds } = useProfile();
  const { data: NowPlaying }: { data: MoviesData[] } = useNowPlaying();
  const { data: Trending }: { data: MoviesData[] } = useTrendingMovies();
  const { data: MyList } = useFavorites(favoriteIds || []);

  const {
    data: Horror,
    setSize: setHorrorSize,
    size: HorrorSize,
  } = useMoviesList(27);
  const {
    data: Romantic,
    setSize: setRomanticSize,
    size: RomanticSize,
  } = useMoviesList(10749);
  const crime = useGenreData("80");
  const comedies = useGenreData("35");
  const animation = useGenreData("16");
  const action = useGenreData("10759");
  const dramas = useGenreData("18");
  const documentary = useGenreData("99");

  return (
    <ScrollView>
      <SafeAreaView className="items-center flex-col bg-black flex-1 justify-between relative">
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.9)", "rgba(21, 21, 21, 0)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.6 }}
          locations={[0.72, 1.0]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: 1,
            width: "100%",
            height: 100,
          }}
        >
          <View
            className="flex-row gap-8 absolute right-0 left-0 top-0 py-8 justify-center items-center w-full"
            style={{ zIndex: 1000 }}
          >
            <Link href={""} className="text-white">
              TV Shows
            </Link>
            <Link href={""} className="text-white">
              Movies
            </Link>
            <Link href={""} className="text-white">
              Categories
            </Link>
          </View>
        </LinearGradient>
        <Billboard />
        <MoviesList data={NowPlaying} />
        <MoviesList heading="My List" data={MyList || []} />
        <MoviesList
          heading="TV Comedies"
          varient={"Series"}
          data={comedies.data}
        />
        <MoviesList heading="Now Trending" data={Trending} />
        <MoviesList
          heading="Crime TV Shows"
          varient={"Series"}
          isLoadingMore={crime.isLoadingMore}
          setSize={crime.setSize}
          size={crime.size}
          data={crime.data}
        />
        <MoviesList
          heading="Horror Movies"
          setSize={setHorrorSize}
          size={HorrorSize}
          data={Horror}
        />
        <MoviesList
          heading="Animation"
          varient={"Series"}
          isLoadingMore={animation.isLoadingMore}
          data={animation.data}
          setSize={animation.setSize}
          size={animation.size}
        />
        <MoviesList
          heading="TV Action & Adventure"
          varient={"Series"}
          isLoadingMore={action.isLoadingMore}
          data={action.data}
          setSize={action.setSize}
          size={action.size}
        />
        <MoviesList
          heading="Romantic Movies"
          setSize={setRomanticSize}
          size={RomanticSize}
          data={Romantic}
        />
        <MoviesList
          heading="Dramas"
          varient={"Series"}
          data={dramas.data}
          isLoadingMore={dramas.isLoadingMore}
          setSize={dramas.setSize}
          size={dramas.size}
        />
        <MoviesList
          heading="Documentary"
          data={documentary.data}
          setSize={documentary.setSize}
          isLoadingMore={documentary.isLoadingMore}
          size={documentary.size}
          varient={"Series"}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
