import React from "react";
import { Text, View, Dimensions, StyleSheet, FlatList } from "react-native";
import { MoviesData } from "@/types";
import MovieCard from "./movie-card";
import _ from "lodash";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

interface MoviesListInterface {
  data: MoviesData[];
  heading?: string;
  varient?: "Series" | "Movies";
  isLoadingMore?: boolean;
  setSize?: (size: number) => void;
  size?: number;
}

const { width } = Dimensions.get("window");

const MoviesList: React.FC<MoviesListInterface> = ({
  data,
  heading,
  varient,
  isLoadingMore,
  setSize,
  size,
}) => {
  const handleLoadMore = () => {
    if (!isLoadingMore && setSize && size) {
      setSize(size + 1);
    }
  };
  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <View
      className="flex-col w-full justify-center"
      style={{
        flex: 1,
      }}
    >
      {heading && (
        <Text className="text-xl ml-1 mt-8 font-semibold text-white">
          {heading}
        </Text>
      )}
      <View className="flex-row gap-8 w-full justify-center items-center">
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <MovieCard
              data={item}
              varient={varient}
              className={`w-[130px] h-[200px]`}
              key={index}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onEndReached={handleLoadMore}
          snapToInterval={width / 3}
          decelerationRate="fast"
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.carousel}
        />
        {isLoadingMore ? (
          <ActivityIndicator animating={true} style={{
            marginHorizontal: 30
          }} color={MD2Colors.red500} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    alignItems: "center",

    gap: 10,
  },
  slide: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 150,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default MoviesList;
{
  /* <PagerView  style={styles.container} initialPage={0}>
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView> */
}
