import { Text, TouchableHighlight, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import images from "@/constants/images";
import useProfile from "@/hooks/useProfile";
import { BlurView } from "expo-blur";
import { Link, router } from "expo-router";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface HomeHeaderInterface {
  scrollY: SharedValue;
}

const HomeHeader: React.FC<HomeHeaderInterface> = ({ scrollY }) => {
  const { Profile } = useProfile();
  const isFlatListVisible = useSharedValue(true);

  const prevScrollY = useRef(scrollY);

  useEffect(() => {
    if (scrollY > prevScrollY.current) {
      isFlatListVisible.value = false;
    } else {
      isFlatListVisible.value = true;
    }
    prevScrollY.current = scrollY;
  }, [scrollY, isFlatListVisible]);

  const flatListStyle = useAnimatedStyle(() => {
    return {
      height: isFlatListVisible.value
        ? withDelay(1000, withTiming(35, { duration: 400 }))
        : withDelay(1000, withTiming(0, { duration: 400 })),
      opacity: isFlatListVisible.value
        ? withDelay(1000, withTiming(1, { duration: 400 }))
        : withDelay(1000, withTiming(0, { duration: 400 })),
      marginTop: isFlatListVisible.value
        ? withDelay(1000, withTiming(20, { duration: 400 }))
        : withDelay(1000, withTiming(0, { duration: 400 })),
    };
  });
  const Links = [
    {
      href: "",
      label: "TV Shows",
    },
    {
      href: "",
      label: "Movies",
    },
    {
      href: "",
      label: "Categories",
    },
  ];
  return (
    <BlurView
      tint="systemThickMaterialDark"
      style={{
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: "5%",
        paddingTop: 40,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: 400,
          }}
        >
          For{" "}
          {(Profile?.username?.charAt(0)?.toUpperCase() || "") +
            Profile?.username.slice(1)}
        </Text>
        <View className="mr-6 flex-row items-center gap-4">
          <MaterialIcons name="cast-connected" size={30} color="white" />
          <TouchableHighlight onPress={() => router.push("/(app)/profiles")}>
            <Image
              source={
                images[Profile?.profilePicture!] || {
                  uri: Profile?.profilePicture,
                }
              }
              className="w-[40px] h-[40px] rounded-sm"
              style={{
                width: 35,
                height: 35,
              }}
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
    </BlurView>
  );
};

export default HomeHeader;
