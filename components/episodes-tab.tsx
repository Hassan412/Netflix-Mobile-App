import React from "react";
import useTvSeason from "@/hooks/useTVSeasion";
import { useLocalSearchParams } from "expo-router";
import EpisodeItem from "./episode-item";
import { Episode } from "@/types";
import { FlatList } from "react-native-gesture-handler";

interface EpisodesTabInterface {
  season: number;
  setEpisode: (episode: Episode) => void;
}

const EpisodesTab: React.FC<EpisodesTabInterface> = ({
  season,

  setEpisode,
}) => {
  const { info } = useLocalSearchParams();
  const { data: Season } = useTvSeason(info as string, season);
  return (
    // <ScrollView nestedScrollEnabled>
    //   <DropDown setValue={setSeason} value={season} Seasons={data?.seasons} />
    //   <View
    //     style={{
    //       flexDirection: "column",
    //     }}
    //   >
    //     {Season?.map((data, index) => (
    //       <EpisodeItem
    //         onPress={() => setEpisode(data)}
    //         key={index}
    //         episode={data}
    //       />
    //     ))}
    //   </View>
    // </ScrollView>
    <FlatList
      nestedScrollEnabled
      data={Season}
      renderItem={({ item, index }) => (
        <EpisodeItem
          onPress={() => setEpisode(item)}
          key={index}
          episode={item}
        />
      )}
    />
  );
};

export default EpisodesTab;
