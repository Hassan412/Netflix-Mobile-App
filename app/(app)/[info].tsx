import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Share,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import useMovieVideo from "@/hooks/useMovieVideo";
import { format } from "date-fns";
import PlayButton from "@/components/playButton";
import GenreLogo from "@/components/genre-logo";
import DownloadButton from "@/components/downloadbutton";
import usePerson from "@/hooks/usePerson";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import FavoriteButton from "@/components/favoriteButton";
import RateButton from "@/components/rate-button";
import ShareButton from "@/components/share-button";
import _ from "lodash";
import TabButton from "@/components/tab-button";
import { formatRuntime } from "@/lib/utils";
import useRecommendations from "@/hooks/useRecommendations";
import EpisodeItem from "@/components/episode-item";
import MovieCard from "@/components/movie-card";
import useMoviesAndSeriesById from "@/hooks/useMovies&SeriesById";
import useTvSeason from "@/hooks/useTVSeasion";
import DropDown from "@/components/drop-down";
import { AntDesign } from "@expo/vector-icons";
// import useSimilarMovies from "@/hooks/useSimilerMovies";
import useCollectionDetails from "@/hooks/useCollectionDetails";
import { Episode, MovieVideo } from "@/types";
import useAgeCertificate from "@/hooks/useAgeCertificate";

interface PersonProps {
  id: number;
  name: string;
  character: string;
}

const InfoScreen = () => {
  const router = useRouter();
  const { info, Series } = useLocalSearchParams();
  const [value, setValue] = React.useState("");
  const [season, setSeason] = React.useState(1);
  const [playing, setPlaying] = useState(false);
  const [Episode, setEpisode] = React.useState<Episode>();
  const { data } = useMoviesAndSeriesById(info as string);
  const { data: PersonData } = usePerson(info as string);
  const { ageCertificate } = useAgeCertificate(info as string);
  const { data: MovieVideo } = useMovieVideo(
    info as string,
    season,
    Episode?.episode_number
  );

  const { data: Season } = useTvSeason(info as string, season);
  const { data: Recommendations } = useRecommendations(info as string);
  const { collection } = useCollectionDetails(data?.belongs_to_collection?.id);
  // const { data: SimilarMovies } = useSimilarMovies(info as string);

  const { height } = Dimensions.get("window");
  useEffect(() => {
    if (Series) {
      setValue("Episode");
    } else if (!_.isEmpty(Recommendations)) {
      setValue("Recomendations");
    } else {
      setValue("Trailers");
    }
    setSeason(1);
  }, [Series, info, setSeason, Recommendations]);

  const onShare = async () => {
    try {
      await Share.share({
        message: `https://www.youtube.com/watch?v=${MovieVideo?.[0].key}`,
        url: `https://www.youtube.com/watch?v=${MovieVideo?.[0].key}`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
      console.log(error.message);
    }
  };

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const tabButtons = [
    {
      label: "Episodes",
      value: "Episode",
      hidden: !Series,
    },
    {
      label: "Collection",
      value: "Collection",
      hidden: _.isEmpty(collection),
    },
    {
      label: "More Like This",
      value: "Recomendations",
      hidden: _.isEmpty(Recommendations),
    },
    {
      label: "Trailers & More",
      value: "Trailers",
      hidden: false,
    },
  ];

  if (_.isEmpty(data && PersonData && MovieVideo)) {
    return (
      <View className="flex-1 bg-black justify-center items-center relative">
        <AntDesign
          onPress={() => router.back()}
          name="close"
          size={24}
          color="white"
          className=" absolute top-[5%] right-[5%]"
          style={{
            zIndex: 100,
          }}
        />
        <Text>
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={MD2Colors.red500}
          />
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView
      className="bg-black flex-1 py-8 relative"
      style={{
        backgroundColor: "black",
        paddingVertical: 32,
        position: "relative",
        flex: 1,
      }}
    >
      <AntDesign
        onPress={() => router.back()}
        name="close"
        size={24}
        color="white"
        className="absolute top-[5%] right-[5%]"
        style={{
          zIndex: 100,
        }}
      />
      <View
        className="mt-16"
        style={{
          height: 240,
        }}
      >
        <YoutubePlayer
          height={300}
          initialPlayerParams={{
            loop: true,
          }}
          play={playing}
          playList={MovieVideo?.map((video: MovieVideo) => video.key)}
          onChangeState={onStateChange}
        />
      </View>

      <FlatList
        data={value === "Episode" ? Season : []}
        ListHeaderComponent={
          <View className="flex-col gap-4 mt-4">
            <View className="flex-row justify-between">
              <GenreLogo data={data} />
              <StarRatingDisplay rating={(data?.vote_average || 0) / 2} enableHalfStar starSize={25} emptyColor="#333" starStyle={{
                marginHorizontal: 0,
              }} style={{
                gap: 0
              }} color="red"/>

            </View>

            <Text className="text-white font-semibold text-2xl">
              {Series ? data?.name : data?.title}
            </Text>
            <View className="flex-row gap-4 items-center">
              <Text className="text-white">
                {format(
                  new Date(
                    (Series ? data?.first_air_date : data?.release_date) || 0
                  ),
                  "yyyy"
                )}
              </Text>
              <Text className="text-white bg-neutral-700 rounded-md text-xs text-center px-3 font-semibold py-1">
                {ageCertificate}
              </Text>
              {Series ? (
                <Text className="text-white">
                  {data?.number_of_seasons}
                  {(data?.number_of_seasons || 0) > 1 ? " Seasons" : " Season"}
                </Text>
              ) : (
                <Text className="text-white">
                  {formatRuntime(
                    Episode ? Episode.runtime : (data?.runtime as number)
                  )}
                </Text>
              )}

              <Text className="border-2 rounded-md text-neutral-300 text-sm border-zinc-600 text-center align-middle px-1 font-semibold uppercase">
                {data?.original_language}
              </Text>
            </View>

            <PlayButton
              className="items-center justify-center rounded-md"
              onPress={togglePlaying}
              label={playing ? "Pause" : "Play"}
            />
            <DownloadButton className="items-center justify-center rounded-md" />
            <View className="flex-col">
              {Episode && (
                <Text className="text-white font-medium text-lg">
                  S{Episode.season_number}:E{Episode.episode_number}{" "}
                  {Episode.name}
                </Text>
              )}

              <Text className="text-base text-white font-light">
                {Episode ? Episode.overview : data?.overview}
              </Text>
            </View>
            <View>
              <Text className="text-neutral-400 text-sm">
                Cast:{" "}
                {PersonData?.cast
                  .slice(0, 3)
                  .map((person: PersonProps) => person.name)
                  .join(", ")}
              </Text>
              <Text className="text-neutral-400 text-sm">
                Genres:{" "}
                {data?.genres
                  .map((genre: { id: number; name: string }) => genre.name)
                  .join(", ")}
              </Text>
            </View>

            <View className="flex-row justify-start gap-24 px-8 my-12">
              <FavoriteButton
                movieId={data?.id || 0}
                labelClassName="text-neutral-500 text-sm font-light"
                ClassName="gap-2"
                iconSize={28}
              />
              <RateButton />
              <ShareButton onPress={onShare} />
            </View>

            <FlatList
              data={tabButtons}
              horizontal
              className="border-t border-neutral-700"
              renderItem={({ item }) => (
                <TabButton
                  title={item.label}
                  active={value === item.value}
                  onPress={() => setValue(item.value)}
                  hidden={item.hidden}
                />
              )}
            />
            {value === "Episode" && (
              <DropDown
                setValue={setSeason}
                value={season}
                Seasons={data?.seasons}
              />
            )}
            {value === "Recomendations" && (
              <View className="flex-row gap-2 my-8 items-center flex-wrap justify-center">
                {Recommendations?.map((Similar, index) => (
                  <MovieCard
                    key={index}
                    data={Similar}
                    className="h-[170px] w-[31%]"
                  />
                ))}
              </View>
            )}

            {value === "Collection" && (
              <View className="flex-row gap-2 my-8 items-center flex-wrap justify-center">
                {collection?.parts?.map((movie, index) => (
                  <MovieCard
                    key={index}
                    data={movie}
                    className="h-[170px] w-[31%]"
                  />
                ))}
              </View>
            )}
            {value === "Trailers" && (
              <View className="flex-col gap-4 my-8">
                {MovieVideo?.map((video, index) => (
                  <View
                    className="flex-col bg-neutral-900 rounded-md py-8 px-4"
                    key={index}
                  >
                    <YoutubePlayer
                      height={height / 3.5}
                      videoId={video.key}
                      initialPlayerParams={{
                        modestbranding: true,
                      }}
                      play={false}
                    />
                    <Text className="text-white text-lg">{video.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        }
        renderItem={({ item, index }) => (
          <EpisodeItem
            onPress={() => setEpisode(item)}
            key={index}
            episode={item}
          />
        )}
      />
    </SafeAreaView>
  );
};
export default InfoScreen;
