import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { signUp } from "@/lib/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
const SignUp = () => {
  const local = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      const user = await signUp(values);

      if (user.session?.user.email) {
        const { data, error } = await supabase
          .from("userTable")
          .insert({ email: user.session.user.email });

        if (error) {
          console.error("Error inserting into userTable:", error);
          Alert.alert("Insert Error", error.message);
        } else {
          console.log("Insert successful:", data);
        }
      } else {
        console.error("User session or email is undefined.");
        Alert.alert("Sign Up Error", "User session or email is undefined.");
      }
      router.replace("/(app)/profiles");
      console.log(user);
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      Alert.alert("Sign Up Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="p-8 flex-1 bg-white">
      <View className="flex-col gap-6">
        <Text className="text-3xl font-medium">
          Unlimited films, TV programmes & more
        </Text>
        <Text className="text-xl text-neutral-800">
          Create an account, and we'll send you and email with everything you
          need to know about Netflix
        </Text>
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
                  borderColor: "gray",
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
        <Controller
          control={form.control}
          name={"password"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label={<Text className="text-neutral-500">Password</Text>}
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
                  borderColor: "gray",
                }}
                mode={"flat"}
                cursorColor="gray"
                underlineStyle={{
                  display: "none",
                }}
                secureTextEntry={true}
                autoCapitalize={"none"}
              />
              {error && <Text className="text-red-500">{error.message}</Text>}
            </>
          )}
        />
        <TouchableOpacity activeOpacity={0.7}>
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
            Create account
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
