import { Dimensions, Text, View } from "react-native";
import React, { memo } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { FlatList } from "react-native";
import { MovieVideo } from "@/types";

interface TrailersTabInterface {
  data?: MovieVideo[];
}

const TrailersTab: React.FC<TrailersTabInterface> = ({ data }) => {
  const { height } = Dimensions.get("window");
  return (
    <FlatList
      data={data}
      nestedScrollEnabled
      renderItem={({ item, index }) => (
        <View style={{ marginVertical: 8 }} key={index}>
          <YoutubePlayer
            height={height / 3.5}
            videoId={item.key}
            initialPlayerParams={{ modestbranding: true }}
            play={false}
          />
          <Text style={{ color: "white", fontSize: 18 }}>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default memo(TrailersTab);
