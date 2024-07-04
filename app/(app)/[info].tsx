import {
  Alert,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  Share,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { TabView, TabBar } from "react-native-tab-view";
import { useLocalSearchParams, useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import useMovieVideo from "@/hooks/useMovieVideo";
import { format } from "date-fns";
import PlayButton from "@/components/playButton";
import GenreLogo from "@/components/genre-logo";
import DownloadButton from "@/components/downloadbutton";
import usePerson from "@/hooks/usePerson";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import FavoriteButton from "@/components/favoriteButton";
import RateButton from "@/components/rate-button";
import ShareButton from "@/components/share-button";
import _ from "lodash";
import { formatRuntime } from "@/lib/utils";
import useMoviesAndSeriesById from "@/hooks/useMovies&SeriesById";
import { AntDesign } from "@expo/vector-icons";
import { Episode, MovieVideo } from "@/types";
import useAgeCertificate from "@/hooks/useAgeCertificate";
import { LinearGradient } from "expo-linear-gradient";
import RecommendationsTab from "@/components/recommendations-tab";
import ColllectionTab from "@/components/collection-tab";
import TrailersTab from "@/components/trailers-tab";
import EpisodesTab from "@/components/episodes-tab";
import useCollectionDetails from "@/hooks/useCollectionDetails";
import useRecommendations from "@/hooks/useRecommendations";

interface PersonProps {
  id: number;
  name: string;
  character: string;
}

const InfoScreen = () => {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);
  const { info, Series } = useLocalSearchParams();
  const [season, setSeason] = React.useState(1);
  const [playing, setPlaying] = useState(false);
  const [Episode, setEpisode] = React.useState<Episode>();
  const { data } = useMoviesAndSeriesById(info as string);
  const { data: PersonData } = usePerson(info as string);
  const { ageCertificate } = useAgeCertificate(info as string);
  const { data: Recommendations } = useRecommendations(info as string);
  const { collection } = useCollectionDetails(data?.belongs_to_collection?.id);
  const { data: MovieVideo } = useMovieVideo(
    info as string,
    season,
    Episode?.episode_number
  );

  const routes = [
    {
      label: "Episodes",
      key: "Episode",
      hidden: !Series,
    },
    {
      label: "More Like This",
      key: "Recomendations",
      hidden: _.isEmpty(Recommendations),
    },
    {
      label: "Collection",
      key: "Collection",
      hidden: _.isEmpty(collection),
    },
    {
      label: "Trailers & More",
      key: "Trailers",
      hidden: _.isEmpty(MovieVideo),
    },
  ].filter((route) => !route.hidden);

  const { height } = Dimensions.get("window");

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
            position: "absolute",
            top: "5%",
            right: "5%",
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
        paddingHorizontal: 4,
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
          position: "absolute",
          top: "5%",
          right: "5%",
        }}
      />
      <View
        className="mt-16"
        style={{
          height: 240,
        }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.9)", "rgba(21, 21, 21, 0)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.6 }}
          locations={[0.72, 1.0]}
        >
          <YoutubePlayer
            height={300}
            initialPlayerParams={{
              loop: true,
              modestbranding: true,
              rel: false,
            }}
            play={playing}
            playList={MovieVideo?.map((video: MovieVideo) => video.key)}
            onChangeState={onStateChange}
          />
        </LinearGradient>
      </View>
      <ScrollView>
        <View className="flex-col gap-4 mt-4">
          <View className="flex-row justify-between">
            <GenreLogo data={data} />
          </View>

          <Text
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: 32,
            }}
          >
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
            <Text
              style={{
                color: "white",
                backgroundColor: "#404040",
                borderRadius: 2,
                fontSize: 12,
                lineHeight: 16,
                textAlign: "center",
                paddingHorizontal: 12,
                fontWeight: "600",
                paddingVertical: 4,
              }}
            >
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

            <Text style={{
              borderWidth: 1,
              borderRadius: 4,
              color: "#d4d4d4",
              fontSize: 12,
              lineHeight: 20,
              borderColor: "#52525b",
              textAlign: "center",
              verticalAlign: "middle",
              paddingHorizontal: 6,
              fontWeight: "600",
              textTransform: "uppercase"
            }} >
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
          <View  style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 86,
            marginVertical: 48,
            paddingHorizontal: 22
          }}>
            <FavoriteButton
              movieId={data?.id || 0}
              series={Boolean(Series)}
              labelClassName="text-neutral-500 text-sm font-light"
              ClassName="gap-2"
              iconSize={28}
            />
            <RateButton />
            <ShareButton onPress={onShare} />
          </View>
        </View>

        <TabView
          navigationState={{
            index,
            routes: routes,
          }}
          style={{
            height: height / 2,
          }}
          lazy
          renderScene={({ route }) => {
            switch (route.key) {
              case "Episode":
                return (
                  <EpisodesTab
                    season={season}
                    data={data}
                    setSeason={setSeason}
                    setEpisode={setEpisode}
                  />
                );
              case "Recomendations":
                return <RecommendationsTab data={Recommendations} />;
              case "Collection":
                return <ColllectionTab data={collection} />;
              case "Trailers":
                return <TrailersTab data={MovieVideo} />;
              default:
                return null;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              scrollEnabled
              tabStyle={{
                padding: 0,
                width: "auto",
                marginHorizontal: 5,
              }}
              indicatorStyle={{ backgroundColor: "red", top: 0, height: 4 }}
              style={{ backgroundColor: "black" }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: focused ? "white" : "darkgray",
                    margin: 8,
                  }}
                >
                  {route.label}
                </Text>
              )}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoScreen;
