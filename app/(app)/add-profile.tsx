import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import images from "@/constants/images";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import useSession from "@/hooks/useSession";
const AddProfile = () => {
  const [image, setImage] = useState("pfp1");
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { session } = useSession();
  const router = useRouter();
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setLoading(true);
        const { error } = await supabase
          .from("profiles")
          .insert({
            username: values.name,
            profilePicture: image,
            userId: session?.user.id,
          })
          .select();
        if (error) throw error;
      } catch (error: any) {
        if (error) Alert.alert(error.message);
      } finally {
        setLoading(false);
        router.replace("/profiles");
      }
    },
    [image, router, session]
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          textColor="green"
          disabled={loading}
          onPress={form.handleSubmit(onSubmit)}
        >
          Save
        </Button>
      ),
    });
  }, [navigation, image, form, onSubmit, loading]);

  return (
    <SafeAreaView className="flex-col py-8 items-center bg-black gap-8 flex-1">
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "#222",
            padding: 10,
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: "white",
          }}
        >
          <View className="flex-row justify-center rounded-sm flex-wrap items-center gap-4">
            {Object.entries(images).map(([key, image], index) => (
              <TouchableHighlight key={index} onPress={() => setImage(key)}>
                <Image
                  source={image as ImageSourcePropType}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </TouchableHighlight>
            ))}
          </View>
        </Modal>
      </Portal>
      <View className="relative">
        <Image
          source={images[image as keyof typeof images]}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <AntDesign
          name="edit"
          size={24}
          onPress={showModal}
          color="black"
          className="bg-white rounded-sm absolute -right-[5px] -bottom-[5px]"
        />
      </View>

      <Controller
        control={form.control}
        name={"name"}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              label={<Text className="text-white">Name</Text>}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={{
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                borderBottomLeftRadius: 2,
                borderBottomRightRadius: 2,
                paddingVertical: 10,
                backgroundColor: "#222",
                color: "white",
                width: "90%",
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
    </SafeAreaView>
  );
};

export default AddProfile;

