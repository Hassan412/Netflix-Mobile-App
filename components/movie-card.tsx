import { View, Text, Pressable } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { MoviesData } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { cn } from "@/lib/utils";

interface MovieCardInterface {
  data: MoviesData;
  className?: string;
  varient?: "Series" | "Movies";
}

const MovieCard: React.FC<MovieCardInterface> = ({
  data,
  className,
  varient,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const onPress = useCallback(() => {
    router.push(
      `/(app)/${data.id}${varient === "Series" || data.name ? "?Series=1" : ""}`
    );
  }, [data.id, router, varient, data.name]);
  return (
    <View className={cn("rounded-md relative bg-neutral-900", className)}>
      <Pressable onPress={onPress}>
        <View style={{ height: "100%", width: "100%" }}>
          {isLoading && (
            <Text className=" text-white absolute top-[50%] text-center text-sm right-0 left-0">
              {data.title}
            </Text>
          )}
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 5,
            }}
            alt="movie-poster"
            transition={500}
            source={{
              uri: `https://image.tmdb.org/t/p/original${data?.poster_path}`,
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default memo(MovieCard);
