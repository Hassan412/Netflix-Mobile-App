import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { TextInput, Button, DefaultTheme } from "react-native-paper";
import { Link, router, useLocalSearchParams } from "expo-router";
import { signIn } from "@/lib/auth";

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);
  const local = useLocalSearchParams();
  const formSchema = z.object({
    email: z
      .string()
      .min(2, {
        message: "Email is required",
      })
      .email(),
    password: z.string().min(8, {
      message: "Password is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: local.email as string,
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await signIn(values);
    } catch (error: any) {
      if (error) Alert.alert(error.message);
    } finally {
      setLoading(false);
      router.replace("/(app)/profiles");
    }
  };
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "white", // This sets the label color
      text: "white", // This sets the input text color
      placeholder: "white", // This sets the placeholder text color
    },
  };
  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Controller
          control={form.control}
          name={"email"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label={<Text className="text-white">Email</Text>}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingVertical: 10,
                  backgroundColor: "#333",
                  color: "white",
                }}
                theme={{
                  colors: {
                    onSurface: "white",
                  },
                }}
                mode={"flat"}
                underlineStyle={{
                  display: "none",
                }}
                textColor="white"
                autoCapitalize={"none"}
              />
              {error && (
                <Text className="text-red-500 my-2 ml-2">{error.message}</Text>
              )}
            </>
          )}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Controller
          control={form.control}
          name={"password"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label={<Text className="text-white">Password</Text>}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                underlineStyle={{
                  display: "none",
                }}
                mode={"flat"}
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingVertical: 10,
                  backgroundColor: "#333",
                  color: "white",
                }}
                theme={theme}
                textColor="white"
                secureTextEntry={true}
                autoCapitalize={"none"}
              />
              {error && (
                <Text className="text-red-500 my-2 ml-2">{error.message}</Text>
              )}
            </>
          )}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity activeOpacity={0.7}>
          <Button
            mode={"outlined"}
            textColor="white"
            labelStyle={{
              fontSize: 20,
            }}
            style={{
              borderRadius: 10,
              borderWidth: 2,
            }}
            contentStyle={{
              paddingVertical: 8,
              borderRadius: 10,
            }}
            rippleColor={"white"}
            disabled={loading}
            onPress={form.handleSubmit(onSubmit)}
          >
            Sign In
          </Button>
        </TouchableOpacity>
      </View>
      <View className="flex-col gap-8 mt-8 items-center">
        <Link
          href={"/"}
          className="text-neutral-400 text-lg text-center font-semibold"
        >
          Forgot password?
        </Link>
        <Link
          href={""}
          className="text-neutral-400 text-lg text-center font-semibold"
        >
          New to Netflix? Sign up now.
        </Link>
        <Text className="text-neutral-400 text-center max-w-96">
          sign-in is protected by Google reCAPTCHA to ensure you're not a bot.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "black",
    flex: 1,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

export default SignInScreen;
