import useProfile from "@/hooks/useProfile";
import { Tabs, useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Alert, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import _ from "lodash";
import * as NavigationBar from 'expo-navigation-bar';

export default function TabLayout() {
  const { setProfile, Profile } = useProfile();
  const { id } = useGlobalSearchParams();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#111")
  }, [])

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
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-filled" size={24} color={color} />
          ),

          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "#111",
            height:60,
            paddingTop:10
          },
          headerShown: false

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
