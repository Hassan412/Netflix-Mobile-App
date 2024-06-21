import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBar from "@/components/search-bar";
import useSearchData from "@/hooks/useSearchData";
import { MoviesData } from "@/types";
import MovieCard from "@/components/movie-card";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import _ from "lodash";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data: Trending }: { data: MoviesData[] } = useTrendingMovies();
  const {
    data: SearchData,
    isLoading,
  }: { data: MoviesData[]; isLoading: boolean } = useSearchData(searchQuery);

  const renderMovies = () => {
    if (!_.isEmpty(searchQuery) && _.isEmpty(SearchData)) {
      return <Text className="text-white">No Movies Found</Text>;
    }
    if (isLoading) {
      return (
        <Text>
          <ActivityIndicator animating={true} color={MD2Colors.red500} />;
        </Text>
      );
    }
    const moviesToRender = _.isEmpty(searchQuery) ? Trending : SearchData;
    return moviesToRender?.map((data, index) => (
      <MovieCard key={index} data={data} className="h-[170px] w-[31%]" />
    ));
  };

  return (
    <SafeAreaView className="bg-black flex-1 pt-16 px-4">
      <SearchBar Query={searchQuery} setQuery={setSearchQuery} />
      <ScrollView>
        <View className="flex-row gap-2 my-8 justify-center items-center flex-wrap">
          {renderMovies()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
