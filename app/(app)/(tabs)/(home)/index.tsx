import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useProfile from "@/hooks/useProfile";
import { LinearGradient } from "expo-linear-gradient";
import Billboard from "@/components/billboard";
import useNowPlaying from "@/hooks/useNowPlaying";
import { MoviesData } from "@/types";
import MoviesList from "@/components/movies-list";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import useFavorites from "@/hooks/useFavorites";
import { genresList } from "@/lib/genre-list";
import _ from "lodash";
import usePopulerMovies from "@/hooks/usePopulerMovies";
import { Image } from "expo-image";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useNavigation } from "expo-router";
import HomeHeader from "@/components/home-header";

const HomeScreen = () => {
  const [size, setSize] = useState(0);
  const { height, width } = Dimensions.get("window");
  const { favoriteIds } = useProfile();
  const { data: NowPlaying }: { data: MoviesData[] } = useNowPlaying();
  const { data: Trending }: { data: MoviesData[] } = useTrendingMovies();
  const { data: MyList } = useFavorites(favoriteIds || []);
  const { data: Populer } = usePopulerMovies();
  const scrollY = useSharedValue(0);
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeHeader scrollY={scrollY} />
      ),
    })
  }, [navigation, scrollY])

  const onReachEnd = useCallback(() => {
    setSize((prevSize) => prevSize + 1);
  }, [setSize]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <MoviesList
        heading={item.name}
        genreId={item.id}
        varient={item.varient}
      />
    ),
    []
  );

  const displayedGenres = _.slice(genresList, 0, size);

  return (
    <SafeAreaView
      className="items-center flex-col flex-1 justify-between relative"
      style={{
        backgroundColor: "black",
      }}
    >
      <Animated.FlatList
        data={displayedGenres}
        style={{
          width,
        }}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View
            style={{
              position: "relative",
            }}
          >
            <LinearGradient
              colors={["#111", "rgba(0, 0, 0, 1)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: height,
                top: 0,
                zIndex: -1,
              }}
            />

            <Billboard />
            <MoviesList data={NowPlaying} heading="Playing Now" />
            <MoviesList heading="Trending Now" height={250} data={Trending} />
            <View
              style={{
                width: "100%",
                height: 220,
                position: "relative",
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <LinearGradient
                colors={["rgba(255, 0, 0, 1)", "rgba(0, 0, 0, 1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  opacity: 0.6,
                }}
              />
              <View
                style={{
                  width: "55%",
                  height: "100%",
                  position: "relative",
                  flexDirection: "column",
                  padding: 20,
                  gap: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 100,
                  }}
                >
                  <Image
                    source={require("@/assets/images/netflix-2.png")}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: 300,
                      fontSize: 20,
                    }}
                  >
                    SHOP
                  </Text>
                </View>

                <Text
                  style={{
                    color: "white",
                    position: "relative",
                    zIndex: 100,
                    fontSize: height / 45,
                  }}
                >
                  Shop the latest product collections of your favourite shows
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  position: "relative",
                  zIndex: 100,
                }}
              >
                <MoviesList data={Populer} />
              </View>
            </View>

            <MoviesList heading="My List" data={MyList || []} />
          </View>
        }
        keyExtractor={(item, index) => item.name.toString()}
        renderItem={renderItem}
        onEndReached={onReachEnd}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
