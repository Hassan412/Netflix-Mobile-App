import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useMoviesById from "@/hooks/useMoviesById";
import YoutubePlayer from "react-native-youtube-iframe";
import useMovieVideo from "@/hooks/useMovieVideo";
import { format } from "date-fns";
import PlayButton from "@/components/playButton";
import GenreLogo from "@/components/genre-logo";
import DownloadButton from "@/components/downloadbutton";
import usePerson from "@/hooks/usePerson";
import { AirbnbRating } from "react-native-ratings";
import {
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import FavoriteButton from "@/components/favoriteButton";
import RateButton from "@/components/rate-button";
import ShareButton from "@/components/share-button";
import _ from "lodash";
import TabButton from "@/components/tab-button";
import { formatRuntime } from "@/lib/utils";
interface PersonProps {
  id: number;
  name: string;
  character: string;
}

const InfoScreen = () => {
  const [value, setValue] = React.useState("Episode");
  const { info } = useLocalSearchParams();
  const { data } = useMoviesById(info as string);
  const { data: PersonData } = usePerson(info as string);
  const [playing, setPlaying] = useState(false);
  const { data: MovieVideo } = useMovieVideo(info as string);

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
  return (
    <ScrollView>
      <SafeAreaView className="bg-black flex-1 py-8">
        <View
          className="mt-8"
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
            playList={MovieVideo?.results.map((video: any) => video.key)}
            onChangeState={onStateChange}
          />
        </View>
        <View className="flex-col gap-4 mt-4 mx-2">
          <View className="flex-row justify-between">
            <GenreLogo data={data} />

            <AirbnbRating
              reviews={[]}
              ratingContainerStyle={{
                height: 10,
              }}
              reviewSize={0}
              defaultRating={(data?.vote_average || 0) / 2}
              selectedColor="#e50914"
              size={19}
            />
          </View>

          <Text className="text-white font-semibold text-2xl">
            {data?.title}
          </Text>
          <View className="flex-row gap-4 items-center">
            <Text className="text-white font-light">
              {format(new Date(data?.release_date || 0), "yyyy")}
            </Text>
            <Text className="text-white bg-neutral-400/50 rounded-sm text-xs text-center px-3 font-semibold py-1">
              {data?.adult ? "TV-MA" : "TV"}
            </Text>
            <Text className="text-white font-light">
              {formatRuntime(data?.runtime as number)}
            </Text>
            <Text className="border-2 rounded-md text-neutral-300 text-xs border-zinc-600 text-center align-middle px-1 font-semibold uppercase">
              {data?.original_language}
            </Text>
          </View>

          <PlayButton
            className="items-center justify-center rounded-md"
            onPress={togglePlaying}
            label={playing ? "Pause" : "Play"}
          />
          <DownloadButton className="items-center justify-center rounded-md" />
          <Text className="text-base text-white font-light">
            {data?.overview}
          </Text>
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
        </View>
        <View className="flex-row justify-start gap-24 px-8 my-12">
          <FavoriteButton
            movieId={data?.id || 0}
            labelClassName="text-neutral-500 text-sm font-light"
            ClassName="gap-2"
            iconSize={28}
          />
          <RateButton />
          <ShareButton />
        </View>
        <View className="flex-row gap-4 justify-center">
          {/* <SegmentedButtons
            value={value}
            onValueChange={setValue}
            theme={{
              colors: {
                primary: "black",
                onSecondaryContainer: "black",
                secondaryContainer: "black",
              },
            }}
            buttons={[
              {
                value: "walk",
                label: "Episodes",
                checkedColor: "white",
                uncheckedColor: "gray",
                labelStyle: {
                  fontSize: 11,
                },
                style: styles.button,
              },
              {
                value: "train",
                label: "Collection",
                checkedColor: "white",
                uncheckedColor: "gray",
                labelStyle: {
                  fontSize: 11,
                },
                style: styles.button,
              },
              {
                value: "drive",
                label: "More Like This",
                checkedColor: "white",
                uncheckedColor: "gray",
                labelStyle: {
                  fontSize: 11,
                },
                style: styles.button,
              },
              {
                value: "drive",
                label: "Trailers & More",
                checkedColor: "white",
                uncheckedColor: "gray",
                labelStyle: {
                  fontSize: 11,
                },
                style: styles.button,
              },
            ]}
            density="regular"
          /> */}
          <TabButton
            title="Episodes"
            active={value === "Episode"}
            onPress={() => setValue("Episode")}
          />
          <TabButton
            title="Collection"
            active={value === "Collection"}
            onPress={() => setValue("Collection")}
          />
          <TabButton
            title="More Like This"
            active={value === "Recomendations"}
            onPress={() => setValue("Recomendations")}
          />
          <TabButton
            title="Trailers & More"
            active={value === "Trailers"}
            onPress={() => setValue("Trailers")}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  button: {
    fontSize: 10,
  },
});
export default InfoScreen;
