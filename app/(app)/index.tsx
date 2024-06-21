import { SafeAreaView,  Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { signOut } from "@/lib/auth";

const index = () => {
  return (
    <SafeAreaView>
      <Text className="text-black">index</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </SafeAreaView>
  );
};

export default index;
