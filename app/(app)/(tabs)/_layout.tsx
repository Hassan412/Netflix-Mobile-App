import images from "@/constants/images";
import useProfile from "@/hooks/useProfile";
import { Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, Image, Text, TouchableHighlight, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import _ from "lodash";
import React from "react";

export default function TabLayout() {
  const router = useRouter()
  const { Profile,setProfile } = useProfile();
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
        <Text>
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={MD2Colors.red500}
          />
          ;
        </Text>
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
          backgroundColor: "black",
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
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "black",
          },
          headerStyle: {
            backgroundColor: "black",
            borderWidth: 0,
            shadowColor: "black",
            shadowOffset: {
              height: 6,
              width: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            elevation: 100,
          },

          headerTitle: (props) => (
            <Image
              source={require("@/assets/images/netflix-2.png")}
              className="w-[40px] h-[40px]"
              style={{
                width: 40,
                height: 40,
              }}
            />
          ),
          headerRight: (props) => (
            <View className="mr-6 flex-row items-center gap-4">
              <MaterialIcons name="cast-connected" size={30} color="white" />
              <TouchableHighlight onPress={()=> router.push("/(app)/profiles")}>
              <Image
              
                source={images[Profile?.profilePicture!]}
                className="w-[40px] h-[40px] rounded-sm"
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              </TouchableHighlight>
            </View>
          ),
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
