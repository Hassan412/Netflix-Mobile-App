import React, { memo, useCallback } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList } from "react-native";
import { MoviesData } from "@/types";
import MovieCard from "./movie-card";
import _ from "lodash";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import useList from "@/hooks/useList";

interface MoviesListInterface {
  data?: MoviesData[];
  heading?: string;
  varient?: "Series" | "Movies";
  genreId?: number;
}

const { width } = Dimensions.get("window");

const MoviesList: React.FC<MoviesListInterface> = ({
  heading,
  varient,
  data,
  genreId,
}) => {
  const {
    data: movies,
    setSize,
    size,
    isLoadingMore,
  } = useList(genreId, varient === "Series");

  const handleLoadMore = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  if (_.isEmpty(data || movies)) {
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
        <Text className="text-xl mb-4 mt-8 font-semibold text-white">
          {heading}
        </Text>
      )}
      <View className="flex-row w-full justify-center items-center">
        <FlatList
          data={data || movies}
          renderItem={({ item, index }) => (
            <MovieCard
              data={item}
              varient={varient}
              className={`h-[170px]`}
              width={115}
              key={index}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          removeClippedSubviews
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator
                animating={true}
                style={{
                  marginHorizontal: 30,
                }}
                color={MD2Colors.red500}
              />
            ) : null
          }
          decelerationRate="fast"
          onEndReached={data ? null : handleLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.carousel}
        />
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

export default memo(MoviesList);
