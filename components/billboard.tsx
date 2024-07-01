import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useNowPlaying from "@/hooks/useNowPlaying";
import FavoriteButton from "./favoriteButton";
import PlayButton from "./playButton";
import { Entypo } from "@expo/vector-icons";
import { MoviesData } from "@/types";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import useMoviesImages from "@/hooks/useMoviesImages";
import useMoviesById from "@/hooks/useMovies&SeriesById";

const Billboard = () => {
  const [randomIndex, setRandomIndex] = useState(0);
  const { data }: { data: MoviesData[] } = useNowPlaying();
  const { data: MovieGenres } = useMoviesById(
    data && data[randomIndex ? randomIndex : 1]?.id
  );

  const movieCount = data?.length;
  const router = useRouter();

  useEffect(() => {
    if (movieCount) {
      const index = Math.floor(Math.random() * movieCount);
      setRandomIndex(index);
    }
  }, [movieCount]);
  const { data: ImageData } = useMoviesImages(
    data && data[randomIndex ? randomIndex : 1]?.id
  );

  return (
    <View
      className="relative"
      style={{
        height: 480,
        width: "100%",
      }}
    >
      <View
        className="bg-black absolute left-0 right-0 top-0 bottom-0 w-full"
        style={{
          zIndex: 1,
          opacity: 0.5,
        }}
      />
      <Text
        className="absolute bottom-[3%] left-[1%] text-xl font-semibold text-white"
        style={{
          zIndex: 100,
        }}
      >
        Now Playing
      </Text>
      <Image
        contentFit="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
        transition={500}
        source={{
          uri: data
            ? `https://image.tmdb.org/t/p/original${data[randomIndex]?.backdrop_path}`
            : "",
        }}
      />
      <LinearGradient
        colors={["rgba(21, 21, 21, 0)", "rgba(0, 0, 0, 0.9)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.2 }}
        locations={[0.72, 1.0]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 1,
          bottom: 0,
          width: "100%",
          height: 100,
        }}
      >
        <View
          className="absolute gap-4 justify-center items-center flex-col left-0 right-0 bottom-[60%]"
          style={{
            zIndex: 100,
          }}
        >
          <Image
            style={{
              width: 300,
              height: 70,
            }}
            alt="Logo"
            contentFit="contain"
            source={{
              uri: ImageData
                ? `https://image.tmdb.org/t/p/original${ImageData?.logos?.[0]?.file_path}`
                : "",
            }}
          />

          <View className="text-center flex-row gap-4">
            {MovieGenres?.genres
              .slice(0, 3)
              ?.map((genre: { id: number; name: string }, index) => (
                <React.Fragment key={index}>
                  <Text className="text-white font-medium">{genre.name}</Text>
                  {index < MovieGenres?.genres.length - 1 && (
                    <Entypo name="dot-single" size={24} color="white" />
                  )}
                </React.Fragment>
              ))}
          </View>
          <View
            className="flex-row w-full justify-center gap-2 items-center px-12"
            style={{
              zIndex: 100,
            }}
          >
            <FavoriteButton
              movieId={data ? data[randomIndex]?.id : 0}
              ClassName="flex-row bg-neutral-300/30  px-8 py-2 rounded-sm gap-2"
            />
            <PlayButton
              onPress={() => router.push(`/${data[randomIndex]?.id}`)}
              className="px-12"
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Billboard;
