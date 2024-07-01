import { Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";
import { Octicons } from "@expo/vector-icons";
interface DownloadButtonInterface {
  className?: string;
  onPress?: () => void;
}

const DownloadButton: React.FC<DownloadButtonInterface> = ({
  className,
  onPress,
}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View
        className={cn(
          "flex-row gap-4 items-center bg-neutral-800 px-6 py-2 rounded-sm",
          className
        )}
      >
        <Octicons name="download" size={24} color="gray" />
        <Text className="font-medium text-lg text-neutral-500">Download</Text>
      </View>
    </TouchableHighlight>
  );
};

export default DownloadButton;
