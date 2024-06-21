import { Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const InfoButton = () => {
  return (
    <TouchableHighlight>
      <View className="flex-col items-center justify-center">
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color="white"
        />
        <Text className="text-white font-medium">Info</Text>
      </View>
    </TouchableHighlight>
  );
};

export default InfoButton;
