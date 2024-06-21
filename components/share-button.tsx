import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const ShareButton = () => {
  return (
    <TouchableHighlight>
      <View className="flex-col items-center gap-2 justify-center">
        {/* {favoriteIds.includes(movieId) ? (
     <Feather name="check" size={24} color="white" />
    ) : (
     
    )} */}
        <Ionicons name="paper-plane-outline" size={28} color="white" />
        <Text className="text-neutral-500 text-sm font-light">Share</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ShareButton;

const styles = StyleSheet.create({});
