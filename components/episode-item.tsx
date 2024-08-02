import { Episode } from "@/types";
import { Image } from "expo-image";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface EpisodeItemProps {
  episode: Episode;
  onPress: () => void;
}

const EpisodeItem = (props: EpisodeItemProps) => {
  const { episode, onPress } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [textLines, setTextLines] = useState<number | undefined>(undefined);
  const handleTextLayout = useCallback((event: any) => {
    const { lines } = event.nativeEvent;
    setTextLines(lines.length);
  }, []);
  if (_.isEmpty(episode)) {
    return null;
  }
  return (
    <Pressable style={{ margin: 10 }} onPress={onPress}>
      <View style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      }}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/original${episode?.still_path}`,
          }}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {episode.episode_number}. {episode?.name}
          </Text>
          <Text style={styles.duration}>{episode?.runtime}m</Text>
        </View>

        {/* <AntDesign name="download" size={24} className="mr-8" color={"white"} /> */}
      </View>

      <Text
        style={styles.overview}
        numberOfLines={isExpanded ? undefined : 3}
        onTextLayout={handleTextLayout}
      >
        {episode.overview}
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
    marginTop: 5,
  },
  overview: {
    fontWeight: "300",
    color: "white",
    fontSize: 12,
    lineHeight: 20,
  },
});
export default EpisodeItem;
