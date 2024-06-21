import { TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

interface SearchBarInterface {
  Query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarInterface> = ({ Query, setQuery }) => {
  return (
    <View className="flex-row bg-neutral-800 gap-4 px-4 py-2 rounded-md">
      <AntDesign name="search1" size={24} color={"gray"} />
      <TextInput
        editable
        className="bg-neutral-800 flex-1 text-white"
        placeholderTextColor={"gray"}
        placeholder="Search"
        value={Query}
        onChangeText={(value) => setQuery(value)}
      />
      {Query && (
        <AntDesign
          name="closecircle"
          size={24}
          color="gray"
          onPress={() => setQuery("")}
        />
      )}
    </View>
  );
};

export default SearchBar;
