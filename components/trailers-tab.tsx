import { Dimensions, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { memo } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { MovieVideo } from "@/types";
import _ from "lodash";

interface TrailersTabInterface {
  data?: MovieVideo[];
}

const TrailersTab: React.FC<TrailersTabInterface> = ({ data }) => {
  const { height } = Dimensions.get("window");
  if (_.isEmpty(data)) {
    return null;
  }
  return (
    <FlatList
      nestedScrollEnabled
      data={data}
      renderItem={({ item, index }) => (
        <View style={{ marginVertical: 8, width: "100%" }} key={index}>
          <YoutubePlayer
            height={height / 3.5}
            videoId={item?.key}
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
