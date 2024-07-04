import { ScrollView, View } from "react-native";
import React, { memo } from "react";
import MovieCard from "./movie-card";
import { CollectionData } from "@/types";

interface ColllectionTabInterface {
  data?: CollectionData;
}

const ColllectionTab: React.FC<ColllectionTabInterface> = ({
  data,
}) => {

  return (
    <ScrollView nestedScrollEnabled>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap :6
        }}
      >
        {data?.parts?.map((movie, index) => (
          <MovieCard key={index} data={movie} width={"31%"} />
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(ColllectionTab);
