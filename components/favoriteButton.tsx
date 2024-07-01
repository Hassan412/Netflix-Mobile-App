import { Alert, Pressable, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import useProfile from "@/hooks/useProfile";
import _, { without } from "lodash";
import Feather from "@expo/vector-icons/Feather";
import { cn } from "@/lib/utils";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
interface FavoriteButtonInterface {
  movieId: number;
  iconSize?: number;
  labelClassName?: string;
  ClassName?: string;
}

const FavoriteButton: React.FC<FavoriteButtonInterface> = ({
  movieId,
  iconSize,
  labelClassName,
  ClassName,
}) => {
  const { Profile, favoriteIds, setFavoriteIds } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const isFavorite = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("favoriteIds")
        .eq("id", Profile?.id);

      if (error) {
        console.error("Error fetching favoriteIds:", error);
        return;
      }

      if (data && data.length > 0) {
        setFavoriteIds(data[0].favoriteIds);
      }
    };

    if (Profile?.id) {
      isFavorite();
    }
  }, [Profile?.id, movieId, setFavoriteIds]);

  const toggleFavorite = useCallback(async () => {
    setIsLoading(true);
    try {
      let updatedFavoriteIds;
      if (favoriteIds?.includes(movieId)) {
        updatedFavoriteIds = without(favoriteIds, movieId);
      } else {
        updatedFavoriteIds = _.isEmpty(favoriteIds)
          ? [movieId]
          : [...favoriteIds, movieId];
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          favoriteIds: updatedFavoriteIds,
        })
        .eq("id", Profile?.id);

      if (error) throw error;

      setFavoriteIds(updatedFavoriteIds);
    } catch (error: any) {
      Alert.alert(error.message);
      console.error("Error updating favoriteIds:", error);
    } finally {
      setIsLoading(false);
    }
  }, [Profile?.id, favoriteIds, movieId, setFavoriteIds]);

  return (
    <Pressable onPress={toggleFavorite}>
      <View className={cn("flex-col items-center justify-center", ClassName)}>
        {isLoading ? (
          <ActivityIndicator animating={true} size={iconSize ? iconSize : 24} color={MD2Colors.red500} />
        ) : favoriteIds?.includes(movieId) ? (
          <Feather name="check" size={iconSize ? iconSize : 24} color="white" />
        ) : (
          <AntDesign
            name="plus"
            size={iconSize ? iconSize : 24}
            color="white"
          />
        )}

        <Text className={cn("text-white font-medium", labelClassName)}>
          My List
        </Text>
      </View>
    </Pressable>
  );
};

export default FavoriteButton;
