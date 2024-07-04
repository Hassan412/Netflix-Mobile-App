import { SafeAreaView, ScrollView, Text, View } from "react-native";
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
      <MovieCard key={index} data={data} width={"31%"}/>
    ));
  };

  return (
    <SafeAreaView style={{
      paddingTop: 64,
      flex: 1,
      backgroundColor: "black"
    }}>
      <SearchBar Query={searchQuery} setQuery={setSearchQuery} />
      <ScrollView>
        <View style={{
            flexDirection: 'row',
            marginVertical: 32,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,

        }}>
          {renderMovies()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

