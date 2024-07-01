import { Pressable, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ShareButtonInterface {
  onPress: () => void;
}

const ShareButton: React.FC<ShareButtonInterface> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-col items-center gap-2 justify-center">
        <Ionicons name="paper-plane-outline" size={28} color="white" />
        <Text className="text-neutral-500 text-sm font-light">Share</Text>
      </View>
    </Pressable>
  );
};

export default ShareButton;
