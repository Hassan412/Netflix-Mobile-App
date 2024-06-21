import {
  Dimensions,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

interface TabButtonInterface {
  title: string;
  className?: string;
  active?: boolean;
  onPress?: ()=> void
}

const TabButton: React.FC<TabButtonInterface> = ({
  title,
  className,
  active,
  onPress
}) => {
  const { width } = Dimensions.get("window");
  return (
    <TouchableHighlight onPress={onPress}>
      <View className="flex-col items-center justify-center gap-4">
        <View
          className={cn("w-[110%] h-[5px]", active ? "bg-red-600" : "bg-black")}
        />

        <Text
          className={cn("font-bold", active ? "text-white" : "text-neutral-400")}
          style={{
            fontSize: width / 33,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default TabButton;
