import {  View } from "react-native";
import {
  ScrollView,
} from "react-native-gesture-handler";
import React, { memo } from "react";
import MovieCard from "./movie-card";
import { MoviesData } from "@/types";

interface RecommendationsTabInterface {
  data?: MoviesData[]
}

const RecommendationsTab: React.FC<RecommendationsTabInterface> = ({
  data
}) => {

  return (
    <ScrollView nestedScrollEnabled>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          flex: 1,
          gap: 6,
        }}
      >
        {data?.map((similar, index) => (
          <MovieCard key={index} data={similar} width={"31%"} />
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(RecommendationsTab);
