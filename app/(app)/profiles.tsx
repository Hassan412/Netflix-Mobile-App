import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { ProfilesTypes } from "@/types";
import { ActivityIndicator, Button } from "react-native-paper";
import useProfile from "@/hooks/useProfile";
import ProfileItem from "@/components/profile";
import { signOut } from "@/lib/auth";
import useSession from "@/hooks/useSession";

const Profiles = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState<ProfilesTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const { setEditProfile } = useProfile();
  const { session } = useSession();
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const { data } = await supabase
          .from("profiles")
          .select(`*`)
          .eq("userId", session?.user.id);
        if (data) {
          setProfiles(data as []);
        }
      } catch (error: any) {
        if (error) Alert.alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [session?.user.id]);

  const handleOutsidePress = () => {
    setEditProfile(false);
  };

  if (loading) {
    return (
      <View
        className="items-center justify-center bg-black"
        style={{
          flex: 1,
        }}
      >
        <ActivityIndicator animating={true} size={"large"} color={"red"} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <SafeAreaView
        style={{
          width: "100%",
          backgroundColor: "black",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          paddingTop: 100,
          paddingBottom: 32,
        }}
      >
        <Text
          className="text-2xl text-center text-white"
          style={{
            fontSize: 24,
            color: "white",
          }}
        >
          Who's watching?
        </Text>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: 300,
              gap: 24,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {profiles.map((profile, index) => (
              <ProfileItem
                key={index}
                id={profile.id}
                name={profile.username}
                image={profile.profilePicture}
              />
            ))}

            <View className="flex-col justify-center items-center gap-2">
              <TouchableHighlight onPress={() => router.push("/add-profile")}>
                <View
                  style={{
                    padding: 24,
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 110,
                    height: 110,
                    borderColor: "white",
                    borderWidth: 1,
                  }}
                >
                  <AntDesign name="plus" size={40} color="white" />
                </View>
              </TouchableHighlight>
              <Text className="text-center text-white">Add Profile</Text>
            </View>
          </View>
        </ScrollView>
        <Button
          textColor="white"
          onPress={() => signOut()}
          style={{
            backgroundColor: "#333",
          }}
        >
          Sign out
        </Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Profiles;
