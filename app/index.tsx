import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import Navbar from "@/components/navbar";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
import Drawer from "@/components/drawer";
import SignUp from "@/components/sign-up";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import useSession from "@/hooks/useSession";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { setSession, session } = useSession();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session);
    });
  }, [setSession]);
  
  if (session?.access_token) {
    return <Redirect href={"/(app)/profiles"} />;
  }
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <View className="flex-1 w-full bg-black relative">
      <Navbar setIsOpen={setIsOpen} />
      <Swiper
        style={styles.wrapper}
        renderPagination={(index, total, context) => (
          <CustomPagination index={index} total={total} context={context} />
        )}
      >
        <View style={styles.slide1}>
          <LinearGradient
            colors={[
              "rgba(0, 0, 0, 1) 37%)",
              "rgba(0, 22, 66, 1) 19%",
              "rgba(202, 5, 5, 1) 0%",
            ]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 100,
            }}
            className="opacity-80"
          />
          <Image
            source={require("@/assets/images/Rectangle.png")}
            contentFit="fill"
            style={{
              width: "100%",

              height: "100%",
            }}
            transition={500}
          />
          <View
            className="absolute top-[0%] max-w-96 flex-col justify-center pb-8 pt-[100px] items-center h-full"
            style={{
              width: "100%",
              zIndex: 100,
              transform: [{ translateX: 0 }],
            }}
          >
            <View className="flex-col items-center">
              <Text className="text-white font-extrabold text-[2.2rem] text-center">
                Unlimited films, TV programmes & more
              </Text>
              <Text className="text-neutral-400 text-lg mt-4 text-center max-w-72">
                Watch anywhere. Cancel at any time.
              </Text>
            </View>
          </View>
        </View>
        <View className=" bg-slate-950" style={styles.slide2}>
          <View
            className="absolute top-[0%] max-w-96 flex-col justify-center pb-8 gap-8 items-center h-full"
            style={{
              width: "100%",
              zIndex: 100,
            }}
          >
            <Image
              source={require("@/assets/images/stream.png")}
              contentFit="contain"
              style={{
                height: 200,
                width: 300,
              }}
              transition={500}
              placeholder={{ blurhash }}
            />
            <View className="flex-col items-center max-w-80">
              <Text className="text-white font-extrabold text-[2.2rem] text-center">
                Therers's a plan for every fan
              </Text>
              <Text className="text-neutral-400 text-lg mt-4 text-center ">
                Plans start at Rs 250
              </Text>
            </View>
          </View>
        </View>
        <View className="bg-slate-950" style={styles.slide3}>
          <View
            className="absolute top-[0%] max-w-96 flex-col gap-8 justify-center pb-8 items-center h-full"
            style={{
              width: "100%",
              zIndex: 100,
              transform: [{ translateX: 0 }],
            }}
          >
            <Image
              source={require("@/assets/images/satisfaction.png")}
              contentFit="contain"
              style={{
                height: 200,
                width: 300,
              }}
              transition={500}
              placeholder={{ blurhash }}
            />
            <View className="flex-col items-center max-w-80">
              <Text className="text-white font-extrabold text-[2.2rem] text-center">
                Cancel online anytime
              </Text>
              <Text className="text-neutral-400 text-lg mt-4 text-center ">
                Join today, no reason to wait
              </Text>
            </View>
          </View>
        </View>
      </Swiper>
      <Text
        className="text-white absolute right-5 left-5 bottom-8 text-xl text-center rounded-sm"
        onPress={() => setIsSignUp(true)}
        style={{
          backgroundColor: "red",
          paddingVertical: 10,
        }}
      >
        Get Started
      </Text>
      <Drawer setIsOpen={setIsOpen} isOpen={isOpen} />
      <SignUp isOpen={isSignUp} setIsOpen={setIsSignUp} />
    </View>
  );
};

const CustomPagination = ({ index, total, context }: any) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i === index ? "red" : "gray" },
          ]}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    position: "relative",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 9999,
    marginHorizontal: 3,
  },
});
export default Home;
