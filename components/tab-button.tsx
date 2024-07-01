import { Pressable, Text, View } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface TabButtonInterface {
  title: string;
  className?: string;
  active?: boolean;
  onPress?: () => void;
  hidden?: boolean;
}

const TabButton: React.FC<TabButtonInterface> = ({
  title,
  className,
  active,
  onPress,
  hidden,
}) => {
  const style = useAnimatedStyle(() => {
    return {
      width: active
        ? withTiming("100%", { duration: 300 })
        : withTiming("0%", { duration: 300 }),
    };
  });
  if (hidden) {
    return null;
  }
  return (
    <Pressable onPress={onPress}>
      <View className="flex-col justify-start items-start gap-2 mr-6">
        <Animated.View
          className={cn("h-[5px]", active ? "bg-red-600" : "bg-black")}
          style={{ ...style, zIndex: 100 }}
        />

        <Text
          className={cn(
            "font-medium",
            active ? "text-white" : "text-neutral-400"
          )}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default TabButton;
