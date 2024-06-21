import { Alert, Text, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button, TextInput } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import _ from "lodash";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

interface SignUpInterface {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const SignUp: React.FC<SignUpInterface> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const config = {
    duration: 300,
  };
  const style = useAnimatedStyle(() => {
    return {
      bottom: isOpen ? withTiming(0, config) : withTiming("-100%", config),
    };
  });
  const formSchema = z.object({
    email: z
      .string()
      .min(2, {
        message: "Email is required",
      })
      .email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const user = await supabase
        .from("userTable")
        .select("email")
        .eq("email", value.email);
      console.log(user);
      if (_.isEmpty(user.data)) {
        router.push({
          pathname: "/sign-up",
          params: {
            email: value.email,
          },
        });
      }else {
        router.push({
          pathname: "/sign-in",
          params: {
            email: value.email,
          },
        });
      }
    } catch (error: any) {
      if (error) Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Animated.View
      className="p-6 flex-col gap-8 absolute rounded-t-xl bottom-0 left-0 right-0 bg-white"
      style={[
        {
          zIndex: 100,
          width: "100%",
          height: "100%",
        },
        style,
      ]}
    >
      <AntDesign
        onPress={() => setIsOpen(false)}
        name="close"
        size={26}
        color="#555"
        className="self-end mt-8"
      />
      <Text className="text-4xl font-medium">Ready to watch</Text>
      <Text className="text-neutral-500 text-xl">
        Enter your email to create or sign in to your account
      </Text>
      <View className="flex-col gap-6">
        <Controller
          control={form.control}
          name={"email"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label={<Text className="text-neutral-500">Email</Text>}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  borderBottomLeftRadius: 3,
                  borderBottomRightRadius: 3,
                  paddingVertical: 4,
                  backgroundColor: "#fff",
                  color: "white",
                  borderWidth: 1,
                  borderColor: "#0066FF",
                }}
                mode={"flat"}
                cursorColor="gray"
                underlineStyle={{
                  display: "none",
                }}
                autoCapitalize={"none"}
              />
              {error && <Text className="text-red-500">{error.message}</Text>}
            </>
          )}
        />

        <Button
          mode="contained"
          labelStyle={{
            fontSize: 18,
            fontWeight: 300,
          }}
          buttonColor="red"
          style={{
            borderRadius: 2,
            paddingVertical: 5,
          }}
          uppercase
          disabled={loading}
          onPress={form.handleSubmit(onSubmit)}
        >
          Get Started
        </Button>
      </View>
    </Animated.View>
  );
};

export default SignUp;

