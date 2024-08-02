import { Dimensions, Pressable, Text, View } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import FavoriteButton from "./favoriteButton";
import PlayButton from "./playButton";
import { Entypo } from "@expo/vector-icons";
import { MediaItem, MoviesData } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import useMoviesImages from "@/hooks/useMoviesImages";
import useMoviesById from "@/hooks/useMovies&SeriesById";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import axios from "axios";
import { format } from "date-fns";

const Billboard = () => {
  const scaleImage = useSharedValue(1);
  const [randomIndex, setRandomIndex] = useState(0);
  const { data }: { data: MoviesData[] } = useTrendingMovies();
  const { data: MovieGenres } = useMoviesById(
    data && data[randomIndex ? randomIndex : 1]?.id
  );
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const { height } = Dimensions.get("window");
  const movieCount = data?.length;
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data: Movies } = await axios.get(
          `https://ww4.123moviesfree.net/searching?q=${data?.[
            randomIndex
          ]?.title?.replace(/[^a-zA-Z0-9 ]/g, "")}&limit=40&offset=0`
        );
        setMovies(Movies?.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    if (data?.[randomIndex]?.title) {
      fetchMovies();
    }
  }, [data, randomIndex]);

  useEffect(() => {
    if (movieCount) {
      const index = Math.floor(Math.random() * movieCount);
      setRandomIndex(index);
    }
  }, [movieCount]);
  const { data: ImageData } = useMoviesImages(
    data && data[randomIndex ? randomIndex : 1]?.id
  );
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(scaleImage.value),
      },
    ],
    height: height / 1.8,
    position: "relative",
  }));

  const togglePlaying = useCallback(() => {
    router.push({
      pathname: `/(app)/watch`,
      params: {
        movieId: movies.find(
          (movie) =>
            movie?.y.toString() ===
            format(new Date(data[randomIndex]?.release_date), "yyyy")
        )?.s,
      },
    });
  }, [router, movies, randomIndex, data]);
  return (
    <Pressable
      onPressIn={() => (scaleImage.value = 0.95)}
      onPressOut={() => (scaleImage.value = 1)}
      onPress={() => router.push(`/(app)/${data?.[randomIndex]?.id}`)}
    >
      <Animated.View style={animatedStyles}>
        <View
          style={{
            elevation: 2,
            width: "80%",
            marginHorizontal: "auto",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
            transition={500}
            source={{
              uri: data
                ? `https://image.tmdb.org/t/p/original${data?.[randomIndex]?.backdrop_path}`
                : "",
            }}
          />
        </View>

        <View
          className="absolute gap-4 justify-center items-center flex-col left-0 right-0 bottom-[4%]"
          style={{
            zIndex: 100,
          }}
        >
          <Image
            style={{
              width: "70%",
              height: 50,
            }}
            alt="Logo"
            contentFit="contain"
            source={{
              uri: ImageData
                ? `https://image.tmdb.org/t/p/original${
                    ImageData?.logos.find(
                      (logo: any) => logo?.iso_639_1 === "en"
                    )?.file_path
                  }`
                : "",
            }}
          />
          <View className="text-center flex-row">
            {MovieGenres?.genres
              .slice(0, 3)
              ?.map((genre: { id: number; name: string }, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text className="text-white font-medium">{genre.name}</Text>
                  {index < MovieGenres?.genres.length - 1 && (
                    <Entypo name="dot-single" size={24} color="red" />
                  )}
                </View>
              ))}
          </View>

          <View
            className="flex-row w-full justify-center gap-2 items-center px-12"
            style={{
              zIndex: 100,
            }}
          >
            <FavoriteButton
              series={false}
              movieId={data ? data[randomIndex]?.id : 0}
              ClassName="flex-row bg-neutral-500/60 px-[8%] py-[7.5px] rounded-sm gap-2"
            />
            <PlayButton
              onPress={togglePlaying}
              className="px-[11%] justify-center items-center"
            />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default memo(Billboard);
