import { Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { MaterialIcons } from "@expo/vector-icons";

interface PlayButtonInterface {
  className?: string;
  onPress?: () => void;
  label?: string;
}

const PlayButton: React.FC<PlayButtonInterface> = ({
  className,
  onPress,
  label,
}) => {

  const handlePress = () => {
    console.log("Button pressed");
    if (onPress) {
      onPress();
    }
  };

  return (
    <View>
      <TouchableHighlight onPress={handlePress}>
        <View
          className={cn(
            "flex-row gap-2 items-center bg-white px-6 py-2 rounded-sm",
            className
          )}
        >
          {label === "Pause" ? (
            <MaterialIcons name="pause" size={24} color="black" />
          ) : (
            <Entypo name="controller-play" size={24} color="black" />
          )}
          <Text className="font-medium">{label ? label : "Play"}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default PlayButton;