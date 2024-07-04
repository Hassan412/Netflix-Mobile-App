import { FlatList } from "react-native";
import React from "react";
import useTvSeason from "@/hooks/useTVSeasion";
import { useLocalSearchParams } from "expo-router";
import EpisodeItem from "./episode-item";
import DropDown from "./drop-down";
import { Episode, MoviesData } from "@/types";

interface EpisodesTabInterface {
  season: number;
  setSeason: (season: number) => void;
  data?: MoviesData;
  setEpisode: (episode: Episode) => void;
}

const EpisodesTab: React.FC<EpisodesTabInterface> = ({
  season,
  setSeason,
  data,
  setEpisode,
}) => {
  const { info } = useLocalSearchParams();
  const { data: Season } = useTvSeason(info as string, season);
  return (
    <FlatList
      nestedScrollEnabled
      ListHeaderComponent={
        <DropDown setValue={setSeason} value={season} Seasons={data?.seasons} />
      }
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
