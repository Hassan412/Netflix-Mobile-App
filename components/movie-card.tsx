import { View, Text, Pressable, DimensionValue } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { MoviesData } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { cn } from "@/lib/utils";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface MovieCardInterface {
  data: MoviesData;
  className?: string;
  varient?: "Series" | "Movies";
  width?: DimensionValue;
  height?: DimensionValue;
  // routervarient: "push" | "replace";
}

const MovieCard: React.FC<MovieCardInterface> = ({
  data,
  className,
  varient,
  width,
  height,
  // routervarient,
}) => {
  const router = useRouter();
  const scaleImage = useSharedValue(1);
  const [isLoading, setIsLoading] = useState(true);

  const onPress = useCallback(() => {
    const url = `/(app)/${data.id}${
      varient === "Series" || data.name ? "?Series=1" : ""
    }`;
    router.push(url);
    // if (routervarient === "push") {
    //   router.push(url);
    // } else if (routervarient === "replace") {
    //   router.replace(url);
    // }
  }, [data.id, router, varient, data.name]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(scaleImage.value),
      },
    ],
    backgroundColor: "#111",
  }));
  return (
    <View
      style={{
        width: width,
        height: height ? height : 170,

      }}
      className={cn("rounded-sm relative", className)}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => (scaleImage.value = 0.95)}
        onPressOut={() => (scaleImage.value = 1)}
      >
        <Animated.View style={animatedStyles}>
          {isLoading && (
            <Text className=" text-white absolute top-[40%] text-center text-sm right-0 left-0">
              {data.title}
            </Text>
          )}
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 2,
            }}
            alt="movie-poster"
            transition={500}
            source={{
              uri: `https://image.tmdb.org/t/p/original${data?.poster_path}`,
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default memo(MovieCard);
