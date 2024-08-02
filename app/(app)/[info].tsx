import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  Share,
  TouchableOpacity,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
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
import { Episode, MovieVideo } from "@/types";
import useAgeCertificate from "@/hooks/useAgeCertificate";
import RecommendationsTab from "@/components/recommendations-tab";
import ColllectionTab from "@/components/collection-tab";
import TrailersTab from "@/components/trailers-tab";
import useCollectionDetails from "@/hooks/useCollectionDetails";
import useRecommendations from "@/hooks/useRecommendations";
import { FlatList } from "react-native-gesture-handler";
import useTvSeason from "@/hooks/useTVSeasion";
import TabButton from "@/components/tab-button";
import DropDown from "@/components/drop-down";
import EpisodesTab from "@/components/episodes-tab";
// import axios from "axios";
// import * as cheerio from "cheerio";

interface PersonProps {
  id: number;
  name: string;
  character: string;
}

const InfoScreen = () => {
  const router = useRouter();
  // const [index, setIndex] = useState(0);
  const [value, setValue] = React.useState("Recomendations");
  // const [movies, setMovies] = useState<MediaItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [textLines, setTextLines] = useState<number | undefined>(undefined);
  const { info, Series } = useLocalSearchParams();
  const [season, setSeason] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [Episode, setEpisode] = useState<Episode>();
  const { data } = useMoviesAndSeriesById(info as string);
  const { data: PersonData } = usePerson(info as string);
  const { ageCertificate } = useAgeCertificate(info as string);
  const { data: Recommendations } = useRecommendations(info as string);
  const { collection } = useCollectionDetails(data?.belongs_to_collection?.id);
  const { data: MovieVideo, isLoading } = useMovieVideo(
    info as string,
    season,
    Episode?.episode_number
  );
  const { data: Season } = useTvSeason(info as string, season);
  const { height } = Dimensions.get("window");


  // useEffect(()=> {
  //   resetScreenOrientation();
  // },[])
  const onShare = async () => {
    try {
      await Share.share({
        message: `https://www.youtube.com/watch?v=${MovieVideo?.[0]?.key}`,
        url: `https://www.youtube.com/watch?v=${MovieVideo?.[0]?.key}`,
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

  const handleTextLayout = useCallback((event: any) => {
    const { lines } = event.nativeEvent;
    setTextLines(lines.length);
  }, []);

  const togglePlaying = useCallback(() => {
    router.push({
      pathname: `/(app)/watch`,
      params: {
        movieId:
          Series && Episode?.episode_number
            ? `${data?.id}/${season}/${Episode?.episode_number}`
            : data?.id,
        Series,
      },
    });
  }, [router, data?.id, Episode?.episode_number, Series, season]);
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
  if (_.isEmpty(data) || isLoading) {
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
            top: "8%",
            right: "5%",
          }}
        />
        <Text>
          <ActivityIndicator
            size={40}
            animating={true}
            color={MD2Colors.red500}
          />
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 py-8 relative"
      style={{
        backgroundColor: "black",
        paddingVertical: 32,
        position: "relative",
        flex: 1,
        paddingHorizontal: 4,
      }}
    >
      <View
        style={{
          zIndex: 100,
          position: "absolute",
          top: "5%",
          right: "5%",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        {router.canGoBack() && (
          <Entypo
            name="chevron-small-left"
            size={22}
            onPress={() => router.back()}
            style={{
              borderRadius: 9999,
              backgroundColor: "#333",
              padding: 5,
            }}
            color="white"
          />
        )}
        <AntDesign
          onPress={() => router.navigate("/(app)/(tabs)")}
          name="close"
          size={22}
          color="white"
          style={{
            borderRadius: 9999,
            backgroundColor: "#333",
            padding: 5,
          }}
        />
      </View>
      <View
        style={{
          height: 240,
          marginTop: 50,
        }}
      >
        <YoutubePlayer
          height={240}
          initialPlayerParams={{
            loop: true,
            modestbranding: true,
            rel: false,
          }}
          webViewProps={{
            scrollEnabled: false,
            showsVerticalScrollIndicator: false,
            // overScrollMode:"never"
          }}
          play={playing}
          playList={MovieVideo?.map((video: MovieVideo) => video?.key)}
          onChangeState={onStateChange}
        />
      </View>

      <FlatList
        data={value === "Episode" ? Season : []}
        ListHeaderComponent={
          <View className="flex-col gap-4 mt-4 relative">
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

              <Text
                style={{
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
                  textTransform: "uppercase",
                }}
              >
                {data?.original_language}
              </Text>
            </View>

            <PlayButton
              className="items-center justify-center rounded-md"
              onPress={togglePlaying}
              label={playing ? "Pause" : "Play"}
            />
            <DownloadButton className="items-center justify-center rounded-md" />
            <View className="flex-col justify-start items-start">
              {Episode && (
                <Text className="text-white font-medium text-lg">
                  S{Episode.season_number}:E{Episode.episode_number}{" "}
                  {Episode.name}
                </Text>
              )}
              <Text
                onTextLayout={handleTextLayout}
                className="text-base text-white font-light"
                style={{
                  lineHeight: 24,
                  fontSize: 15,
                }}
                numberOfLines={isExpanded ? undefined : 3}
              >
                {Episode ? Episode.overview : data?.overview}
              </Text>
              {textLines && textLines > 3 && (
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                  <Text
                    style={{
                      color: "darkgray",
                      marginTop: 8,
                      textDecorationLine: "underline",
                      textDecorationColor: "darkgray",
                    }}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </Text>
                </TouchableOpacity>
              )}
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 86,
                marginVertical: 28,
                paddingHorizontal: 22,
              }}
            >
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

            <FlatList
              data={tabButtons}
              horizontal
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
            <View
              style={{
                width: "100%",
                height: height / 2.1,
              }}
            >
              {value === "Recomendations" && (
                <RecommendationsTab data={Recommendations} />
              )}
              {value === "Episode" && (
                <EpisodesTab season={season} setEpisode={setEpisode} />
              )}
              {value === "Collection" && <ColllectionTab data={collection} />}
              {value === "Trailers" && <TrailersTab data={MovieVideo} />}
            </View>
          </View>
        }
        renderItem={null}
      />
      {/* <TabView
          navigationState={{
            index,
            routes: routes,
          }}
          style={{
            height: height / 1.8,
          }}
          swipeEnabled={false}
          lazy
          animationEnabled={false}
          renderScene={({ route }) => {
            switch (route?.key || "") {
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
             
              // indicatorStyle={{ backgroundColor: "red", top: 0, height: 4}}
              indicatorStyle={{
                backgroundColor: "red",
                height: 4,
                // left: 20 / 2,
                top: 0,
              }}
              // renderIndicator={(indicatorProps) => {
              //   const width = indicatorProps.getTabWidth(index) - 20;
              //   return <TabBarIndicator {...indicatorProps} width={width} />;
              // }}
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
        /> */}
    </SafeAreaView>
  );
};

export default InfoScreen;
