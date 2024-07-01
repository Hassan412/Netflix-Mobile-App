import { Episode } from "@/types";
import { Image } from "expo-image";
import _ from "lodash";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface EpisodeItemProps {
  episode: Episode;
  onPress: () => void;
}

const EpisodeItem = (props: EpisodeItemProps) => {
  const { episode, onPress } = props;
  if (_.isEmpty(episode)) {
    return null;
  }
  return (
    <Pressable style={{ margin: 10 }} onPress={onPress}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/original${episode?.still_path}`,
          }}
          contentFit="cover"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {episode.episode_number}. {episode?.name}
          </Text>
          <Text style={styles.duration}>{episode?.runtime}m</Text>
        </View>

        {/* <AntDesign name="download" size={24} className="mr-8" color={"white"} /> */}
      </View>

      <Text className="font-light text-white text-sm">{episode.overview}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  image: {
    height: 85,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    borderRadius: 3,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    padding: 5,
    justifyContent: "center",

    minWidth: 150,
  },
  title: {
    color: "white",
  },
  duration: {
    color: "darkgrey",
    fontSize: 10,
  },
});
export default EpisodeItem;
