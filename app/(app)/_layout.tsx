import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Redirect, Stack, useNavigation } from "expo-router";

import useSession from "@/hooks/useSession";
import { Image } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import useProfile from "@/hooks/useProfile";
import React from "react";

export default function AuthLayout() {
  const { session } = useSession();
  const navigation = useNavigation();
  const { setEditProfile, EditProfile } = useProfile();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (!session?.access_token) {
    return <Redirect href={"/"} />;
  }
  if (!session) {
    return <ActivityIndicator animating={true} color={MD2Colors.red500} />;
  }
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitle: (props) => (
            <Image
              source={require("@/assets/images/Netflix.png")}
              style={{
                width: 100,
                height: 50,
              }}
            />
          ),
          headerTitleAlign: "center",
          headerRight: (props) => (
            <AntDesign
              name="edit"
              onPress={() => setEditProfile(!EditProfile)}
              size={24}
              color="white"
              className="mr-4"
            />
          ),
        }}
        name="profiles"
      />
      <Stack.Screen
        name="[info]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="(tabs)" options={{
        headerShown:false
      }}/>
      <Stack.Screen
        name="add-profile"
        options={{
          headerTitle: "Add Profile",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          headerTitle: "Edit Profile",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          presentation: "card",
        }}
      />
    </Stack>
  );
}
