import { Pressable, Text, View } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
const RateButton = () => {
  return (
    <Pressable>
      <View className="flex-col items-center gap-2 justify-center">
        {/* {favoriteIds.includes(movieId) ? (
       <Feather name="check" size={24} color="white" />
      ) : (
       
      )} */}
        <SimpleLineIcons name="like" size={28} color="white" />
        <Text className="text-neutral-500 text-sm font-light">Rate</Text>
      </View>
    </Pressable>
  );
};

export default RateButton;