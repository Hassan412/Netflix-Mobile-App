import { Dimensions, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import * as ScreenOrientation from "expo-screen-orientation";
import { AntDesign } from "@expo/vector-icons";
const WatchScreen = () => {
  const { movieId, Series } = useLocalSearchParams();
  const { height } = Dimensions.get("window");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(movieId);
    changeScreenOrientation();
  }, [movieId]);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        resetScreenOrientation();
      };
    }, [])
  );
  async function resetScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  }
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }

  const injectedJavaScript = `
    function hideSiblings(element) {
      let sibling = element.parentNode.firstChild;
    
      while (sibling) {
        if (sibling !== element && sibling.nodeType === 1) {
          sibling.style.display = "none";
        }
        sibling = sibling.nextSibling;
      }
    }
    
    function hideAncestorsSiblings(element) {
      while (element) {
        hideSiblings(element);
        element = element.parentNode;
      }
    }
    const playNowElement = document.querySelector("#mid");
    
    if (playNowElement) {
    
      document.documentElement.style.height = "100%";
      document.body.style.height = "100%";
      document.body.style.background = "black"
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      playNowElement.style.position = "fixed";
      playNowElement.style.top = "0";
      playNowElement.style.left = "0";
      playNowElement.style.height = "100vh";
      playNowElement.style.width = "100vw";
      playNowElement.style.zIndex = "9999";
      hideAncestorsSiblings(playNowElement);
    
      playNowElement.querySelectorAll("*").forEach((child) => {
        child.style.display = "block";
      });
    }`;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <StatusBar hidden />
      <AntDesign
        onPress={async () => {
          await resetScreenOrientation();
          router.back();
        }}
        name="close"
        size={22}
        color="white"
        style={{
          borderRadius: 9999,
          backgroundColor: "#333",
          padding: 5,
          position: "absolute",
          right: "5%",
          top: "5%",
          zIndex: 100,
        }}
      />
      {loading && (
        <View
          style={{
            position: "absolute",
            top: "0%",
            left: "0%",
            right: 0,
            bottom: 0,
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <ActivityIndicator size={40} color={MD2Colors.red500} />
        </View>
      )}
      <View
        style={{
          height: height,
        }}
      >
        <WebView
          // scrollEnabled={false}
          style={{
            width: "100%",
            height: height / 3.9,
            backgroundColor: "black",
          }}
          // javaScriptEnabled={true}
          // injectedJavaScript={injectedJavaScript
          allowsFullscreenVideo
          source={{
            uri: Series
              ? `https://vidsrc.net/embed/tv/${movieId}`
              : `https://vidsrc.net/embed/movie/${movieId}`,
          }}
          // onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          setSupportMultipleWindows={false}
          onShouldStartLoadWithRequest={(request) => {
            // Only allow navigating within this website
            return request.url.startsWith(
              Series
                ? `https://vidsrc.net/embed/tv/${movieId}`
                : "https://vidsrc.net/embed/movie/${movieId}"
            );
          }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default WatchScreen;
