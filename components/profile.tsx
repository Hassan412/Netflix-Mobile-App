import { Text, TouchableHighlight, View } from "react-native";
import React from "react";
import images from "@/constants/images";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/lib/utils";

interface ProfileItemInterface {
  name: string;
  image: string;
  id: string;
}

const ProfileItem: React.FC<ProfileItemInterface> = ({ name, image, id }) => {
  const { EditProfile } = useProfile();
  const router = useRouter();
  const config = {
    duration: 300,
  };
  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(110, config),
      width: withTiming(110, config),
    };
  });

  return (
    <TouchableHighlight
      onPress={() => {
        if (EditProfile) {
          router.push({
            pathname: "/edit-profile",
            params: {
              name,
              image,
              id,
            },
          });
        } else {
          router.replace({
            pathname: `/(tabs)`,
            params: {
              id: id,
            },
          });
        }
      }}
    >
      <View
        className={cn("flex-col relative justify-center items-center gap-2")}
      >
        {EditProfile && (
          <View
            className="absolute top-0 justify-center items-center left-0 bottom-0 right-0 w-[110px] h-[110px] bg-black/40"
            style={{
              zIndex: 100,
            }}
          >
            <AntDesign name="edit" size={28} color="white" />
          </View>
        )}

        <Animated.Image
          source={images[image]}
          style={style}
          className={"rounded-md"}
        />
        <Text className="text-center text-white">{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ProfileItem;
