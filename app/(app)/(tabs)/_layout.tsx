import useProfile from "@/hooks/useProfile";
import { Tabs, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Alert, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Image } from "expo-image";
import images from "@/constants/images";
import _ from "lodash";


export default function TabLayout() {
  const { setProfile,Profile } = useProfile();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await supabase
          .from("profiles")
          .select(`*`)
          .eq("id", id);
        if (data) {
          setProfile(data[0]);
        }
      } catch (error: any) {
        if (error) Alert.alert(error.message);
      }
    };
    fetchProfile();
  }, [id, setProfile]);

  if (_.isEmpty(Profile)) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // gap: 50,
          }}
        >
          {/* <Image
            source={images[Profile?.profilePicture || "pfp-1"]}
            style={{
              width: 140,
              height: 140,
              borderRadius: 5
            }}
          /> */}
       
            <ActivityIndicator
              size={80}
              animating={true}
              color={MD2Colors.red500}
            />
    
        </View>
      </View>
    );
  }
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#111",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-filled" size={24} color={color} />
          ),
          headerShown: false,

          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "#111",
          },
          // headerRight: (props) => (
          //   <View className="mr-6 flex-row items-center gap-4">
          //     <MaterialIcons name="cast-connected" size={30} color="white" />
          //     <TouchableHighlight
          //       onPress={() => router.push("/(app)/profiles")}
          //     >
          //       <Image
          //         source={images[Profile?.profilePicture!]}
          //         className="w-[40px] h-[40px] rounded-sm"
          //         style={{
          //           width: 35,
          //           height: 35,
          //         }}
          //       />
          //     </TouchableHighlight>
          //   </View>
          // ),
          // headerTitle: () => (
          //   <Text
          //     style={{
          //       fontSize: 20,
          //       color: "white",
          //     }}
          //   >
          //     For{" "}
          //     {Profile?.username.charAt(0).toUpperCase() +
          //       Profile?.username.slice(1)}
          //   </Text>
          // ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "New & Hot",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="play-box-multiple-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
