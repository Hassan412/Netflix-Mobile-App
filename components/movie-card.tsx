import { TouchableHighlight, View } from "react-native";
import React from "react";
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

  return (
    <View className={cn("rounded-md relative bg-neutral-800", className)}>
      <TouchableHighlight
        onPress={() =>
          router.push(`/${data.id}${varient === "Series" ? "?Series=1" : ""}`)
        }
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 5,
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/original${data?.poster_path}`,
          }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default MovieCard;
