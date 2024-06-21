import { MoviesData } from "@/types";
import React from "react";
import { Image, Text, View } from "react-native";

interface GenreLogoProps {
  data?: MoviesData;
}
const GenreLogo: React.FC<GenreLogoProps> = ({ data }) => {
  return (
    <View className="flex-row w-fit items-center justify-start">
      <Image
        source={require("@/assets/images/netflix-2.png")}
        className="w-[40px] h-[40px]"
        style={{
          width: 25,
          height: 25,
        }}
      />
      <Text
        className="text-white font-medium text-lg uppercase"
        style={{
          letterSpacing: 2,
        }}
      >
        {typeof data === "object" ? data?.genres[0]?.name : data}
      </Text>
    </View>
  );
};

export default GenreLogo;
