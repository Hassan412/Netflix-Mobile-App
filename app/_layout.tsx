import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "../global.css"
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { Image, View } from "react-native";
import LottieView from "lottie-react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const animation = useRef<LottieView>(null);
  const [splashAnimationFinished, setSplashAnimationFinished] =
    React.useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !splashAnimationFinished) {
    return (
      <View className="flex-[1] items-center justify-center bg-black">
        <LottieView
          autoPlay
          onAnimationFinish={(isCancelled: any) => {
            if (!isCancelled) {
              setSplashAnimationFinished(true);
            }
          }}
          loop={false}
          ref={animation}
          style={{
            width: 300,
            height: 300,
            backgroundColor: "#000",
          }}
          source={require("@/assets/svgs/Netflix-animation.json")}
        />
      </View>
    );
  }

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="index"
        />
        <Stack.Screen
          name="sign-in"
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerShown: true,
            headerTitle: (props) => (
              <Image
                source={require("@/assets/images/Netflix.png")}
                style={{
                  width: 100,
                  height: 50,
                }}
              />
            ),
            presentation: "modal",
          }}
        />

        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
