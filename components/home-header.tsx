import { Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import images from "@/constants/images";
import useProfile from "@/hooks/useProfile";
import { Link, router } from "expo-router";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

interface HomeHeaderInterface {
  scrollY: SharedValue<number>;
}


const HomeHeader: React.FC<HomeHeaderInterface> = ({ scrollY }) => {
  const { Profile } = useProfile();


  const flatListStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 100],
        [35, 0],
        Extrapolate.CLAMP
      ),
      opacity: interpolate(
        scrollY.value,
        [0, 100],
        [1, 0],
        Extrapolate.CLAMP
      ),
      marginTop: interpolate(
        scrollY.value,
        [0, 100],
        [20, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const Links = [
    { href: "", label: "TV Shows" },
    { href: "", label: "Movies" },
    { href: "", label: "Categories" },
  ];

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: "5%",
        paddingTop: 40,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
      }}
    >
      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 20, color: "white", fontWeight: "400" }}>
          For {Profile && Profile?.username?.charAt(0)?.toUpperCase() + Profile?.username.slice(1)}
        </Text>
        <View style={{ marginRight: 24, flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MaterialIcons name="cast-connected" size={30} color="white" />
          <TouchableHighlight onPress={() => router.push("/(app)/profiles")}>
            <Image
              source={images[Profile?.profilePicture!] || { uri: Profile?.profilePicture }}
              style={{ width: 35, height: 35, borderRadius: 4 }}
            />
          </TouchableHighlight>
        </View>
      </View>
      <Animated.FlatList
        data={Links}
        horizontal
        style={flatListStyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Link
            href={item.href}
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "#999",
              borderRadius: 9999,
              color: "white",
              marginHorizontal: 5,
              paddingVertical: 5,
              alignSelf: "center",
            }}
          >
            {item.label}
          </Link>
        )}
      />
    </View>
  );
};

export default HomeHeader;