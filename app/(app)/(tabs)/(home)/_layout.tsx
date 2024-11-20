import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function HomeLayout() {

    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerBlurEffect: "regular",
                headerTransparent: Platform.OS === "ios" ? true : false
            }} />
        </Stack>
    );
}
