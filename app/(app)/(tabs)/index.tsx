import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Link } from "expo-router";
import useProfile from "@/hooks/useProfile";
import { LinearGradient } from "expo-linear-gradient";
import Billboard from "@/components/billboard";
import useNowPlaying from "@/hooks/useNowPlaying";
import { MoviesData } from "@/types";
import MoviesList from "@/components/movies-list";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import useFavorites from "@/hooks/useFavorites";
import { genresList } from "@/lib/genre-list";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import _ from "lodash";

const HomeScreen = () => {
  const [size, setSize] = useState(0);
  const { favoriteIds } = useProfile();

  const { data: NowPlaying }: { data: MoviesData[] } = useNowPlaying();
  const { data: Trending }: { data: MoviesData[] } = useTrendingMovies();
  const { data: MyList } = useFavorites(favoriteIds || []);

  const onReachEnd = useCallback(() => {
    setSize((prevSize) => prevSize + 1);
  }, [setSize]);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <MoviesList
        key={index}
        heading={item.name}
        genreId={item.id}
        varient={item.varient}
      />
    ),
    []
  );

  if (_.isEmpty(NowPlaying && Trending)) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text>
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={MD2Colors.red500}
          />
          ;
        </Text>
      </View>
    );
  }

  const displayedGenres = _.slice(genresList, 0, size);

  return (
    <SafeAreaView
      className="items-center flex-col bg-black flex-1 justify-between relative"
      style={{
        backgroundColor: "black",
      }}
    >
      <FlatList
        data={displayedGenres}
        initialNumToRender={0}
        maxToRenderPerBatch={1}
        ListHeaderComponent={
          <View>
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
            <MoviesList heading="Trending Now" data={Trending} />
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews
        renderItem={renderItem}
        onEndReached={onReachEnd}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
